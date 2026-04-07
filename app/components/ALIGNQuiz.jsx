'use client';

import React, { useState } from 'react';

/* ─── All 50 US States ─────────────────────────────────────────────────────── */
const US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
];

/* ─── Questions ─────────────────────────────────────────────────────────────── */
const QUESTIONS = [
    { id: 1,  text: "I'd spend LESS early, then increase later",       options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 2,  text: "I prioritize income over net worth growth",        options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 3,  text: "I'd spend MORE early, then decrease later",        options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 4,  text: "My income is contractual/guaranteed",              options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 5,  text: "My income is market-driven/variable",              options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 6,  text: "I have high income stability",                     options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 7,  text: "My income fluctuates significantly",               options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 8,  text: "I prefer committed/predictable income",            options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 9,  text: "I want flexibility to adjust income",              options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 10, text: "I need income I can count on",                     options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 11, text: "I like adjusting income based on needs",           options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 12, text: "Net worth growth is my priority",                  options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 13, text: "Income generation is my priority",                 options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 14, text: "I keep cash accessible",                           options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 15, text: "I invest most assets for growth",                  options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 16, text: "Emergency fund is important to me",                options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 17, text: "My biggest concern is...",                         options: ["Tax burden", "Market volatility", "Inflation", "Legacy planning"] },
    { id: 18, text: "I'm looking to...",                                options: ["Build a new relationship", "Update existing strategy", "Just exploring", "Other"] },
    { id: 19, text: "When will you retire?",                            options: ["Already Retired", "0–3 years", "3–5 years", "5–10 years", "10–15 years", "15+ years"] },
    { id: 20, text: "Comfort with current plan?",                       options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
    { id: 21, text: "Prefer lifetime income stream",                    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 22, text: "Want phased withdrawal approach",                  options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 23, text: "Prefer lump sum over time",                        options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 24, text: "Investment knowledge?",                            options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
    { id: 25, text: "Advisor adds significant value",                   options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 26, text: "I benefit from professional guidance",             options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 27, text: "I can manage investments alone",                   options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 28, text: "I'm confident in my decisions",                    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 29, text: "I trust my financial judgment",                    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 30, text: "I need expert support",                            options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 31, text: "What's your age range?",                           options: ["Under 50", "51–62", "62–67", "68–74", "75+"] },
    { id: 32, text: "How much have you saved?",                         options: ["Less than $250k", "$250k–$750k", "$750k–$1.5M", "$1.5M–$3M", "$3M+"] },
    { id: 33, text: "Income/net worth qualifier?",                      options: ["Under $1M NW", "$1M–$2.2M NW", "$2.2M+ NW", "$200k+ HH income", "$300k+ HH income", "$5M+ investments"] },
    { id: 34, text: "Annual spending pattern?",                         options: ["About the same each year", "More early, less later", "Less early, more later", "Highly variable"] },
    { id: 35, text: "How many retirement buckets do you have?",         options: ["Only 1 bucket checked", "Not sure", "2 buckets", "3+ buckets"] },
    { id: 36, text: "What state do you live in?",                       options: US_STATES, isDropdown: true },
];

/* ─── Styles ────────────────────────────────────────────────────────────────── */
const BRAND = '#1a3d5c';

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
        border: `2px solid #ccc`,
        borderRadius: '8px',
        backgroundColor: '#fff',
        color: '#222',
        cursor: 'pointer',
        marginBottom: '16px',
        outline: 'none',
        appearance: 'auto',
    },
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
    retakeBtn: {
        width: '100%',
        padding: '12px',
        marginTop: '24px',
        backgroundColor: BRAND,
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '15px',
    },
    fieldGroup: {
        marginBottom: '18px',
    },
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
    errorText: {
        fontSize: '13px',
        color: '#dc3545',
        marginTop: '4px',
    },
    resultCard: {
        backgroundColor: '#f0f4f8',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '24px',
    },
};

