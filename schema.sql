-- ALIGN Quiz Master — Neon PostgreSQL Schema
-- This is the complete database structure for the ALIGN backend

-- 1. Quiz Responses Table (every quiz taken)
CREATE TABLE IF NOT EXISTS quiz_responses (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  
  -- Tier & Persona
  tier VARCHAR(1) NOT NULL, -- A, B, C
  persona VARCHAR(50) NOT NULL, -- Confident Investor, Collaborative Visionary, Lifestyle Curator, Pragmatic Realist
  lead_score INTEGER DEFAULT 0,
  
  -- Bipolar Traits
  income_source VARCHAR(50), -- Contractual, Market Driven
  income_structure VARCHAR(50), -- Committed, Adjustable
  mindset VARCHAR(50), -- Income Mindset, Net Worth Mindset
  liquidity VARCHAR(50), -- Cash Liquidity, Investment Liquidity
  spender VARCHAR(50), -- Front Loaded, Back Loaded
  payout_pattern VARCHAR(50), -- Phased Income, Lifetime Income
  
  -- Quadrant Signals
  advisor_value_score INTEGER,
  self_efficacy_score INTEGER,
  
  -- Demographics (profile data)
  age_range VARCHAR(20),
  time_to_retirement VARCHAR(30),
  assets_saved VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Redtail Integration
  redtail_contact_id VARCHAR(100),
  tags_applied BOOLEAN DEFAULT FALSE,
  
  UNIQUE(email) -- One quiz per email for MVP
);

-- 2. Scoring Rules (from ALIGN Master Scoring Key)
CREATE TABLE IF NOT EXISTS scoring_rules (
  id SERIAL PRIMARY KEY,
  question_number INTEGER NOT NULL,
  question_text TEXT,
  category VARCHAR(50), -- Spender, Mindset, Income Source, etc.
  engine VARCHAR(50), -- Bipolar, Tier Calc, Profile only, etc.
  answer_choice VARCHAR(255) NOT NULL,
  points INTEGER DEFAULT 0,
  trait_direction VARCHAR(100), -- Front Loaded, Back Loaded, Contractual, etc.
  notes TEXT,
  
  UNIQUE(question_number, answer_choice)
);

-- 3. Copy Matrix (40 descriptions for results)
CREATE TABLE IF NOT EXISTS copy_matrix (
  id SERIAL PRIMARY KEY,
  category VARCHAR(50), -- Primary, Secondary, Persona
  trait_name VARCHAR(100), -- Contractual, Income Mindset, Collaborative Visionary, etc.
  primary_combo VARCHAR(100), -- "Contractual + Committed", "High Advisor Value / High Self Efficacy", etc.
  description TEXT NOT NULL
);

-- 4. Tier Rules (waterfall logic)
CREATE TABLE IF NOT EXISTS tier_rules (
  id SERIAL PRIMARY KEY,
  rule_order INTEGER, -- 1, 2, 3, 4 (applied in order)
  rule_name VARCHAR(100),
  rule_condition TEXT, -- SQL-like conditions
  assigned_tier VARCHAR(1), -- A, B, C
  rule_description TEXT
);

-- 5. Trust Counters (aggregated stats for marketing)
CREATE TABLE IF NOT EXISTS trust_counters (
  id SERIAL PRIMARY KEY,
  counter_type VARCHAR(50), -- total_quizzes, total_tier_a, total_tier_b, total_tier_c, total_booked
  counter_value INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(counter_type)
);

-- 6. Redtail Tag Configuration (mapping quiz results to Redtail tags)
CREATE TABLE IF NOT EXISTS redtail_tag_config (
  id SERIAL PRIMARY KEY,
  tag_group VARCHAR(100), -- ALIGN: Tier, ALIGN: Time to Retirement, ALIGN: Age Range
  tag_name VARCHAR(100), -- Tier A, Retiring 0-3 Yrs, 62–67, etc.
  trigger_field VARCHAR(100), -- tier, time_to_retirement, age_range
  trigger_value VARCHAR(100) -- A, 0-3 Yrs, 62-67, etc.
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_quiz_responses_email ON quiz_responses(email);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_tier ON quiz_responses(tier);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_persona ON quiz_responses(persona);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created_at ON quiz_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_scoring_rules_question ON scoring_rules(question_number);
CREATE INDEX IF NOT EXISTS idx_copy_matrix_trait ON copy_matrix(trait_name);

-- Insert Tier Rules (Waterfall Logic from ALIGN Master)
INSERT INTO tier_rules (rule_order, rule_name, rule_condition, assigned_tier, rule_description) VALUES
(1, 'Hard Knockout', 'assets < 750k AND time_to_retirement > 10 yrs', 'C', 'Overrides everything else'),
(2, 'Tier A', 'assets >= 1500k AND time_to_retirement <= 5 yrs', 'A', 'Both conditions required'),
(3, 'Tier B', 'tier_score >= 6', 'B', 'Cumulative score from Q20 + Q32 + Q33'),
(4, 'Default', 'else', 'C', 'All other cases');

-- Initialize Trust Counters
INSERT INTO trust_counters (counter_type, counter_value) VALUES
('total_quizzes', 0),
('total_tier_a', 0),
('total_tier_b', 0),
('total_tier_c', 0),
('total_booked', 0);
