import {
  QuizResponse,
  ScoringResult,
  BipolarTraitCategory,
  PersonaType
} from './types';
import {
  ALIGN_QUESTIONS,
  BIPOLAR_TRAIT_CATEGORIES,
  QUADRANT_PERSONAS,
} from './scoring-data';

export class AlignScoringEngine {
  /**
   * Calculate Tier Score using waterfall rules
   * Tier A (20+): High AUM + near-term retirement + intent signals
   * Tier B (11–19): Qualified prospects
   * Tier C (0–10): Education-first prospects
   */
  calculateTier(responses: Record<number, string>): {
    tier: 'A' | 'B' | 'C';
    score: number;
  } {
    // Extract key questions
    const q20Response = responses[20]; // Time to retirement
    const q31Response = responses[31]; // Age
    const q32Response = responses[32]; // Assets saved
    const q33Response = responses[33]; // Income/NW qualifier
    const q17Response = responses[17]; // Biggest concern
    const q18Response = responses[18]; // Looking for advisor
    const q35Response = responses[35]; // Tax buckets

    // Map responses to point values
    const q20Points = this.getPointValue(20, q20Response);
    const q31Points = this.getPointValue(31, q31Response);
    const q32Points = this.getPointValue(32, q32Response);
    const q33Points = this.getPointValue(33, q33Response);
    const q17Points = this.getPointValue(17, q17Response);
    const q18Points = this.getPointValue(18, q18Response);
    const q35Points = q35Response === "Only 1 bucket checked" ? 1 : 0; // Bonus

    // Calculate raw tier score
    const rawScore = q20Points + q31Points + q32Points + q33Points + q17Points + q18Points + q35Points;

    // Parse assets for waterfall rule
    const assetsValue = this.parseAssets(q32Response);
    const timeToRetirementValue = this.parseTimeToRetirement(q20Response);

    // Apply Waterfall Rules
    // Rule 1: Hard Knockout
    if (assetsValue < 750000 && timeToRetirementValue > 10) {
      return { tier: 'C', score: rawScore };
    }

    // Rule 2: Tier A
    if (assetsValue >= 1500000 && timeToRetirementValue <= 5) {
      return { tier: 'A', score: rawScore };
    }

    // Rule 3: Tier B
    if (rawScore >= 6) {
      return { tier: 'B', score: rawScore };
    }

    // Rule 4: Default
    return { tier: 'C', score: rawScore };
  }

  /**
   * Calculate 6 Bipolar Traits with tie-breaking logic
   */
  calculateTraits(responses: Record<number, string>): Record<string, string> {
    return {
      incomeSource: this.calculateBipolarTrait('incomeSource', responses),
      incomeStructure: this.calculateBipolarTrait('incomeStructure', responses),
      mindset: this.calculateBipolarTrait('mindset', responses),
      liquidity: this.calculateBipolarTrait('liquidity', responses),
      spender: this.calculateBipolarTrait('spender', responses),
      payoutPattern: this.calculateBipolarTrait('payoutPattern', responses),
    };
  }

  private calculateBipolarTrait(
    category: BipolarTraitCategory,
    responses: Record<number, string>
  ): string {
    // Question mappings for each category
    const questionMaps: Record<BipolarTraitCategory, { qNumbers: number[]; aQuestions: number[] }> = {
      incomeSource: { qNumbers: [4, 5, 6, 7], aQuestions: [] },
      incomeStructure: { qNumbers: [8, 9, 10, 11], aQuestions: [] },
      mindset: { qNumbers: [2, 12, 13], aQuestions: [] },
      liquidity: { qNumbers: [14, 15, 24], aQuestions: [] },
      spender: { qNumbers: [1, 3, 34], aQuestions: [] },
      payoutPattern: { qNumbers: [21, 22, 23], aQuestions: [] },
    };

    const qNumbers = questionMaps[category].qNumbers;
    let sideAScore = 0;
    let sideBScore = 0;

    // Sum points for each side
    qNumbers.forEach((qNum) => {
      const response = responses[qNum];
      const question = ALIGN_QUESTIONS[qNum as keyof typeof ALIGN_QUESTIONS];

      if (question && response) {
        const answerData = question.answers[response as keyof typeof question.answers] as any;
        if (answerData && answerData.points !== undefined) {
          const points = answerData.points;
          const direction = answerData.trait;

          if (direction !== "—") {

            // Determine which side (A or B)
            const traitCategory = BIPOLAR_TRAIT_CATEGORIES[category];
            if (direction === traitCategory.a) {
              sideAScore += Math.abs(points);
            } else if (direction === traitCategory.b) {
              sideBScore += Math.abs(points);
            }
          }
        }
      }
    });

    // Winner is highest score
    if (sideAScore > sideBScore) {
      return BIPOLAR_TRAIT_CATEGORIES[category].a;
    } else if (sideBScore > sideAScore) {
      return BIPOLAR_TRAIT_CATEGORIES[category].b;
    }

    // Tie-breaking: Use conservative default or Income Source decision
    return this.resolveBipolarTie(category, responses);
  }

