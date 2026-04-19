'use client';

import React, { useState, useEffect } from 'react';
import './landing.css';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);



  return (
    <>
      {/* ── NAV ── */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '32px', width: 'auto' }} />
        </div>
        <div className="nav-links">
          <a href="#why">Why It Matters</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
          <a href="/quiz" className="nav-cta">Take Assessment <span>→</span></a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="hero-video-bg">
          <iframe
            src="https://www.youtube.com/embed/fD5UqsrtuG4?autoplay=1&mute=1&loop=1&playlist=fD5UqsrtuG4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&version=3"
            title="ALIGN Hero Background"
            frameBorder="0"
            className="hero-video"
            style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          ></iframe>
          <div className="hero-video-overlay"></div>
        </div>

        <div className="hero-eyebrow-wrap">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot"></div>
            The ALIGN Retirement Assessment
          </div>
        </div>

        <div className="hero-inner">
          <h1>
            Align your capital<br />
            <em>with your convictions.</em>
            <span className="subtitle-line">Every financial institution can model the mathematics of a portfolio. But until now, none have successfully integrated your unique behavior and psychological preferences into the core strategy.</span>
          </h1>

          <p className="hero-subtext">
            Most retirement strategies fail not because of bad math, but because of <strong>emotional misalignment.</strong> Define your Wealth Implementation Persona in less than 17 minutes.
          </p>

          <div className="hero-cta-group">
            <a href="/quiz" className="btn-primary">
              Begin Assessment <span className="btn-arr">→</span>
            </a>
            <a href="#why" className="btn-secondary">
              Why it matters
            </a>
          </div>
        </div>

        <div className="hero-corner tl"></div>
        <div className="hero-corner tr"></div>
        <div className="hero-corner bl"></div>
        <div className="hero-corner br"></div>
      </section>

      <div className="divider"></div>

      {/* ── STAT STRIP ── */}
      <div className="stat-strip">
        <div className="stat-item">
          <div className="stat-num">17+ YEARS OF INHERITED EXPERTISE</div>
          <div className="stat-label">A proprietary assessment designed by a 2nd generation advisor.</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">ADVANCED PLANNING AUTHORITY</div>
          <div className="stat-label">Leveraging RICP&reg;, CLU&reg; & ChFC&reg; designations for complex income and asset strategies.</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">7-DIMENSION STRESS TEST</div>
          <div className="stat-label">Translating your personal financial psychology and core metrics into an exact, actionable strategy.</div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="problem" id="why">
        <div className="section-inner">
          <div className="section-tag reveal">The Challenge</div>
          <h2 className="section-h reveal d1" style={{ fontSize: 'clamp(32px, 5vw, 64px)', maxWidth: '900px' }}>
            "A strategy you don't <em>emotionally believe in</em> is a strategy you cannot execute long-term."
          </h2>

          <div className="problem-grid">
            <div className="problem-left reveal d1">
              <p className="problem-lead">Sophisticated math is only as effective as your <strong>ability to adhere to it.</strong></p>
              <div className="problem-body">
                <p>Most wealth management plans are built for "The Objective Investor." But your tolerance for risk, your need for autonomy, and your relationship with volatility are deeply personal. ALIGN bridges the gap between traditional financial modeling and your behavioral DNA.</p>
              </div>
            </div>
            <div className="problem-right reveal d2">
              <div className="mismatch-card" style={{ padding: '40px', background: '#fff' }}>
                <div className="mismatch-title" style={{ fontSize: '14px', color: 'var(--accent-mid)', marginBottom: '32px', letterSpacing: '0.05em' }}>THE STRATEGIC EVOLUTION</div>

                <div className="mismatch-comparison">
                  <div className="comparison-phase">
                    <div className="phase-label">TRADITIONAL INSTITUTIONS</div>
                    <ul className="phase-metrics">
                      <li><span>○</span> Risk Tolerance Score</li>
                      <li><span>○</span> Probability of Success (Monte Carlo)</li>
                      <li><span>○</span> Static Asset Allocation</li>
                    </ul>
                    <div className="phase-result">The "Optimal" Spreadsheet</div>
                  </div>

                  <div className="comparison-arrow">
                    <div className="arrow-line"></div>
                    <div className="arrow-head"></div>
                  </div>

                  <div className="comparison-phase align-phase" style={{ background: '#0047ff', color: '#fff', borderRadius: '12px', padding: '24px' }}>
                    <div className="phase-label" style={{ color: 'rgba(255,255,255,0.7)' }}>THE ALIGN SYSTEM</div>
                    <ul className="phase-metrics" style={{ color: '#fff' }}>
                      <li><span style={{ color: 'var(--cyan)' }}>✦</span> Probability of Adherence</li>
                      <li><span style={{ color: 'var(--cyan)' }}>✦</span> Emotional Conviction Levels</li>
                      <li><span style={{ color: 'var(--cyan)' }}>✦</span> Behavioral Error Mitigation</li>
                    </ul>
                    <div className="phase-result" style={{ color: 'var(--cyan)', fontWeight: '700' }}>Strategic Clarity & Sustainable Flow</div>
                  </div>
                </div>

                <div className="mismatch-cost" style={{ borderTop: '1px solid var(--border)', marginTop: '24px' }}>
                  <strong>The Reality:</strong> Mathematical precision is table stakes. ALIGN ensures your plan is resilient enough to survive the human at the center.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="video-sec">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <div className="section-tag reveal">Deep Dive</div>
          <h2 className="section-h reveal d1">Why ALIGN matters for you.</h2>
          <div className="video-wrap reveal d2">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/mzKr8hsrFSk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <p className="video-caption reveal d3">"Most retirement plans don't fail because of bad math—they fail because emotions and strategy don't align." — Adam Kazinec</p>
        </div>
      </section>

      {/* ── DISCOVER ── */}
      <section className="discover" id="discover">
        <div className="section-inner">
          <div className="section-tag reveal">Impact Analysis</div>
          <h2 className="section-h reveal d1">What you'll discover about your<br /><em>optimized retirement strategy.</em></h2>

          <div className="discover-grid">
            <div className="d-card reveal d1">
              <span className="d-num">COMPONENT 01</span>
              <div className="d-card-icon">🛡️</div>
              <div className="d-card-title">Foundational Components</div>
              <p className="d-card-body">The bedrock of your strategy: Determining the absolute threshold of capital security required to support your lifestyle without compromise.</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d2">
              <span className="d-num">COMPONENT 02</span>
              <div className="d-card-icon">⚙️</div>
              <div className="d-card-title">Nuanced Preferences</div>
              <p className="d-card-body">Beyond risk tolerance: Identifying the specific implementation nuances—from autonomy to automated flow—that define your comfort zone.</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d3">
              <span className="d-num">COMPONENT 03</span>
              <div className="d-card-icon">🧠</div>
              <div className="d-card-title">Implementation Persona</div>
              <p className="d-card-body">The execution roadmap: Strategic guidance on how best to partner with professionals to ensure your plan is executed with precision.</p>
              <div className="d-card-accent"></div>
            </div>
          </div>
        </div>
      </section>



      {/* ── HOW IT WORKS ── */}
      <section className="how">
        <div className="section-inner">
          <div className="section-tag reveal">The Process</div>
          <h2 className="section-h reveal d1">How to get your assessment.</h2>
          <div className="how-steps">
            <div className="how-step reveal d1">
              <div className="how-step-num">01</div>
              <div className="how-step-title">Take the Assessment</div>
              <p className="how-step-body">Answer key behavioral questions designed to identify your Wealth Implementation Persona in less than 17 minutes.</p>
            </div>
            <div className="how-step reveal d2">
              <div className="how-step-num">02</div>
              <div className="how-step-title">Instant Personal Analysis</div>
              <p className="how-step-body">Receive your immediate alignment score and foundational results to better understand your capital conviction levels.</p>
            </div>
            <div className="how-step reveal d3">
              <div className="how-step-num">03</div>
              <div className="how-step-title">Strategy Integration</div>
              <p className="how-step-body">Benefit from a private strategy review with Adam to integrate these behavioral insights into your long-term retirement navigation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ADAM ── */}
      <section className="about" id="adam">
        <div className="about-inner">
          <div className="about-left reveal d1">
            <div className="adam-photo-wrap">
              <img src="https://images.squarespace-cdn.com/content/v1/67272895690b213b3e244837/4243a3fa-2388-466d-88b6-df0549419eee/Adam-headshot.jpg?format=500w" alt="Adam Kazinec" className="adam-photo" />
              <div className="adam-photo-badge">Multigeneration Experience</div>
            </div>
          </div>
          <div className="about-right reveal d2">
            <div className="about-tag">About Adam Kazinec</div>
            <h2 className="about-h">Financial planning should feel <em>deeply personal.</em></h2>
            <p className="about-body">Adam believes that true financial confidence doesn't come from a generic spreadsheet—it comes from an honest conversation about your goals, your vision, and your relationship with risk. With multigenerational experience, he has helped people step into retirement with genuine clarity and peace of mind.</p>
            <div className="about-creds">
              <div className="about-cred"><div className="cred-dot"></div> Host of Kaz's Korner Retirement Podcast</div>
              <div className="about-cred"><div className="cred-dot"></div> Founder of ALIGN Assessment Framework</div>
              <div className="about-cred"><div className="cred-dot"></div> Specialist in Retirement Income Guardrails</div>
            </div>
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}
      <section className="faq">
        <div className="section-inner">
          <div className="section-tag reveal">Questions</div>
          <h2 className="section-h reveal d1">Frequently Asked Questions.</h2>
          <div className="faq-grid">
            {[
              { q: 'Who is this assessment for?', a: 'For anyone within 10 years of retirement (or already retired) who feels their current financial plan doesn\'t reflect their personality.' },
              { q: 'Is there a cost for the report?', a: 'The basic assessment and initial 12-page report are completely free. No credit card is required to see your results.' },
              { q: 'How long do I have to wait for results?', a: 'Zero wait time. Your results are generated instantly and displayed on your screen, with a PDF download link sent to your email.' },
              { q: 'Is my data kept private?', a: 'Absolutely. We do not sell your data. Your responses are used solely to generate your personalized retirement alignment report.' }
            ].map((item, index) => (
              <div key={index} className={`faq-item reveal d${index + 1} ${faqOpen === index ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                  <span>{item.q}</span>
                  <div className="faq-icon">+</div>
                </div>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div className="cta-band reveal">
        <div className="section-tag">Strategic Clarity — Start Today</div>
        <h2 className="section-h">Move beyond the generic plan.<br />Discover the strategy <em>you were meant to execute.</em></h2>
        <p className="section-sub">The full ALIGN assessment takes less than 17 minutes and delivers a personalized behavioral analysis built around the psychological preferences that drive your stewardship.</p>
        <a href="/quiz" target="_blank" className="btn-primary" style={{ padding: '20px 48px', fontSize: '16px' }}>
          Execute My Strategy Now <span className="btn-arr">→</span>
        </a>
        <p className="cta-detail">Private &amp; Secure · Instant Strategic Insights · Multigenerational Experience</p>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '24px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
        </div>
        <div className="foot-copy">© 2026 ALIGN Assessment. Part of Kaz's Korner Ecosystem. All rights reserved.</div>
        <div className="foot-links">
          <a href="#why">Why It Matters</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
          <a href="/quiz">Take Assessment ↗</a>
        </div>
      </footer>
    </>
  );
}
