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
            <span className="subtitle-line">Precision math is universal. Our distinction is a human-centric strategy tailored to your specific behavioral and psychological preferences.</span>
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

          <div className="hero-trust">
            <div className="trust-item"><span className="trust-icon">✦</span> Multigeneration Experience</div>
            <div className="trust-div"></div>
            <div className="trust-item"><span className="trust-icon">✦</span> Personalized Report</div>
            <div className="trust-div"></div>
            <div className="trust-item"><span className="trust-icon">✦</span> Instant Results</div>
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
          <div className="stat-num" style={{ fontSize: '18px' }}>MULTIGENERATION</div>
          <div className="stat-label">EXPERIENCED ADVISOR</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">7</div>
          <div className="stat-label">DIMENSIONS ANALYZED</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ fontSize: '24px' }}>LESS THAN 17</div>
          <div className="stat-label">MINUTES TO COMPLETE</div>
        </div>
        <div className="stat-item">
          <div className="stat-num" style={{ fontSize: '24px' }}>PERSONALIZED</div>
          <div className="stat-label">RESULTS</div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="problem" id="why">
        <div className="section-inner">
          <div className="section-tag reveal">The Problem</div>
          <h2 className="section-h reveal d1">Great spreadsheets don't<br /><em>quiet 3:00 AM anxiety.</em></h2>
          <p className="section-sub reveal d2">You can have the perfect portfolio on paper, but if the strategy doesn't align with your emotional relationship with money, you'll abandon it the moment markets move.</p>

          <div className="problem-grid">
            <div className="problem-left reveal d1">
              <p className="problem-lead">A strategy you don't <strong>emotionally believe in</strong> is a strategy you cannot execute long-term.</p>
              <div className="problem-body">
                <p>Most financial plans are built for "The Average Client." But your tolerance for risk, your need for flexibility, and your desire for guaranteed income are unique. ALIGN bridges the gap between traditional financial math and your personal psychology.</p>
              </div>
            </div>
            <div className="problem-right reveal d2">
              <div className="mismatch-card">
                <div className="mismatch-title">The Cost of Misalignment</div>
                <div className="mismatch-pair">
                  <div className="mismatch-side bad">
                    <div className="ms-label">TRADITIONAL PLAN</div>
                    Maximizes for "Probability of Success"
                  </div>
                  <div className="mismatch-arrow">→</div>
                  <div className="mismatch-side good">
                    <div className="ms-label">ALIGNED PLAN</div>
                    Maximizes for "Probability of Adherence"
                  </div>
                </div>
                <div className="mismatch-cost">
                  <strong>The Result:</strong> Confidence during volatility instead of second-guessing your advisor at every turn.
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
          <div className="section-tag reveal">The Report</div>
          <h2 className="section-h reveal d1">What you'll discover in your<br /><em>personalized 12-page report.</em></h2>
          
          <div className="discover-grid">
            <div className="d-card reveal d1">
              <span className="d-num">DIMENSION 01</span>
              <div className="d-card-icon">🛡️</div>
              <div className="d-card-title">Income Security Preference</div>
              <p className="d-card-body">Do you truly prioritize growth, or do you need a "floor" of guaranteed income to feel comfortable spending?</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d2">
              <span className="d-num">DIMENSION 02</span>
              <div className="d-card-icon">⚙️</div>
              <div className="d-card-title">Implementation Style</div>
              <p className="d-card-body">Wants full control over every trade vs. preferring a set-it-and-forget-it automated income system.</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d3">
              <span className="d-num">DIMENSION 03</span>
              <div className="d-card-icon">🧠</div>
              <div className="d-card-title">Concerns &amp; Legacy</div>
              <p className="d-card-body">Identifies which risks (longevity, inflation, or market) actually keep you up at night so we can neutralize them.</p>
              <div className="d-card-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="personas">
        <div className="section-inner">
          <div className="section-tag reveal">Implementation Styles</div>
          <h2 className="section-h reveal d1">Everyone retires <em>differently.</em></h2>
          <div className="persona-grid">
            <div className="persona-card reveal d1">
              <div className="persona-tag">THE STABILITY SEEKER</div>
              <div className="persona-name">Prefers Certainty</div>
              <p className="persona-desc">You want to know exactly how much is hitting your bank account on the 1st of every month, regardless of what the S&amp;P 500 did yesterday.</p>
              <div className="persona-traits">
                <span className="p-trait">Contractual Income</span>
                <span className="p-trait">Low Volatility</span>
                <span className="p-trait">High Peace of Mind</span>
              </div>
            </div>
            <div className="persona-card reveal d2">
              <div className="persona-tag">THE STRATEGIC ADAPTIVE</div>
              <div className="persona-name">Prefers Flexibility</div>
              <p className="persona-desc">You are comfortable with market flux in exchange for total control and the ability to pivot your strategy as the world changes.</p>
              <div className="persona-traits">
                <span className="p-trait">Market Based</span>
                <span className="p-trait">Full Control</span>
                <span className="p-trait">Growth Potential</span>
              </div>
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
              <div className="how-step-title">Take the Quiz</div>
              <p className="how-step-body">Answer 20 questions about your goals, habits, and feelings about market volatility.</p>
            </div>
            <div className="how-step reveal d2">
              <div className="how-step-num">02</div>
              <div className="how-step-title">Get Instant Results</div>
              <p className="how-step-body">See your alignment score immediately and download your deep-dive 12-page PDF report.</p>
            </div>
            <div className="how-step reveal d3">
              <div className="how-step-num">03</div>
              <div className="how-step-title">Optional Review</div>
              <p className="how-step-body">Briefly connect with Adam to see how your results should impact your current strategy.</p>
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
        <div className="section-tag">Start Today — It's Free</div>
        <h2 className="section-h">Stop guessing.<br />Start <em>knowing your style.</em></h2>
        <p className="section-sub">The full ALIGN assessment takes less than 17 minutes and delivers a personalized report built around how you actually think—not a generic template.</p>
        <a href="/quiz" target="_blank" className="btn-primary" style={{ padding: '20px 48px', fontSize: '16px' }}>
          Identify My Gaps Now <span className="btn-arr">→</span>
        </a>
        <p className="cta-detail">Quick &amp; Free · Instant Results · 20 Years Experience</p>
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
