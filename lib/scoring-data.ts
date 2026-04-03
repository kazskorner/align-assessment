// ALIGN Quiz Master — 36 Questions with Scoring Key
// Source: ALIGN_Quiz_Master spreadsheet

export const ALIGN_QUESTIONS = {
  // Block 1: Hook (Q1–3) — Personality feel, no financial exposure
  1: {
    text: "Enjoying life when I can matters more to me than preserving spending later.",
    category: "Spender",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Front Loaded" },
      "Agree": { points: 1, trait: "Front Loaded" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Back Loaded" },
      "Strongly Disagree": { points: 2, trait: "Back Loaded" },
    },
  },
  2: {
    text: "A steady, reliable income matters more to me than maximizing my net worth.",
    category: "Mindset",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Income Mindset" },
      "Agree": { points: 1, trait: "Income Mindset" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Net Worth Mindset" },
      "Strongly Disagree": { points: 2, trait: "Net Worth Mindset" },
    },
  },
  3: {
    text: "I'd rather spend more in the early years of retirement while I'm more active.",
    category: "Spender",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Front Loaded" },
      "Agree": { points: 1, trait: "Front Loaded" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Back Loaded" },
      "Strongly Disagree": { points: 2, trait: "Back Loaded" },
    },
  },

  // Block 2: Traits — Income Source (Q4–7)
  4: {
    text: "Pension income or annuity payments are more valuable to me than a larger lump sum I have to manage myself.",
    category: "Income Source",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Contractual" },
      "Agree": { points: 1, trait: "Contractual" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Market Driven" },
      "Strongly Disagree": { points: 2, trait: "Market Driven" },
    },
  },
  5: {
    text: "I want my retirement income to come from investments I control, not a fixed payment from an insurance company.",
    category: "Income Source",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Market Driven" },
      "Agree": { points: 1, trait: "Market Driven" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Contractual" },
      "Strongly Disagree": { points: 2, trait: "Contractual" },
    },
  },
  6: {
    text: "I prefer knowing my retirement income won't change, even if it means lower overall returns.",
    category: "Income Source",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Contractual" },
      "Agree": { points: 1, trait: "Contractual" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Market Driven" },
      "Strongly Disagree": { points: 2, trait: "Market Driven" },
    },
  },
  7: {
    text: "The 4% rule (withdrawing 4% annually from my portfolio) is an acceptable way to fund my retirement.",
    category: "Income Source",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Market Driven" },
      "Agree": { points: 1, trait: "Market Driven" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Contractual" },
      "Strongly Disagree": { points: 2, trait: "Contractual" },
    },
  },

  // Block 3: Traits — Income Structure (Q8–11)
  8: {
    text: "I want my retirement plan to be flexible so I can adjust my income based on what's happening in the market.",
    category: "Income Structure",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Adjustable" },
      "Agree": { points: 1, trait: "Adjustable" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Committed" },
      "Strongly Disagree": { points: 2, trait: "Committed" },
    },
  },
  9: {
    text: "Once I set my retirement income level, I want it to stay locked in and not change.",
    category: "Income Structure",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Committed" },
      "Agree": { points: 1, trait: "Committed" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Adjustable" },
      "Strongly Disagree": { points: 2, trait: "Adjustable" },
    },
  },
  10: {
    text: "I prefer a retirement plan that I can modify as my life circumstances change.",
    category: "Income Structure",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Adjustable" },
      "Agree": { points: 1, trait: "Adjustable" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Committed" },
      "Strongly Disagree": { points: 2, trait: "Committed" },
    },
  },
  11: {
    text: "Once my retirement income is set up, I want minimal changes to the structure.",
    category: "Income Structure",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Committed" },
      "Agree": { points: 1, trait: "Committed" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Adjustable" },
      "Strongly Disagree": { points: 2, trait: "Adjustable" },
    },
  },

  // Block 4: Traits — Secondary (Q12–16) + Intent (Q17–19)
  12: {
    text: "Protecting my purchasing power over time is more important than generating the highest possible returns.",
    category: "Mindset",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Income Mindset" },
      "Agree": { points: 1, trait: "Income Mindset" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Net Worth Mindset" },
      "Strongly Disagree": { points: 2, trait: "Net Worth Mindset" },
    },
  },
  13: {
    text: "I want my retirement portfolio to be larger when I die than when I started.",
    category: "Mindset",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Net Worth Mindset" },
      "Agree": { points: 1, trait: "Net Worth Mindset" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Income Mindset" },
      "Strongly Disagree": { points: 2, trait: "Income Mindset" },
    },
  },
  14: {
    text: "I want to keep my retirement assets invested rather than in cash.",
    category: "Liquidity",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Investment Liquidity" },
      "Agree": { points: 1, trait: "Investment Liquidity" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Cash Liquidity" },
      "Strongly Disagree": { points: 2, trait: "Cash Liquidity" },
    },
  },
  15: {
    text: "I sleep better knowing I have a dedicated cash reserve separate from my investments.",
    category: "Liquidity",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Cash Liquidity" },
      "Agree": { points: 1, trait: "Cash Liquidity" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Investment Liquidity" },
      "Strongly Disagree": { points: 2, trait: "Investment Liquidity" },
    },
  },
  16: {
    text: "I'm comfortable accessing my retirement income by selling investments as needed.",
    category: "Liquidity",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Investment Liquidity" },
      "Agree": { points: 1, trait: "Investment Liquidity" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Cash Liquidity" },
      "Strongly Disagree": { points: 2, trait: "Cash Liquidity" },
    },
  },

  // Block 5: Intent Signals (Q17–19)
  17: {
    text: "What is your biggest concern about retirement?",
    category: "Intent",
    engine: "Tier Calc — Intent",
    answers: {
      "Running out of money": { points: 1, trait: "Specific concern" },
      "Tax burden": { points: 1, trait: "Specific concern" },
      "Healthcare costs": { points: 1, trait: "Specific concern" },
      "Legacy planning": { points: 1, trait: "Specific concern" },
      "Just exploring": { points: 0, trait: "No urgency" },
    },
  },
  18: {
    text: "Are you looking for an advisor?",
    category: "Intent",
    engine: "Tier Calc — Intent",
    answers: {
      "Build a new relationship": { points: 2, trait: "Advisory intent" },
      "Update an existing plan": { points: 1, trait: "Advisory intent" },
      "Neither": { points: 0, trait: "No advisory intent" },
    },
  },
  19: {
    text: "When do you plan to retire?",
    category: "Timeline",
    engine: "Tier Calc — Timeline Urgency",
    answers: {
      "0–3 years": { points: 10, trait: "Urgent" },
      "3–5 years": { points: 8, trait: "Near-term" },
      "Already retired": { points: 7, trait: "Distribution phase" },
      "5–10 years": { points: 4, trait: "Mid-horizon" },
      "10–15 years": { points: 1, trait: "Long-horizon" },
      "15+ years": { points: 0, trait: "Very long-horizon" },
    },
  },

  // Block 6: Implementation (Q20–24) + More Traits (Q21–24)
  20: {
    text: "How much does your spouse/partner influence your financial decisions?",
    category: "Demographics",
    engine: "Profile only",
    answers: {
      "Heavily — we decide together": { points: 0, trait: "Household decision" },
      "Moderately — they have input": { points: 0, trait: "Household decision" },
      "Minimally — I lead the decisions": { points: 0, trait: "Solo decision" },
      "I don't have a spouse/partner": { points: 0, trait: "Solo decision" },
    },
  },
  21: {
    text: "I'm comfortable adjusting my spending in retirement based on market performance.",
    category: "Payout Pattern",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Phased Income" },
      "Agree": { points: 1, trait: "Phased Income" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Lifetime Income" },
      "Strongly Disagree": { points: 2, trait: "Lifetime Income" },
    },
  },
  22: {
    text: "I want a retirement income strategy where my spending can change based on my life stage.",
    category: "Payout Pattern",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Phased Income" },
      "Agree": { points: 1, trait: "Phased Income" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Lifetime Income" },
      "Strongly Disagree": { points: 2, trait: "Lifetime Income" },
    },
  },
  23: {
    text: "I want my retirement income to be consistent and predictable throughout my life.",
    category: "Payout Pattern",
    engine: "Bipolar (0–2)",
    answers: {
      "Strongly Agree": { points: 2, trait: "Lifetime Income" },
      "Agree": { points: 1, trait: "Lifetime Income" },
      "Neutral": { points: 0, trait: "—" },
      "Disagree": { points: 1, trait: "Phased Income" },
      "Strongly Disagree": { points: 2, trait: "Phased Income" },
    },
  },
  24: {
    text: "How comfortable are you accessing your retirement assets in case of emergency?",
    category: "Liquidity",
    engine: "Bipolar (0–2)",
    answers: {
      "Very comfortable": { points: 2, trait: "Investment Liquidity" },
      "Somewhat comfortable": { points: 1, trait: "Investment Liquidity" },
      "Neutral": { points: 0, trait: "—" },
      "Somewhat uncomfortable": { points: 1, trait: "Cash Liquidity" },
      "Very uncomfortable": { points: 2, trait: "Cash Liquidity" },
    },
  },

  // Block 7: Implementation (Q25–30) — Quadrant
  25: {
    text: "I value having a professional advisor who can explain their thinking and involve me in decisions.",
    category: "Advisor Value",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: 3, trait: "High advisor value" },
      "Agree": { points: 2, trait: "High advisor value" },
      "Somewhat Agree": { points: 1, trait: "High advisor value" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: -1, trait: "Low advisor value" },
      "Disagree": { points: -2, trait: "Low advisor value" },
      "Strongly Disagree": { points: -3, trait: "Low advisor value" },
    },
  },
  26: {
    text: "I'd rather delegate the complex parts of retirement planning to someone I trust.",
    category: "Advisor Value",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: 3, trait: "High advisor value" },
      "Agree": { points: 2, trait: "High advisor value" },
      "Somewhat Agree": { points: 1, trait: "High advisor value" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: -1, trait: "Low advisor value" },
      "Disagree": { points: -2, trait: "Low advisor value" },
      "Strongly Disagree": { points: -3, trait: "Low advisor value" },
    },
  },
  27: {
    text: "I prefer to make retirement decisions myself rather than rely on an advisor.",
    category: "Advisor Value",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: -3, trait: "Low advisor value" },
      "Agree": { points: -2, trait: "Low advisor value" },
      "Somewhat Agree": { points: -1, trait: "Low advisor value" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: 1, trait: "High advisor value" },
      "Disagree": { points: 2, trait: "High advisor value" },
      "Strongly Disagree": { points: 3, trait: "High advisor value" },
    },
  },
  28: {
    text: "I'm confident making financial decisions on my own.",
    category: "Self Efficacy",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: 3, trait: "High self efficacy" },
      "Agree": { points: 2, trait: "High self efficacy" },
      "Somewhat Agree": { points: 1, trait: "High self efficacy" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: -1, trait: "Low self efficacy" },
      "Disagree": { points: -2, trait: "Low self efficacy" },
      "Strongly Disagree": { points: -3, trait: "Low self efficacy" },
    },
  },
  29: {
    text: "I understand the tax implications of different retirement strategies.",
    category: "Self Efficacy",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: 3, trait: "High self efficacy" },
      "Agree": { points: 2, trait: "High self efficacy" },
      "Somewhat Agree": { points: 1, trait: "High self efficacy" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: -1, trait: "Low self efficacy" },
      "Disagree": { points: -2, trait: "Low self efficacy" },
      "Strongly Disagree": { points: -3, trait: "Low self efficacy" },
    },
  },
  30: {
    text: "I feel uncertain about whether my current retirement plan will actually work.",
    category: "Self Efficacy",
    engine: "Quadrant (-3 to +3)",
    answers: {
      "Strongly Agree": { points: -3, trait: "Low self efficacy" },
      "Agree": { points: -2, trait: "Low self efficacy" },
      "Somewhat Agree": { points: -1, trait: "Low self efficacy" },
      "Neutral": { points: 0, trait: "Neutral" },
      "Somewhat Disagree": { points: 1, trait: "High self efficacy" },
      "Disagree": { points: 2, trait: "High self efficacy" },
      "Strongly Disagree": { points: 3, trait: "High self efficacy" },
    },
  },

  // Block 8: Financial Profile (Q31–36)
  31: {
    text: "What is your age range?",
    category: "Demographics",
    engine: "Tier Calc",
    answers: {
      "Under 50": { points: 1, trait: "Age band" },
      "51–62": { points: 2, trait: "Age band" },
      "62–67": { points: 3, trait: "Age band" },
      "68–74": { points: 3, trait: "Age band" },
      "75+": { points: 1, trait: "Age band" },
    },
  },
  32: {
    text: "How much have you saved for retirement?",
    category: "Demographics",
    engine: "Tier Calc",
    answers: {
      "$3M+": { points: 8, trait: "Asset level" },
      "$1.5M–$3M": { points: 6, trait: "Asset level" },
      "$750k–$1.5M": { points: 4, trait: "Asset level" },
      "$250k–$750k": { points: 1, trait: "Asset level" },
      "Less than $250k": { points: 0, trait: "Asset level" },
    },
  },
  33: {
    text: "Which of the following applies to you?",
    category: "Demographics",
    engine: "Tier Calc",
    answers: {
      "$5M+ in investments": { points: 4, trait: "Financial profile" },
      "Net worth ≥ $2.2M": { points: 3, trait: "Financial profile" },
      "$1.1M+ under advice": { points: 3, trait: "Financial profile" },
      "Income $200k+": { points: 2, trait: "Financial profile" },
      "Household income $300k+": { points: 2, trait: "Financial profile" },
      "Net worth ≥ $1M": { points: 1, trait: "Financial profile" },
      "None of the above": { points: 0, trait: "Financial profile" },
    },
  },
  34: {
    text: "How would you describe your spending in the first 10 years of retirement?",
    category: "Spender",
    engine: "Bipolar (0–2)",
    answers: {
      "I'd spend MORE early, then reduce later": { points: 2, trait: "Front Loaded" },
      "Somewhat more early": { points: 1, trait: "Front Loaded" },
      "About the same each year": { points: 0, trait: "—" },
      "Somewhat less early": { points: 1, trait: "Back Loaded" },
      "I'd spend LESS early, then increase later": { points: 2, trait: "Back Loaded" },
    },
  },
  35: {
    text: "Which tax buckets hold your assets? (Select all that apply)",
    category: "Demographics",
    engine: "Profile / Lead Score",
    answers: {
      "Only 1 bucket checked": { points: 5, trait: "Tax profile" },
      "Not sure": { points: 3, trait: "Tax profile" },
      "2 buckets checked": { points: 2, trait: "Tax profile" },
      "3+ buckets checked": { points: 1, trait: "Tax profile" },
    },
  },
  36: {
    text: "State of Residence",
    category: "Demographics",
    engine: "Profile only",
    answers: {
      // All US states as options
      "AL": { points: 0, trait: "Geography" },
      "AK": { points: 0, trait: "Geography" },
      "AZ": { points: 0, trait: "Geography" },
      // ... (all 50 states) — abbreviated for length
      "WY": { points: 0, trait: "Geography" },
    },
  },
};

