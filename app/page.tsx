'use client';

import React, { useEffect } from 'react';
import './landing.css';

export default function LandingPage() {
  useEffect(() => {
    /* REVEAL */
    const ro = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('in');
    }), { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((e) => ro.observe(e));

    /* FAQ */
    const toggleFaq = function(el: any) {
      const item = el.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    };

    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', function(this: any) {
        toggleFaq(this);
      });
    });

    /* QUIZ */
    let curQ = 1;
    const answers: Record<string, number> = {};
    const qnext = document.getElementById('qnext') as HTMLButtonElement | null;
    const qback = document.getElementById('qback') as HTMLButtonElement | null;

    document.querySelectorAll('.opt').forEach((o) => {
      o.addEventListener('click', function(this: HTMLElement) {
        const q = this.dataset.q as string;
        const s = parseInt(this.dataset.score as string);
        document.querySelectorAll(`.opt[data-q="${q}"]`).forEach(x => x.classList.remove('sel'));
        this.classList.add('sel');
        answers[q] = s;
        if (qnext) qnext.disabled = false;
      });
    });

    const animN = function(el: Element, from: number, to: number, dur: number) {
      const s = performance.now();
      const go = (now: number) => {
        const p = Math.min((now - s) / dur, 1);
        el.textContent = Math.round(from + (to - from) * p).toString();
        if (p < 1) requestAnimationFrame(go);
      };
      requestAnimationFrame(go);
    };

    const showResults = function() {
      const total = Object.values(answers).reduce((a, b) => a + b, 0);
      const pct = Math.round((total / 20) * 100);
      document.querySelectorAll('.qblock').forEach((b: any) => b.style.display = 'none');
      const qprog = document.getElementById('qprog');
      if (qprog) qprog.style.display = 'none';
      const qnav = document.getElementById('qnav');
      if (qnav) qnav.style.display = 'none';
      const res = document.getElementById('results');
      if (res) res.classList.add('on');
      
      setTimeout(() => {
        const rFill = document.getElementById('rFill');
        if (rFill) rFill.style.strokeDashoffset = (377 - (377 * pct / 100)).toString();
        const rVal = document.getElementById('rVal');
        if (rVal) animN(rVal, 0, total, 1400);
      }, 300);

      const profiles = [
        { min: 0, max: 8, t: 'Significantly <span className="cyan">Misaligned</span>', d: "Your current strategy may not reflect how you actually think and feel about money. The gap is wide — and it's creating quiet anxiety even when your numbers look fine. This is the most important signal you can receive. It's time to build a plan that actually fits you." },
        { min: 9, max: 12, t: 'Partially <span className="cyan">Aligned</span>', d: "You have some right pieces in place, but your strategy and emotional relationship with money aren't fully in sync. You may find yourself second-guessing decisions or feeling uneasy in volatility. The full assessment will identify exactly where the gaps are." },
        { min: 13, max: 16, t: 'Largely <span className="cyan">Aligned</span>', d: "You have a solid foundation and a reasonably accurate understanding of your financial psychology. There are still specific dimensions where your plan and preferences may diverge. The full assessment will sharpen those areas and give you a comprehensive report to optimize around." },
        { min: 17, max: 20, t: 'Strongly <span className="cyan">Aligned</span>', d: "Your strategy and emotional relationship with money are closely in sync. You understand your income preferences, risk tolerance, and concerns. The full assessment will confirm your strengths and identify any remaining blind spots." }
      ];
      const p = profiles.find(x => total >= x.min && total <= x.max);
      const rTitle = document.getElementById('rTitle');
      if (rTitle && p) rTitle.innerHTML = p.t;
      const rDesc = document.getElementById('rDesc');
      if (rDesc && p) rDesc.textContent = p.d;

      const dims = [
        { name: 'Income Source', score: answers[1], labels: ['Guaranteed Only', 'Mostly Stable', 'Blended Mix', 'Full Flexibility'] },
        { name: 'Emotional Fortitude', score: answers[2], labels: ['Very Reactive', 'Stress-Prone', 'Moderate', 'High Fortitude'] },
        { name: 'Primary Concern', score: answers[3], labels: ['Longevity Risk', 'Sequence Risk', 'Lifestyle Risk', 'Legacy Risk'] },
        { name: 'Strategic Flexibility', score: answers[4], labels: ['Locked In', 'Reluctant', 'Adaptive', 'Dynamic'] },
        { name: 'Readiness Stage', score: answers[5], labels: ['Needs Rebuild', 'Early Stage', 'Testing Phase', 'Optimizing'] }
      ];
      const c = document.getElementById('rDims');
      if (c) c.innerHTML = '';
      dims.forEach((d, i) => {
        const bp = Math.max(((d.score - 1) / 3 * 100), 4);
        const el = document.createElement('div');
        el.className = 'r-dim';
        el.innerHTML = `<div className="r-dim-name">${d.name}</div><div className="r-dim-track"><div className="r-dim-fill" id="df${i}"></div></div><div className="r-dim-val">${d.labels[d.score - 1]}</div>`;
        if (c) c.appendChild(el);
        setTimeout(() => {
          const df = document.getElementById(`df${i}`);
          if (df) df.style.width = bp + '%';
        }, 500 + i * 100);
      });
    };

    if (qnext) {
      qnext.addEventListener('click', () => {
        if (!answers[curQ]) return;
        if (curQ < 5) {
          const oldQ = document.getElementById(`q${curQ}`);
          if (oldQ) oldQ.classList.remove('on');
          curQ++;
          const newQ = document.getElementById(`q${curQ}`);
          if (newQ) newQ.classList.add('on');
          const pb = document.getElementById(`pb${curQ}`);
          if (pb) pb.classList.add('on');
          if (qback) qback.style.visibility = 'visible';
          qnext.disabled = !answers[curQ];
          if (curQ === 5) qnext.textContent = 'See My Results →';
        } else {
          showResults();
        }
      });
    }

    if (qback) {
      qback.addEventListener('click', () => {
        if (curQ > 1) {
          const oldQ = document.getElementById(`q${curQ}`);
          if (oldQ) oldQ.classList.remove('on');
          curQ--;
          const newQ = document.getElementById(`q${curQ}`);
          if (newQ) newQ.classList.add('on');
          const pb = document.getElementById(`pb${curQ + 1}`);
          if (pb) pb.classList.remove('on');
          qback.style.visibility = curQ === 1 ? 'hidden' : 'visible';
          if (qnext) {
            qnext.disabled = !answers[curQ];
            qnext.textContent = curQ === 5 ? 'See My Results →' : 'Continue →';
          }
        }
      });
    }

    document.querySelectorAll('.r-reset').forEach(btn => {
      btn.addEventListener('click', () => {
        curQ = 1;
        Object.keys(answers).forEach(k => delete answers[k]);
        document.querySelectorAll('.opt').forEach(o => o.classList.remove('sel'));
        document.querySelectorAll('.qblock').forEach((b: any) => { b.style.display = ''; b.classList.remove('on'); });
        const q1 = document.getElementById('q1');
        if (q1) q1.classList.add('on');
        const qprog = document.getElementById('qprog');
        if (qprog) qprog.style.display = '';
        const qnav = document.getElementById('qnav');
        if (qnav) qnav.style.display = '';
        document.querySelectorAll('.qpb').forEach((b, i) => b.classList.toggle('on', i === 0));
        if (qnext) {
          qnext.disabled = true;
          qnext.textContent = 'Continue →';
        }
        if (qback) qback.style.visibility = 'hidden';
        const res = document.getElementById('results');
        if (res) res.classList.remove('on');
        const rFill = document.getElementById('rFill');
        if (rFill) rFill.style.strokeDashoffset = '377';
        const quiz = document.getElementById('quiz');
        if (quiz) quiz.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }, []);

  return (
    <>
      {/*  NAV  */}
<nav id="nav">
  <a href="#" className="nav-logo">
    <div className="nav-logo-dot">A</div>
    ALIGN
  </a>
  <div className="nav-links">
    <a href="#video">Watch First</a>
    <a href="#pillars">The Assessment</a>
    <a href="#adam">About Adam</a>
    <a href="#quiz" className="nav-cta">Begin Assessment <span>→</span></a>
  </div>
</nav>

{/*  ── HERO — CINEMATIC VIDEO BACKGROUND ──  */}
<section className="hero">

  {/*  YouTube Shorts hero background  */}
  <div className="hero-video-wrap">
    <iframe id="heroYT"
      src="https://www.youtube.com/embed/fD5UqsrtuG4?autoplay=1&mute=1&loop=1&playlist=fD5UqsrtuG4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&version=3"
      title="ALIGN Hero"
      frameBorder="0"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen>
    </iframe>
  </div>

  {/*  Cinematic overlays  */}
  <div className="hero-overlay"></div>
  <div className="hero-tint"></div>
  <div className="hero-bar-top"></div>
  <div className="hero-bar-bot"></div>

  {/*  Scan lines  */}
  <div className="hero-lines">
    <div className="hero-line-h"></div>
    <div className="hero-line-h"></div>
    <div className="hero-line-h"></div>
  </div>

  {/*  Vertical flanking lines  */}
  <div className="hero-vline left"></div>
  <div className="hero-vline right"></div>

  {/*  Content  */}
  <div className="hero-content">
    <div className="badge">
      <div className="badge-dot"></div>
      Assessment for Long-term Income &amp; Goal Navigation
    </div>

    <h1>
      Your retirement plan<br />
      <span className="line-muted">isn't failing —</span>
      <span className="line-cyan">your emotions are.</span>
    </h1>

    <p className="hero-sub">
      After <strong>20 years</strong> helping people plan, enter, and live through retirement, Adam Kazinec found one consistent truth: the math is rarely the problem. <strong>The emotional misalignment always is.</strong>
    </p>


  </div>

  <div className="hero-scroll-hint">
    <span>Scroll to explore</span>
    <div className="scroll-track"></div>
  </div>

</section>

{/*  ── LOGO STRIP ──  */}
<div className="logo-strip">
  <span className="logo-strip-label">Trusted by retirees across</span>
  <div className="logo-pill"><div className="logo-pill-icon"></div>20+ Years Practice</div>
  <div className="logo-pill"><div className="logo-pill-icon"></div>4 Dimensions Assessed</div>
  <div className="logo-pill"><div className="logo-pill-icon"></div>Free Report</div>
  <div className="logo-pill"><div className="logo-pill-icon"></div>Instant Results</div>
  <div className="logo-pill"><div className="logo-pill-icon"></div>Kaz's Korner</div>
</div>

{/*  ── STATS ──  */}
<div className="stats-band">
  <div className="stats-inner">
    <div className="stat reveal">
      <div className="stat-num">20<span className="stat-accent">+</span></div>
      <div className="stat-label">Years helping individuals plan,<br />enter &amp; live through retirement</div>
    </div>
    <div className="stat reveal d1">
      <div className="stat-num"><span className="stat-accent">4</span></div>
      <div className="stat-label">Dimensions assessed in your<br />personalized report</div>
    </div>
    <div className="stat reveal d2">
      <div className="stat-num">20</div>
      <div className="stat-label">Minutes for the full<br />ScoreApp assessment</div>
    </div>
    <div className="stat reveal d3">
      <div className="stat-num"><span className="stat-accent">1</span></div>
      <div className="stat-label">Goal: a strategy you'll<br />actually stick with</div>
    </div>
  </div>
</div>

{/*  ── VIDEO ──  */}
<div className="video-section" id="video">
  <div className="video-head">
    <div>
      <div className="section-tag reveal">Watch First</div>
      <h2 className="section-title reveal d1">Understand <span className="cyan">why</span> this assessment matters.</h2>
    </div>
    <p className="section-desc reveal d2">Adam walks you through the philosophy behind ALIGN — and why knowing your emotional relationship with money is the most important financial decision you'll make before retirement. <strong style={{color: 'var(--white)'}}>12 minutes. Recommended before you begin.</strong></p>
  </div>
  <div className="video-frame reveal d1">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/mzKr8hsrFSk?si=MmYoLhsp6vNYcn1X" title="YouTube video player" frameBorder="0" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  </div>
  <div className="video-note reveal d2">Kaz's Korner with Adam Kazinec · <strong style={{color: 'var(--white)', fontWeight: 500}}>Recommended before taking the assessment</strong></div>
</div>

{/*  ── PROBLEM — FEATURE CARDS ──  */}
<section className="section">
  <div className="section-tag reveal">The Problem</div>
  <h2 className="section-title reveal d1">Why confident people still feel<br /><span className="dim">financially stuck.</span></h2>
  <p className="section-desc reveal d2">A strategy you don't emotionally believe in is a strategy you'll second-guess, pause, or abandon the moment markets move.</p>

  <div className="features-grid">
    <div className="feat-card reveal d1">
      <div className="feat-icon">📉</div>
      <h3>The Plan You'll Abandon</h3>
      <p>Confidence comes from alignment, not just allocation. A strategy built for someone else's comfort level will always feel wrong — even when the numbers look right.</p>
    </div>
    <div className="feat-card reveal d2">
      <div className="feat-icon">😰</div>
      <h3>The 3am Anxiety</h3>
      <p>You can have a perfect portfolio and still wake up anxious. The math doesn't quiet the fear — understanding your own risk tolerance does.</p>
    </div>
    <div className="feat-card reveal d3">
      <div className="feat-icon">📋</div>
      <h3>The Generic Blueprint</h3>
      <p>Most financial plans are built for the average client. Your income preferences, flexibility needs, and risk thresholds are unique to you. You deserve a plan that reflects that.</p>
    </div>
  </div>
</section>

{/*  ── 4 PILLARS ──  */}
<section className="section" id="pillars" style={{paddingTop: '20px'}}>
  <div className="section-tag reveal">What You'll Discover</div>
  <h2 className="section-title reveal d1">Your personalized report<br />covers <span className="cyan">four dimensions.</span></h2>
  <p className="section-desc reveal d2">Each dimension gives you insight into a different layer of your retirement readiness — together they paint a complete picture of how to build a strategy you'll actually commit to.</p>

  <div className="pillars-list">
    <div className="pillar-row reveal d1">
      <div className="pillar-left">
        <div className="pillar-num">Dimension 01</div>
        <h3>Retirement Income Source</h3>
        <span className="pillar-tag">Income Architecture</span>
      </div>
      <div className="pillar-right">
        <p>Where do you feel most confident drawing retirement income from? Market-based investments, <strong>guaranteed income products</strong>, or a carefully constructed blend of both? This dimension identifies the foundation your entire plan must rest on — and reveals whether your current approach actually matches how you think about money.</p>
      </div>
    </div>
    <div className="pillar-row reveal d2">
      <div className="pillar-left">
        <div className="pillar-num">Dimension 02</div>
        <h3>Retirement Income Structure</h3>
        <span className="pillar-tag">Payment Preference</span>
      </div>
      <div className="pillar-right">
        <p><strong>Steady, predictable payments</strong> that remove decision fatigue — or flexible, adjustable withdrawals that give you control? Both are valid strategies. Only one is right for how your mind actually works. Most people have never been directly asked this question.</p>
      </div>
    </div>
    <div className="pillar-row reveal d3">
      <div className="pillar-left">
        <div className="pillar-num">Dimension 03</div>
        <h3>Your Retirement Concerns</h3>
        <span className="pillar-tag">Risk Identification</span>
      </div>
      <div className="pillar-right">
        <p>Vague financial anxiety is paralyzing. <strong>Named, specific concerns are actionable.</strong> This dimension identifies your primary worry — outliving savings, market volatility, lifestyle maintenance, or legacy — so we can build a strategy that directly neutralizes each one.</p>
      </div>
    </div>
    <div className="pillar-row reveal d4">
      <div className="pillar-left">
        <div className="pillar-num">Dimension 04</div>
        <h3>Implementing Your Strategy</h3>
        <span className="pillar-tag">Adaptive Planning</span>
      </div>
      <div className="pillar-right">
        <p>Your life, the markets, and the financial landscape are <strong>constantly in motion</strong> — your plan must be too. This dimension measures your commitment level and flexibility preferences so your strategy doesn't just survive the future, it capitalizes on it.</p>
      </div>
    </div>
  </div>
</section>

{/*  ── ADAM ──  */}
<section className="adam-section" id="adam">
  <div className="section-tag reveal">About Adam Kazinec</div>
  <h2 className="section-title reveal d1">Financial planning should<br />feel <span className="cyan">personal.</span></h2>

  <div className="adam-grid">
    <div className="adam-card reveal d1">
      <p style={{fontSize: '15px', color: 'var(--grey-muted)', lineHeight: '1.75', marginBottom: '20px'}}>Adam believes that financial confidence doesn't come from spreadsheets — it comes from understanding <strong style={{color: 'var(--white)'}}>how you think and feel about money.</strong> That self-knowledge is the foundation every solid strategy is built on.</p>
      <p style={{fontSize: '15px', color: 'var(--grey-muted)', lineHeight: '1.75'}}>His process starts with an honest conversation: your goals, your habits, your vision. From there, he builds strategies to help you grow wealth, protect what matters, and step into retirement with genuine confidence.</p>
      <div className="adam-stats">
        <div className="adam-stat">
          <div className="n">20+</div>
          <div className="l">Years practice</div>
        </div>
        <div className="adam-stat">
          <div className="n">4</div>
          <div className="l">Dimensions</div>
        </div>
        <div className="adam-stat">
          <div className="n">∞</div>
          <div className="l">Your clarity</div>
        </div>
      </div>
    </div>
    <div className="adam-card quote reveal d2">
      <blockquote>"Most retirement plans don't fail because of bad math — they fail because emotions and strategy don't align."</blockquote>
      <div className="quote-attr">
        <div className="quote-attr-line"></div>
        <span className="quote-attr-text">Adam Kazinec — Kaz's Korner</span>
      </div>
    </div>
  </div>
</section>

{/*  ── QUIZ ──  */}
<div className="quiz-section" id="quiz">
  <div className="section-tag reveal" style={{display: 'inline-flex', marginBottom: '16px'}}>Quick Alignment Check</div>
  <h2 className="section-title reveal d1">5 questions.<br /><span className="cyan">Real clarity.</span></h2>
  <p className="section-desc reveal d2" style={{marginBottom: '40px'}}>Answer honestly — not how a prepared retiree should answer, but how you actually feel right now.</p>

  <div className="quiz-card reveal d2">
    <div className="quiz-head" id="quizHead">
      {/*  empty, used for spacing reset  */}
    </div>

    <div className="qprog" id="qprog">
      <div className="qpb on" id="pb1"></div>
      <div className="qpb" id="pb2"></div>
      <div className="qpb" id="pb3"></div>
      <div className="qpb" id="pb4"></div>
      <div className="qpb" id="pb5"></div>
    </div>

    <div className="qblock on" id="q1">
      <div className="q-eye">Question 01 of 05</div>
      <div className="q-text">When you think about drawing income in retirement — what feels most reassuring?</div>
      <div className="opts">
        <div className="opt" data-q="1" data-score="1"><div className="opt-l">A</div><span className="opt-t">Guaranteed, predictable monthly payments — I need to know exactly what's coming.</span></div>
        <div className="opt" data-q="1" data-score="2"><div className="opt-l">B</div><span className="opt-t">Mostly predictable, with some built-in flexibility for unexpected needs.</span></div>
        <div className="opt" data-q="1" data-score="3"><div className="opt-l">C</div><span className="opt-t">A blend — stable base income with some market exposure for growth potential.</span></div>
        <div className="opt" data-q="1" data-score="4"><div className="opt-l">D</div><span className="opt-t">Full flexibility — I want control and I'm comfortable adjusting as needed.</span></div>
      </div>
    </div>

    <div className="qblock" id="q2">
      <div className="q-eye">Question 02 of 05</div>
      <div className="q-text">If your portfolio dropped 25% over six months — what would your most honest reaction be?</div>
      <div className="opts">
        <div className="opt" data-q="2" data-score="1"><div className="opt-l">A</div><span className="opt-t">Move everything to safety. I cannot emotionally handle that kind of loss.</span></div>
        <div className="opt" data-q="2" data-score="2"><div className="opt-l">B</div><span className="opt-t">Very stressed but I'd try to hold. I'd probably call my advisor every week.</span></div>
        <div className="opt" data-q="2" data-score="3"><div className="opt-l">C</div><span className="opt-t">Uncomfortable but disciplined — I'd stay the course while reviewing my allocation.</span></div>
        <div className="opt" data-q="2" data-score="4"><div className="opt-l">D</div><span className="opt-t">Concerned but steady. I plan for downturns and stay invested.</span></div>
      </div>
    </div>

    <div className="qblock" id="q3">
      <div className="q-eye">Question 03 of 05</div>
      <div className="q-text">What retirement concern keeps you up at night?</div>
      <div className="opts">
        <div className="opt" data-q="3" data-score="1"><div className="opt-l">A</div><span className="opt-t">Outliving my savings — running out of money before I run out of life.</span></div>
        <div className="opt" data-q="3" data-score="2"><div className="opt-l">B</div><span className="opt-t">Market volatility — one bad sequence of returns derailing everything I've built.</span></div>
        <div className="opt" data-q="3" data-score="3"><div className="opt-l">C</div><span className="opt-t">Maintaining my lifestyle — keeping the same quality of life I have today.</span></div>
        <div className="opt" data-q="3" data-score="4"><div className="opt-l">D</div><span className="opt-t">Unexpected healthcare costs or leaving a meaningful legacy for my family.</span></div>
      </div>
    </div>

    <div className="qblock" id="q4">
      <div className="q-eye">Question 04 of 05</div>
      <div className="q-text">How do you feel about adjusting your retirement strategy as life changes?</div>
      <div className="opts">
        <div className="opt" data-q="4" data-score="1"><div className="opt-l">A</div><span className="opt-t">I want a locked-in plan. Changing course feels risky and stressful to me.</span></div>
        <div className="opt" data-q="4" data-score="2"><div className="opt-l">B</div><span className="opt-t">Reluctant but open to it if absolutely necessary.</span></div>
        <div className="opt" data-q="4" data-score="3"><div className="opt-l">C</div><span className="opt-t">Comfortable with periodic reviews and adjustments when needed.</span></div>
        <div className="opt" data-q="4" data-score="4"><div className="opt-l">D</div><span className="opt-t">I actively want a dynamic plan — I expect life and markets to change.</span></div>
      </div>
    </div>

    <div className="qblock" id="q5">
      <div className="q-eye">Question 05 of 05</div>
      <div className="q-text">Which statement best reflects where you are right now?</div>
      <div className="opts">
        <div className="opt" data-q="5" data-score="1"><div className="opt-l">A</div><span className="opt-t">I have a plan but don't feel confident in it — it doesn't feel like mine.</span></div>
        <div className="opt" data-q="5" data-score="2"><div className="opt-l">B</div><span className="opt-t">Some savings and a rough idea, but no real strategy yet.</span></div>
        <div className="opt" data-q="5" data-score="3"><div className="opt-l">C</div><span className="opt-t">A solid plan, but I want to stress-test it against my actual preferences.</span></div>
        <div className="opt" data-q="5" data-score="4"><div className="opt-l">D</div><span className="opt-t">Confident and prepared — here to sharpen what I've already built.</span></div>
      </div>
    </div>

    <div className="qnav" id="qnav">
      <button className="qbtn-back" id="qback"  style={{visibility: 'hidden'}}>← Back</button>
      <button className="qbtn-next" id="qnext"  disabled>Continue →</button>
    </div>

    {/*  RESULTS  */}
    <div className="results" id="results">
      <div className="r-ring">
        <svg viewBox="0 0 140 140">
          <circle className="r-bg" cx="70" cy="70" r="60"/>
          <circle className="r-fill" id="rFill" cx="70" cy="70" r="60" strokeDasharray="377" strokeDashoffset="377"/>
        </svg>
        <div>
          <div className="r-val" id="rVal">0</div>
          <div className="r-of">/ 20</div>
        </div>
      </div>
      <h2 className="r-title" id="rTitle"></h2>
      <p className="r-desc" id="rDesc"></p>
      <div className="r-dims" id="rDims"></div>
      <a href="/quiz" target="_blank" className="btn-cta primary" style={{display: 'inline-flex', margin: '0 auto'}}>Take the full 20-question assessment <span className="btn-arrow">→</span></a>
      <p style={{fontSize: '12px', color: 'var(--grey-lt)', marginTop: '12px'}}>Free · Personalized report · No obligation</p>
      <button className="r-reset" >← Retake this preview</button>
    </div>
  </div>
</div>

{/*  ── FAQ ──  */}
<section className="faq-section">
  <div className="section-tag reveal">Common Questions</div>
  <h2 className="section-title reveal d1">Questions? We're<br />here to <span className="cyan">help.</span></h2>

  <div className="faq-list">
    <div className="faq-item reveal d1">
      <div className="faq-q" >
        <span>Who is this assessment for?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">This assessment is for anyone who is planning for retirement, nearing retirement, or already retired and wants to stress-test their current strategy. Whether you're 10 years out or already drawing income, understanding your emotional relationship with money will help you build a plan you'll actually stick with.</div>
    </div>
    <div className="faq-item reveal d2">
      <div className="faq-q" >
        <span>How long does the full assessment take?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">The full 20-question ScoreApp assessment takes approximately 20 minutes to complete. You'll receive a personalized report immediately with feedback tailored specifically to your responses — no waiting, no email required to see results.</div>
    </div>
    <div className="faq-item reveal d3">
      <div className="faq-q" >
        <span>Is this assessment really free?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">Yes — completely free, with no hidden fees or obligations. You'll receive your personalized retirement alignment report at no cost. Adam believes that clarity about your financial psychology should be accessible to everyone planning for retirement.</div>
    </div>
    <div className="faq-item reveal d4">
      <div className="faq-q" >
        <span>What happens after I take the assessment?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">You'll receive a personalized report covering all four dimensions: your income source preference, income structure preference, primary retirement concerns, and strategic flexibility level. From there, you can connect with Adam to discuss how to build a strategy that directly reflects your results.</div>
    </div>
    <div className="faq-item reveal d5">
      <div className="faq-q" >
        <span>Why does the emotional side of planning matter?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">Most retirement plans fail not because of bad math, but because the strategy doesn't match how the client actually thinks and feels about money. A plan you don't emotionally believe in is a plan you'll abandon under pressure — exactly when you need it most. Aligning your strategy with your psychology is what makes it sustainable.</div>
    </div>
  </div>
</section>

{/*  ── FINAL CTA ──  */}
<div className="cta-band reveal">
  <div className="section-tag" style={{display: 'inline-flex', marginBottom: '20px'}}>Start Today — It's Free</div>
  <h2>Stop guessing.<br />Start <span className="cyan">knowing your income style.</span></h2>
  <p>The full ALIGN assessment takes 20 minutes and delivers a personalized report built around how you actually think about money — not a generic template.</p>
  <a href="/quiz" target="_blank" className="btn-cta primary" style={{display: 'inline-flex'}}>Identify My Strategy Gaps <span className="btn-arrow">→</span></a>
  <p className="cta-detail">Quick &amp; Free · Instant Results · 20 Years of Retirement Planning Experience</p>
</div>

{/*  ── FOOTER ──  */}
<footer>
  <div className="foot-brand">
    <div className="nav-logo-dot">A</div>
    <span>ALIGN</span>
  </div>
  <div className="foot-center">Assessment for Long-term Income &amp; Goal Navigation<br />© 2026 Adam Kazinec · Kaz's Korner · All rights reserved</div>
  <div className="foot-links">
    <a href="#video">Watch</a>
    <a href="#pillars">Assessment</a>
    <a href="#adam">About</a>
    <a href="/quiz" target="_blank">Full Scorecard ↗</a>
  </div>
</footer>
    </>
  );
}
