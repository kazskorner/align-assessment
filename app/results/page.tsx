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

  // Animate elements on load/scroll
  useEffect(() => {
    if (!results) return;
    
    // 1. Score Ring Animation
    const ringFill = document.getElementById('ring-fill');
    if (ringFill) {
      // Circumference is 377. 
      // Use leadScore as a proxy for the ring fill (capped at 30)
      const maxScore = 30;
      const scoreValue = Math.min(results.leadScore || 0, maxScore);
      const percentage = scoreValue / maxScore;
      const offset = 377 * (1 - percentage);
      setTimeout(() => {
        ringFill.style.strokeDashoffset = offset.toString();
      }, 300);
    }

    // 2. Primary Spectra Animation
    setTimeout(() => {
      const s1 = document.getElementById('spec-income-source');
      const s2 = document.getElementById('spec-income-structure');
      const isContractual  = results.traitResults?.incomeSource === 'Contractual';
      const isCommitted    = results.traitResults?.incomeStructure === 'Committed';
      if (s1) s1.style.width = isContractual  ? '22%' : '78%';
      if (s2) s2.style.width = isCommitted    ? '22%' : '78%';
    }, 600);

    // 3. Secondary Bars Animation
    setTimeout(() => {
      const bars = [
        { id: 'sb-mindset', val: results.traitResults?.mindset },
        { id: 'sb-liquidity', val: results.traitResults?.liquidity },
        { id: 'sb-spender', val: results.traitResults?.spender },
        { id: 'sb-payout', val: results.traitResults?.payoutPattern },
      ];
      bars.forEach(({ id, val }) => {
        const el = document.getElementById(id);
        if (!el || !val) return;
        // Identify "A" side traits for bar styling
        const aSide = ['Income Mindset', 'Cash Liquidity', 'Back Loaded', 'Lifetime Income'];
        el.style.width = aSide.includes(val) ? '85%' : '40%';
      });
    }, 900);

    // 4. Intersection Observer for Reveal
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
    { id: 'sb-mindset',   label: 'Mindset',           icon: '🧠', val: tr.mindset,        num: '03', desc: 'Approach to retirement wealth' },
    { id: 'sb-liquidity', label: 'Liquidity',         icon: '💧', val: tr.liquidity,      num: '04', desc: 'Preference for cash accessibility' },
    { id: 'sb-spender',   label: 'Spending Pattern',  icon: '📈', val: tr.spender,        num: '05', desc: 'Distribution of spending over time' },
    { id: 'sb-payout',    label: 'Payout Pattern',    icon: '🗓', val: tr.payoutPattern,  num: '06', desc: 'Structure of income delivery' },
  ];

  return (
    <div className="results-page">
      <NeuralBackground />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-6 bg-transparent">
        <a href="/" className="flex items-center gap-3 no-underline text-white font-display font-bold text-lg tracking-tight">
          <div className="w-8 h-8 bg-cyan-400 text-black rounded-lg flex items-center justify-center text-sm font-extrabold">A</div>
          ALIGN
        </a>
        <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" 
           className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold no-underline hover:bg-cyan-400 transition-all hover:-translate-y-0.5 shadow-lg">
          {cta.btnText}
        </a>
      </nav>

      <main>
        {/* HERO */}
        <section className="results-hero">
          <div className="hero-inner">
            <div className="tier-badge reveal d1">
              <div className="tier-dot">{tier}</div>
              <div className="tier-label">Tier {tier} — {tier === 'A' ? 'High Readiness' : tier === 'B' ? 'Qualified' : 'Early Planning'}</div>
            </div>

            <div className="score-ring-wrap reveal d2">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle className="ring-bg" cx="70" cy="70" r="60"/>
                <circle className="ring-fill" id="ring-fill" cx="70" cy="70" r="60"/>
              </svg>
              <div className="ring-val">
                {results.leadScore || 0}
                <span className="ring-sub">/ 30 Score</span>
              </div>
            </div>

            <h1 className="hero-title reveal d3">
              {firstName ? `${firstName}, your ` : 'Your '} Retirement Profile:<br />
              <em>{tr.incomeSource} · {tr.incomeStructure}</em>
            </h1>
            <p className="hero-desc reveal d4">
              Your behavioral fingerprint reveals a specific set of needs for your retirement strategy. 
              Below is how your capital should be aligned with your convictions.
            </p>
          </div>
        </section>

        {/* PRIMARY TRAITS */}
        <section className="res-section">
          <div className="section-inner">
            <div className="section-tag reveal">Primary Framework</div>
            <h2 className="section-h reveal">Two dimensions that define your <em>income strategy.</em></h2>
            <p className="section-sub reveal">These traits have the most influence on which retirement income structure matches your psychology.</p>
            
            <div className="trait-grid">
              {/* Income Source */}
              <div className="trait-card reveal d1">
                <div className="trait-num">01 / SOURCE</div>
                <div className="trait-name">Income Source</div>
                <div className="trait-result">
                  <div className="trait-result-dot"></div> {tr.incomeSource}
                </div>
                <div className="trait-spectrum">
                  <div className="spectrum-labels">
                    <span className="spec-label">Contractual</span>
                    <span className="spec-label">Market-Driven</span>
                  </div>
                  <div className="spectrum-track">
                    <div className="spectrum-fill" id="spec-income-source" style={{ width: '0%' }}>
                      <div className="spectrum-marker"></div>
                    </div>
                  </div>
                </div>
                <div className="trait-body">{incomeSourceCopy}</div>
              </div>

              {/* Income Structure */}
              <div className="trait-card reveal d2">
                <div className="trait-num">02 / STRUCTURE</div>
                <div className="trait-name">Income Structure</div>
                <div className="trait-result">
                  <div className="trait-result-dot"></div> {tr.incomeStructure}
                </div>
                <div className="trait-spectrum">
                  <div className="spectrum-labels">
                    <span className="spec-label">Committed</span>
                    <span className="spec-label">Adjustable</span>
                  </div>
                  <div className="spectrum-track">
                    <div className="spectrum-fill" id="spec-income-structure" style={{ width: '0%' }}>
                      <div className="spectrum-marker"></div>
                    </div>
                  </div>
                </div>
                <div className="trait-body">{incomeStructCopy}</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECONDARY TRAITS */}
        <section className="res-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <div className="section-inner">
            <div className="section-tag reveal">Secondary Dimensions</div>
            <h2 className="section-h reveal">Four traits that shape your <em>planning approach.</em></h2>
            
            <div className="secondary-grid">
              {secondaryTraits.map((t, i) => {
                const copy = t.val ? SECONDARY_TRAIT_COPY[secondaryKey(t.val)] : '';
                return (
                  <div key={t.label} className={`sec-card reveal d${i+1}`}>
                    <span className="sec-card-icon">{t.icon}</span>
                    <div className="sec-num">{t.num} / {t.label}</div>
                    <div className="sec-name">{t.label}</div>
                    <div className="sec-result">{t.val}</div>
                    <p className="sec-body">
                      {copy ? copy.split('\n\n')[0] : t.desc}
                    </p>
                    <div className="sec-bar-wrap">
                      <div className="sec-bar" id={t.id}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PERSONA */}
        <section className="res-section" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="section-inner">
            <div className="section-tag reveal">Relationship Persona</div>
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
                <div className="matrix-label-top">
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
                <div className="matrix-label-bottom">
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
              <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="final-btn no-underline">
                {cta.btnText} →
              </a>
              <p className="cta-note">
                Adam Kazinec · RICP® ChFC® CLU® · Chamblee, GA · No Obligation
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-12 border-t border-white/5 bg-black/40">
        <div className="section-inner flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-3 font-display font-bold text-lg">
            <div className="w-8 h-8 bg-white/10 text-cyan-400 rounded-lg flex items-center justify-center text-sm font-extrabold border border-cyan-400/20">A</div>
            ALIGN
          </div>
          <p className="text-xs text-white/20 tracking-wide">
            © 2026 Convergent Financial Partners · Adam Kazinec · Chamblee, GA · FINRA Registered
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Disclosures</a>
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
