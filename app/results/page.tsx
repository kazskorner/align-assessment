'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import NeuralBackground from '../components/NeuralBackground';
import { PRIMARY_TRAIT_COPY, SECONDARY_TRAIT_COPY, PERSONA_COPY, RESULTS_COPY } from '../../lib/quiz-copy';
import './results.css';

const CTA_CONFIG = RESULTS_COPY.ctaConfig;
const TIER_MESSAGING = RESULTS_COPY.tierMessaging;
const BRIDGE = RESULTS_COPY.bridge;
const SECTIONS = RESULTS_COPY.sections;

function ResultsContent() {
  const router = useRouter();
  const [results, setResults] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const isMock = params.get('mock') === 'true';

    if (isMock) {
      setResults({
        leadScore: 26,
        tier: 'A',
        firstName: 'Adam',
        persona: 'Collaborative Partner',
        traitResults: {
          incomeSource: 'Contractual',
          incomeStructure: 'Committed',
          mindset: 'Income Mindset',
          liquidity: 'Cash Liquidity',
          spender: 'Front Loaded',
          payoutPattern: 'Lifetime Income'
        },
        quadrant: {
          advisorValue: 2.5,
          selfEfficacy: 2.1
        }
      });
      return;
    }

    try {
      const raw = sessionStorage.getItem('alignResults');
      if (!raw) {
        router.replace('/quiz');
        return;
      }
      setResults(JSON.parse(raw));
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  // Animate elements on scroll
  useEffect(() => {
    if (!results) return;
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [results]);

  if (!mounted || !results) return null;

  const tr   = results.traitResults || {};
  const tier = (results.tier || 'C') as keyof typeof TIER_MESSAGING;
  const msg  = TIER_MESSAGING[tier] || TIER_MESSAGING.C;
  const cta  = CTA_CONFIG[tier] || CTA_CONFIG.C;
  const firstName = results.firstName || '';

  const incomeSourceCopy = PRIMARY_TRAIT_COPY[tr.incomeSource] || '';
  const incomeStructCopy = PRIMARY_TRAIT_COPY[tr.incomeStructure] || '';
  const secondaryKey = (val: string) => `${val}|${tr.incomeSource}|${tr.incomeStructure}`;
  const personaData = PERSONA_COPY[results.persona] || PERSONA_COPY['Pragmatic Realist'];

  const secondaryTraits = [
    { label: 'Strategic Mindset',  val: tr.mindset,        desc: 'Approach to retirement wealth' },
    { label: 'Liquidity Preference', val: tr.liquidity,      desc: 'Preference for cash accessibility' },
    { label: 'Spending Profile',  val: tr.spender,        desc: 'Distribution of spending over time' },
    { label: 'Payout Pattern',    val: tr.payoutPattern,  desc: 'Structure of income delivery' },
  ];

  return (
    <div className="results-page">
      <NeuralBackground />

      {/* NAV */}
      <nav className="results-nav">
        <a href="/" className="nav-logo">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '64px', width: 'auto' }} />
        </a>
        {cta.btnUrl && cta.btnText && (
          <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">
            {cta.btnText}
          </a>
        )}
      </nav>

      <main>
        {/* CINEMATIC VIDEO HERO */}
        <section className="results-hero video-hero">
          <div className="hero-video-wrap">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="hero-video-el"
              src="/results-hero-video.mp4"
            />
            <div className="hero-video-scrim"></div>
          </div>
          
          <div className="hero-inner">
            <div className="hero-content reveal d1">
              <h1 className="hero-tagline">
                <span className="first-name">{firstName},</span> {msg.tagline}
                <em className="hero-emp">{msg.emp}</em>
              </h1>
              <p className="hero-subheading-overlay">
                {msg.sub}
              </p>
            </div>
          </div>
        </section>

        {/* THE BRIDGE */}
        <section className="bridge-section">
          <div className="section-inner">
            <p className="principal-mandate reveal d1">
              \"{BRIDGE.mandate}\"
            </p>
          </div>
        </section>

        {/* FOUNDATIONAL COMPONENTS | STRATEGIC ARCHITECTURE */}
        <section className="res-section">
          <div className="section-inner">
            <div className="section-tag reveal">{SECTIONS.architecture.tag}</div>
            <h2 className="section-h reveal">{SECTIONS.architecture.title}</h2>
            <p className="section-sub reveal">
              {SECTIONS.architecture.sub}
            </p>
            
            <div className="trait-grid">
              <div className="trait-card reveal d1">
                <div className="trait-name">Your Retirement Engine</div>
                <div className="trait-body" style={{ marginTop: '20px' }}>{incomeSourceCopy}</div>
              </div>

              <div className="trait-card reveal d2">
                <div className="trait-name">Your Retirement Rhythm</div>
                <div className="trait-body" style={{ marginTop: '20px' }}>{incomeStructCopy}</div>
              </div>
            </div>
          </div>
        </section>

        {/* NUANCED PREFERENCES */}
        <section className="res-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="section-inner">
            <div className="section-tag reveal">{SECTIONS.preferences.tag}</div>
            <h2 className="section-h reveal">{SECTIONS.preferences.title}</h2>
            <p className="section-sub reveal">
              {SECTIONS.preferences.sub}
            </p>
            
            <div className="secondary-grid">
              {secondaryTraits.map((t, i) => {
                const copy = t.val ? SECONDARY_TRAIT_COPY[secondaryKey(t.val)] : '';
                return (
                  <div key={t.label} className={`sec-card reveal d${i+1}`}>
                    <div className="sec-name">{t.label}</div>
                    <p className="sec-body">
                      {copy ? copy.split('\n\n')[0] : t.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* IMPLEMENTATION PERSONA */}
        <section className="res-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="section-inner">
            <div className="section-tag reveal">Implementation Persona</div>
            <div className="persona-focus-wrap">
              <div className="persona-card reveal d1" style={{ maxWidth: '800px', margin: '60px auto 0' }}>
                <div className="persona-quadrant">Quadrant: {results.persona}</div>
                <div className="persona-name">{results.persona}</div>
                <div className="persona-tags">
                  <div className="p-tag">{results.quadrant?.advisorValue > 0 ? 'High' : 'Selective'} Advisor Value</div>
                  <div className="p-tag">{results.quadrant?.selfEfficacy > 0 ? 'High' : 'Exploring'} Confidence</div>
                </div>
                <p className="persona-desc">{personaData.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="res-section next-inner" id="cta-section">
          <div className="section-inner">
            <div className="section-tag reveal">Next Steps</div>
            <h2 className="section-h reveal" style={{ fontSize: '48px' }}>
              {cta.heading}
            </h2>
            <p className="section-sub reveal" style={{ margin: '0 auto 60px' }}>{cta.sub}</p>

            <div className="next-cards">
              {cta.cards.map((step: any, i: number) => (
                <div key={i} className={`next-card reveal d${i+1}`}>
                  <div className="next-card-num">{step.num}</div>
                  <div className="next-card-title">{step.title}</div>
                  <p className="next-card-body">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="cta-group reveal">
              {/* Tier A + B: booking button */}
              {cta.btnUrl && cta.btnText && (
                <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="final-btn">
                  {cta.btnText} →
                </a>
              )}

              {/* Tier C: YouTube + Convergent links */}
              {tier === 'C' && (
                <div className="tier-c-links">
                  <a
                    href={(cta as any).youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="final-btn"
                    style={{ marginBottom: '16px' }}
                  >
                    Watch Kaz's Korner on YouTube →
                  </a>
                  <a
                    href={(cta as any).convergentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="final-btn final-btn--outline"
                  >
                    Meet Adam at Convergent →
                  </a>
                </div>
              )}

              {/* PDF download — all tiers */}
              <button
                onClick={() => window.print()}
                className="pdf-download-btn"
                aria-label="Download results as PDF"
              >
                ↓ Download as PDF
              </button>

              <p className="cta-note">
                Adam Kazinec · RICP® ChFC® CLU® · Chamblee, GA · No Obligation
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="results-footer">
        <div className="footer-inner">
          <div className="foot-brand">
            <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '32px', width: 'auto' }} />
          </div>
          <p className="foot-copy">
            © 2026 Convergent Financial Partners · Adam Kazinec · Chamblee, GA
          </p>
          <div className="foot-links">
            <a href="#">Privacy</a>
            <a href="#">Disclosures</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading Results...</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
