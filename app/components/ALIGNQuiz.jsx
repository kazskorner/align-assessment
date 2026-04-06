'use client';

import React, { useState } from 'react';

const QUESTIONS = [
    { id: 1, text: "I'd spend LESS early, then increase later", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 2, text: "I prioritize income over net worth growth", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 3, text: "I'd spend MORE early, then decrease later", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 4, text: "My income is contractual/guaranteed", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 5, text: "My income is market-driven/variable", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 6, text: "I have high income stability", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 7, text: "My income fluctuates significantly", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 8, text: "I prefer committed/predictable income", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 9, text: "I want flexibility to adjust income", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 10, text: "I need income I can count on", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 11, text: "I like adjusting income based on needs", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 12, text: "Net worth growth is my priority", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 13, text: "Income generation is my priority", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 14, text: "I keep cash accessible", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 15, text: "I invest most assets for growth", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 16, text: "Emergency fund is important to me", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 17, text: "My biggest concern is...", options: ["Tax burden", "Market volatility", "Inflation", "Legacy planning"] },
    { id: 18, text: "I'm looking to...", options: ["Build a new relationship", "Update existing strategy", "Just exploring", "Other"] },
    { id: 19, text: "When will you retire?", options: ["Already Retired", "0–3 years", "3–5 years", "5–10 years", "10–15 years", "15+ years"] },
    { id: 20, text: "Comfort with current plan?", options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
    { id: 21, text: "Prefer lifetime income stream", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 22, text: "Want phased withdrawal approach", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 23, text: "Prefer lump sum over time", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 24, text: "Investment knowledge?", options: ["Very comfortable", "Comfortable", "Neutral", "Uncomfortable", "Very uncomfortable"] },
    { id: 25, text: "Advisor adds significant value", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 26, text: "I benefit from professional guidance", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 27, text: "I can manage investments alone", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 28, text: "I'm confident in my decisions", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 29, text: "I trust my financial judgment", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 30, text: "I need expert support", options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"] },
    { id: 31, text: "What's your age range?", options: ["Under 50", "51–62", "62–67", "68–74", "75+"] },
    { id: 32, text: "How much have you saved?", options: ["Less than $250k", "$250k–$750k", "$750k–$1.5M", "$1.5M–$3M", "$3M+"] },
    { id: 33, text: "Income/net worth qualifier?", options: ["Under $1M NW", "$1M–$2.2M NW", "$2.2M+ NW", "$200k+ HH income", "$300k+ HH income", "$5M+ investments"] },
    { id: 34, text: "Annual spending pattern?", options: ["About the same each year", "More early, less later", "Less early, more later", "Highly variable"] },
    { id: 35, text: "How many retirement buckets?", options: ["Only 1 bucket checked", "Not sure", "2 buckets", "3+ buckets"] },
    { id: 36, text: "What's your state?", options: ["CA", "TX", "FL", "NY", "IL", "Other"] },
];

export default function ALIGNQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [responses, setResponses] = useState({});
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [showForm, setShowForm] = useState(true);

    const handleStart = (e) => {
        e.preventDefault();
        if (email && firstName) {
            setShowForm(false);
        }
    };

    const handleAnswer = (answer) => {
        setResponses({
            ...responses,
            [QUESTIONS[currentQuestion].id]: answer,
        });

        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    firstName,
                    responses,
                }),
            });

            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting quiz. Please try again.');
        }
        setLoading(false);
    };

    if (showForm) {
        return (
            <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
                <h1>ALIGN Retirement Assessment</h1>
                <p>Take a 7-minute personalized retirement quiz</p>

                <form onSubmit={handleStart}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email: </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label>First Name: </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#1a3d5c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px',
                        }}
                    >
                        Start Quiz
                    </button>
                </form>
            </div>
        );
    }

    if (results) {
        return (
            <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
                <h1>Your ALIGN Results</h1>

                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h2>Tier: <strong>{results.tier}</strong></h2>
                    <p>Lead Score: {results.leadScore}</p>
                    <p>Persona: {results.persona}</p>
                </div>

                <h3>Your Traits</h3>
                <ul>
                    <li><strong>Income Source:</strong> {results.traitResults.incomeSource}</li>
                    <li><strong>Income Structure:</strong> {results.traitResults.incomeStructure}</li>
                    <li><strong>Mindset:</strong> {results.traitResults.mindset}</li>
                    <li><strong>Liquidity:</strong> {results.traitResults.liquidity}</li>
                    <li><strong>Spender:</strong> {results.traitResults.spender}</li>
                    <li><strong>Payout Pattern:</strong> {results.traitResults.payoutPattern}</li>
                </ul>

                <h3>Demographics</h3>
                <ul>
                    <li><strong>Age Range:</strong> {results.demographics.ageRange}</li>
                    <li><strong>Time to Retirement:</strong> {results.demographics.timeToRetirement}</li>
                    <li><strong>Assets Saved:</strong> {results.demographics.assetsSaved}</li>
                </ul>

                <h3>Next Steps</h3>
                {results.tier === 'A' && (
                    <p>Schedule a strategy-building session to maximize your retirement wealth.</p>
                )}
                {results.tier === 'B' && (
                    <p>Let's discuss how to optimize your retirement income plan.</p>
                )}
                {results.tier === 'C' && (
                    <p>Check out our retirement education resources to get started.</p>
                )}

                <button
                    onClick={() => {
                        setShowForm(true);
                        setCurrentQuestion(0);
                        setResponses({});
                        setResults(null);
                        setEmail('');
                        setFirstName('');
                    }}
                    style={{
                        width: '100%',
                        padding: '12px',
                        marginTop: '20px',
                        backgroundColor: '#1a3d5c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Retake Quiz
                </button>
            </div>
        );
    }

    const question = QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <div style={{ backgroundColor: '#ddd', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            backgroundColor: '#1a3d5c',
                            transition: 'width 0.3s ease',
                        }}
                    />
                </div>
                <p style={{ textAlign: 'center', fontSize: '12px', marginTop: '8px' }}>
                    Question {currentQuestion + 1} of {QUESTIONS.length}
                </p>
            </div>

            <h2>{question.text}</h2>

            <div style={{ marginBottom: '20px' }}>
                {question.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px',
                            marginBottom: '8px',
                            backgroundColor: responses[question.id] === option ? '#1a3d5c' : '#f0f0f0',
                            color: responses[question.id] === option ? 'white' : 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {currentQuestion === QUESTIONS.length - 1 && (
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: loading ? '#ccc' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Quiz'}
                </button>
            )}
        </div>
    );
}
