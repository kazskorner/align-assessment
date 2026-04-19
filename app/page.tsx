'use client';

import React, { useState, useEffect } from 'react';
import './landing.css';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [assessmentCount, setAssessmentCount] = useState(77);

  useEffect(() => {
    // 1. Fetch "real" count (+ user offset of 47) from DB
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/quiz-count');
        const data = await res.json();
        if (data.count) {
          setAssessmentCount(data.count);
        }
      } catch (err) {
        console.error('Counter fetch failed', err);
      }
    };
    fetchCount();

    // 2. Initial jump to make it feel "live" on load
    const timer = setTimeout(() => {
      setAssessmentCount(prev => prev + 1);
    }, 5000);

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
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);



  return (
    <>
      {/* ── NAV ── */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '64px', width: 'auto' }} />
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
            src="https://www.youtube.com/embed/fD5UqsrtuG4?autoplay=1&mute=1&loop=1&playlist=fD5UqsrtuG4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&version=3&rel=0"
            title="ALIGN Hero Background"
            frameBorder="0"
            className="hero-video"
            style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          ></iframe>
          <div className="hero-video-overlay"></div>
        </div>



        <div className="hero-inner">
          <h1>
            Align your capital<br />
            <em>with your convictions.</em>
          </h1>

          <p className="hero-subtext">
            Most retirement strategies fail not because of bad math, but because of <strong>emotional misalignment.</strong> Define your Wealth Implementation Persona in Less than 17 minutes.
          </p>

          <div className="hero-cta-group">
            <a href="/quiz" target="_blank" className="btn-primary">Begin Assessment <span className="btn-arr">→</span></a>
            <a href="#why" className="btn-secondary">Why It Matters</a>
          </div>
          <p className="hero-meta">
            No personally identifiable information is collected. &nbsp;·&nbsp;
            <span className="live-counter">
              <span className="live-dot"></span>
              <strong>{assessmentCount}</strong> Assessments Completed
            </span>
          </p>

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
          <div className="stat-label">Leveraging RICP&reg;, CLU&reg; & ChFC&reg; designations from <a href="https://www.theamericancollege.edu" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>The American College of Financial Services</a>.</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">7-DIMENSION STRESS TEST</div>
          <div className="stat-label">Translating your personal financial psychology and core metrics into your actionable strategy.</div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="problem" id="why">
        <div className="section-inner">
          <h2 className="section-h reveal d1" style={{ fontSize: 'clamp(32px, 5vw, 64px)', maxWidth: '1100px' }}>
            "A strategy you don't <em>emotionally believe in</em> is a strategy you cannot execute long-term."
          </h2>

          <div className="transform-card reveal d3">
            <div className="transform-grid">
              {/* Stage 1: Traditional */}
              <div className="transform-side side-trad">
                <div className="side-badge">Before</div>
                <div className="donut-wrap"></div>
                <div className="trad-labels">
                  <div>• Traditional Asset Allocation</div>
                  <div>• Generic Risk Tolerance Profile</div>
                  <div>• Annual Portfolio Reviews</div>
                </div>
              </div>

              {/* Stage 2: ALIGN */}
              <div className="transform-side side-align">
                <div className="side-badge">After</div>
                <div className="align-header">
                  <h3>ALIGN Strategy</h3>
                  <p>INTEGRATED ARCHITECTURE</p>
                </div>

                <div className="align-features">
                  <div className="feature-card">
                    <div className="feature-dot"></div>
                    <div className="feature-text">
                      <div className="feature-title">Tax Strategies</div>
                      <div className="feature-desc">Validated withdrawal sequences and asset location planning.</div>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-dot"></div>
                    <div className="feature-text">
                      <div className="feature-title">Income Engine</div>
                      <div className="feature-desc">Dynamic cash flow management and distribution.</div>
                    </div>
                  </div>
                  <div className="feature-card">
                    <div className="feature-dot"></div>
                    <div className="feature-text">
                      <div className="feature-title">Retirement Rhythm</div>
                      <div className="feature-desc">Lifestyle spending updates driven by your financial DNA.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ── */}
      <section className="video-sec">
        <div className="section-inner" style={{ textAlign: 'center' }}>

          <h2 className="section-h reveal d1">Why I created ALIGN</h2>
          <div className="video-wrap reveal d2">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/mzKr8hsrFSk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <p className="video-caption reveal d3">
            "Most retirement plans don't fail because of bad math, they fail because emotions and strategy don't match."
            <em>— Adam Kazinec</em>
          </p>
        </div>
      </section>

      {/* ── DISCOVER ── */}
      <section className="discover" id="discover">
        <div className="section-inner">

          <h2 className="section-h reveal d1">What you'll discover about your<br /><em>optimized retirement strategy.</em></h2>

          <div className="discover-grid">
            <div className="d-card reveal d1">
              <div className="d-card-title">Foundational Components</div>
              <p className="d-card-body">Think of these as your Retirement "Engine" and "Rhythm".</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d2">
              <div className="d-card-title">Nuanced Preferences</div>
              <p className="d-card-body">These dictate how we structure your income, protect your liquidity, and pace your distributions.</p>
              <div className="d-card-accent"></div>
            </div>
            <div className="d-card reveal d3">
              <div className="d-card-title">Implementation Persona</div>
              <p className="d-card-body">Strategic guidance on how best to partner with professionals to ensure your plan is executed with precision.</p>
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
              <p className="how-step-body">Answer key behavioral questions in less than 17 minutes.</p>
            </div>
            <div className="how-step reveal d2">
              <div className="how-step-num">02</div>
              <div className="how-step-title">Instant Personal Analysis</div>
              <p className="how-step-body">Receive your ALIGN report.</p>
            </div>
            <div className="how-step reveal d3">
              <div className="how-step-num">03</div>
              <div className="how-step-title">Strategy Integration</div>
              <p className="how-step-body">Opportunity to schedule a strategy session to integrate these insights into your retirement plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ADAM ── */}
      <section className="about" id="adam">
        <div className="about-inner">
          <div className="about-left reveal d1">
            <div className="adam-photo-wrap">
              <img src="/adam-headshot.jpg" alt="Adam Kazinec" className="adam-photo" />
              <div className="adam-photo-badge">Adam Kazinec RICP® ChFC® CLU®</div>
            </div>
          </div>
          <div className="about-right reveal d2">
            <div className="about-tag">About Adam Kazinec</div>
            <h2 className="about-h">Financial planning should feel <em>deeply personal.</em></h2>
            <p className="about-body">Adam replaces standard financial benchmarks with a rigorous, high-level exploration of your goals and your relationship with risk. By utilizing a framework built on multigenerational expertise, he helps families move beyond simple withdrawal percentages and into a bespoke strategy for You. For those seeking to preserve and grow what they have built, Adam offers the architectural insight necessary for a seamless transition into their next chapter.</p>
            <div className="about-creds">
              <div className="about-cred"><div className="cred-dot"></div> Host of Kaz's Korner Retirement Podcast & <a href="https://www.youtube.com/@KazsKornerPodcast" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>YouTube Channel</a></div>
              <div className="about-cred"><div className="cred-dot"></div> Founder of ALIGN Assessment Framework</div>
              <div className="about-cred"><div className="cred-dot"></div> Specialist in Retirement Guardrails & Time Segmentation</div>
            </div>
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}
      <section className="faq">
        <div className="section-inner">
          <h2 className="section-h reveal d1">Frequently Asked Questions.</h2>
          <div className="faq-grid">
            {[
              { q: 'Who is this assessment for?', a: 'For anyone within 10 years of retirement (or already retired) who feels their current financial plan doesn\'t reflect their personality.' },
              { q: 'Is there a cost for the report?', a: 'The ALIGN assessment and your personalized report are a free value-added service designed to provide you with immediate strategic clarity.' },
              { q: 'How long do I have to wait for results?', a: 'Zero wait time. Your results are generated instantly and displayed on your screen, with a PDF download link sent to your email.' },
              { q: 'Is my data kept private?', a: 'Absolutely. We do not sell your data. Your responses are used solely to generate your personalized retirement alignment report.' }
            ].map((item, index) => (
              <div key={index} className={`faq-item ${faqOpen === index ? 'open' : ''}`}>
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
        <div className="section-inner">
          <div className="section-tag">Start Today</div>
          <h2 className="section-h">Move beyond a money manager.<br />Hire a <em>distribution strategist.</em></h2>
          <p className="section-sub">Any advisor can help you build a pile; few have a process to help you spend it. Moving from growth to income is a psychological pivot a spreadsheet can’t solve. The ALIGN Assessment replaces generic ROI with a Return on Life framework—turning your balance sheet into a distribution strategy that prioritizes your life over your ledger.</p>
          <a href="/quiz" target="_blank" className="btn-primary" style={{ padding: '20px 48px', fontSize: '16px' }}>
            Execute My Strategy Now <span className="btn-arr">→</span>
          </a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          <img src="/logo.jpg" alt="ALIGN Logo" style={{ height: '24px', width: 'auto' }} />
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
