'use client';

/**
 * ALIGN Quiz Component
 * Flow: 36 questions → Lead Gate (name + email) → API score → Navigate to /results/tier-a|b|c
 * The quiz routes users to their tier results page, passing all data as a URL param.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ─── All 50 US States ─────────────────────────────────────────────────────── */
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

/* ─── Questions ─────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  { id: 1,  text: "I'd spend LESS early, then increase later",         options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 2,  text: "I prioritize income over net worth growth",          options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 3,  text: "I'd spend MORE early, then decrease later",         options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 4,  text: "My income is contractual/guaranteed",               options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 5,  text: "My income is market-driven/variable",               options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 6,  text: "I have high income stability",                      options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 7,  text: "My income fluctuates significantly",                options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 8,  text: "I prefer committed/predictable income",             options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 9,  text: "I want flexibility to adjust income",               options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 10, text: "I need income I can count on",                      options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 11, text: "I like adjusting income based on needs",            options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 12, text: "Net worth growth is my priority",                   options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 13, text: "Income generation is my priority",                  options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 14, text: "I keep cash accessible",                            options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 15, text: "I invest most assets for growth",                   options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 16, text: "Emergency fund is important to me",                 options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 17, text: "My biggest concern is...",                          options: ["Tax burden", "Market volatility", "Inflation", "Legacy planning"] },
  { id: 18, text: "I'm looking to...",                                  options: ["Build a new relationship", "Update existing strategy", "Just exploring", "Other"] },
  { id: 19, text: "When will you retire?",                             options: ["Already Retired", "0–3 years", "3–5 years", "5–10 years", "10–15 years", "15+ years"] },
  { id: 20, text: "Comfort with current plan?",                        options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
  { id: 21, text: "Prefer lifetime income stream",                     options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 22, text: "Want phased withdrawal approach",                   options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 23, text: "Prefer lump sum over time",                         options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 24, text: "Investment knowledge?",                             options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
  { id: 25, text: "Advisor adds significant value",                    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 26, text: "I benefit from professional guidance",              options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 27, text: "I can manage investments alone",                    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 28, text: "I'm confident in my decisions",                     options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 29, text: "I trust my financial judgment",                     options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 30, text: "I need expert support",                             options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
  { id: 31, text: "What's your age range?",                            options: ["Under 50", "51–62", "62–67", "68–74", "75+"] },
  { id: 32, text: "How much have you saved?",                          options: ["Less than $250k", "$250k–$750k", "$750k–$1.5M", "$1.5M–$3M", "$3M+"] },
  { id: 33, text: "Income/net worth qualifier?",                       options: ["Under $1M NW", "$1M–$2.2M NW", "$2.2M+ NW", "$200k+ HH income", "$300k+ HH income", "$5M+ investments"] },
  { id: 34, text: "Annual spending pattern?",                          options: ["About the same each year", "More early, less later", "Less early, more later", "Highly variable"] },
  { id: 35, text: "How many retirement buckets do you have?",          options: ["Only 1 bucket checked", "Not sure", "2 buckets", "3+ buckets"] },
  { id: 36, text: "What state do you live in?",                        options: US_STATES, isDropdown: true },
];

/* ─── Brand color ───────────────────────────────────────────────────────────── */
const BRAND = '#1a3d5c';

