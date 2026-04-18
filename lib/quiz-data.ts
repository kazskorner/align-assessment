// ============================================================
// ALIGN Quiz — Database Utility (updated)
// Uses the existing pg client from @/lib/db — no new packages needed.
//
// Place this file at: lib/quiz-data.ts
// ============================================================

import { query } from '@/lib/db';

// ============================================================
// TYPES
// ============================================================

export type QuestionType =
  | 'likert'
  | 'single'
  | 'single-select'
  | 'multi-select'
  | 'dropdown';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  num: number;
  block: number;
  blockLabel: string;
  type: QuestionType;
  category: string;
  text: string;
  subtext?: string;
  options: QuestionOption[];
}

export interface ScoringRuleMap {
  [questionId: string]: {
    [answerValue: string]: number;
  };
}

export interface TraitCopy {
  label: string;
  result: string;
  description: string;
}

export interface SecondaryTraitCopy extends TraitCopy {
  combo: string;
}

export interface PersonaCopy {
  name: string;
  quadrant: string;
  aboutYou: string;
  howWeWorkTogether: string;
}

export interface AlignCopy {
  engine: Record<string, TraitCopy>;
  rhythm: Record<string, TraitCopy>;
  mindset: Record<string, Record<string, SecondaryTraitCopy>>;
  spender: Record<string, Record<string, SecondaryTraitCopy>>;
  liquidity: Record<string, Record<string, SecondaryTraitCopy>>;
  payoutPattern: Record<string, Record<string, SecondaryTraitCopy>>;
  personas: Record<string, PersonaCopy>;
}

export const LIKERT_OPTIONS: QuestionOption[] = [
  { label: 'Strongly Agree',    value: 'Strongly Agree' },
  { label: 'Agree',             value: 'Agree' },
  { label: 'Neutral',           value: 'Neutral' },
  { label: 'Disagree',          value: 'Disagree' },
  { label: 'Strongly Disagree', value: 'Strongly Disagree' },
];

export async function getQuestions(): Promise<Question[]> {
  const { rows } = await query(`
    SELECT
      q.id, q.num, q.block, q.block_label, q.type, q.category,
      q.text, q.subtext, q.sort_order,
      COALESCE(
        json_agg(
          json_build_object('label', o.label, 'value', o.value)
          ORDER BY o.sort_order
        ) FILTER (WHERE o.id IS NOT NULL),
        '[]'::json
      ) AS options
    FROM questions q
    LEFT JOIN question_options o ON o.question_id = q.id
    GROUP BY q.id, q.num, q.block, q.block_label, q.type,
             q.category, q.text, q.subtext, q.sort_order
    ORDER BY q.sort_order
  `);

  return rows.map((row: any) => ({
    id: row.id,
    num: row.num,
    block: row.block,
    blockLabel: row.block_label,
    type: row.type as QuestionType,
    category: row.category,
    text: row.text,
    subtext: row.subtext ?? undefined,
    options: row.type === 'likert' ? LIKERT_OPTIONS : row.options,
  }));
}

export async function getScoringRules(): Promise<ScoringRuleMap> {
  const { rows } = await query(`
    SELECT question_id, answer_value, points
    FROM scoring_rules
    ORDER BY question_id, points DESC
  `);

  const map: ScoringRuleMap = {};
  for (const row of rows) {
    if (!map[row.question_id]) map[row.question_id] = {};
    map[row.question_id][row.answer_value] = row.points;
  }
  return map;
}

export async function getAllCopy(): Promise<AlignCopy> {
  const [traitResult, personaResult] = await Promise.all([
    query(`
      SELECT trait_type, result, primary_combo, label, description
      FROM trait_copy
      ORDER BY trait_type, result, primary_combo
    `),
    query(`
      SELECT name, quadrant, about_you, how_we_work_together
      FROM persona_copy
      ORDER BY name
    `),
  ]);

  const copy: AlignCopy = {
    engine: {}, rhythm: {}, mindset: {}, spender: {},
    liquidity: {}, payoutPattern: {}, personas: {},
  };

  for (const row of traitResult.rows) {
    const type   = row.trait_type as string;
    const result = row.result as string;
    const combo  = row.primary_combo as string | null;
    const entry  = { label: row.label, result, combo: combo ?? '', description: row.description };

    if (type === 'engine' || type === 'rhythm') {
      (copy[type] as Record<string, TraitCopy>)[result] = entry;
    } else {
      const key = type === 'payout_pattern' ? 'payoutPattern' : type;
      const section = copy[key as keyof AlignCopy] as Record<string, Record<string, SecondaryTraitCopy>>;
      if (!section[result]) section[result] = {};
      section[result][combo!] = entry as SecondaryTraitCopy;
    }
  }

  for (const row of personaResult.rows) {
    copy.personas[row.name] = {
      name: row.name, quadrant: row.quadrant,
      aboutYou: row.about_you, howWeWorkTogether: row.how_we_work_together,
    };
  }

  return copy;
}

export async function getCopyForResult(params: {
  engine: string; rhythm: string; mindset: string;
  spender: string; liquidity: string; payoutPattern: string; persona: string;
}): Promise<{
  engine: TraitCopy | null; rhythm: TraitCopy | null;
  mindset: SecondaryTraitCopy | null; spender: SecondaryTraitCopy | null;
  liquidity: SecondaryTraitCopy | null; payoutPattern: SecondaryTraitCopy | null;
  persona: PersonaCopy | null;
}> {
  const combo = `${params.engine} + ${params.rhythm}`;

  const [traitResult, personaResult] = await Promise.all([
    query(
      `SELECT trait_type, result, primary_combo, label, description
       FROM trait_copy
       WHERE
         (trait_type = 'engine'         AND result = $1) OR
         (trait_type = 'rhythm'         AND result = $2) OR
         (trait_type = 'mindset'        AND result = $3 AND primary_combo = $7) OR
         (trait_type = 'spender'        AND result = $4 AND primary_combo = $7) OR
         (trait_type = 'liquidity'      AND result = $5 AND primary_combo = $7) OR
         (trait_type = 'payout_pattern' AND result = $6 AND primary_combo = $7)`,
      [params.engine, params.rhythm, params.mindset, params.spender, params.liquidity, params.payoutPattern, combo]
    ),
    query(
      `SELECT name, quadrant, about_you, how_we_work_together FROM persona_copy WHERE name = $1`,
      [params.persona]
    ),
  ]);

  const result: any = {
    engine: null, rhythm: null, mindset: null,
    spender: null, liquidity: null, payoutPattern: null, persona: null,
  };

  for (const row of traitResult.rows) {
    const key = row.trait_type === 'payout_pattern' ? 'payoutPattern' : row.trait_type;
    result[key] = {
      label: row.label, result: row.result,
      combo: row.primary_combo ?? '', description: row.description,
    };
  }

  if (personaResult.rows.length > 0) {
    const p = personaResult.rows[0];
    result.persona = {
      name: p.name, quadrant: p.quadrant,
      aboutYou: p.about_you, howWeWorkTogether: p.how_we_work_together,
    };
  }

  return result;
}
