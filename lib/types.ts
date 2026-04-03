// ALIGN Quiz Response Types

export interface QuizResponse {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  responses: Record<number, string>; // Q1: "Strongly Agree", Q2: "Agree", etc.
}

export interface ScoringResult {
  respondentName: string;
  email: string;
  phone?: string;
  tier: 'A' | 'B' | 'C';
  leadScore: number;
  
  // Bipolar Traits
  traitResults: {
    incomeSource: 'Contractual' | 'Market Driven';
    incomeStructure: 'Committed' | 'Adjustable';
    mindset: 'Income Mindset' | 'Net Worth Mindset';
    liquidity: 'Cash Liquidity' | 'Investment Liquidity';
    spender: 'Front Loaded' | 'Back Loaded';
    payoutPattern: 'Phased Income' | 'Lifetime Income';
  };
  
  // Quadrant & Persona
  quadrant: {
    advisorValue: number; // -9 to +9
    selfEfficacy: number; // -9 to +9
  };
  persona: 'Confident Investor' | 'Collaborative Visionary' | 'Lifestyle Curator' | 'Pragmatic Realist';
  
  // Copy for Results Page
  copy: {
    primaryTraits: string;
    secondaryTraits: string;
    personaDescription: string;
  };
  
  // Redtail Integration
  redtailTags: string[]; // ["ALIGN: Tier A", "ALIGN: Time to Retirement 0-3 Yrs", ...]
  
  // Demographics (stored for profile)
  demographics: {
    ageRange: string;
    timeToRetirement: string;
    assetsSaved: string;
    taxBuckets: string;
  };
}

export interface ScoringRuleEntry {
  questionNumber: number;
  questionText: string;
  category: string;
  engine: string;
  answerChoice: string;
  points: number;
  traitDirection: string;
}

export interface CopyMatrixEntry {
  category: 'Primary' | 'Secondary' | 'Persona';
  traitName: string;
  primaryCombo?: string;
  description: string;
}

export interface TierRule {
  ruleOrder: number;
  ruleName: string;
  ruleCondition: string;
  assignedTier: 'A' | 'B' | 'C';
  description: string;
}

export type BipolarTraitCategory = 
  | 'incomeSource' 
  | 'incomeStructure' 
  | 'mindset' 
  | 'liquidity' 
  | 'spender' 
  | 'payoutPattern';

export type BipolarTraitValue = 
  | 'Contractual' | 'Market Driven'
  | 'Committed' | 'Adjustable'
  | 'Income Mindset' | 'Net Worth Mindset'
  | 'Cash Liquidity' | 'Investment Liquidity'
  | 'Front Loaded' | 'Back Loaded'
  | 'Phased Income' | 'Lifetime Income';

export type PersonaType = 
  | 'Confident Investor' 
  | 'Collaborative Visionary' 
  | 'Lifestyle Curator' 
  | 'Pragmatic Realist';
