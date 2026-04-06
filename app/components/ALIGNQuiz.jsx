'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// ── US States (2-letter abbreviations to match scoring engine) ────────────
const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

// Standard answer option sets
const SA_A_N_D_SD = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];
const QUADRANT_7 = ['Strongly Agree', 'Agree', 'Somewhat Agree', 'Neutral', 'Somewhat Disagree', 'Disagree', 'Strongly Disagree'];

// ── Questions — text and options match scoring-data.ts exactly ────────────
const QUESTIONS = [
  // Block 1: Hook (Q1–3)
  { id: 1,  text: "Enjoying life when I can matters more to me than preserving spending later.", options: SA_A_N_D_SD },
  { id: 2,  text: "A steady, reliable income matters more to me than maximizing my net worth.", options: SA_A_N_D_SD },
  { id: 3,  text: "I'd rather spend more in the early years of retirement while I'm more active.", options: SA_A_N_D_SD },

  // Block 2: Income Source (Q4–7)
  { id: 4,  text: "Pension income or annuity payments are more valuable to me than a larger lump sum I have to manage myself.", options: SA_A_N_D_SD },
  { id: 5,  text: "I want my retirement income to come from investments I control, not a fixed payment from an insurance company.", options: SA_A_N_D_SD },
  { id: 6,  text: "I prefer knowing my retirement income won't change, even if it means lower overall returns.", options: SA_A_N_D_SD },
  { id: 7,  text: "The 4% rule (withdrawing 4% annually from my portfolio) is an acceptable way to fund my retirement.", options: SA_A_N_D_SD },

  // Block 3: Income Structure (Q8–11)
  { id: 8,  text: "I want my retirement plan to be flexible so I can adjust my income based on what's happening in the market.", options: SA_A_N_D_SD },
  { id: 9,  text: "Once I set my retirement income level, I want it to stay locked in and not change.", options: SA_A_N_D_SD },
  { id: 10, text: "I prefer a retirement plan that I can modify as my life circumstances change.", options: SA_A_N_D_SD },
  { id: 11, text: "Once my retirement income is set up, I want minimal changes to the structure.", options: SA_A_N_D_SD },

  // Block 4: Secondary Traits (Q12–16)
  { id: 12, text: "Protecting my purchasing power over time is more important than generating the highest possible returns.", options: SA_A_N_D_SD },
  { id: 13, text: "I want my retirement portfolio to be larger when I die than when I started.", options: SA_A_N_D_SD },
  { id: 14, text: "I want to keep my retirement assets invested rather than in cash.", options: SA_A_N_D_SD },
  { id: 15, text: "I sleep better knowing I have a dedicated cash reserve separate from my investments.", options: SA_A_N_D_SD },
  { id: 16, text: "I'm comfortable accessing my retirement income by selling investments as needed.", options: SA_A_N_D_SD },

  // Block 5: Intent Signals (Q17–19)
  { id: 17, text: "What is your biggest concern about retirement?",
    options: ['Running out of money', 'Tax burden', 'Healthcare costs', 'Legacy planning', 'Market volatility', 'Inflation', 'Just exploring'] },
  { id: 18, text: "Are you looking for a financial advisor to help with your retirement strategy?",
    options: ['Build a new relationship', 'Update an existing plan', 'Just exploring', 'Other'] },
  { id: 19, text: "When do you plan to retire?",
    options: ['Already Retired', '0–3 years', '3–5 years', '5–10 years', '10–15 years', '15+ years'] },

  // Block 6: Implementation (Q20–24)
  { id: 20, text: "How much does your spouse/partner influence your financial decisions?",
    options: ['Heavily — we decide together', 'Moderately — they have input', 'Minimally — I lead the decisions', "I don't have a spouse/partner"] },
  { id: 21, text: "I'm comfortable adjusting my spending in retirement based on market performance.", options: SA_A_N_D_SD },
  { id: 22, text: "I want a retirement income strategy where my spending can change based on my life stage.", options: SA_A_N_D_SD },
  { id: 23, text: "I want my retirement income to be consistent and predictable throughout my life.", options: SA_A_N_D_SD },
  { id: 24, text: "How comfortable are you accessing your retirement assets in case of emergency?",
    options: ['Very comfortable', 'Somewhat comfortable', 'Neutral', 'Somewhat uncomfortable', 'Very uncomfortable'] },

  // Block 7: Quadrant — Advisor Value + Self Efficacy (Q25–30)
  { id: 25, text: "I value having a professional advisor who can explain their thinking and involve me in decisions.", options: QUADRANT_7 },
  { id: 26, text: "I'd rather delegate the complex parts of retirement planning to someone I trust.", options: QUADRANT_7 },
  { id: 27, text: "I prefer to make retirement decisions myself rather than rely on an advisor.", options: QUADRANT_7 },
  { id: 28, text: "I'm confident making financial decisions on my own.", options: QUADRANT_7 },
  { id: 29, text: "I understand the tax implications of different retirement strategies.", options: QUADRANT_7 },
  { id: 30, text: "I feel uncertain about whether my current retirement plan will actually work.", options: QUADRANT_7 },

  // Block 8: Financial Profile (Q31–36)
  { id: 31, text: "What is your age range?",
    options: ['Under 50', '51–62', '62–67', '68–74', '75+'] },
  { id: 32, text: "About how much do you currently have saved and invested for retirement (excluding your home)?",
    options: ['$3M+', '$1.5M–$3M', '$750k–$1.5M', '$250k–$750k', 'Less than $250k'] },
  { id: 33, text: "Which of the following best describes your financial situation? (Select the highest that applies)",
    options: ['$5M+ investments', '$2.2M+ NW', '$1M–$2.2M NW', '$200k+ HH income', '$300k+ HH income', 'Under $1M NW'] },
  { id: 34, text: "How would you describe your spending in the first 10 years of retirement?",
    options: ["I'd spend MORE early, then reduce later", 'Somewhat more early', 'About the same each year', 'Somewhat less early', "I'd spend LESS early, then increase later"] },
  { id: 35, text: "Which tax buckets hold your retirement assets? (Select the option that best fits)",
    options: ['Only 1 bucket checked', 'Not sure', '2 buckets checked', '3+ buckets checked'] },
  { id: 36, text: "What state do you currently reside in?", options: US_STATES, type: 'dropdown' },
];

