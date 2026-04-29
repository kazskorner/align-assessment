'use client';

import React, { useState, useEffect } from 'react';
import './landing.css';

/* ─── Car Accordion Panel ─── */
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
      onClick={() => {
        setActive(true);
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className="car-bg"
        style={{ backgroundImage: `url('${panel.img}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
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

const CAR_PANELS: CarPanelData[] = [
  {
    num: '01',
    label: 'Primary Traits — The Engine',
    tag: '01 — Primary Traits',
    title: 'The Engine',
    body: "The engine determines how the car fundamentally runs. If the engine is built for stability, the ride feels smooth and dependable. If it's built for performance and flexibility, the ride may change depending on conditions. Your primary traits shape the core way your retirement plan operates day to day.",
    img: '/Car_Engine.jpg',
    key: 'car1',
  },
  {
    num: '02',
    label: 'Secondary Traits — The Interior Features',
    tag: '02 — Secondary Traits',
    title: 'The Interior Features',
    body: "The seats, temperature controls, sound system, and storage spaces affect how comfortable you feel while riding in the car. Secondary traits influence how you emotionally experience retirement — how comfortable you feel spending, saving, accessing money, and adapting along the way.",
    img: '/Car_Interior.jpg',
    key: 'car2',
  },
  {
    num: '03',
    label: 'Implementation — The Driver Assistance System',
    tag: '03 — Implementation',
    title: 'The Driver Assistance System',
    body: "Some people want full GPS guidance, lane assist, and alerts helping them drive. Others prefer full control with minimal assistance. Implementation reflects how you prefer to make decisions and how much guidance or support you want while navigating retirement.",
    img: '/Car_Navigation.jpg',
    key: 'car3',
  },
];

const HOW_STEPS = [
  {
    num: '01',
    title: 'Take the Assessment',
    body: "No financial knowledge required. Questions explore how you think and feel about income, risk, flexibility, and your retirement vision — not your account balances.",
  },
  {
    num: '02',
    title: 'Instant Personalized Report',
    body: "Receive a comprehensive report showing your exact profile — with detailed descriptions of what each result means and how it should shape your retirement strategy.",
  },
  {
    num: '03',
    title: 'Qualify for a Strategy Session',
    body: "If your results indicate a strong alignment fit, you\'ll have the opportunity to schedule a one-on-one strategy session with Adam — where your assessment insights become the foundation for a concrete retirement income plan.",
  },
];

const FAQ_ITEMS = [
  {
    q: 'Who is this assessment designed for?',
    a: "Anyone who is planning for retirement, nearing retirement, or already retired and wants to stress-test their current strategy. Whether you're 10 years out or already drawing income, understanding your emotional relationship with money will help you build — or refine — a plan you'll actually stick with.",
  },
  {
    q: 'How long does the full assessment take?',
    a: "The full ALIGN assessment takes approximately 8 minutes to complete. You'll receive a personalized, multi-dimensional report immediately when you finish — no waiting, and you don't need to speak with anyone to see your results.",
  },
  {
    q: "Is this really free? What's the catch?",
    a: "It's completely free, with no hidden obligation. Adam believes that clarity about your financial psychology should be accessible before any financial decision. If your results qualify you for a personalized strategy session, you'll have the option to schedule one — but there is absolutely no pressure or obligation to do so.",
  },
  {
    q: 'Does the assessment recommend specific products?',
    a: "No. The ALIGN assessment identifies your behavioral and emotional preferences — it does not recommend specific financial products. Your results tell you what types of strategies fit your psychology. Any specific product discussion happens separately, if and when you choose to engage.",
  },
  {
    q: 'I already have a financial advisor. Should I still take this?',
    a: "Absolutely. Many people who take the assessment are surprised to discover that their current strategy doesn't align with how they actually think about money — even when the numbers look fine. The results can be a powerful conversation starter with your existing advisor, or help you identify if a second opinion is worth seeking.",
  },
  {
    q: 'Why does emotional alignment matter as much as the math?',
    a: "After nearly 20 years, Adam's consistent observation is that plans fail not because the math was wrong — but because the client couldn't stay committed to the strategy. A plan that conflicts with your instincts will be abandoned under pressure, exactly when discipline matters most. Alignment isn't a nice-to-have. It's the foundation everything else is built on.",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  /* Close mobile menu when a link is clicked */
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── NAV ── */}
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-logo">
          <img
            src="/ALIGN_Logo_White_Primary.png"
            alt="ALIGN"
            className="nav-logo-img nav-logo-img--light"
          />
          <img
            src="/ALIGN_Logo_Black_Primary.png"
            alt="ALIGN"
            className="nav-logo-img nav-logo-img--dark"
          />
        </div>

        <div className="nav-links">
          <a href="#why">Why It Matters</a>
          <a href="#video">Watch</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
        </div>

        <a href="/quiz" target="_blank" className="nav-cta">
          Take the Assessment →
        </a>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nav-mobile-menu${menuOpen ? ' open' : ''}`} id="mobile-menu">
        <button
          className="nav-mobile-close"
          id="mobile-close"
          aria-label="Close menu"
          onClick={closeMenu}
        >
          ✕
        </button>
        <a href="#why" className="mobile-link" onClick={closeMenu}>Why It Matters</a>
        <a href="#video" className="mobile-link" onClick={closeMenu}>Watch</a>
        <a href="#discover" className="mobile-link" onClick={closeMenu}>What You Learn</a>
        <a href="#adam" className="mobile-link" onClick={closeMenu}>About Adam</a>
        <a href="/quiz" target="_blank" className="nav-mobile-cta" onClick={closeMenu}>
          Take the Assessment →
        </a>
      </div>

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="hero-video-bg">
          <video autoPlay muted loop playsInline preload="auto" className="hero-video">
            <source src="/Align_Hero_Video_W_Words_Rev_3_Compressed.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-corner tl" />
        <div className="hero-corner tr" />
        <div className="hero-corner bl" />
        <div className="hero-corner br" />

        <div className="hero-inner">
          <h1>
            <span className="subtitle-line">Discover Your Retirement Income Personality</span>
          </h1>

          <p className="hero-subtext">
            After nearly 20 years helping people retire, I&apos;ve found that most retirement plans
            fail for one reason:{' '}
            <strong>the strategy doesn&apos;t match how you actually think and feel about money.</strong>{' '}
            This changes that.
          </p>

          <div className="hero-cta-group">
            <a href="/quiz" target="_blank" className="btn-primary">
              Discover My Income Personality <span className="btn-arr">→</span>
            </a>
            <a href="#video" className="btn-secondary">
              Watch Adam Explain ↓
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item"><span className="trust-icon">✦</span> Completely Free</div>
            <div className="trust-div" />
            <div className="trust-item"><span className="trust-icon">✦</span> 8 Minutes to Complete</div>
            <div className="trust-div" />
            <div className="trust-item"><span className="trust-icon">✦</span> Instant Personalized Results</div>
            <div className="trust-div" />
            <div className="trust-item"><span className="trust-icon">✦</span> No Obligation</div>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <div className="stat-strip">
        <div className="stat-item">
          <div className="stat-num">20<span>yrs</span></div>
          <div className="stat-label">Retirement Planning</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">8<span>min</span></div>
          <div className="stat-label">Assessment Time</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">40<span>+</span></div>
          <div className="stat-label">Unique Outcome Profiles</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">CLU<span className="stat-sep"> · </span>ChFC<span className="stat-sep"> · </span>RICP</div>
          <div className="stat-label">Professional Designations</div>
        </div>
      </div>

      {/* ── PROBLEM ── */}
      <section className="problem" id="why">
        <div className="section-inner">
          <div className="section-tag reveal">The Problem</div>
          <h2 className="section-h reveal d1">
            Most retirement plans fail<br />
            not because of bad <em>math —</em><br />
            but because of bad alignment.
          </h2>

          <div className="problem-grid">
            <div className="problem-left reveal">
              <p className="problem-lead">
                A plan you don&apos;t <strong>emotionally believe in</strong> is a plan you&apos;ll
                abandon under pressure — exactly when you need it most.
              </p>
              <p className="problem-body">
                I&apos;ve watched it happen hundreds of times. Someone builds a market-driven
                strategy but loses sleep during every downturn. Someone commits to a guaranteed
                income structure but resents the lack of flexibility. The strategy isn&apos;t wrong
                in theory — it&apos;s wrong <em>for them.</em>
                <br /><br />
                This misalignment creates real costs: unnecessary taxes, penalties for getting out
                of the wrong products, missed growth, and worst of all — a retirement built around
                anxiety instead of confidence.
                <br /><br />
                Two households that look financially identical can require completely different
                strategies. Your neighbor&apos;s plan is not your plan. The ALIGN assessment
                identifies exactly where you fall on every spectrum that matters — so we can build
                something that fits.
              </p>
            </div>

            <div className="problem-right reveal d2">
              <div className="mismatch-card">
                <div className="mismatch-title">
                  The Costly Mismatch in Action
                </div>

                {/* Zone 1 – Misaligned top row */}
                <div className="mismatch-pair mismatch-pair--bad">
                  <div className="mismatch-side bad bad-left">
                    <div className="ms-label">Their Emotions</div>
                    Needs reliable income regardless of market. Loses sleep during volatility.
                  </div>
                  <div className="mismatch-arrow mismatch-arrow--bad">≠</div>
                  <div className="mismatch-side bad bad-right">
                    <div className="ms-label">Their Strategy</div>
                    Fully market-driven portfolio. Income depends on performance.
                  </div>
                </div>

                {/* Zone 2 – Navy chaos / cost band */}
                <div className="mismatch-chaos">
                  <div className="mismatch-chaos-label">The Real Cost</div>
                  <p className="mismatch-cost">
                    <strong>Panic selling</strong> at the bottom, unnecessary fees to restructure,
                    emotional decisions that compound across <strong>20+ years</strong> of retirement.
                  </p>
                  <div className="mismatch-transition-bar">
                    <span className="mt-label mt-tension">TENSION</span>
                    <div className="mt-track">
                      <div className="mt-dot" />
                    </div>
                    <span className="mt-label mt-harmony">HARMONY</span>
                  </div>
                </div>

                {/* Zone 3 – Aligned good row */}
                <div className="mismatch-pair mismatch-pair--good">
                  <div className="mismatch-side good">
                    <div className="ms-label">Their Emotions</div>
                    Same person — but strategy matches their psychology.
                  </div>
                  <div className="mismatch-arrow">→</div>
                  <div className="mismatch-side good">
                    <div className="ms-label">The Result</div>
                    Contractual income floor. Sleep. Confidence. Commitment.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── VIDEO ── */}
      <section className="video-sec" id="video">
        <div className="section-inner">
          <div className="section-tag" style={{ marginBottom: '16px' }}>Hear It From Adam</div>
          <h2 className="section-h">Why I Created ALIGN.</h2>
        </div>

        <div className="video-wrap reveal" style={{ maxWidth: '800px', margin: '48px auto 0' }}>
          <iframe
            src="https://www.youtube.com/embed/sJzrmBE8lic?rel=0&modestbranding=1"
            title="Adam Kazinec explains the ALIGN assessment"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="video-caption reveal d2">
          &ldquo;A strategy or a plan that you put in place that doesn&apos;t connect to your
          emotional status will not be a strategy you stick to.&rdquo; — Adam Kazinec, CLU,
          ChFC, RICP
        </p>
      </section>

      {/* ── DISCOVER ── */}
      <section className="discover" id="discover">
        <div className="section-inner">
          <div className="section-tag">What You Discover</div>
          <h2 className="section-h reveal d1">
            Think of your retirement plan<br />like a <em>car.</em>
          </h2>
          <p className="section-sub reveal d2" style={{ maxWidth: '680px' }}>
            Every car has an engine, an interior, and a driver assistance system. Each one plays a
            different role — and together, they determine how the whole ride feels. Your retirement
            plan works the same way. The ALIGN assessment reveals all three layers of how yours is
            built.
          </p>

          <div className="car-accordion-wrap reveal" style={{ marginTop: '56px', maxWidth: '780px' }}>
            {CAR_PANELS.map((panel, i) => (
              <CarPanel key={panel.key} panel={panel} defaultActive={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how">
        <div className="section-inner">
          <div className="section-tag">How It Works</div>
          <h2 className="section-h reveal d1">
            Three steps to your<br /><em>personalized results.</em>
          </h2>

          <div className="how-steps">
            {HOW_STEPS.map((s, i) => (
              <div key={i} className={`how-step reveal d${i + 1}`}>
                <div className="how-step-num">{s.num}</div>
                <div className="how-step-title">{s.title}</div>
                <div className="how-step-body">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ADAM ── */}
      <section className="about" id="adam" style={{ padding: '100px 48px' }}>
        <div className="about-inner">
          <div className="about-left reveal">
            <div className="adam-photo-wrap">
              <img className="adam-photo" src="/adam-headshot.jpg" alt="Adam Kazinec" />
              <div className="adam-photo-badge">
                CLU · ChFC · RICP<br />Retirement Income<br />Certified Professional
              </div>
            </div>
          </div>

          <div className="about-right reveal d2">
            <div className="about-tag">About Adam Kazinec</div>
            <h2 className="about-h">
              Nearly two decades.<br />One consistent conclusion:<br /><em>the numbers aren&apos;t enough.</em>
            </h2>
            <p className="about-body">
              After almost 20 years of helping individuals plan for retirement, enter retirement,
              and live throughout their retirement, Adam has reached a consistent conclusion: the
              plans that fail aren&apos;t failing because of math. They&apos;re failing because the
              strategy doesn&apos;t match the emotional construct of the person executing it.
              <br /><br />
              Two households that look financially identical — same assets, same timeline, same
              income needs — can require completely different strategies. Because the people are
              different. Their tolerance for uncertainty is different. Their relationship with money
              is different. Their priorities are different.
              <br /><br />
              The ALIGN assessment exists because Adam believes clarity about your financial
              psychology should come before any product recommendation — not after.
            </p>
            <div className="about-creds">
              <div className="about-cred"><div className="cred-dot" />Chartered Life Underwriter (CLU)</div>
              <div className="about-cred"><div className="cred-dot" />Chartered Financial Consultant (ChFC)</div>
              <div className="about-cred"><div className="cred-dot" />Retirement Income Certified Professional (RICP)</div>
              <div className="about-cred"><div className="cred-dot" />Nearly 20 years specializing in retirement income planning</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq" id="faq">
        <div className="section-inner">
          <div className="section-tag">Common Questions</div>
          <h2 className="section-h" style={{ marginBottom: '16px' }}>
            Everything you need to<br />know before you <em>begin.</em>
          </h2>
        </div>

        <div className="faq-grid">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={index}
              className={`faq-item${faqOpen === index ? ' open' : ''}`}
            >
              <div className="faq-q" onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                <span>{item.q}</span>
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div className="cta-band">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'left', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-tag" style={{ marginBottom: '20px' }}>Start Today — It&apos;s Free</div>
          <h2 className="section-h" style={{ margin: '0 0 20px' }}>
            Move beyond a money manager.<br /><em>Hire a distribution strategist.</em>
          </h2>
          <p className="section-sub" style={{ margin: '0 0 44px' }}>
            The ALIGN assessment takes 8 minutes and delivers a personalized map of your financial
            personality — built around how you actually think and feel about money. Not a template.
            Not generic advice. Yours.
          </p>
          <a
            href="/quiz"
            target="_blank"
            className="btn-primary"
            style={{ fontSize: '16px', padding: '18px 40px' }}
          >
            Discover My Retirement Income Personality <span className="btn-arr">→</span>
          </a>
          <div className="cta-detail" style={{ textAlign: 'left', marginTop: '20px' }}>
            Free · 8 Minutes · Instant Results · No Obligation
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer>
        <div className="foot-brand">
          <div className="nav-logo-mark">ALN</div>
          ALIGN by Adam Kazinec
        </div>
        <div className="foot-copy">
          Assessment for Long-term Income &amp; Goal Navigation · © 2026 Adam Kazinec · All rights reserved
        </div>
        <div className="foot-links">
          <a href="#why">Why It Matters</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
          <a href="/quiz" target="_blank">Take Assessment ↗</a>
        </div>
      </footer>
    </>
  );
}
