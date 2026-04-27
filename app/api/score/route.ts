import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import AlignScoringEngine from '@/lib/scoring-engine';
import type { QuizResponse } from '@/lib/types';
import { PRIMARY_TRAIT_COPY, SECONDARY_TRAIT_COPY, PERSONA_COPY } from '@/lib/quiz-copy';
import { pushLeadToWealthbox } from '@/lib/wealthbox';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone, responses } = body;

    if (!email || !responses || Object.keys(responses).length < 34) {
      return NextResponse.json(
        { error: 'Missing required fields: email and all 34 quiz responses' },
        { status: 400 }
      );
    }

    const engine = new AlignScoringEngine();
    const quizResponse: QuizResponse = { email, firstName, lastName, phone, responses };
    const result = engine.score(quizResponse);
    const tr = result.traitResults;

    // ── Resolve copy for storage ──────────────────────────────────────────────
    const primary1Desc = PRIMARY_TRAIT_COPY[tr.incomeSource] ?? '';
    const primary2Desc = PRIMARY_TRAIT_COPY[tr.incomeStructure] ?? '';
    const secondaryKey = (val: string) => `${val}|${tr.incomeSource}|${tr.incomeStructure}`;
    const secondaryTraitsJson = {
      mindset:       tr.mindset,
      liquidity:     tr.liquidity,
      spender:       tr.spender,
      payoutPattern: tr.payoutPattern,
      descriptions: {
        mindset:       SECONDARY_TRAIT_COPY[secondaryKey(tr.mindset)]       ?? '',
        liquidity:     SECONDARY_TRAIT_COPY[secondaryKey(tr.liquidity)]     ?? '',
        spender:       SECONDARY_TRAIT_COPY[secondaryKey(tr.spender)]       ?? '',
        payoutPattern: SECONDARY_TRAIT_COPY[secondaryKey(tr.payoutPattern)] ?? '',
      },
    };
    const personaDesc = PERSONA_COPY[result.persona]?.description ?? '';

    // ── Write to quiz_results_full (single source of truth) ──────────────────
    let insertedId: number | null = null;
    try {
      const dbResult = await query(
        `INSERT INTO quiz_results_full (
          first_name, last_name, email, phone,
          age_range, assets_range, retirement_timeline,
          lead_tier, lead_score,
          primary_component_1, primary_component_1_desc,
          primary_component_2, primary_component_2_desc,
          secondary_traits_json,
          implementation_persona, implementation_persona_desc,
          raw_answers_json
        ) VALUES (
          $1,  $2,  $3,  $4,
          $5,  $6,  $7,
          $8,  $9,
          $10, $11,
          $12, $13,
          $14,
          $15, $16,
          $17
        ) RETURNING id`,
        [
          firstName ?? null,
          lastName  ?? null,
          email,
          phone     ?? null,
          result.demographics.ageRange,
          result.demographics.assetsSaved,
          result.demographics.timeToRetirement,
          result.tier,
          result.leadScore,
          tr.incomeSource,
          primary1Desc,
          tr.incomeStructure,
          primary2Desc,
          JSON.stringify(secondaryTraitsJson),
          result.persona,
          personaDesc,
          JSON.stringify(responses),
        ]
      );
      insertedId = dbResult.rows[0]?.id ?? null;
    } catch (dbErr) {
      console.error('[DB] quiz_results_full insert failed:', dbErr);
    }

    // ── Update trust counter (best-effort) ────────────────────────────────────
    try {
      await query(
        `UPDATE trust_counters SET counter_value = counter_value + 1, updated_at = NOW()
         WHERE counter_type = 'total_quizzes'`
      );
      await query(
        `UPDATE trust_counters SET counter_value = counter_value + 1, updated_at = NOW()
         WHERE counter_type = $1`,
        [`total_tier_${result.tier.toLowerCase()}`]
      );
    } catch { /* non-critical */ }

    // ── Push to Wealthbox (async, never blocks the response) ─────────────────
    if (insertedId !== null) {
      pushLeadToWealthbox({
        firstName:          firstName ?? '',
        lastName:           lastName  ?? '',
        email,
        phone:              phone     ?? undefined,
        tier:               result.tier,
        persona:            result.persona,
        incomeSource:       tr.incomeSource,
        incomeStructure:    tr.incomeStructure,
        assetsRange:        result.demographics.assetsSaved,
        retirementTimeline: result.demographics.timeToRetirement,
      }).then(async (wbContactId) => {
        if (wbContactId && insertedId) {
          await query(
            `UPDATE quiz_results_full SET wealthbox_contact_id = $1 WHERE id = $2`,
            [wbContactId, insertedId]
          ).catch(e => console.error('[DB] wealthbox_contact_id update failed:', e));
        }
      });
    }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('[Score API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to score quiz', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'healthy', service: 'ALIGN API v2' });
}