// ── Styles ────────────────────────────────────────────────────────────────
const BLUE = '#1a3d5c';
const BTN_BASE = {
  display: 'block', width: '100%', padding: '13px 16px', marginBottom: '10px',
  border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer',
  textAlign: 'left', fontSize: '15px', transition: 'all 0.2s ease',
  backgroundColor: '#f4f6f9', color: '#222',
};

// ── Component ─────────────────────────────────────────────────────────────
export default function ALIGNQuiz() {
  const router = useRouter();

  // phase: 'landing' | 'quiz' | 'gate' | 'submitting'
  const [phase, setPhase] = useState('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedState, setSelectedState] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');

  const question = QUESTIONS[currentQ];
  const progress  = ((currentQ + 1) / QUESTIONS.length) * 100;
  const isLast    = currentQ === QUESTIONS.length - 1;

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleAnswer = (answer) => {
    const updated = { ...responses, [question.id]: answer };
    setResponses(updated);
    if (isLast) { setPhase('gate'); }
    else { setCurrentQ(currentQ + 1); }
  };

  const handleDropdownContinue = () => {
    if (!selectedState) return;
    const updated = { ...responses, [question.id]: selectedState };
    setResponses(updated);
    setPhase('gate');
  };

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    setPhase('submitting');
    try {
      const res = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, responses }),
      });
      const data = await res.json();

      const tier = data.tier?.toUpperCase();
      const encoded = encodeURIComponent(JSON.stringify(data));
      if (tier === 'A') router.push(`/results/tier-a?data=${encoded}`);
      else if (tier === 'B') router.push(`/results/tier-b?data=${encoded}`);
      else router.push(`/results/tier-c?data=${encoded}`);

    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
      setPhase('gate');
    }
  };

  // ── LANDING ───────────────────────────────────────────────────────────
  if (phase === 'landing') {
    return (
      <div style={{ maxWidth: '620px', margin: '80px auto', padding: '30px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: BLUE, fontSize: '32px', lineHeight: '1.3', marginBottom: '16px' }}>
          What's Your Retirement Wealth Blueprint?
        </h1>
        <p style={{ fontSize: '18px', color: '#555', marginBottom: '12px' }}>
          Answer 36 questions. Get your personalized ALIGN score.
        </p>
        <p style={{ fontSize: '15px', color: '#888', marginBottom: '40px' }}>
          Takes about 7 minutes. No financial disclosures required.
        </p>
        <button
          onClick={() => setPhase('quiz')}
          style={{
            width: '100%', maxWidth: '400px', padding: '18px',
            backgroundColor: BLUE, color: 'white',
            border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '18px', fontWeight: 'bold',
          }}
        >
          Start Your Assessment →
        </button>
      </div>
    );
  }

  // ── GATE (after all 36 questions) ─────────────────────────────────────
  if (phase === 'gate') {
    return (
      <div style={{ maxWidth: '540px', margin: '60px auto', padding: '24px', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '52px', marginBottom: '12px' }}>✅</div>
          <h1 style={{ color: BLUE, fontSize: '26px', marginBottom: '8px' }}>You're almost there!</h1>
          <p style={{ color: '#555', fontSize: '16px' }}>
            Enter your details below to unlock your personalized retirement profile.
          </p>
        </div>

        <form onSubmit={handleGateSubmit}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333', fontSize: '14px' }}>First Name</label>
              <input
                type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                required placeholder="Jane"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333', fontSize: '14px' }}>Last Name</label>
              <input
                type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                required placeholder="Smith"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', color: '#333', fontSize: '14px' }}>Email Address</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              required placeholder="jane@example.com"
              style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '14px',
              backgroundColor: BLUE, color: 'white',
              border: 'none', borderRadius: '6px',
              cursor: 'pointer', fontSize: '17px', fontWeight: 'bold',
            }}
          >
            See My Results →
          </button>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '12px' }}>
            Your information is private and will never be sold.
          </p>
        </form>
      </div>
    );
  }

  // ── SUBMITTING ────────────────────────────────────────────────────────
  if (phase === 'submitting') {
    return (
      <div style={{ maxWidth: '540px', margin: '120px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '42px', marginBottom: '16px' }}>⏳</div>
        <h2 style={{ color: BLUE }}>Calculating your results...</h2>
        <p style={{ color: '#666' }}>This only takes a moment.</p>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '640px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>

      {/* Progress bar */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ backgroundColor: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: BLUE, transition: 'width 0.3s ease' }} />
        </div>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#777', marginTop: '8px' }}>
          Question {currentQ + 1} of {QUESTIONS.length}
        </p>
      </div>

      {/* Question text */}
      <h2 style={{ fontSize: '20px', lineHeight: '1.55', color: BLUE, marginBottom: '24px' }}>
        {question.text}
      </h2>

      {/* Dropdown — Q36 state */}
      {question.type === 'dropdown' ? (
        <div>
          <select
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            style={{
              width: '100%', padding: '13px', fontSize: '16px',
              border: '1px solid #ccc', borderRadius: '6px',
              backgroundColor: '#fff', color: selectedState ? '#000' : '#888',
              marginBottom: '16px', cursor: 'pointer', boxSizing: 'border-box',
            }}
          >
            <option value="" disabled>Select your state...</option>
            {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleDropdownContinue}
            disabled={!selectedState}
            style={{
              width: '100%', padding: '14px',
              backgroundColor: selectedState ? BLUE : '#ccc',
              color: 'white', border: 'none', borderRadius: '6px',
              cursor: selectedState ? 'pointer' : 'not-allowed',
              fontSize: '16px', fontWeight: 'bold',
            }}
          >
            Continue →
          </button>
        </div>
      ) : (
        /* Button options — all other questions */
        <div>
          {question.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              style={{
                ...BTN_BASE,
                backgroundColor: responses[question.id] === opt ? BLUE : '#f4f6f9',
                color: responses[question.id] === opt ? 'white' : '#222',
                borderColor: responses[question.id] === opt ? BLUE : '#ddd',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

