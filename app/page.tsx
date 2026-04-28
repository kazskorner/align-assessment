'use client';

import { useEffect } from 'react';
import './landing.css';

export default function Home() {
  useEffect(() => {
    // ─── NAV SCROLL EFFECT ─── 
    const nav = document.getElementById('nav');
    const handleScroll = () => {
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // ─── HAMBURGER MENU ─── 
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');

    const openMenu = () => {
      hamburger?.classList.add('open');
      mobileMenu?.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      hamburger?.classList.remove('open');
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', () => {
      mobileMenu?.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileClose?.addEventListener('click', closeMenu);

    mobileMenu?.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    return () => {
      hamburger?.removeEventListener('click', openMenu);
      mobileClose?.removeEventListener('click', closeMenu);
    };
  }, []);

  useEffect(() => {
    // ─── REVEAL ANIMATIONS (Intersection Observer) ─── 
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      ro.observe(el);
    });

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    // ─── CAROUSEL PANELS ─── 
    document.querySelectorAll('.car-panel').forEach((panel) => {
      panel.addEventListener('click', function () {
        document.querySelectorAll('.car-panel').forEach((p) => p.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }, []);

  useEffect(() => {
    // ─── FAQ TOGGLE ─── 
    (window as any).toggleFaq = function (el: HTMLElement) {
      const item = el.parentElement;
      if (!item) return;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };
  }, []);

  useEffect(() => {
    // ─── QUIZ LOGIC ─── 
    let curQ = 1;
    const answers: Record<number, number> = {};

    document.querySelectorAll('.opt').forEach((option) => {
      option.addEventListener('click', function (this: HTMLElement) {
        const q = (this as any).dataset.q;
        const s = parseInt((this as any).dataset.score);
        document.querySelectorAll(`.opt[data-q="${q}"]`).forEach((x) => x.classList.remove('sel'));
        this.classList.add('sel');
        answers[q] = s;
        const qnext = document.getElementById('qnext') as HTMLButtonElement;
        if (qnext) qnext.disabled = false;
      });
    });

    (window as any).qNext = function () {
      const qnext = document.getElementById('qnext') as HTMLButtonElement;
      if (!answers[curQ]) return;
      if (curQ < 5) {
        document.getElementById(`q${curQ}`)?.classList.remove('on');
        curQ++;
        document.getElementById(`q${curQ}`)?.classList.add('on');
        document.getElementById(`pb${curQ}`)?.classList.add('on');
        (document.getElementById('qback') as HTMLElement).style.visibility = 'visible';
        if (qnext) qnext.disabled = !answers[curQ];
        if (curQ === 5 && qnext) qnext.textContent = 'See My Results →';
      } else {
        showResults();
      }
    };

    (window as any).qPrev = function () {
      if (curQ > 1) {
        document.getElementById(`q${curQ}`)?.classList.remove('on');
        curQ--;
        document.getElementById(`q${curQ}`)?.classList.add('on');
        document.getElementById(`pb${curQ + 1}`)?.classList.remove('on');
        const qback = document.getElementById('qback') as HTMLElement;
        qback.style.visibility = curQ === 1 ? 'hidden' : 'visible';
        const qnext = document.getElementById('qnext') as HTMLButtonElement;
        if (qnext) {
          qnext.disabled = !answers[curQ];
          qnext.textContent = curQ === 5 ? 'See My Results →' : 'Continue →';
        }
      }
    };

    const showResults = () => {
      const total = Object.values(answers).reduce((a, b) => a + b, 0);
      const pct = Math.round((total / 20) * 100);

      document.querySelectorAll('.qblock').forEach((b) => {
        (b as HTMLElement).style.display = 'none';
      });
      (document.getElementById('qprog') as HTMLElement).style.display = 'none';
      (document.getElementById('qnav') as HTMLElement).style.display = 'none';
      (document.getElementById('results') as HTMLElement).style.display = 'block';

      const r = 45;
      const circ = 2 * Math.PI * r;

      setTimeout(() => {
        const rFill = document.getElementById('rFill') as SVGCircleElement;
        if (rFill) rFill.style.strokeDashoffset = String(circ - (circ * pct) / 100);
        animN(document.getElementById('rVal') as HTMLElement, 0, total, 1400);
      }, 300);

      const profiles = [
        {
          min: 0,
          max: 8,
          t: 'Significant Misalignment Detected',
          d: 'Your responses suggest a meaningful gap between how you think about money and how most strategies are built. This is the most important signal you can get — and exactly what ALIGN is designed to address.',
        },
        {
          min: 9,
          max: 12,
          t: 'Partially Aligned',
          d: 'You have some right pieces in place, but there are dimensions where strategy and psychology likely diverge. The full assessment will pinpoint exactly where the gaps are.',
        },
        {
          min: 13,
          max: 16,
          t: 'Largely Aligned',
          d: 'A solid foundation. There are still specific areas where fine-tuning could prevent quiet misalignments from compounding over time.',
        },
        {
          min: 17,
          max: 20,
          t: 'Strongly Aligned',
          d: 'Your instincts and approach are well-matched. The full assessment will confirm your strengths and identify any remaining blind spots worth addressing.',
        },
      ];

      const profile = profiles.find((x) => total >= x.min && total <= x.max) || profiles[0];
      const rTitle = document.getElementById('rTitle') as HTMLElement;
      const rDesc = document.getElementById('rDesc') as HTMLElement;
      if (rTitle) rTitle.textContent = profile.t;
      if (rDesc) rDesc.textContent = profile.d;

      const dims = [
        { name: 'Income Security Preference', score: answers[1] || 1, labels: ['Market-Driven', 'Blended', 'Stability-Leaning', 'Contractual'] },
        { name: 'Strategy Flexibility', score: answers[2] || 1, labels: ['Wants Full Control', 'Prefers Flexibility', 'Moderate', 'Committed Structure'] },
        { name: 'Income vs. Net Worth', score: answers[3] || 1, labels: ['Net Worth Focus', 'Portfolio Growth', 'Income-Leaning', 'Income Mindset'] },
        { name: 'Advisor Value', score: answers[4] || 1, labels: ['Self-Directed', 'Some Advisor Value', 'Values Guidance', 'High Advisor Value'] },
        { name: 'Spending Pattern', score: answers[5] || 1, labels: ['Back-Loaded', 'Even Spending', 'Somewhat Front-Loaded', 'Front-Loaded'] },
      ];

      const c = document.getElementById('rDims') as HTMLElement;
      if (c) {
        c.innerHTML = '';
        dims.forEach((d, i) => {
          const bp = Math.max(((d.score - 1) / 3) * 100, 5);
          const el = document.createElement('div');
          el.className = 'r-dim';
          el.innerHTML = `<div class="r-dim-name">${d.name}</div><div class="r-dim-track"><div class="r-dim-fill" id="df${i}"></div></div><div class="r-dim-val">${d.labels[d.score - 1]}</div>`;
          c.appendChild(el);

          setTimeout(() => {
            const f = document.getElementById(`df${i}`);
            if (f) f.style.width = bp + '%';
          }, 500 + i * 120);
        });
      }
    };

    (window as any).qReset = function () {
      curQ = 1;
      Object.keys(answers).forEach((k) => delete answers[parseInt(k)]);
      document.querySelectorAll('.opt').forEach((o) => o.classList.remove('sel'));
      document.querySelectorAll('.qblock').forEach((b) => {
        (b as HTMLElement).style.display = '';
        b.classList.remove('on');
      });
      document.getElementById('q1')?.classList.add('on');
      (document.getElementById('qprog') as HTMLElement).style.display = '';
      (document.getElementById('qnav') as HTMLElement).style.display = '';
      const qnext = document.getElementById('qnext') as HTMLButtonElement;
      if (qnext) {
        qnext.disabled = true;
        qnext.textContent = 'Continue →';
      }
      document.querySelectorAll('.qpb').forEach((b, i) => b.classList.toggle('on', i === 0));
      (document.getElementById('rFill') as SVGCircleElement).style.strokeDashoffset = '283';
      (document.getElementById('results') as HTMLElement).style.display = 'none';
      document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
    };
  }, []);

  const animN = (el: HTMLElement, from: number, to: number, dur: number) => {
    const s = performance.now();
    (function go(now: number) {
      const p = Math.min((now - s) / dur, 1);
      el.textContent = Math.round(from + (to - from) * p).toString();
      if (p < 1) requestAnimationFrame(go);
    })(performance.now());
  };

  return (
    <>
      {/* ─── NAV ─── */}
      <nav id="nav">
        <div className="nav-logo">
          <img src="/logos/align-logo-white.png" alt="ALIGN" className="nav-logo-img nav-logo-img--light" />
          <img src="/logos/align-logo-black.png" alt="ALIGN" className="nav-logo-img nav-logo-img--dark" />
          <span className="nav-logo-text">ALIGN</span>
        </div>
        <div className="nav-links">
          <a href="#why">Why It Matters</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
          <a href="https://www.retirewithkaz.com/quiz" className="nav-cta">
            Take Assessment
          </a>
        </div>
        <div id="hamburger" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div id="mobile-menu" className="mobile-menu">
        <div id="mobile-close" className="mobile-close">
          ×
        </div>
        <a href="#why" className="mobile-link">
          Why It Matters
        </a>
        <a href="#discover" className="mobile-link">
          What You Learn
        </a>
        <a href="#adam" className="mobile-link">
          About Adam
        </a>
        <a href="https://www.retirewithkaz.com/quiz" className="mobile-link">
          Take Assessment
        </a>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-video-bg">
          <video autoPlay muted loop className="hero-video">
            <source src="/video/align-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay"></div>
        </div>

        <div className="hero-eyebrow-wrap">
          <div className="hero-eyebrow">ALIGN Retirement Income Personality Assessment</div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 className="hero-h">
            <span>Know Your</span>
            <em>Financial Personality.</em>
            <span>Own Your Retirement.</span>
          </h1>
          <p className="hero-sub">
            The gap between a solid financial plan and one you'll actually stick to isn't math. It's alignment. ALIGN reveals how your psychological preferences shape retirement decisions — and where your strategy needs to match your instincts.
          </p>
          <a href="#quiz" className="btn-primary" style={{ marginTop: '44px' }}>
            Discover My Retirement Income Personality <span className="btn-arr">→</span>
          </a>
        </div>
      </section>

      {/* ─── WHY IT MATTERS ─── */}
      <section id="why" className="why-section">
        <div className="section-tag">Why It Matters</div>
        <h2 className="section-h">
          Plans fail. Not because the math is wrong, <em>but because you won't stick to it.</em>
        </h2>
        <p className="section-sub">
          After nearly 20 years in financial services, Adam's consistent observation is that retirement plans don't fail because the numbers were wrong — they fail because the strategy conflicts with how clients actually think about money. When a plan feels foreign to your instincts, you abandon it under pressure, exactly when discipline matters most. Alignment isn't a nice-to-have. It's the foundation everything else is built on.
        </p>

        <div className="stat-band">
          <div className="stat-item reveal d1">
            <div className="stat-num">72%</div>
            <div className="stat-label">of retirees adjust their portfolio within 12 months of retirement</div>
          </div>
          <div className="stat-item reveal d2">
            <div className="stat-num">84%</div>
            <div className="stat-label">of those adjustments are emotional, not driven by market conditions</div>
          </div>
          <div className="stat-item reveal d3">
            <div className="stat-num">91%</div>
            <div className="stat-label">report greater confidence when their strategy matches their psychology</div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU LEARN ─── */}
      <section id="discover" className="discover-section">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-tag">What You Learn</div>
          <h2 className="section-h">Six dimensions. One clear picture of your financial personality.</h2>
          <p className="section-sub">
            The ALIGN assessment measures six core dimensions of how you approach money and retirement. Your profile emerges from 36 carefully designed questions that reveal not what you think you should do — but what you'll actually do.
          </p>
        </div>

        <div className="car-wrapper reveal">
          <div className="car-carousel">
            <div className="car-panel active" style={{ backgroundImage: `url(/images/car-engine.jpg)` }}>
              <div className="car-label">
                <div className="car-label-title">Income Security Preference</div>
                <div className="car-label-sub">Do you want contractual income guarantees, or are you comfortable with market-driven returns?</div>
              </div>
            </div>
            <div className="car-panel" style={{ backgroundImage: `url(/images/car-navigation.jpg)` }}>
              <div className="car-label">
                <div className="car-label-title">Strategy Flexibility</div>
                <div className="car-label-sub">How much control do you want over your retirement strategy decisions?</div>
              </div>
            </div>
            <div className="car-panel" style={{ backgroundImage: `url(/images/car-interior.jpg)` }}>
              <div className="car-label">
                <div className="car-label-title">Income vs. Net Worth Mindset</div>
                <div className="car-label-sub">Do you think in terms of growth, or do you focus on sustainable spending power?</div>
              </div>
            </div>
          </div>

          <div className="car-dots">
            <div className="dot active" style={{ '--idx': 0 } as any}></div>
            <div className="dot" style={{ '--idx': 1 } as any}></div>
            <div className="dot" style={{ '--idx': 2 } as any}></div>
          </div>
        </div>

        <div style={{ marginTop: '60px' }}>
          <div className="section-tag" style={{ marginBottom: '20px' }}>Instantly Personalized</div>
          <h3 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '24px', fontFamily: 'var(--font-display)' }}>
            Your results map to one of four implementation archetypes.
          </h3>
          <p className="section-sub" style={{ marginBottom: '40px', lineHeight: '1.7' }}>
            ALIGN doesn't categorize you. It identifies your implementation profile: how you prefer to engage with your wealth, work with advisors, and make decisions. Your results tell you which advisory approach, strategy framework, and tools will feel most natural to you — and where friction is likely.
          </p>
        </div>
      </section>

      {/* ─── ABOUT ADAM ─── */}
      <section id="adam" className="adam-section">
        <div className="adam-content">
          <div className="adam-tag">About Adam</div>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
            <em>17 years in financial services.</em> Solo advisor. Built ALIGN for your retirement.
          </h2>
          <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--ink-soft)', marginBottom: '24px' }}>
            Adam Kazinec is a CLU®, ChFC®, RICP® financial advisor and Managing Partner at Convergent Financial Partners. His practice focuses on pre-retirees and retirees with $500K–$5M in investable assets, specializing in retirement income planning and Social Security strategy. He's built ALIGN as a practical tool to surface the emotional and behavioral dimensions of retirement that are typically invisible in traditional financial planning.
          </p>
          <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--ink-soft)' }}>
            ALIGN is free. It takes 8 minutes. It's designed to give you clarity on how you actually think about money — and whether your current strategy is aligned with your psychology. If you choose to work with Adam's practice afterward, that's your call. Either way, you'll have a clearer picture of what you need.
          </p>
        </div>
      </section>

      {/* ─── QUIZ MODAL ─── */}
      <section id="quiz" className="quiz-modal reveal">
        <div className="quiz-head">
          <div className="quiz-eyebrow">Quick Assessment</div>
          <h2 className="quiz-h">Let's identify your retirement income personality.</h2>
          <p className="quiz-sub">
            Answer five questions about how you think and feel about money. No "right" answers. Just honest ones. Takes 8 minutes.
          </p>
        </div>

        <div className="quiz-main">
          <div id="qprog" className="qprog">
            <div className="qpb on" id="pb1"></div>
            <div className="qpb" id="pb2"></div>
            <div className="qpb" id="pb3"></div>
            <div className="qpb" id="pb4"></div>
            <div className="qpb" id="pb5"></div>
          </div>

          {/* Questions 1-5 */}
          {[1, 2, 3, 4, 5].map((q) => (
            <div key={q} id={`q${q}`} className={`qblock ${q === 1 ? 'on' : ''}`}>
              <div className="q-text">
                {q === 1 && "When building retirement income, I'd prefer:"}
                {q === 2 && "My ideal retirement strategy would be:"}
                {q === 3 && "I think about retirement success primarily in terms of:"}
                {q === 4 && "Working with an advisor, I prefer:"}
                {q === 5 && "In retirement, my spending pattern will likely be:"}
              </div>
              <div className="q-opts">
                {q === 1 && (
                  <>
                    <button className="opt" data-q={q} data-score="1">
                      Market-driven returns and flexibility
                    </button>
                    <button className="opt" data-q={q} data-score="2">
                      A blend of growth and stability
                    </button>
                    <button className="opt" data-q={q} data-score="3">
                      Mostly stable with some growth
                    </button>
                    <button className="opt" data-q={q} data-score="4">
                      Contractual income I can't outlive
                    </button>
                  </>
                )}
                {q === 2 && (
                  <>
                    <button className="opt" data-q={q} data-score="1">
                      I want full control; minimal advisor involvement
                    </button>
                    <button className="opt" data-q={q} data-score="2">
                      I want flexibility to adjust as needed
                    </button>
                    <button className="opt" data-q={q} data-score="3">
                      I like some structure with reasonable flexibility
                    </button>
                    <button className="opt" data-q={q} data-score="4">
                      I want a committed structure I can count on
                    </button>
                  </>
                )}
                {q === 3 && (
                  <>
                    <button className="opt" data-q={q} data-score="1">
                      Growing my net worth
                    </button>
                    <button className="opt" data-q={q} data-score="2">
                      Portfolio growth and income in balance
                    </button>
                    <button className="opt" data-q={q} data-score="3">
                      Having reliable income to spend
                    </button>
                    <button className="opt" data-q={q} data-score="4">
                      Ensuring I never run out of money
                    </button>
                  </>
                )}
                {q === 4 && (
                  <>
                    <button className="opt" data-q={q} data-score="1">
                      Limited involvement; mostly hands-off
                    </button>
                    <button className="opt" data-q={q} data-score="2">
                      Some guidance, but I stay informed
                    </button>
                    <button className="opt" data-q={q} data-score="3">
                      Active partnership and shared decisions
                    </button>
                    <button className="opt" data-q={q} data-score="4">
                      Significant guidance and confidence-building
                    </button>
                  </>
                )}
                {q === 5 && (
                  <>
                    <button className="opt" data-q={q} data-score="1">
                      Back-loaded; I'll spend more later
                    </button>
                    <button className="opt" data-q={q} data-score="2">
                      Fairly even throughout retirement
                    </button>
                    <button className="opt" data-q={q} data-score="3">
                      Somewhat front-loaded; more early on
                    </button>
                    <button className="opt" data-q={q} data-score="4">
                      Heavily front-loaded; I want to enjoy early retirement
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Results Display */}
          <div id="results" style={{ display: 'none' }}>
            <div className="r-circle">
              <svg viewBox="0 0 100 100" className="r-chart">
                <circle cx="50" cy="50" r="45" className="r-track"></circle>
                <circle cx="50" cy="50" r="45" className="r-fill" id="rFill"></circle>
              </svg>
              <div className="r-val" id="rVal">
                0
              </div>
            </div>
            <h3 id="rTitle" className="r-title"></h3>
            <p id="rDesc" className="r-desc"></p>

            <div className="r-dims" id="rDims"></div>

            <div className="r-cta" style={{ marginTop: '40px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '20px' }}>
                Your full assessment explores all six dimensions and recommends next steps. Schedule a brief call to discuss your results.
              </p>
              <a
                href="https://www.retirewithkaz.com/quiz"
                className="btn-primary"
                style={{ display: 'inline-block', marginRight: '20px' }}
              >
                See Full Results <span className="btn-arr">→</span>
              </a>
              <button onClick={() => (window as any).qReset()} className="btn-secondary">
                Start Over
              </button>
            </div>
          </div>

          {/* Quiz Navigation */}
          <div id="qnav" className="qnav">
            <button id="qback" className="btn-nav btn-back" onClick={() => (window as any).qPrev()}>
              ← Back
            </button>
            <button id="qnext" className="btn-nav btn-next" disabled onClick={() => (window as any).qNext()}>
              Continue →
            </button>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="faq-section">
        <div className="section-tag">Questions</div>
        <h2 className="section-h">Frequently asked.</h2>

        <div className="faq-grid">
          {[
            {
              q: 'Is this a replacement for financial planning?',
              a: 'No. ALIGN is a personality assessment. It tells you how you think about money — not what specific strategies or products are right for you. Use it to clarify your preferences, then bring the results to a financial advisor for a comprehensive plan tailored to your situation.',
            },
            {
              q: 'What happens with my results?',
              a: 'Your results are yours. If you choose to discuss them with Adam, a summary gets added to your client file (with your permission). Otherwise, nothing. We don\'t sell your data, and there\'s no obligation to work together.',
            },
            {
              q: 'Does the assessment recommend specific products?',
              a: 'No. The ALIGN assessment identifies your behavioral and emotional preferences — it does not recommend specific financial products. Your results tell you what types of strategies fit your psychology. Any specific product discussion happens separately, if and when you choose to engage.',
            },
            {
              q: 'I already have a financial advisor. Should I still take this?',
              a: 'Absolutely. Many people who take the assessment are surprised to discover that their current strategy doesn\'t align with how they actually think about money — even when the numbers look fine. The results can be a powerful conversation starter with your existing advisor, or help you identify if a second opinion is worth seeking.',
            },
            {
              q: 'Why does emotional alignment matter as much as the math?',
              a: 'After nearly 20 years, Adam\'s consistent observation is that plans fail not because the math was wrong — but because the client couldn\'t stay committed to the strategy. A plan that conflicts with your instincts will be abandoned under pressure, exactly when discipline matters most. Alignment isn\'t a nice-to-have. It\'s the foundation everything else is built on.',
            },
          ].map((item, idx) => (
            <div key={idx} className={`faq-item reveal d${idx + 1}`}>
              <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
                <span>{item.q}</span>
                <div className="faq-icon">+</div>
              </div>
              <div className="faq-a">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <div className="cta-band">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'left', maxWidth: '1100px', margin: '0 auto' }}>
          <div className="section-tag" style={{ marginBottom: '20px' }}>
            Start Today — It's Free
          </div>
          <h2 className="section-h" style={{ margin: '0 0 20px' }}>
            Move beyond a money manager.
            <br />
            <em>Hire a distribution strategist.</em>
          </h2>
          <p className="section-sub" style={{ margin: '0 0 44px' }}>
            The ALIGN assessment takes 8 minutes and delivers a personalized map of your financial personality — built around how you actually think and feel about money. Not a template. Not generic advice. Yours.
          </p>
          <a
            href="https://www.retirewithkaz.com/quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: '16px', padding: '18px 40px', marginTop: '0' }}
          >
            Discover My Retirement Income Personality <span className="btn-arr">→</span>
          </a>
          <div className="cta-detail" style={{ textAlign: 'left', marginTop: '20px' }}>
            Free · 8 Minutes · Instant Results · No Obligation
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer>
        <div className="foot-brand">
          <div className="nav-logo-mark">ALN</div>
          ALIGN by Adam Kazinec
        </div>
        <div className="foot-copy">Assessment for Long-term Income &amp; Goal Navigation · © 2026 Adam Kazinec · All rights reserved</div>
        <div className="foot-links">
          <a href="#why">Why It Matters</a>
          <a href="#discover">What You Learn</a>
          <a href="#adam">About Adam</a>
          <a href="https://www.retirewithkaz.com/quiz" target="_blank" rel="noopener noreferrer">
            Take Assessment ↗
          </a>
        </div>
      </footer>
    </>
  );
}