  private resolveBipolarTie(category: BipolarTraitCategory, responses: Record<number, string>): string {
    const traitCategory = BIPOLAR_TRAIT_CATEGORIES[category];

    // PRIMARY traits: Default to conservative (A side)
    const primaryTraits: BipolarTraitCategory[] = ['incomeSource', 'incomeStructure'];
    if (primaryTraits.includes(category)) {
      return traitCategory.a; // Contractual or Committed
    }

    // SECONDARY traits: Follow Income Source decision
    const incomeSourceTrait = this.calculateBipolarTrait('incomeSource', responses);
    const isContractual = incomeSourceTrait === "Contractual";

    const secondaryDefaults: Record<string, { contractual: string; marketDriven: string }> = {
      mindset: { contractual: "Income Mindset", marketDriven: "Net Worth Mindset" },
      liquidity: { contractual: "Cash Liquidity", marketDriven: "Investment Liquidity" },
      spender: { contractual: "Back Loaded", marketDriven: "Front Loaded" },
      payoutPattern: { contractual: "Lifetime Income", marketDriven: "Phased Income" },
    };

    if (secondaryDefaults[category]) {
      return isContractual
        ? secondaryDefaults[category].contractual
        : secondaryDefaults[category].marketDriven;
    }

    return traitCategory.a; // Fallback
  }

  /**
   * Calculate Quadrant (Advisor Value + Self Efficacy)
   */
  calculateQuadrant(responses: Record<number, string>): {
    advisorValue: number;
    selfEfficacy: number;
    persona: PersonaType;
  } {
    const advisorValueScore = this.calculateSubScore([25, 26, 27], responses);
    const selfEfficacyScore = this.calculateSubScore([28, 29, 30], responses);

    // Determine persona from quadrant
    const advisorValueLevel = this.determineLevel(advisorValueScore);
    const selfEfficacyLevel = this.determineLevel(selfEfficacyScore);

    const quadrantKey = `${advisorValueLevel}Advisor_${selfEfficacyLevel}Efficacy`;
    const persona = (QUADRANT_PERSONAS as Record<string, PersonaType>)[quadrantKey] || 'Pragmatic Realist';

    return {
      advisorValue: advisorValueScore,
      selfEfficacy: selfEfficacyScore,
      persona,
    };
  }

  private calculateSubScore(questions: number[], responses: Record<number, string>): number {
    let score = 0;
    const scores: { question: number; points: number }[] = [];

    questions.forEach((qNum) => {
      const response = responses[qNum];
      const points = this.getPointValue(qNum, response);

      score += points;
    });

    // Zero tie-breaking: If score is exactly 0, find highest absolute value
    if (score === 0) {
      const maxAbsolute = Math.max(...scores.map((s) => Math.abs(s.points)));
      const highestQuestion = scores.find((s) => Math.abs(s.points) === maxAbsolute);
      if (highestQuestion && highestQuestion.points > 0) {
        return maxAbsolute; // Positive direction
      } else if (highestQuestion && highestQuestion.points < 0) {
        return -maxAbsolute; // Negative direction
      }
    }

    return score;
  }

  private determineLevel(score: number): 'High' | 'Low' {
    return score > 0 ? 'High' : 'Low';
  }

  private getPointValue(questionNum: number, response: string): number {
    const question = ALIGN_QUESTIONS[questionNum as keyof typeof ALIGN_QUESTIONS];
    if (question && response) {
      const answerData = question.answers[response as keyof typeof question.answers] as any;
      if (answerData && answerData.points !== undefined) {
        return answerData.points;
      }
    }
    return 0;
  }

