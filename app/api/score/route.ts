import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import AlignScoringEngine from '@/lib/scoring-engine';
import type { QuizResponse } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, phone, responses } = body;

    // Validate required fields
    if (!email || !responses || Object.keys(responses).length < 36) {
      return NextResponse.json(
        { error: 'Missing required fields: email and all 36 quiz responses' },
        { status: 400 }
      );
    }

    // Initialize scoring engine
    const engine = new AlignScoringEngine();

    const quizResponse: QuizResponse = {
      email,
      firstName,
      lastName,
      phone,
      responses,
    };

    const result = engine.score(quizResponse);

    // ── Save to quiz_responses table (existing, full schema) ─────────────
    try {
      await query(
        `INSERT INTO quiz_responses
         (email, first_name, last_name, phone, tier, persona, lead_score,
          income_source, income_structure, mindset, liquidity, spender, payout_pattern,
          advisor_value_score, self_efficacy_score, age_range, time_to_retirement, assets_saved, tags_applied)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
         ON CONFLICT (email) DO UPDATE SET
         tier = EXCLUDED.tier,
         persona = EXCLUDED.persona,
         lead_score = EXCLUDED.lead_score,
         updated_at = CURRENT_TIMESTAMP`,
        [
          email,
          firstName || null,
          lastName || null,
          phone || null,
          result.tier,
          result.persona,
          result.leadScore,
          result.traitResults.incomeSource,
          result.traitResults.incomeStructure,
          result.traitResults.mindset,
          result.traitResults.liquidity,
          result.traitResults.spender,
          result.traitResults.payoutPattern,
          result.quadrant.advisorValue,
          result.quadrant.selfEfficacy,
          result.demographics.ageRange,
          result.demographics.timeToRetirement,
          result.demographics.assetsSaved,
          false,
        ]
      );
    } catch (dbError) {
      console.error('quiz_responses insert error:', dbError);
      // Continue — don't fail the API if this table has an issue
    }

    // ── Also save to quiz_results table (simpler lead-capture schema) ───
    try {
      await query(
        `INSERT INTO quiz_results (
          firstName, lastName, email, tier,
          incomeSource, incomeStructure, mindset, liquidity, spender, payoutPattern,
          persona, leadScore
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          firstName || '',
          lastName || '',
          email,
          result.tier,
          result.traitResults.incomeSource,
          result.traitResults.incomeStructure,
          result.traitResults.mindset,
          result.traitResults.liquidity,
          result.traitResults.spender,
          result.traitResults.payoutPattern,
          result.persona,
          result.leadScore,
        ]
      );
    } catch (dbError) {
      console.error('quiz_results insert error:', dbError);
      // Continue — run schema.sql in Neon to create this table if not yet created
    }

    // ── Update trust counters (best-effort) ──────────────────────────────
    try {
      await query(`UPDATE trust_counters SET counter_value = counter_value + 1 WHERE counter_type = 'total_quizzes'`);
      await query(`UPDATE trust_counters SET counter_value = counter_value + 1 WHERE counter_type = $1`, [`total_tier_${result.tier.toLowerCase()}`]);
    } catch { /* ignore if table not present */ }

    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    console.error('Scoring error:', error);
    return NextResponse.json(
      { error: 'Failed to score quiz', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'healthy', service: 'ALIGN API v2' });
}

