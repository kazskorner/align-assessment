'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import NeuralBackground from '../components/NeuralBackground';
import {
  PRIMARY_TRAIT_COPY,
  SECONDARY_TRAIT_COPY,
  PERSONA_COPY,
} from '@/lib/quiz-copy';
import './results.css';

/* ─── CTA config (Dark themed) ──────────────────────────────────────────────── */
const CTA_CONFIG = {
  A: {
    heading: "Your profile is ready. Your strategy isn't built yet.",
    sub: "This assessment identifies where you stand. A focused strategy session with Adam will translate it into a plan built around your psychology — not a template.",
    card1: { num: '01', title: 'Review Your Full Profile', body: "You've just identified your income style, planning approach, and implementation persona. This is the foundation every good retirement strategy starts with." },
    card2: { num: '02', title: 'Book a Strategy Session', body: "A focused 45-minute session with Adam — no sales pressure, just a real conversation about what your profile means in practice for your specific situation." },
    card3: { num: '03', title: 'Build the Right Plan', body: "Adam will design a retirement income strategy built for your specific psychology — not what worked for your neighbor or what a generic plan recommends." },
    btnText: 'Book My Strategy Session',
    btnUrl: 'https://calendly.com/adam-kazinec/align-strategy-session',
  },
  B: {
    heading: "Your profile is ready. Let's map your next move.",
    sub: "You're in a meaningful planning window. A focused conversation with Adam will show you exactly where you stand and what the highest-value next steps look like for your situation.",
    card1: { num: '01', title: 'Understand Your Profile', body: "Your income preferences, planning style, and implementation persona are now clearly defined. That's more clarity than most people carry into a planning conversation." },
    card2: { num: '02', title: 'Schedule a Discovery Call', body: "A structured 30-minute conversation to assess where you are, what your profile points to, and whether working together makes sense for your situation." },
    card3: { num: '03', title: 'Move with Confidence', body: "Stop planning in the abstract. With a clear profile and the right guidance, the next steps become specific, actionable, and yours." },
    btnText: 'Book My Discovery Call',
    btnUrl: 'https://calendly.com/adam-kazinec/align-discovery-call',
  },
  C: {
    heading: "Your profile is ready. Understanding where you stand is the first step.",
    sub: "Knowing your income preferences, risk approach, and planning style puts you ahead of most people who enter retirement without ever asking these questions.",
    card1: { num: '01', title: 'Study Your Profile', body: "You've just mapped six dimensions of how you think about retirement income. That's a real foundation — use it to evaluate any future planning conversation." },
    card2: { num: '02', title: 'Learn at Your Pace', body: "Kaz's Korner has free resources built around the same philosophy behind this assessment — plain-language retirement education with no agenda attached." },
    card3: { num: '03', title: 'Come Back When You\'re Ready', body: "When the timeline gets closer or the numbers start to align, Adam will be here. There's no pressure and no expiration date on this profile." },
    btnText: 'Watch Kaz\'s Korner',
    btnUrl: 'https://www.youtube.com/@KazsKorner',
  },
};

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

  if (!mounted || !results) {
    return (
      <div className="loading-state-wrap">
        <NeuralBackground />
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Architecting Your Profile...</p>
        </div>
        <style>{`
          .loading-state-wrap {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0c0c0e;
            color: #00f0ff;
          }
          .loading-content {
            text-align: center;
            z-index: 10;
          }
          .loading-spinner {
            width: 48px;
            height: 48px;
            border: 3px solid rgba(0, 240, 255, 0.1);
            border-top-color: #00f0ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  const tr   = results.traitResults || {};
  const tier = results.tier || 'C';
  const cta  = CTA_CONFIG[tier as keyof typeof CTA_CONFIG] || CTA_CONFIG.C;
  const firstName = results.firstName || '';

  const incomeSourceCopy = PRIMARY_TRAIT_COPY[tr.incomeSource] || '';
  const incomeStructCopy = PRIMARY_TRAIT_COPY[tr.incomeStructure] || '';
  const secondaryKey = (val: string) => `${val}|${tr.incomeSource}|${tr.incomeStructure}`;
  const personaData = PERSONA_COPY[results.persona] || PERSONA_COPY['Pragmatic Realist'];

  const secondaryTraits = [
    { label: 'Mindset',           icon: '🧠', val: tr.mindset,        desc: 'Approach to retirement wealth' },
    { label: 'Liquidity',         icon: '💧', val: tr.liquidity,      desc: 'Preference for cash accessibility' },
    { label: 'Spending Profile',  icon: '📈', val: tr.spender,        desc: 'Distribution of spending over time' },
    { label: 'Payout Structure',  icon: '🗓', val: tr.payoutPattern,  desc: 'Structure of income delivery' },
  ];

  return (
    <div className="results-page">
      <NeuralBackground />

      {/* NAV */}
      <nav className="results-nav">
        <a href="/" className="nav-logo">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '64px', width: 'auto' }} />
        </a>
        <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">
          {cta.btnText}
        </a>
      </nav>

      <main>
        {/* HERO */}
        <section className="results-hero">
          <div className="hero-corner tl"></div>
          <div className="hero-corner tr"></div>
          
          <div className="hero-inner">
            <h1 className="hero-title reveal d1">
              {firstName ? `${firstName}, your ` : 'Your '} Retirement Profile:
              <em>{tr.incomeSource} · {tr.incomeStructure}</em>
            </h1>
            <p className="hero-desc reveal d2">
              Your behavioral fingerprint reveals a specific set of needs for your retirement strategy. 
              Below is how your capital should be aligned with your convictions.
            </p>
          </div>
        </section>

        {/* FOUNDATIONAL COMPONENTS */}
        <section className="res-section">
          <div className="section-inner">
            <div className="section-tag reveal">Foundational Components</div>
            <h2 className="section-h reveal">Two dimensions that define your <em>income strategy.</em></h2>
            <p className="section-sub reveal">These traits have the most influence on which retirement income structure matches your psychology.</p>
            
            <div className="trait-grid">
              {/* Your Retirement Engine */}
              <div className="trait-card reveal d1">
                <div className="trait-name">Your Retirement Engine</div>
                <div className="trait-result">
                  <div className="trait-result-dot"></div> {tr.incomeSource}
                </div>
                <div className="trait-body">{incomeSourceCopy}</div>
              </div>

              {/* Your Retirement Rhythm */}
              <div className="trait-card reveal d2">
                <div className="trait-name">Your Retirement Rhythm</div>
                <div className="trait-result">
                  <div className="trait-result-dot"></div> {tr.incomeStructure}
                </div>
                <div className="trait-body">{incomeStructCopy}</div>
              </div>
            </div>
          </div>
        </section>

        {/* NUANCED PREFERENCES */}
        <section className="res-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="section-inner">
            <div className="section-tag reveal">Nuanced Preferences</div>
            <h2 className="section-h reveal">Four traits where the <em>fine-tuning comes in.</em></h2>
            <p className="section-sub reveal">
              This is really where the fine-tuning comes in and where your retirement strategy will really feel personalized for you.
            </p>
            
            <div className="secondary-grid">
              {secondaryTraits.map((t, i) => {
                const copy = t.val ? SECONDARY_TRAIT_COPY[secondaryKey(t.val)] : '';
                return (
                  <div key={t.label} className={`sec-card reveal d${i+1}`}>
                    <span className="sec-card-icon">{t.icon}</span>
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
            <div className="persona-wrap">
              <div className="persona-card reveal d1">
                <div className="persona-quadrant">Quadrant: {results.persona}</div>
                <div className="persona-name">{results.persona}</div>
                <div className="persona-tags">
                  <div className="p-tag">{results.quadrant?.advisorValue > 0 ? 'High' : 'Selective'} Advisor Value</div>
                  <div className="p-tag">{results.quadrant?.selfEfficacy > 0 ? 'High' : 'Exploring'} Confidence</div>
                </div>
                <p className="persona-desc">{personaData.description}</p>
              </div>

              <div className="matrix-container reveal d2">
                <div className="matrix-label">
                  <span className="axis-label">Low Confidence</span>
                  <span className="axis-label">High Confidence</span>
                </div>
                <div className="persona-matrix">
                  {[
                    { name: 'Collaborative Partner', sub: 'High advisor + High confidence' },
                    { name: 'Strategic Delegator',   sub: 'High advisor + Low confidence' },
                    { name: 'Confident Investor',    sub: 'Low advisor + High confidence' },
                    { name: 'Independent Learner',   sub: 'Low advisor + Low confidence' },
                  ].map((cell) => (
                    <div key={cell.name} className={`pm-cell${results.persona === cell.name ? ' active' : ''}`}>
                      <div className="pm-cell-name">{cell.name}</div>
                      <div className="pm-cell-sub">{cell.sub}</div>
                    </div>
                  ))}
                </div>
                <div className="matrix-label">
                  <span className="axis-label">Low Advisor Value</span>
                  <span className="axis-label">High Advisor Value</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="res-section next-inner" id="cta-section">
          <div className="section-inner">
            <div className="section-tag reveal">Next Steps</div>
            <h2 className="section-h reveal" style={{ fontSize: '48px' }}>
              {cta.heading.includes('isn\'t built yet') ? <>Your strategy<br /><em>isn't built yet.</em></> : cta.heading}
            </h2>
            <p className="section-sub reveal" style={{ margin: '0 auto 60px' }}>{cta.sub}</p>

            <div className="next-cards">
              {[cta.card1, cta.card2, cta.card3].map((step, i) => (
                <div key={i} className={`next-card reveal d${i+1}`}>
                  <div className="next-card-num">{step.num}</div>
                  <div className="next-card-title">{step.title}</div>
                  <p className="next-card-body">{step.body}</p>
                </div>
              ))}
            </div>

            <div className="cta-group reveal">
              <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="final-btn">
                {cta.btnText} →
              </a>
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
