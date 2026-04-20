'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import NeuralBackground from '../components/NeuralBackground';
import { PRIMARY_TRAIT_COPY, SECONDARY_TRAIT_COPY, PERSONA_COPY } from '../../lib/quiz-copy';
import './results.css';

const CTA_CONFIG: any = {
  A: {
    heading: "Your strategy isn't built yet.",
    sub: "You have the profile of a Strategic Principal. This warrants a direct conversation to bridge your persona with a high-conviction architecture.",
    btnText: "Schedule Strategy Session",
    btnUrl: "https://calendly.com/adam-kazinec/align-strategy-session",
    card1: { num: "01", title: "Architecture Review", body: "We map your ALIGN results to a specific income framework built for HNW profiles." },
    card2: { num: "02", title: "Gap Analysis", body: "Identify where your current portfolio origins might conflict with your cash flow governance." },
    card3: { num: "03", title: "Governance Design", body: "Create a legacy-ready structure that synchronizes your capital with your lifestyle convictions." }
  },
  B: {
    heading: "Your strategy isn't built yet.",
    sub: "As a Growth Visionary, your path to 'enough' requires intentional pivots. Let's align your current trajectory with your long-term engine.",
    btnText: "Book Discovery Call",
    btnUrl: "https://calendly.com/adam-kazinec/align-discovery-call",
    card1: { num: "01", title: "Momentum Audit", body: "Evaluate your current growth velocity against your targeted retirement rhythm." },
    card2: { num: "02", title: "Pivot identification", body: "Pinpoint where systematic adjustments can transform wealth into sustainable income." },
    card3: { num: "03", title: "Strategic Roadmap", body: "Define the specific steps needed to transition from 'accumulation' to 'distribution'." }
  },
  C: {
    heading: "Build your foundation.",
    sub: "Clarity is the first step. Use these insights as a baseline for your future retirement rhythm and educational framework.",
    btnText: "Review Master Guide",
    btnUrl: "https://retirewithkaz.com/guide",
    card1: { num: "01", title: "Education First", body: "Deep dive into the core mechanics of contractual vs. market-driven income." },
    card2: { num: "02", title: "Baseline Mapping", body: "Use your ALIGN profile to evaluate your current savings strategy." },
    card3: { num: "03", title: "Long Game Plan", body: "Establish the habits that will sustain your wealth through different retirement chapters." }
  }
};

const TIER_MESSAGING = {
  A: {
    tagline: "you’ve achieved the summit.",
    emp: "Now, let’s architect the view.",
    sub: "Your results indicate a sophisticated wealth profile that requires a high-conviction governance model. Below is your bespoke ALIGN Strategic Outlook, designed to synchronize your capital origins with a legacy of lifestyle certainty."
  },
  B: {
    tagline: "your momentum is clear.",
    emp: "Now, let’s align your trajectory.",
    sub: "You are entering a critical phase of wealth optimization. Your ALIGN assessment highlights the key pivots needed to transition your current growth into a sustainable, long-term income engine. Let’s explore your path to ‘enough’."
  },
  C: {
    tagline: "clarity is the first step.",
    emp: "Now, let’s build your foundation.",
    sub: "Understanding the mechanics of your future income is essential to long-term success. Your ALIGN results provide a baseline for your retirement rhythm, offering a clear framework for how you can begin to structure your path forward."
  }
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
        <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="nav-cta">
          {cta.btnText}
        </a>
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
              src="/hero-video.mp4"
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
              "Your ALIGN results represent more than data; they reflect your personal philosophy on capital stewardship. 
              Below, we break down the <strong>Strategic Architecture</strong> of your plan—starting with the core mechanics 
              that will drive and sustain your future."
            </p>
          </div>
        </section>

        {/* FOUNDATIONAL COMPONENTS | STRATEGIC ARCHITECTURE */}
        <section className="res-section">
          <div className="section-inner">
            <div className="section-tag reveal">Foundational Components | Strategic Architecture</div>
            <h2 className="section-h reveal">The <em>Engine & The Rhythm.</em></h2>
            <p className="section-sub reveal">
              Every resilient strategy requires a dual-focus: <strong>Capital Origins</strong> and <strong>Cash Flow Governance.</strong> 
              We begin by identifying the ‘Engine’—the sophisticated sources that will generate your revenue—and the 
              ‘Rhythm’—the structural cadence that ensures your wealth supports your lifestyle without interruption.
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
