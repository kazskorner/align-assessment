'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LANDING_COPY } from '../lib/quiz-copy';
import './landing.css';

/** Animates a number rolling up from `from` to `to` over `duration` ms. */
function useRollingCounter(target: number, duration = 1800) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return display;
}

/** Individual car accordion panel — hover or click to expand */
interface CarPanelData {
  num: string;
  label: string;
  tag: string;
  title: string;
  body: string;
  img: string;
  key: string;
}

function CarPanel({ panel, defaultActive }: { panel: CarPanelData; defaultActive?: boolean }) {
  const [active, setActive] = useState(!!defaultActive);

  return (
    <div
      className={`car-panel${active ? ' active' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
    >
      <div className="car-bg" style={{ backgroundImage: `url('${panel.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="car-overlay" />
      <div className="car-collapsed">
        <span className="car-num">{panel.num}</span>
        <span className="car-label">{panel.label}</span>
      </div>
      <div className="car-expanded">
        <div className="car-tag">{panel.tag}</div>
        <h3>{panel.title}</h3>
        <p>{panel.body}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [assessmentCount, setAssessmentCount] = useState(0);
  const displayCount = useRollingCounter(assessmentCount, 2000);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch('/api/quiz-count');
        const data = await res.json();
        if (data.count) setAssessmentCount(data.count);
      } catch (err) {
        console.error('Counter fetch failed', err);
        setAssessmentCount(77);
      }
    };
    fetchCount();

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
          <img src="/ALIGN_Logo_White_Primary.png" alt="ALIGN Logo" className="logo-white" style={{ height: '48px', width: 'auto' }} />
          <img src="/ALIGN_Logo_Black_Primary.png" alt="ALIGN Logo" className="logo-black" style={{ height: '48px', width: 'auto' }} />
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
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
          >
            <source src="/Align Results Hero Video Compressed.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>



        <div className="hero-inner">
          <h1>
            {LANDING_COPY.hero.title}<br />
            <em>{LANDING_COPY.hero.titleEmp}</em>
          </h1>

          <p className="hero-subtext">
            {LANDING_COPY.hero.subtext}
          </p>

          <div className="hero-cta-group">
            <a href="/quiz" target="_blank" className="btn-primary">{LANDING_COPY.hero.ctaPrimary} <span className="btn-arr">→</span></a>
            <a href="#why" className="btn-secondary">{LANDING_COPY.hero.ctaSecondary}</a>
          </div>
          <p className="hero-meta">
            {LANDING_COPY.hero.meta} &nbsp;·&nbsp;
            <span className="live-counter">
              <span className="live-dot"></span>
              <strong className="rolling-num">{displayCount}</strong> Assessments Completed
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
        {LANDING_COPY.stats.map((stat, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{stat.num}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
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
                    {LANDING_COPY.problem.features.map((f, i) => (
                      <div key={i} className="feature-card">
                        <div className="feature-dot"></div>
                        <div className="feature-text">
                          <div className="feature-title">{f.title}</div>
                          <div className="feature-desc">{f.desc}</div>
                        </div>
                      </div>
                    ))}
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
          <div className="section-tag">What You Discover</div>
          <h2 className="section-h reveal d1">Think of your retirement plan<br />like a <em>car.</em></h2>
          <p className="section-sub reveal d2" style={{ maxWidth: '680px' }}>
            Every car has an engine, an interior, and a driver assistance system. Each one plays a different role — and together, they determine how the whole ride feels. Your retirement plan works the same way. The ALIGN assessment reveals all three layers of how yours is built.
          </p>

          <div className="car-accordion-wrap reveal" style={{ marginTop: '56px', maxWidth: '780px' }}>

            {[
              {
                num: '01',
                label: 'Primary Traits — The Engine',
                tag: '01 — Primary Traits',
                title: 'The Engine',
                body: 'The engine determines how the car fundamentally runs. If the engine is built for stability, the ride feels smooth and dependable. If it\'s built for performance and flexibility, the ride may change depending on conditions. Your primary traits shape the core way your retirement plan operates day to day.',
                img: '/Car_Engine.jpg',
                key: 'car1',
              },
              {
                num: '02',
                label: 'Secondary Traits — The Interior Features',
                tag: '02 — Secondary Traits',
                title: 'The Interior Features',
                body: 'The seats, temperature controls, sound system, and storage spaces affect how comfortable you feel while riding in the car. Secondary traits influence how you emotionally experience retirement — how comfortable you feel spending, saving, accessing money, and adapting along the way.',
                img: '/Car_Interior.jpg',
                key: 'car2',
              },
              {
                num: '03',
                label: 'Implementation — The Driver Assistance System',
                tag: '03 — Implementation',
                title: 'The Driver Assistance System',
                body: 'Some people want full GPS guidance, lane assist, and alerts helping them drive. Others prefer full control with minimal assistance. Implementation reflects how you prefer to make decisions and how much guidance or support you want while navigating retirement.',
                img: '/Car_Navigation.jpg',
                key: 'car3',
              },
            ].map((panel, i) => (
              <CarPanel key={panel.key} panel={panel} defaultActive={i === 0} />
            ))}

          </div>
        </div>
      </section>



      {/* ── HOW IT WORKS ── */}
      <section className="how">
        <div className="section-inner">
          <div className="section-tag reveal">The Process</div>
          <h2 className="section-h reveal d1">How to get your assessment.</h2>
          <div className="how-steps">
            {LANDING_COPY.process.steps.map((s, i) => (
              <div key={i} className={`how-step reveal d${i+1}`}>
                <div className="how-step-num">{s.num}</div>
                <div className="how-step-title">{s.title}</div>
                <p className="how-step-body">{s.body}</p>
              </div>
            ))}
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
            <div className="about-tag">{LANDING_COPY.about.tag}</div>
            <h2 className="about-h">{LANDING_COPY.about.title}</h2>
            <p className="about-body">{LANDING_COPY.about.body}</p>
            <div className="about-creds">
              {LANDING_COPY.about.creds.map((cred, i) => (
                <div key={i} className="about-cred"><div className="cred-dot"></div> {cred}</div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ── FAQ ── */}
      <section className="faq">
        <div className="section-inner">
          <h2 className="section-h reveal d1">Frequently Asked Questions.</h2>
          <div className="faq-grid">
            {LANDING_COPY.faq.map((item, index) => (
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

      <div className="cta-band reveal">
        <div className="section-inner">
          <div className="section-tag">{LANDING_COPY.finalCta.tag}</div>
          <h2 className="section-h">{LANDING_COPY.finalCta.title}</h2>
          <p className="section-sub">{LANDING_COPY.finalCta.sub}</p>
          <a href="/quiz" target="_blank" className="btn-primary" style={{ padding: '20px 48px', fontSize: '16px' }}>
            {LANDING_COPY.finalCta.btn} <span className="btn-arr">→</span>
          </a>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          <img src="/ALIGN_Logo_Black_Primary.png" alt="ALIGN Logo" style={{ height: '24px', width: 'auto' }} />
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
