import AlignScoringEngine from '../lib/scoring-engine';

// Sample quiz responses for testing
const SAMPLE_QUIZ_TIER_A = {
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "555-1234",
  responses: {
    1: "Disagree", // Spender: Back Loaded
    2: "Agree", // Mindset: Income Mindset
    3: "Disagree", // Spender: Back Loaded
    4: "Agree", // Income Source: Contractual
    5: "Disagree", // Income Source: Contractual
    6: "Strongly Agree", // Income Source: Contractual
    7: "Strongly Disagree", // Income Source: Contractual
    8: "Disagree", // Income Structure: Committed
    9: "Strongly Agree", // Income Structure: Committed
    10: "Disagree", // Income Structure: Committed
    11: "Strongly Agree", // Income Structure: Committed
    12: "Agree", // Mindset: Income Mindset
    13: "Disagree", // Mindset: Income Mindset
    14: "Disagree", // Liquidity: Cash Liquidity
    15: "Strongly Agree", // Liquidity: Cash Liquidity
    16: "Disagree", // Liquidity: Cash Liquidity
    17: "Tax burden", // Intent: Specific concern (1pt)
    18: "Build a new relationship", // Intent: Advisory intent (2pts)
    19: "0–3 years", // Timeline: Urgent (10pts)
    20: "Very comfortable", // Liquidity (for emergency access)
    21: "Disagree", // Payout Pattern: Lifetime Income
    22: "Strongly Agree", // Payout Pattern: Lifetime Income
    23: "Agree", // Payout Pattern: Lifetime Income
    24: "Very uncomfortable", // Liquidity: Cash Liquidity
    25: "Agree", // Advisor Value: High (+2)
    26: "Strongly Agree", // Advisor Value: High (+3)
    27: "Strongly Disagree", // Advisor Value: High (+3)
    28: "Agree", // Self Efficacy: High (+2)
    29: "Agree", // Self Efficacy: High (+2)
    30: "Strongly Disagree", // Self Efficacy: High (+3)
    31: "62–67", // Age: Peak window (3pts)
    32: "$3M+", // Assets: High (8pts)
    33: "$5M+ in investments", // Income/NW: Highest (4pts)
    34: "I'd spend LESS early, then increase later", // Spender: Back Loaded
    35: "Only 1 bucket checked", // Tax: Single bucket (bonus +1)
    36: "CA", // State: Profile only
  },
};

const SAMPLE_QUIZ_TIER_B = {
  email: "jane.smith@example.com",
  firstName: "Jane",
  lastName: "Smith",
  phone: "555-5678",
  responses: {
    1: "Agree",
    2: "Neutral",
    3: "Agree",
    4: "Neutral",
    5: "Neutral",
    6: "Agree",
    7: "Neutral",
    8: "Agree",
    9: "Agree",
    10: "Neutral",
    11: "Neutral",
    12: "Agree",
    13: "Disagree",
    14: "Agree",
    15: "Neutral",
    16: "Neutral",
    17: "Running out of money",
    18: "Update an existing plan",
    19: "5–10 years",
    20: "Somewhat comfortable",
    21: "Agree",
    22: "Neutral",
    23: "Agree",
    24: "Somewhat comfortable",
    25: "Somewhat Agree",
    26: "Agree",
    27: "Neutral",
    28: "Agree",
    29: "Somewhat Agree",
    30: "Neutral",
    31: "51–62",
    32: "$750k–$1.5M",
    33: "$1.1M+ under advice",
    34: "Somewhat more early",
    35: "2 buckets checked",
    36: "TX",
  },
};

const SAMPLE_QUIZ_TIER_C = {
  email: "bob.brown@example.com",
  firstName: "Bob",
  lastName: "Brown",
  phone: "555-9999",
  responses: {
    1: "Neutral",
    2: "Neutral",
    3: "Neutral",
    4: "Neutral",
    5: "Neutral",
    6: "Neutral",
    7: "Neutral",
    8: "Neutral",
    9: "Neutral",
    10: "Neutral",
    11: "Neutral",
    12: "Neutral",
    13: "Neutral",
    14: "Neutral",
    15: "Neutral",
    16: "Neutral",
    17: "Just exploring",
    18: "Neither",
    19: "20+ years",
    20: "Neutral",
    21: "Neutral",
    22: "Neutral",
    23: "Neutral",
    24: "Neutral",
    25: "Somewhat Disagree",
    26: "Disagree",
    27: "Agree",
    28: "Somewhat Disagree",
    29: "Disagree",
    30: "Agree",
    31: "Under 50",
    32: "Less than $250k",
    33: "None of the above",
    34: "About the same each year",
    35: "Not sure",
    36: "FL",
  },
};

export function runScoringTests() {
  const engine = new AlignScoringEngine();

  console.log("\n========================================");
  console.log("ALIGN Scoring Engine — Test Results");
  console.log("========================================\n");

  // Test Tier A
  console.log("TEST 1: Tier A Profile (High AUM + Near-term + Intent)");
  const tierAResult = engine.score(SAMPLE_QUIZ_TIER_A);
  console.log(JSON.stringify(tierAResult, null, 2));
  console.log(`\nExpected: Tier A | Got: Tier ${tierAResult.tier}`);
  console.log(`Lead Score: ${tierAResult.leadScore}`);
  console.log(`Persona: ${tierAResult.persona}`);
  console.log(`Traits:`, tierAResult.traitResults);
  console.log(`Redtail Tags:`, tierAResult.redtailTags);

  // Test Tier B
  console.log("\n========================================");
  console.log("TEST 2: Tier B Profile (Mid-range AUM + 5-10yr timeline)");
  const tierBResult = engine.score(SAMPLE_QUIZ_TIER_B);
  console.log(`\nExpected: Tier B | Got: Tier ${tierBResult.tier}`);
  console.log(`Lead Score: ${tierBResult.leadScore}`);
  console.log(`Persona: ${tierBResult.persona}`);
  console.log(`Traits:`, tierBResult.traitResults);
  console.log(`Redtail Tags:`, tierBResult.redtailTags);

  // Test Tier C
  console.log("\n========================================");
  console.log("TEST 3: Tier C Profile (Low AUM + Early-stage + No urgency)");
  const tierCResult = engine.score(SAMPLE_QUIZ_TIER_C);
  console.log(`\nExpected: Tier C | Got: Tier ${tierCResult.tier}`);
  console.log(`Lead Score: ${tierCResult.leadScore}`);
  console.log(`Persona: ${tierCResult.persona}`);
  console.log(`Traits:`, tierCResult.traitResults);
  console.log(`Redtail Tags:`, tierCResult.redtailTags);

  console.log("\n========================================");
  console.log("All tests complete!");
  console.log("========================================\n");
}

// Run tests if this file is executed directly
if (require.main === module) {
  runScoringTests();
}

export default { SAMPLE_QUIZ_TIER_A, SAMPLE_QUIZ_TIER_B, SAMPLE_QUIZ_TIER_C };
