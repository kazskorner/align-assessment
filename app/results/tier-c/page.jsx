'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResultsTierC() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try { setResults(JSON.parse(decodeURIComponent(data))); }
      catch (e) { console.error('Error parsing results:', e); }
    }
  }, [searchParams]);

  if (!results) {
    return <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'sans-serif', color: '#555' }}>Loading your results...</div>;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '50px auto', padding: '24px', fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#1a3d5c', fontSize: '30px', marginBottom: '8px' }}>Your ALIGN Assessment</h1>
        <div style={{
          display: 'inline-block', padding: '6px 20px',
          backgroundColor: '#9ca3af', color: 'white',
          borderRadius: '20px', fontSize: '16px', fontWeight: 'bold',
        }}>
          Tier C — Foundation
        </div>
        <p style={{ color: '#555', marginTop: '16px', fontSize: '16px' }}>
          Taking this assessment is the right first step — here's what we learned about you.
        </p>
      </div>

      {/* Primary Trait — Income Engine */}
      <div style={{ backgroundColor: '#f9f7f4', padding: '22px', borderRadius: '8px', marginBottom: '24px', borderLeft: '4px solid #1a3d5c' }}>
        <h2 style={{ color: '#1a3d5c', marginTop: 0, marginBottom: '10px', fontSize: '18px' }}>Your Income Engine</h2>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>{results.traitResults?.incomeSource}</p>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555', margin: 0 }}>
          [PRIMARY TRAIT DESCRIPTION FROM COPY MATRIX — Income Source]
        </p>
      </div>

      {/* Primary Trait — Income Rhythm */}
      <div style={{ backgroundColor: '#f9f7f4', padding: '22px', borderRadius: '8px', marginBottom: '24px', borderLeft: '4px solid #1a3d5c' }}>
        <h2 style={{ color: '#1a3d5c', marginTop: 0, marginBottom: '10px', fontSize: '18px' }}>Your Income Rhythm</h2>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', margin: '0 0 8px 0' }}>{results.traitResults?.incomeStructure}</p>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555', margin: 0 }}>
          [SECONDARY TRAIT DESCRIPTION FROM COPY MATRIX — Income Structure]
        </p>
      </div>

      {/* Secondary Traits */}
      <h3 style={{ color: '#1a3d5c', marginBottom: '16px' }}>What Else We Learned About You</h3>

      {[
        { label: 'Mindset', value: results.traitResults?.mindset },
        { label: 'Liquidity Preference', value: results.traitResults?.liquidity },
        { label: 'Spending Pattern', value: results.traitResults?.spender },
        { label: 'Payout Pattern', value: results.traitResults?.payoutPattern },
      ].map(({ label, value }) => (
        <div key={label} style={{ backgroundColor: '#f9f7f4', padding: '16px', borderRadius: '8px', marginBottom: '14px' }}>
          <h4 style={{ color: '#1a3d5c', margin: '0 0 6px 0', fontSize: '15px' }}>{label}</h4>
          <p style={{ fontWeight: 'bold', color: '#333', margin: '0 0 6px 0', fontSize: '14px' }}>{value}</p>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#555', margin: 0 }}>
            [SECONDARY TRAIT DESCRIPTION — {label} from Copy Matrix]
          </p>
        </div>
      ))}

      {/* Implementation Persona */}
      <div style={{ backgroundColor: '#e8dcc8', padding: '24px', borderRadius: '8px', marginBottom: '32px', marginTop: '24px' }}>
        <h3 style={{ color: '#1a3d5c', marginTop: 0, marginBottom: '8px' }}>Your Implementation Persona</h3>
        <h4 style={{ color: '#9ca3af', fontSize: '22px', margin: '0 0 12px 0' }}>{results.persona}</h4>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#333', margin: 0 }}>
          [PERSONA DESCRIPTION FROM COPY MATRIX — {results.persona}]
        </p>
      </div>

      {/* CTA — Tier C */}
      <div style={{ textAlign: 'center', padding: '32px', backgroundColor: '#1a3d5c', borderRadius: '8px', color: 'white' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Build your retirement foundation.</h3>
        <p style={{ margin: '0 0 20px 0', opacity: 0.85, fontSize: '15px' }}>
          Start with the right education and resources to prepare for your future.
        </p>
        <button
          onClick={() => alert('Download guide coming soon!')}
          style={{
            padding: '14px 36px',
            backgroundColor: '#9ca3af', color: 'white',
            border: 'none', borderRadius: '6px',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
          }}
        >
          Download Guide + Stay Updated
        </button>
      </div>

      {/* Debug panel */}
      <details style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
        <summary style={{ cursor: 'pointer' }}>Debug — Raw Scores</summary>
        <div style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '4px', marginTop: '8px' }}>
          <p>Tier: {results.tier} | Lead Score: {results.leadScore}</p>
          <p>Advisor Value: {results.quadrant?.advisorValue} | Self Efficacy: {results.quadrant?.selfEfficacy}</p>
          <p>Time to Retirement: {results.demographics?.timeToRetirement}</p>
          <p>Assets Saved: {results.demographics?.assetsSaved}</p>
        </div>
      </details>
    </div>
  );
}