/* ─── Styles ────────────────────────────────────────────────────────────────── */
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    fontFamily: "'Segoe UI', Arial, sans-serif",
    padding: '40px 16px 60px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '620px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    padding: '36px 32px',
    boxSizing: 'border-box',
  },
  progressBar: {
    backgroundColor: '#e0e0e0',
    height: '8px',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: '100%',
    backgroundColor: BRAND,
    transition: 'width 0.3s ease',
  }),
  progressLabel: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#666',
    marginBottom: '28px',
  },
  questionText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111',
    marginBottom: '24px',
    lineHeight: '1.4',
  },
  optionBtn: (selected) => ({
    display: 'block',
    width: '100%',
    padding: '13px 16px',
    marginBottom: '10px',
    backgroundColor: selected ? BRAND : '#f0f4f8',
    color: selected ? '#ffffff' : '#222',
    border: `2px solid ${selected ? BRAND : 'transparent'}`,
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '15px',
    fontWeight: selected ? '600' : '400',
    transition: 'all 0.18s ease',
    outline: 'none',
  }),
  dropdown: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#222',
    cursor: 'pointer',
    marginBottom: '16px',
    outline: 'none',
  },
  primaryBtn: (disabled) => ({
    width: '100%',
    padding: '14px',
    marginTop: '8px',
    backgroundColor: disabled ? '#aaa' : BRAND,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  }),
  submitBtn: (disabled) => ({
    width: '100%',
    padding: '14px',
    marginTop: '8px',
    backgroundColor: disabled ? '#aaa' : '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  }),
  fieldGroup: { marginBottom: '18px' },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '6px',
  },
  input: (hasError) => ({
    width: '100%',
    padding: '11px 14px',
    fontSize: '15px',
    border: `2px solid ${hasError ? '#dc3545' : '#ccc'}`,
    borderRadius: '8px',
    boxSizing: 'border-box',
    outline: 'none',
    color: '#111',
  }),
  errorText: { fontSize: '13px', color: '#dc3545', marginTop: '4px' },
};