export const BIPOLAR_TRAIT_CATEGORIES = {
  incomeSource: { a: "Contractual", b: "Market Driven" },
  incomeStructure: { a: "Committed", b: "Adjustable" },
  mindset: { a: "Income Mindset", b: "Net Worth Mindset" },
  liquidity: { a: "Cash Liquidity", b: "Investment Liquidity" },
  spender: { a: "Front Loaded", b: "Back Loaded" },
  payoutPattern: { a: "Phased Income", b: "Lifetime Income" },
};

export const QUADRANT_PERSONAS = {
  "HighAdvisor_HighEfficacy": "Collaborative Visionary",
  "HighAdvisor_LowEfficacy": "Lifestyle Curator",
  "LowAdvisor_HighEfficacy": "Confident Investor",
  "LowAdvisor_LowEfficacy": "Pragmatic Realist",
};

export const TIER_RULES = [
  {
    ruleOrder: 1,
    ruleName: "Hard Knockout",
    condition: (assets: number, timeToRetire: number) =>
      assets < 750000 && timeToRetire > 10,
    tier: "C" as const,
  },
  {
    ruleOrder: 2,
    ruleName: "Tier A",
    condition: (assets: number, timeToRetire: number) =>
      assets >= 1500000 && timeToRetire <= 5,
    tier: "A" as const,
  },
];