  /**
   * Parse asset ranges to numeric values for waterfall rules
   */
  private parseAssets(response: string): number {
    const assetMap: Record<string, number> = {
      "$3M+": 3000000,
      "$1.5M–$3M": 2000000,
      "$750k–$1.5M": 1000000,
      "$250k–$750k": 500000,
      "Less than $250k": 100000,
    };
    return assetMap[response] || 0;
  }

  /**
   * Parse time to retirement to numeric years for waterfall rules
   */
  private parseTimeToRetirement(response: string): number {
    const timeMap: Record<string, number> = {
      "0–3 years": 1,
      "3–5 years": 4,
      "Already Retired": 0,
      "5–10 years": 7,
      "10–15 years": 12,
      "15+ years": 20,
    };
    return timeMap[response] || 20;
  }

  /**
   * Score quiz completely
   */
  score(quizResponse: QuizResponse): ScoringResult {
    const { email, firstName = "", lastName = "", phone = "", responses } = quizResponse;

    // Calculate tier
    const { tier, score: tierScore } = this.calculateTier(responses);

    // Calculate traits
    const traits = this.calculateTraits(responses);

    // Calculate quadrant & persona
    const { advisorValue, selfEfficacy, persona } = this.calculateQuadrant(responses);

    // Calculate lead score (sum of weighted factors)
    const leadScore = tierScore + (advisorValue > 0 ? advisorValue : 0) + (selfEfficacy > 0 ? selfEfficacy : 0);

    // Get demographics
    const ageRange = responses[31] || "Unknown";
    const timeToRetirement = responses[20] || "Unknown";
    const assetsSaved = responses[32] || "Unknown";
    const taxBuckets = responses[35] || "Unknown";

    // Generate Redtail tags
    const redtailTags = this.generateRedtailTags(tier, timeToRetirement, ageRange);

    // TODO: Pull copy from database
    // For now, placeholder copy
    const copy = {
      primaryTraits: `You have selected ${traits.incomeSource} and ${traits.incomeStructure} as your income preferences.`,
      secondaryTraits: `Your mindset aligns with ${traits.mindset}, and you prefer ${traits.liquidity} for your retirement assets.`,
      personaDescription: `As a ${persona}, your strengths lie in your ability to...`, // Populated from database
    };

    return {
      respondentName: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      tier,
      leadScore,
      traitResults: {
        incomeSource: traits.incomeSource as "Contractual" | "Market Driven",
        incomeStructure: traits.incomeStructure as "Committed" | "Adjustable",
        mindset: traits.mindset as "Income Mindset" | "Net Worth Mindset",
        liquidity: traits.liquidity as "Cash Liquidity" | "Investment Liquidity",
        spender: traits.spender as "Front Loaded" | "Back Loaded",
        payoutPattern: traits.payoutPattern as "Phased Income" | "Lifetime Income",
      },
      quadrant: {
        advisorValue,
        selfEfficacy,
      },
      persona,
      copy,
      redtailTags,
      demographics: {
        ageRange,
        timeToRetirement,
        assetsSaved,
        taxBuckets,
      },
    };
  }

  /**
   * Generate Redtail CRM tags for automation
   */
  private generateRedtailTags(
    tier: string,
    timeToRetirement: string,
    ageRange: string
  ): string[] {
    const tags = [];

    // Tier tag
    tags.push(`ALIGN: Tier ${tier}`);

    // Timeline tag
    const timelineMap: Record<string, string> = {
      "0–3 years": "Retiring 0-3 Yrs",
      "3–5 years": "Retiring 3-5 Yrs",
      "Already Retired": "Already Retired",
      "5–10 years": "Retiring 5-10 Yrs",
      "10–15 years": "Retiring 10-15 Yrs",
      "15+ years": "Retiring 15+ Yrs",
    };
    if (timelineMap[timeToRetirement]) {
      tags.push(`ALIGN: Time to Retirement ${timelineMap[timeToRetirement]}`);
    }

    // Age tag
    const ageMap: Record<string, string> = {
      "Under 50": "Under 50",
      "51–62": "51–62",
      "62–67": "62–67",
      "68–74": "68–74",
      "75+": "75+",
    };
    if (ageMap[ageRange]) {
      tags.push(`ALIGN: Age Range ${ageMap[ageRange]}`);
    }

    return tags;
  }
}

export default AlignScoringEngine;