/* ─── Email validator ───────────────────────────────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function ALIGNQuiz() {
  const router = useRouter();

  // Quiz navigation state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses]             = useState({});
  const [selectedState, setSelectedState]     = useState('');

  // Lead gate state (shown after Q36, before API call)
  const [showGate, setShowGate]         = useState(false);
  const [gateFirstName, setGateFirstName] = useState('');
  const [gateLastName, setGateLastName]   = useState('');
  const [gateEmail, setGateEmail]         = useState('');
  const [gateErrors, setGateErrors]       = useState({});

  // Submission state
  const [loading, setLoading] = useState(false);

  /* ── Answer a question ────────────────────────────────────────────────── */
  const handleAnswer = (answer) => {
    const updated = { ...responses, [QUESTIONS[currentQuestion].id]: answer };
    setResponses(updated);

    if (currentQuestion < QUESTIONS.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedState('');
    } else {
      // All questions done — show the lead gate
      setShowGate(true);
    }
  };

  /* ── Dropdown (Q36 — state) ───────────────────────────────────────────── */
  const handleDropdownChange  = (e) => setSelectedState(e.target.value);
  const handleDropdownConfirm = () => { if (selectedState) handleAnswer(selectedState); };

  /* ── Gate validation ──────────────────────────────────────────────────── */
  const validateGate = () => {
    const errors = {};
    if (!gateFirstName.trim()) errors.firstName = 'First name is required.';
    if (!gateLastName.trim())  errors.lastName  = 'Last name is required.';
    if (!gateEmail.trim())     errors.email     = 'Email is required.';
    else if (!isValidEmail(gateEmail)) errors.email = 'Please enter a valid email address.';
    return errors;
  };

  const handleGateSubmit = async (e) => {
    e.preventDefault();
    const errors = validateGate();
    if (Object.keys(errors).length > 0) { setGateErrors(errors); return; }
    setGateErrors({});
    await submitQuiz(gateFirstName.trim(), gateLastName.trim(), gateEmail.trim());
  };

  /* ── API call → navigate to tier results page ─────────────────────────── */
  const submitQuiz = async (firstName, lastName, email) => {
    setLoading(true);
    try {
      const response = await fetch('/api/score', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, firstName, lastName, responses }),
      });
      const data = await response.json();

      // Encode all results data into URL so the tier page can display it
      const encoded = encodeURIComponent(JSON.stringify(data));
      const tier    = (data.tier || 'C').toUpperCase();

      // Navigate to the appropriate tier results page
      router.push(`/results/tier-${tier.toLowerCase()}?data=${encoded}`);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  /* ════════════════════════════════════════════════════════════════════════
     RENDER: Loading / submitting
  ════════════════════════════════════════════════════════════════════════ */
  if (loading) {
    return (
      <div style={{ ...styles.page, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '42px', marginBottom: '16px' }}>⏳</div>
          <h2 style={{ color: BRAND }}>Calculating your results…</h2>
          <p style={{ color: '#666' }}>This only takes a moment.</p>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     RENDER: Lead gate (after Q36, before API call)
  ════════════════════════════════════════════════════════════════════════ */
  if (showGate) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          {/* Progress bar at 100% */}
          <div style={styles.progressBar}>
            <div style={styles.progressFill(100)} />
          </div>
          <p style={styles.progressLabel}>Quiz complete!</p>

          <h1 style={{ fontSize: '22px', marginBottom: '10px', color: '#111' }}>
            Almost there — your personalized results are ready.
          </h1>
          <p style={{ fontSize: '15px', color: '#555', marginBottom: '28px', lineHeight: '1.5' }}>
            Enter your details below to unlock your ALIGN profile, including your retirement
            tier, income persona, and recommended next steps.
          </p>

          <form onSubmit={handleGateSubmit} noValidate>
            {/* First name */}
            <div style={styles.fieldGroup}>
              <label htmlFor="gateFirst" style={styles.label}>First Name</label>
              <input
                id="gateFirst"
                type="text"
                value={gateFirstName}
                onChange={(e) => setGateFirstName(e.target.value)}
                placeholder="e.g. Jane"
                style={styles.input(!!gateErrors.firstName)}
                autoComplete="given-name"
              />
              {gateErrors.firstName && <p style={styles.errorText}>{gateErrors.firstName}</p>}
            </div>

            {/* Last name */}
            <div style={styles.fieldGroup}>
              <label htmlFor="gateLast" style={styles.label}>Last Name</label>
              <input
                id="gateLast"
                type="text"
                value={gateLastName}
                onChange={(e) => setGateLastName(e.target.value)}
                placeholder="e.g. Smith"
                style={styles.input(!!gateErrors.lastName)}
                autoComplete="family-name"
              />
              {gateErrors.lastName && <p style={styles.errorText}>{gateErrors.lastName}</p>}
            </div>

            {/* Email */}
            <div style={styles.fieldGroup}>
              <label htmlFor="gateEmail" style={styles.label}>Email Address</label>
              <input
                id="gateEmail"
                type="email"
                value={gateEmail}
                onChange={(e) => setGateEmail(e.target.value)}
                placeholder="e.g. jane@email.com"
                style={styles.input(!!gateErrors.email)}
                autoComplete="email"
              />
              {gateErrors.email && <p style={styles.errorText}>{gateErrors.email}</p>}
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn(loading)}>
              {loading ? 'Calculating your results…' : 'Show My Results →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '12px' }}>
              Your information is private and will never be sold.
            </p>
          </form>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     RENDER: Quiz questions
  ════════════════════════════════════════════════════════════════════════ */
  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Progress bar */}
        <div style={styles.progressBar}>
          <div style={styles.progressFill(progress)} />
        </div>
        <p style={styles.progressLabel}>
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </p>

        {/* Question text */}
        <p style={styles.questionText}>{question.text}</p>

        {/* Q36: state dropdown */}
        {question.isDropdown ? (
          <div>
            <select
              value={selectedState}
              onChange={handleDropdownChange}
              style={styles.dropdown}
              aria-label="Select your state"
            >
              <option value="">— Select your state —</option>
              {US_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              onClick={handleDropdownConfirm}
              disabled={!selectedState}
              style={styles.primaryBtn(!selectedState)}
            >
              Next →
            </button>
          </div>
        ) : (
          /* Button list for all other questions */
          <div>
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                style={styles.optionBtn(responses[question.id] === option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
