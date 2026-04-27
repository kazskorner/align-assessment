-- ALIGN Assessment — Database Migration
-- Run this in Neon SQL Editor to create the canonical quiz_results_full table.
-- Safe to run multiple times (uses IF NOT EXISTS / DO NOTHING patterns).

-- ── Drop legacy tables that are superseded by quiz_results_full ──────────────
-- Uncomment ONLY after confirming no production data exists in them:
-- DROP TABLE IF EXISTS quiz_results;
-- DROP TABLE IF EXISTS quiz_responses;

-- ── quiz_results_full — canonical lead + scoring record ──────────────────────
CREATE TABLE IF NOT EXISTS quiz_results_full (
  id                          SERIAL PRIMARY KEY,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Lead identity
  first_name                  VARCHAR(100),
  last_name                   VARCHAR(100),
  email                       VARCHAR(255) NOT NULL,
  phone                       VARCHAR(20),

  -- Demographics (from quiz responses)
  age_range                   VARCHAR(50),
  assets_range                VARCHAR(100),
  retirement_timeline         VARCHAR(50),

  -- Scoring output
  lead_tier                   CHAR(1) NOT NULL CHECK (lead_tier IN ('A','B','C')),
  lead_score                  INTEGER,

  -- Primary components (Retirement Engine + Rhythm)
  primary_component_1         VARCHAR(100),   -- e.g. "Contractual" or "Market Driven"
  primary_component_1_desc    TEXT,           -- full copy block for results page
  primary_component_2         VARCHAR(100),   -- e.g. "Committed" or "Adjustable"
  primary_component_2_desc    TEXT,           -- full copy block for results page

  -- Secondary traits (all 4 as structured JSON)
  -- Shape: { mindset, liquidity, spender, payoutPattern, descriptions: {...} }
  secondary_traits_json       JSONB,

  -- Implementation persona
  implementation_persona      VARCHAR(100),
  implementation_persona_desc TEXT,

  -- Full raw answers for audit / re-scoring
  raw_answers_json            JSONB,

  -- Downstream
  pdf_url                     TEXT,           -- null until PDF generated client-side
  wealthbox_contact_id        VARCHAR(100)    -- null until Wealthbox push succeeds
);

-- ── Index for fast CRM lookups ───────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_qrf_email     ON quiz_results_full (email);
CREATE INDEX IF NOT EXISTS idx_qrf_tier      ON quiz_results_full (lead_tier);
CREATE INDEX IF NOT EXISTS idx_qrf_created   ON quiz_results_full (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qrf_wealthbox ON quiz_results_full (wealthbox_contact_id)
  WHERE wealthbox_contact_id IS NULL;   -- fast query for failed Wealthbox pushes

-- ── trust_counters — powers the landing page live counter ────────────────────
CREATE TABLE IF NOT EXISTS trust_counters (
  counter_type   VARCHAR(50) PRIMARY KEY,
  counter_value  INTEGER NOT NULL DEFAULT 0,
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO trust_counters (counter_type, counter_value)
VALUES
  ('total_quizzes',  0),
  ('total_tier_a',   0),
  ('total_tier_b',   0),
  ('total_tier_c',   0)
ON CONFLICT (counter_type) DO NOTHING;
