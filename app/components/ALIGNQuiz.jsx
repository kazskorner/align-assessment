'use client';

import React, { useState } from 'react';
import { QUESTIONS, US_STATES, TIER_CTA, PRIMARY_TRAIT_COPY, SECONDARY_TRAIT_COPY, PERSONA_COPY } from '../../lib/quiz-copy';

/* ─── Brand ─────────────────────────────────────────────────────────────────── */
const BRAND = '#1a3d5c';
const BRAND_LIGHT = '#e8f0f7';

/* ─── Helpers ────────────────────────────────────────────────────────────────── */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function getBlockLabel(id) {
  if (id <= 3)  return 'Getting Started';
  if (id <= 15) return 'Your Preferences';
  if (id <= 17) return 'Your Situation';
  if (id === 18) return 'Your Timeline';
  if (id <= 25) return 'Income Planning';
  if (id <= 28) return 'Your Approach';
  if (id <= 33) return 'Your Profile';
  return 'Final Step';
}

/**
 * Look up secondary trait copy using the 3-part composite key.
 * incomeSource  : "Contractual" | "Market Driven"
 * incomeStructure : "Committed" | "Adjustable"
 */
function getSecondaryTraitCopy(traitValue, incomeSource, incomeStructure) {
  if (!traitValue || !incomeSource || !incomeStructure) return null;
  const key = `${traitValue}|${incomeSource}|${incomeStructure}`;
  return SECONDARY_TRAIT_COPY[key] || null;
}

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#f0f4f8',
    fontFamily: "'Segoe UI', system-ui, Arial, sans-serif",
    padding: '40px 16px 80px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: '680px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 32px rgba(0,0,0,0.09)',
    padding: '44px 40px',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '2px',
    color: BRAND,
    textTransform: 'uppercase',
    marginBottom: '24px',
    display: 'block',
  },
  progressRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#94a3b8',
    fontSize: '20px',
    padding: '0 4px',
    lineHeight: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.15s',
  },
  progressWrap: { flex: 1 },
  progressBar: {
    backgroundColor: '#e2e8f0',
    height: '5px',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '5px',
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: '100%',
    backgroundColor: BRAND,
    transition: 'width 0.3s ease',
  }),
  progressLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    letterSpacing: '0.3px',
    textAlign: 'right',
  },
  blockLabel: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1.5px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  questionText: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '28px',
    lineHeight: '1.5',
  },
  optionBtn: (selected) => ({
    display: 'block',
    width: '100%',
    padding: '14px 18px',
    marginBottom: '10px',
    backgroundColor: selected ? BRAND : '#f8fafc',
    color: selected ? '#ffffff' : '#1e293b',
    border: `2px solid ${selected ? BRAND : '#e2e8f0'}`,
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '15px',
    fontWeight: selected ? '600' : '400',
    transition: 'all 0.13s ease',
    outline: 'none',
    lineHeight: '1.4',
  }),
  dropdown: {
    width: '100%',
    padding: '13px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    backgroundColor: '#fff',
    color: '#1e293b',
    cursor: 'pointer',
    marginBottom: '16px',
    outline: 'none',
    appearance: 'auto',
  },
  primaryBtn: (disabled) => ({
    width: '100%',
    padding: '15px',
    marginTop: '8px',
    backgroundColor: disabled ? '#cbd5e1' : BRAND,
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.3px',
    transition: 'background 0.15s ease',
  }),
  retakeBtn: {
    width: '100%',
    padding: '13px',
    marginTop: '20px',
    backgroundColor: 'transparent',
    color: BRAND,
    border: `2px solid ${BRAND}`,
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
  },
  fieldGroup: { marginBottom: '18px' },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '6px',
    letterSpacing: '0.3px',
  },
  input: (hasError) => ({
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: `2px solid ${hasError ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: '8px',
    boxSizing: 'border-box',
    outline: 'none',
    color: '#0f172a',
  }),
  errorText: { fontSize: '12px', color: '#ef4444', marginTop: '4px' },

  // Results
  divider: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '32px',
    marginTop: '32px',
  },
  sectionLabel: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '2px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  traitRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '8px',
  },
  chip: (variant) => {
    const colors = {
      primary: { bg: BRAND, color: '#fff' },
      secondary: { bg: BRAND_LIGHT, color: BRAND },
    };
    const c = colors[variant] || colors.secondary;
    return {
      display: 'inline-block',
      padding: '5px 14px',
      backgroundColor: c.bg,
      color: c.color,
      borderRadius: '100px',
      fontSize: '13px',
      fontWeight: '600',
      whiteSpace: 'nowrap',
    };
  },
  tierBadge: (tier) => ({
    display: 'inline-block',
    padding: '3px 14px',
    backgroundColor: tier === 'A' ? '#065f46' : tier === 'B' ? '#1e40af' : '#475569',
    color: '#fff',
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginLeft: '10px',
    verticalAlign: 'middle',
  }),
  traitCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    padding: '22px 24px',
    marginBottom: '14px',
    borderLeft: `3px solid ${BRAND}`,
  },
  traitCardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '4px',
  },
  traitCardSubtitle: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '14px',
    fontWeight: '500',
  },
  copyBlock: {
    fontSize: '14px',
    lineHeight: '1.8',
    color: '#334155',
    whiteSpace: 'pre-line',
  },
  ctaBox: {
    backgroundColor: BRAND_LIGHT,
    border: `1px solid ${BRAND}30`,
    borderRadius: '12px',
    padding: '26px',
    marginTop: '8px',
  },
  ctaSubLabel: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: '10px',
  },
  ctaDesc: {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.7',
    marginBottom: '0',
  },
  ctaBtn: {
    display: 'inline-block',
    marginTop: '18px',
    padding: '13px 28px',
    backgroundColor: BRAND,
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
  },
};

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function ALIGNQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses]             = useState({});
  const [selectedState, setSelectedState]     = useState('');

  const [showGate, setShowGate]           = useState(false);
  const [gateFirstName, setGateFirstName] = useState('');
  const [gateLastName, setGateLastName]   = useState('');
  const [gateEmail, setGateEmail]         = useState('');
  const [gateErrors, setGateErrors]       = useState({});

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  /* ── Navigate back ─────────────────────────────────────────────────────── */
  const handleBack = () => {
    if (showGate) {
      setShowGate(false);
      return;
    }
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /* ── Answer handler ──────────────────────────────────────────────────── */
  const handleAnswer = (answer) => {
    const newResponses = { ...responses, [QUESTIONS[currentQuestion].id]: answer };
    setResponses(newResponses);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowGate(true);
    }
  };

  /* ── Dropdown handlers ───────────────────────────────────────────────── */
  const handleDropdownChange  = (e) => setSelectedState(e.target.value);
  const handleDropdownConfirm = () => {
    if (!selectedState) return;
    const newResponses = { ...responses, [QUESTIONS[currentQuestion].id]: selectedState };
    setResponses(newResponses);
    if (currentQuestion >= QUESTIONS.length - 1) setShowGate(true);
    else setCurrentQuestion(currentQuestion + 1);
  };

  /* ── Gate submit ──────────────────────────────────────────────────────── */
  const handleGateSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!gateFirstName.trim()) errors.firstName = 'First name is required.';
    if (!gateLastName.trim())  errors.lastName  = 'Last name is required.';
    if (!isValidEmail(gateEmail)) errors.email  = 'A valid email is required.';
    if (Object.keys(errors).length > 0) { setGateErrors(errors); return; }
    setGateErrors({});
    setLoading(true);
    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: gateEmail.trim(), firstName: gateFirstName.trim(), lastName: gateLastName.trim(), responses }),
      });
      const data = await response.json();
      setResults(data);
      setShowGate(false);
    } catch {
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  /* ── Reset ────────────────────────────────────────────────────────────── */
  const resetQuiz = () => {
    setCurrentQuestion(0); setResponses({}); setSelectedState('');
    setShowGate(false); setGateFirstName(''); setGateLastName('');
    setGateEmail(''); setGateErrors({}); setResults(null); setLoading(false);
  };

  /* ════════════════════════════════════════════════════════════════════════
     RESULTS
  ════════════════════════════════════════════════════════════════════════ */
  if (results) {
    const cta = TIER_CTA[results.tier] || TIER_CTA.C;
    const tr  = results.traitResults || {};

    const incomeSource    = tr.incomeSource    || '';
    const incomeStructure = tr.incomeStructure || '';
    const incSourceCopy    = PRIMARY_TRAIT_COPY[incomeSource]    || '';
    const incStructCopy    = PRIMARY_TRAIT_COPY[incomeStructure] || '';

    // 4 secondary traits
    const secondaryTraits = [
      { label: 'Mindset',        category: 'Secondary Trait', value: tr.mindset,        icon: '🧠' },
      { label: 'Liquidity',      category: 'Secondary Trait', value: tr.liquidity,      icon: '💧' },
      { label: 'Spender',        category: 'Secondary Trait', value: tr.spender,        icon: '📅' },
      { label: 'Payout Pattern', category: 'Secondary Trait', value: tr.payoutPattern,  icon: '📊' },
    ];

    const personaCopy = PERSONA_COPY[results.persona] || PERSONA_COPY['Pragmatic Realist'];

    return (
      <div style={S.page}>
        <div style={S.card}>
          <span style={S.logo}>ALIGN Assessment</span>

          {/* ── Header ── */}
          <h1 style={{ fontSize: '27px', fontWeight: '700', color: '#0f172a', marginBottom: '6px', lineHeight: 1.3 }}>
            Your Retirement Profile
            <span style={S.tierBadge(results.tier)}>Tier {results.tier}</span>
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: '1.65' }}>
            {gateFirstName}, here is your personalized ALIGN analysis.
          </p>

          {/* ── Profile summary chips ── */}
          <div style={S.sectionLabel}>Your Profile at a Glance</div>
          <div style={S.traitRow}>
            {[incomeSource, incomeStructure, tr.mindset, tr.liquidity, tr.spender, tr.payoutPattern].filter(Boolean).map((t) => (
              <span key={t} style={S.chip('secondary')}>{t}</span>
            ))}
          </div>

          {/* ══ PRIMARY TRAIT 1: Income Source ══ */}
          <div style={S.divider}>
            <div style={S.sectionLabel}>Primary Trait — Income Source</div>
            <div style={S.traitCard}>
              <div style={S.traitCardTitle}>{incomeSource}</div>
              <div style={S.traitCardSubtitle}>How you prefer your retirement income to be generated</div>
              <p style={S.copyBlock}>{incSourceCopy}</p>
            </div>
          </div>

          {/* ══ PRIMARY TRAIT 2: Income Structure ══ */}
          <div style={S.divider}>
            <div style={S.sectionLabel}>Primary Trait — Income Structure</div>
            <div style={S.traitCard}>
              <div style={S.traitCardTitle}>{incomeStructure}</div>
              <div style={S.traitCardSubtitle}>How you prefer your retirement plan to be organized</div>
              <p style={S.copyBlock}>{incStructCopy}</p>
            </div>
          </div>

          {/* ══ SECONDARY TRAITS ══ */}
          <div style={S.divider}>
            <div style={S.sectionLabel}>Secondary Traits</div>
            {secondaryTraits.map(({ label, value, icon }) => {
              if (!value) return null;
              const copy = getSecondaryTraitCopy(value, incomeSource, incomeStructure);
              return (
                <div key={label} style={S.traitCard}>
                  <div style={S.traitCardTitle}>{icon} {label} — {value}</div>
                  <div style={S.traitCardSubtitle}>{incomeSource} + {incomeStructure}</div>
                  {copy ? (
                    <p style={S.copyBlock}>{copy}</p>
                  ) : (
                    <p style={{ ...S.copyBlock, color: '#94a3b8', fontStyle: 'italic' }}>Result: {value}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* ══ IMPLEMENTATION PERSONA ══ */}
          <div style={S.divider}>
            <div style={S.sectionLabel}>Implementation Persona</div>
            <div style={S.traitCard}>
              <div style={S.traitCardTitle}>{results.persona}</div>
              <div style={S.traitCardSubtitle}>{personaCopy.quadrant}</div>
              <p style={S.copyBlock}>{personaCopy.description}</p>
            </div>
          </div>

          {/* ══ CTA ══ */}
          <div style={S.divider}>
            <div style={S.sectionLabel}>Recommended Next Step</div>
            <div style={S.ctaBox}>
              <p style={S.ctaSubLabel}>{cta.sublabel(gateFirstName)}</p>
              <p style={S.ctaDesc}>{cta.description}</p>
              {cta.url && (
                <a href={cta.url} target="_blank" rel="noopener noreferrer" style={S.ctaBtn}>
                  Book Your {cta.label} →
                </a>
              )}
            </div>
          </div>

          <button onClick={resetQuiz} style={S.retakeBtn}>Retake Quiz</button>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     LEAD GATE
  ════════════════════════════════════════════════════════════════════════ */
  if (showGate) {
    return (
      <div style={S.page}>
        <div style={S.card}>
          <span style={S.logo}>ALIGN Assessment</span>

          {/* Progress row with back button */}
          <div style={S.progressRow}>
            <button onClick={handleBack} style={S.backBtn} aria-label="Go back">←</button>
            <div style={S.progressWrap}>
              <div style={S.progressBar}><div style={S.progressFill(100)} /></div>
              <p style={S.progressLabel}>All {QUESTIONS.length} questions complete</p>
            </div>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
            Your profile is ready.
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: '1.65' }}>
            Enter your details to unlock your personalized ALIGN retirement profile — including your income tier, implementation persona, and recommended next steps.
          </p>

          <form onSubmit={handleGateSubmit} noValidate>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ ...S.fieldGroup, flex: 1 }}>
                <label htmlFor="gateFirstName" style={S.label}>First Name</label>
                <input id="gateFirstName" type="text" value={gateFirstName} onChange={(e) => setGateFirstName(e.target.value)} placeholder="Jane" style={S.input(!!gateErrors.firstName)} autoComplete="given-name" />
                {gateErrors.firstName && <p style={S.errorText}>{gateErrors.firstName}</p>}
              </div>
              <div style={{ ...S.fieldGroup, flex: 1 }}>
                <label htmlFor="gateLastName" style={S.label}>Last Name</label>
                <input id="gateLastName" type="text" value={gateLastName} onChange={(e) => setGateLastName(e.target.value)} placeholder="Smith" style={S.input(!!gateErrors.lastName)} autoComplete="family-name" />
                {gateErrors.lastName && <p style={S.errorText}>{gateErrors.lastName}</p>}
              </div>
            </div>
            <div style={S.fieldGroup}>
              <label htmlFor="gateEmail" style={S.label}>Email Address</label>
              <input id="gateEmail" type="email" value={gateEmail} onChange={(e) => setGateEmail(e.target.value)} placeholder="jane@example.com" style={S.input(!!gateErrors.email)} autoComplete="email" />
              {gateErrors.email && <p style={S.errorText}>{gateErrors.email}</p>}
            </div>
            <button type="submit" disabled={loading} style={S.primaryBtn(loading)}>
              {loading ? 'Calculating your profile…' : 'Unlock My Results →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '14px' }}>
              Your information is private and will never be sold.
            </p>
          </form>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════════════════════════════
     QUIZ QUESTIONS
  ════════════════════════════════════════════════════════════════════════ */
  const question = QUESTIONS[currentQuestion];
  const progress  = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const canGoBack = currentQuestion > 0;

  return (
    <div style={S.page}>
      <div style={S.card}>
        <span style={S.logo}>ALIGN Assessment</span>

        {/* Progress row with back button */}
        <div style={S.progressRow}>
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            style={{ ...S.backBtn, opacity: canGoBack ? 1 : 0.25, cursor: canGoBack ? 'pointer' : 'default' }}
            aria-label="Go back to previous question"
          >
            ←
          </button>
          <div style={S.progressWrap}>
            <div style={S.progressBar}><div style={S.progressFill(progress)} /></div>
            <p style={S.progressLabel}>{currentQuestion + 1} / {QUESTIONS.length}</p>
          </div>
        </div>

        <p style={S.blockLabel}>{getBlockLabel(question.id)}</p>
        <p style={S.questionText}>{question.text}</p>

        {question.isDropdown ? (
          <div>
            <select value={selectedState} onChange={handleDropdownChange} style={S.dropdown} aria-label="Select your state">
              <option value="">— Select your state —</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <button onClick={handleDropdownConfirm} disabled={!selectedState} style={S.primaryBtn(!selectedState)}>
              Continue →
            </button>
          </div>
        ) : (
          <div>
            {question.options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)} style={S.optionBtn(responses[question.id] === option)}>
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