/* ─── Email format validator ────────────────────────────────────────────────── */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export default function ALIGNQuiz() {
    // Quiz state
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses]             = useState({});
    const [selectedState, setSelectedState]     = useState('');

    // Lead gate state (shown after all questions, before results)
    const [showGate, setShowGate]   = useState(false);
    const [gateFirstName, setGateFirstName] = useState('');
    const [gateLastName, setGateLastName]   = useState('');
    const [gateEmail, setGateEmail]         = useState('');
    const [gateErrors, setGateErrors]       = useState({});

    // Results state
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);

    /* ── Answer handler ─────────────────────────────────────────────────────── */
    const handleAnswer = (answer) => {
        const newResponses = { ...responses, [QUESTIONS[currentQuestion].id]: answer };
        setResponses(newResponses);

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedState(''); // reset dropdown for next render
        } else {
            // Last question answered — show the lead gate
            setShowGate(true);
        }
    };

    /* ── Dropdown answer (Q36) ──────────────────────────────────────────────── */
    const handleDropdownChange = (e) => {
        setSelectedState(e.target.value);
    };

    const handleDropdownConfirm = () => {
        if (!selectedState) return;
        handleAnswer(selectedState);
    };

    /* ── Gate submission ────────────────────────────────────────────────────── */
    const validateGate = () => {
        const errors = {};
        if (!gateFirstName.trim()) errors.firstName = 'First name is required.';
        if (!gateLastName.trim())  errors.lastName  = 'Last name is required.';
        if (!gateEmail.trim())         errors.email = 'Email is required.';
        else if (!isValidEmail(gateEmail)) errors.email = 'Please enter a valid email address.';
        return errors;
    };

    const handleGateSubmit = async (e) => {
        e.preventDefault();
        const errors = validateGate();
        if (Object.keys(errors).length > 0) {
            setGateErrors(errors);
            return;
        }
        setGateErrors({});
        await submitQuiz(gateFirstName.trim(), gateLastName.trim(), gateEmail.trim());
    };

    /* ── API call ───────────────────────────────────────────────────────────── */
    const submitQuiz = async (firstName, lastName, email) => {
        setLoading(true);
        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName, lastName, responses }),
            });
            const data = await response.json();
            setResults(data);
            setShowGate(false);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    /* ── Reset quiz ─────────────────────────────────────────────────────────── */
    const resetQuiz = () => {
        setCurrentQuestion(0);
        setResponses({});
        setSelectedState('');
        setShowGate(false);
        setGateFirstName('');
        setGateLastName('');
        setGateEmail('');
        setGateErrors({});
        setResults(null);
        setLoading(false);
    };

    /* ════════════════════════════════════════════════════════════════════════
       RENDER: Results page
    ════════════════════════════════════════════════════════════════════════ */
    if (results) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h1 style={{ fontSize: '26px', marginBottom: '24px', color: '#111' }}>Your ALIGN Results</h1>

                    <div style={styles.resultCard}>
                        <h2 style={{ marginTop: 0 }}>Tier: <strong style={{ color: BRAND }}>{results.tier}</strong></h2>
                        <p style={{ margin: '6px 0' }}>Lead Score: <strong>{results.leadScore}</strong></p>
                        <p style={{ margin: '6px 0' }}>Persona: <strong>{results.persona}</strong></p>
                    </div>

                    <h3 style={{ color: '#111', marginBottom: '12px' }}>Your Traits</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '24px' }}>
                        <li><strong>Income Source:</strong> {results.traitResults.incomeSource}</li>
                        <li><strong>Income Structure:</strong> {results.traitResults.incomeStructure}</li>
                        <li><strong>Mindset:</strong> {results.traitResults.mindset}</li>
                        <li><strong>Liquidity:</strong> {results.traitResults.liquidity}</li>
                        <li><strong>Spender:</strong> {results.traitResults.spender}</li>
                        <li><strong>Payout Pattern:</strong> {results.traitResults.payoutPattern}</li>
                    </ul>

                    <h3 style={{ color: '#111', marginBottom: '12px' }}>Demographics</h3>
                    <ul style={{ paddingLeft: '20px', lineHeight: '1.9', marginBottom: '24px' }}>
                        <li><strong>Age Range:</strong> {results.demographics.ageRange}</li>
                        <li><strong>Time to Retirement:</strong> {results.demographics.timeToRetirement}</li>
                        <li><strong>Assets Saved:</strong> {results.demographics.assetsSaved}</li>
                    </ul>

                    <h3 style={{ color: '#111', marginBottom: '8px' }}>Next Steps</h3>
                    {results.tier === 'A' && <p>Schedule a strategy-building session to maximize your retirement wealth.</p>}
                    {results.tier === 'B' && <p>Let's discuss how to optimize your retirement income plan.</p>}
                    {results.tier === 'C' && <p>Check out our retirement education resources to get started.</p>}

                    <button onClick={resetQuiz} style={styles.retakeBtn}>
                        Retake Quiz
                    </button>
                </div>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════════════════════════
       RENDER: Lead gate (shown after Q36, before results)
    ════════════════════════════════════════════════════════════════════════ */
    if (showGate) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    {/* Progress bar – stays at 100% */}
                    <div style={styles.progressBar}>
                        <div style={styles.progressFill(100)} />
                    </div>
                    <p style={styles.progressLabel}>Quiz complete!</p>

                    <h1 style={{ fontSize: '22px', marginBottom: '10px', color: '#111' }}>
                        Almost there — your personalized results are ready.
                    </h1>
                    <p style={{ fontSize: '15px', color: '#555', marginBottom: '28px', lineHeight: '1.5' }}>
                        Enter your details below to unlock your ALIGN profile, including your retirement tier, income persona, and recommended next steps.
                    </p>

                    <form onSubmit={handleGateSubmit} noValidate>
                        <div style={styles.fieldGroup}>
                            <label htmlFor="gateFirstName" style={styles.label}>First Name</label>
                            <input
                                id="gateFirstName"
                                type="text"
                                value={gateFirstName}
                                onChange={(e) => setGateFirstName(e.target.value)}
                                placeholder="e.g. Jane"
                                style={styles.input(!!gateErrors.firstName)}
                                autoComplete="given-name"
                            />
                            {gateErrors.firstName && <p style={styles.errorText}>{gateErrors.firstName}</p>}
                        </div>

                        <div style={styles.fieldGroup}>
                            <label htmlFor="gateLastName" style={styles.label}>Last Name</label>
                            <input
                                id="gateLastName"
                                type="text"
                                value={gateLastName}
                                onChange={(e) => setGateLastName(e.target.value)}
                                placeholder="e.g. Smith"
                                style={styles.input(!!gateErrors.lastName)}
                                autoComplete="family-name"
                            />
                            {gateErrors.lastName && <p style={styles.errorText}>{gateErrors.lastName}</p>}
                        </div>

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
                    </form>
                </div>
            </div>
        );
    }

    /* ════════════════════════════════════════════════════════════════════════
       RENDER: Quiz questions
    ════════════════════════════════════════════════════════════════════════ */
    const question = QUESTIONS[currentQuestion];
    const progress  = ((currentQuestion + 1) / QUESTIONS.length) * 100;
    const isLastQ   = currentQuestion === QUESTIONS.length - 1;

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                {/* Progress */}
                <div style={styles.progressBar}>
                    <div style={styles.progressFill(progress)} />
                </div>
                <p style={styles.progressLabel}>Question {currentQuestion + 1} of {QUESTIONS.length}</p>

                {/* Question text */}
                <p style={styles.questionText}>{question.text}</p>

                {/* Options */}
                {question.isDropdown ? (
                    /* Dropdown for Q36 (state) */
                    <div>
                        <select
                            value={selectedState}
                            onChange={handleDropdownChange}
                            style={styles.dropdown}
                            aria-label="Select your state"
                        >
                            <option value="">— Select your state —</option>
                            {US_STATES.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>

                        <button
                            onClick={handleDropdownConfirm}
                            disabled={!selectedState}
                            style={styles.submitBtn(!selectedState)}
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
