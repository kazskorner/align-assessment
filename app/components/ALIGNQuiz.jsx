'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, US_STATES } from '../../lib/quiz-copy';
import NeuralBackground from './NeuralBackground';

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

/* ─── Styles ─────────────────────────────────────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c0c0e',
    fontFamily: "'Inter', system-ui, Arial, sans-serif",
    padding: '40px 16px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    maxWidth: '580px',
    backgroundColor: '#1c1c1e',
    borderRadius: '24px',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
    padding: '48px 40px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  logo: {
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '3px',
    color: '#00f0ff',
    textTransform: 'uppercase',
    marginBottom: '32px',
    display: 'block',
    textAlign: 'center',
    opacity: 0.8,
  },
  progressRow: {
    marginBottom: '40px',
  },
  progressWrap: { flex: 1 },
  progressBar: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    height: '4px',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: '100%',
    backgroundColor: '#00f0ff',
    boxShadow: '0 0 12px rgba(0,240,255,0.4)',
    transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  }),
  progressLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.05em',
    textAlign: 'right',
    fontFamily: 'var(--font-sans)',
  },
  blockLabel: {
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: '#00f0ff',
    textTransform: 'uppercase',
    marginBottom: '12px',
    opacity: 0.8,
  },
  questionText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '36px',
    lineHeight: '1.3',
    letterSpacing: '-0.02em',
  },
  optionBtn: (selected) => ({
    display: 'block',
    width: '100%',
    padding: '18px 24px',
    marginBottom: '12px',
    backgroundColor: selected ? 'rgba(0,240,255,0.08)' : 'rgba(255,255,255,0.03)',
    color: selected ? '#00f0ff' : 'rgba(255,255,255,0.85)',
    border: `1px solid ${selected ? '#00f0ff' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: selected ? '600' : '400',
    transition: 'all 0.2s ease',
    outline: 'none',
    lineHeight: '1.4',
  }),
  dropdown: {
    width: '100%',
    padding: '16px 20px',
    fontSize: '16px',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    color: '#ffffff',
    cursor: 'pointer',
    marginBottom: '20px',
    outline: 'none',
    appearance: 'auto',
  },
  primaryBtn: (disabled) => ({
    width: '100%',
    padding: '18px',
    marginTop: '12px',
    backgroundColor: disabled ? 'rgba(255,255,255,0.1)' : '#ffffff',
    color: disabled ? 'rgba(255,255,255,0.3)' : '#111113',
    border: 'none',
    borderRadius: '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    letterSpacing: '0.02em',
    transition: 'all 0.2s ease',
  }),
  backBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.4)',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    padding: '12px 16px',
    marginTop: '32px',
    width: '100%',
    textAlign: 'center',
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '24px',
  },
  fieldGroup: { marginBottom: '20px' },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '8px',
  },
  input: (hasError) => ({
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: `1px solid ${hasError ? '#ff4d4d' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '12px',
    boxSizing: 'border-box',
    outline: 'none',
    color: '#ffffff',
    transition: 'border-color 0.2s',
  }),
  errorText: { fontSize: '12px', color: '#ff4d4d', marginTop: '6px' },
};

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function ALIGNQuiz() {
  const router = useRouter();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses]             = useState({});
  const [selectedState, setSelectedState]     = useState('');

  const [showGate, setShowGate]           = useState(false);
  const [gateFirstName, setGateFirstName] = useState('');
  const [gateLastName, setGateLastName]   = useState('');
  const [gateEmail, setGateEmail]         = useState('');
  const [gateErrors, setGateErrors]       = useState({});

  const [loading, setLoading] = useState(false);

  /* ── Navigate back ─────────────────────────────────────────────────────── */
  const handleBack = () => {
    if (showGate) { setShowGate(false); return; }
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
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
        body: JSON.stringify({
          email: gateEmail.trim(),
          firstName: gateFirstName.trim(),
          lastName: gateLastName.trim(),
          responses,
        }),
      });

      if (!response.ok) throw new Error('Score API error');

      const data = await response.json();

      // Store result in sessionStorage, then route to single results page
      sessionStorage.setItem('alignResults', JSON.stringify({
        ...data,
        firstName: gateFirstName.trim(),
      }));

      router.push('/results');
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  /* ════════════════════════════════════════════════════════════════════════
     LEAD GATE
  ════════════════════════════════════════════════════════════════════════ */
  if (showGate) {
    return (
      <div style={S.page}>
        <NeuralBackground />
        <div style={S.card}>
          <span style={S.logo}>ALIGN Assessment</span>

          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.03em' }}>
            Your profile is ready.
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px', lineHeight: '1.65' }}>
            Enter your details to unlock your personalized ALIGN retirement profile — including your income style, implementation persona, and recommended next steps.
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
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '20px' }}>
              Your information is private and will never be sold.
            </p>
          </form>

          <button onClick={handleBack} style={S.backBtn}>
            ← Back to Assessment
          </button>
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
      <NeuralBackground />
      <div style={S.card}>
        <span style={S.logo}>ALIGN Assessment</span>

        <div style={S.progressRow}>
          <div style={S.progressWrap}>
            <div style={S.progressBar}><div style={S.progressFill(progress)} /></div>
            <p style={S.progressLabel}>{currentQuestion + 1} of {QUESTIONS.length}</p>
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

        {canGoBack && (
          <button onClick={handleBack} style={S.backBtn}>
            ← Previous Question
          </button>
        )}
      </div>
    </div>
  );
}
