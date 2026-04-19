'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import StarfieldBackground from '../components/StarfieldBackground';
import {
  PRIMARY_TRAIT_COPY,
  SECONDARY_TRAIT_COPY,
  PERSONA_COPY,
  TIER_CTA,
} from '@/lib/quiz-copy';

/* ─── CTA config (no tier label in copy) ────────────────────────────────────── */
const CTA_CONFIG = {
  A: {
    heading: 'Your profile is ready. Your strategy isn\'t built yet.',
    sub: 'This assessment identifies where you stand. A focused strategy session with Adam will translate it into a plan built around your psychology — not a template.',
    card1: { num: '01', title: 'Review Your Full Profile', body: 'You\'ve just identified your income style, planning approach, and implementation persona. This is the foundation every good retirement strategy starts with.' },
    card2: { num: '02', title: 'Book a Strategy Session', body: 'A focused 45-minute session with Adam — no sales pressure, just a real conversation about what your profile means in practice for your specific situation.' },
    card3: { num: '03', title: 'Build the Right Plan', body: 'Adam will design a retirement income strategy built for your specific psychology — not what worked for your neighbor or what a generic plan recommends.' },
    btnText: 'Book My Strategy Session',
    btnUrl: 'https://calendly.com/adam-kazinec/align-strategy-session',
  },
  B: {
    heading: 'Your profile is ready. Let\'s map your next move.',
    sub: 'You\'re in a meaningful planning window. A focused conversation with Adam will show you exactly where you stand and what the highest-value next steps look like for your situation.',
    card1: { num: '01', title: 'Understand Your Profile', body: 'Your income preferences, planning style, and implementation persona are now clearly defined. That\'s more clarity than most people carry into a planning conversation.' },
    card2: { num: '02', title: 'Schedule a Discovery Call', body: 'A structured 30-minute conversation to assess where you are, what your profile points to, and whether working together makes sense for your situation.' },
    card3: { num: '03', title: 'Move with Confidence', body: 'Stop planning in the abstract. With a clear profile and the right guidance, the next steps become specific, actionable, and yours.' },
    btnText: 'Book My Discovery Call',
    btnUrl: 'https://calendly.com/adam-kazinec/align-discovery-call',
  },
  C: {
    heading: 'Your profile is ready. Understanding where you stand is the first step.',
    sub: 'Knowing your income preferences, risk approach, and planning style puts you ahead of most people who enter retirement without ever asking these questions.',
    card1: { num: '01', title: 'Study Your Profile', body: 'You\'ve just mapped six dimensions of how you think about retirement income. That\'s a real foundation — use it to evaluate any future planning conversation.' },
    card2: { num: '02', title: 'Learn at Your Pace', body: 'Kaz\'s Korner has free resources built around the same philosophy behind this assessment — plain-language retirement education with no agenda attached.' },
    card3: { num: '03', title: 'Come Back When You\'re Ready', body: 'When the timeline gets closer or the numbers start to align, Adam will be here. There\'s no pressure and no expiration date on this profile.' },
    btnText: 'Watch Kaz\'s Korner',
    btnUrl: 'https://www.youtube.com/@KazsKorner',
  },
};

function ResultsContent() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage.getItem('alignResults');
      if (!raw) { router.replace('/quiz'); return; }
      setResults(JSON.parse(raw));
    } catch {
      router.replace('/quiz');
    }
  }, [router]);

  // Animate spectrum bars after mount
  useEffect(() => {
    if (!results) return;
    const t1 = setTimeout(() => {
      const s1 = document.getElementById('spec1');
      const s2 = document.getElementById('spec2');
      const isContractual  = results.traitResults?.incomeSource === 'Contractual';
      const isCommitted    = results.traitResults?.incomeStructure === 'Committed';
      if (s1) s1.style.width = isContractual  ? '18%' : '82%';
      if (s2) s2.style.width = isCommitted    ? '18%' : '82%';
    }, 400);

    const t2 = setTimeout(() => {
      const bars = [
        { id: 'sb1', val: results.traitResults?.mindset },
        { id: 'sb2', val: results.traitResults?.liquidity },
        { id: 'sb3', val: results.traitResults?.spender },
        { id: 'sb4', val: results.traitResults?.payoutPattern },
      ];
      bars.forEach(({ id, val }) => {
        const el = document.getElementById(id);
        if (!el || !val) return;
        // A-side traits sit left, B-side sit right — just use a simple heuristic
        const aSide = ['Income Mindset', 'Cash Liquidity', 'Front Loaded', 'Phased Income'];
        el.style.width = aSide.includes(val) ? '28%' : '72%';
      });
    }, 600);

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    return () => { clearTimeout(t1); clearTimeout(t2); io.disconnect(); };
  }, [results]);

  if (!mounted || !results) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 40px', fontFamily: 'sans-serif', color: '#555' }}>
        Loading your profile…
      </div>
    );
  }

  const tr   = results.traitResults || {};
  const tier = results.tier || 'C';
  const cta  = CTA_CONFIG[tier] || CTA_CONFIG.C;
  const firstName = results.firstName || '';

  // Copy lookups
  const incomeSourceCopy    = PRIMARY_TRAIT_COPY[tr.incomeSource]    || '';
  const incomeStructCopy    = PRIMARY_TRAIT_COPY[tr.incomeStructure] || '';
  const secondaryKey = (val) => `${val}|${tr.incomeSource}|${tr.incomeStructure}`;
  const personaData  = PERSONA_COPY[results.persona] || PERSONA_COPY['Pragmatic Realist'];

  // Persona quadrant label — human-readable, no internal code
  const personaQuadrantLabel = {
    'Collaborative Partner': 'High Advisor Value · High Financial Confidence',
    'Strategic Delegator':   'High Advisor Value · Prefers Expert Guidance',
    'Confident Investor':    'High Financial Confidence · Self-Directed',
    'Independent Learner':   'Building Confidence · Exploring Options',
    'Pragmatic Realist':     'Balanced Approach',
  }[results.persona] || '';

  const secondaryTraits = [
    { label: 'Mindset',           icon: '🧠', val: tr.mindset,        num: '03', desc: 'How you think about retirement wealth' },
    { label: 'Liquidity',         icon: '💧', val: tr.liquidity,      num: '04', desc: 'How you want cash accessible' },
    { label: 'Spending Pattern',  icon: '📈', val: tr.spender,        num: '05', desc: 'How you want to spend across retirement' },
    { label: 'Payout Pattern',    icon: '🗓', val: tr.payoutPattern,  num: '06', desc: 'How you want income delivered' },
  ];

  return (
    <>
      <StarfieldBackground />
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{font-size:16px;scroll-behavior:smooth}
        :root{
          --cyan:#00f0ff;
          --cyan-dim:rgba(0,240,255,0.10);
          --cyan-border:rgba(0,240,255,0.25);
          --accent:#3a3a3c;
          --accent-mid:#5a5a5e;
          --charcoal:#4a4a4a;
          --mid-grey:#666;
          --bg:#f8f9fb;
          --bg-alt:#f2f4f7;
          --surface:#fff;
          --ink:#1c1c1e;
          --ink-soft:#4a4a4a;
          --ink-muted:#666;
          --ink-faint:#999;
          --border:rgba(0,0,0,0.06);
          --border-md:rgba(0,0,0,0.1);
          --shadow-sm:0 1px 4px rgba(0,0,0,0.05);
          --shadow-md:0 4px 24px rgba(0,0,0,0.08);
          --panel:#1c1c1e;
          --font-display:'Manrope',sans-serif;
          --font-sans:'Inter',sans-serif;
          --r-sm:8px;--r-md:14px;--r-lg:20px;--r-xl:28px;--r-pill:999px;
        }
        body{background:var(--bg);color:var(--ink);font-family:var(--font-sans);overflow-x:hidden;-webkit-font-smoothing:antialiased}
        a{text-decoration:none;color:inherit}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:rgba(0,0,0,0.15);border-radius:99px}

        /* NAV */
        .r-nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:14px 48px;background:rgba(248,249,251,0.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--border-md);box-shadow:var(--shadow-sm)}
        .r-nav-logo{display:flex;align-items:center;gap:12px;font-family:var(--font-display);font-size:17px;font-weight:700;letter-spacing:-0.02em;color:var(--ink)}
        .r-nav-mark{width:30px;height:30px;border-radius:7px;background:var(--ink);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff}
        .r-nav-cta{background:var(--ink);color:#fff;padding:10px 24px;border-radius:var(--r-pill);font-size:13px;font-weight:500;transition:all 0.25s;border:none;cursor:pointer;font-family:var(--font-sans);text-decoration:none}
        .r-nav-cta:hover{background:var(--accent);transform:translateY(-1px);box-shadow:var(--shadow-md)}

        /* HERO */
        .r-hero{background:#0c0c0e;padding:120px 48px 80px;text-align:center;position:relative;overflow:hidden}
        .r-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% -10%, rgba(0,240,255,0.08) 0%, transparent 60%);pointer-events:none}
        .r-hero-inner{position:relative;z-index:1;max-width:700px;margin:0 auto}
        .r-hero-title{font-family:var(--font-display);font-size:clamp(28px,4vw,42px);font-weight:700;color:#fff;line-height:1.1;letter-spacing:-0.035em;margin-bottom:16px}
        .r-hero-title em{font-style:normal;font-weight:300;color:var(--cyan)}
        .r-hero-desc{font-size:16px;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.5);max-width:560px;margin:0 auto}

        /* SECTIONS */
        .r-section{padding:80px 48px}
        .r-section-inner{max-width:1000px;margin:0 auto}
        .r-tag{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:500;color:var(--accent-mid);letter-spacing:0.02em;margin-bottom:18px;font-family:var(--font-sans)}
        .r-tag::before{content:'';width:20px;height:1px;background:var(--accent-mid)}
        .r-h{font-family:var(--font-display);font-size:clamp(26px,3.5vw,38px);font-weight:700;line-height:1.1;letter-spacing:-0.035em;color:var(--ink);margin-bottom:14px}
        .r-h em{font-style:normal;font-weight:300;color:var(--charcoal)}
        .r-sub{font-size:15px;font-weight:300;line-height:1.75;color:var(--ink-soft);max-width:580px}

        /* PRIMARY TRAITS */
        .primary-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:48px}
        .trait-card{background:var(--surface);border:1px solid var(--border-md);border-radius:var(--r-lg);padding:32px;position:relative;overflow:hidden;box-shadow:var(--shadow-sm);transition:all 0.3s}
        .trait-card:hover{border-color:rgba(0,0,0,0.12);box-shadow:var(--shadow-md);transform:translateY(-2px)}
        .trait-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ink)}
        .trait-num{font-size:11px;font-weight:500;color:var(--accent-mid);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:12px;font-family:var(--font-sans)}
        .trait-name{font-family:var(--font-display);font-size:20px;font-weight:700;color:var(--ink);letter-spacing:-0.025em;margin-bottom:6px;line-height:1.2}
        .trait-result{display:inline-flex;align-items:center;gap:6px;background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.12);border-radius:var(--r-pill);padding:4px 14px;font-size:12px;font-weight:600;color:var(--charcoal);margin-bottom:18px;font-family:var(--font-sans)}
        .trait-result-dot{width:6px;height:6px;border-radius:50%;background:var(--charcoal)}
        .spectrum-labels{display:flex;justify-content:space-between;margin-bottom:8px}
        .spec-label{font-size:10px;font-weight:500;color:var(--ink-faint);letter-spacing:0.02em;text-transform:uppercase}
        .spectrum-track{height:6px;background:var(--bg-alt);border-radius:3px;overflow:visible;position:relative;border:1px solid var(--border)}
        .spectrum-fill{height:100%;border-radius:3px;transition:width 1s ease;position:relative;background:linear-gradient(90deg,var(--charcoal),var(--mid-grey));width:0}
        .spectrum-marker{position:absolute;right:-5px;top:50%;transform:translateY(-50%);width:14px;height:14px;border-radius:50%;background:var(--ink);border:2px solid #fff;box-shadow:0 0 0 2px var(--ink)}
        .trait-body{font-size:13px;font-weight:300;line-height:1.75;color:var(--mid-grey)}

        /* SECONDARY TRAITS */
        .secondary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:40px}
        @media(min-width:900px){.secondary-grid{grid-template-columns:repeat(4,1fr)}}
        .sec-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);padding:24px;position:relative;overflow:hidden;box-shadow:var(--shadow-sm);transition:all 0.3s}
        .sec-card:hover{border-color:rgba(0,0,0,0.12);box-shadow:var(--shadow-md);transform:translateY(-2px)}
        .sec-icon{width:36px;height:36px;border-radius:var(--r-sm);background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.12);display:flex;align-items:center;justify-content:center;font-size:16px;margin-bottom:14px}
        .sec-num{font-size:10px;font-weight:500;color:var(--accent-mid);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:8px;font-family:var(--font-sans)}
        .sec-name{font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-0.02em;margin-bottom:6px}
        .sec-result{display:inline-flex;align-items:center;gap:5px;background:rgba(0,0,0,0.04);border:1px solid rgba(0,0,0,0.12);border-radius:var(--r-pill);padding:3px 10px;font-size:11px;font-weight:600;color:var(--charcoal);margin-bottom:10px;font-family:var(--font-sans)}
        .sec-body{font-size:12px;font-weight:300;line-height:1.7;color:var(--mid-grey)}
        .sec-bar-wrap{height:3px;background:var(--bg-alt);border-radius:2px;overflow:hidden;margin-top:14px;border:1px solid var(--border)}
        .sec-bar{height:100%;background:var(--charcoal);border-radius:2px;transition:width 1s ease;width:0}

        /* PERSONA */
        .persona-bg{background:var(--bg-alt)}
        .persona-wrap{margin-top:48px;display:grid;grid-template-columns:1fr 1.4fr;gap:40px;align-items:start}
        .persona-card{background:var(--surface);border:1px solid var(--border-md);border-radius:var(--r-xl);padding:36px;box-shadow:var(--shadow-md);position:relative;overflow:hidden}
        .persona-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--ink)}
        .persona-quadrant-label{font-size:11px;font-weight:500;color:var(--accent-mid);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:12px;font-family:var(--font-sans)}
        .persona-name{font-family:var(--font-display);font-size:26px;font-weight:700;color:var(--ink);letter-spacing:-0.035em;margin-bottom:14px;line-height:1.1}
        .persona-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .p-tag{padding:4px 12px;border-radius:var(--r-pill);font-size:11px;font-weight:500;background:rgba(0,0,0,0.04);color:var(--charcoal);border:1px solid rgba(0,0,0,0.12);font-family:var(--font-sans)}
        .persona-desc{font-size:14px;font-weight:300;line-height:1.8;color:var(--mid-grey)}
        .persona-matrix{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;position:relative}
        .persona-matrix::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--border-md);transform:translateX(-50%)}
        .persona-matrix::after{content:'';position:absolute;top:50%;left:0;right:0;height:1px;background:var(--border-md);transform:translateY(-50%)}
        .pm-cell{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-md);padding:18px;font-size:13px;font-family:var(--font-display);font-weight:600;color:var(--ink-soft);letter-spacing:-0.01em;transition:all 0.2s}
        .pm-cell.active{background:var(--ink);color:#fff;border-color:var(--ink);box-shadow:var(--shadow-md);transform:scale(1.03)}
        .pm-cell-sub{font-size:11px;font-weight:300;color:var(--ink-faint);margin-top:4px;font-family:var(--font-sans);letter-spacing:0}
        .pm-cell.active .pm-cell-sub{color:rgba(255,255,255,0.5)}
        .matrix-axis-h{display:flex;justify-content:space-between;margin-bottom:8px;padding:0 2px}
        .axis-label{font-size:10px;font-weight:500;color:var(--ink-faint);letter-spacing:0.04em;text-transform:uppercase;font-family:var(--font-sans)}

        /* CTA / NEXT STEPS */
        .next-section{background:#0c0c0e;padding:80px 48px;position:relative;overflow:hidden}
        .next-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 60%);pointer-events:none}
        .next-inner{max-width:900px;margin:0 auto;position:relative;z-index:1}
        .next-tag{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:500;color:var(--cyan);letter-spacing:0.02em;margin-bottom:20px;font-family:var(--font-sans)}
        .next-tag::before{content:'';width:20px;height:1px;background:var(--cyan)}
        .next-h{font-family:var(--font-display);font-size:clamp(28px,4vw,44px);font-weight:700;color:#fff;line-height:1.1;letter-spacing:-0.035em;margin-bottom:16px}
        .next-h em{font-style:normal;font-weight:300;color:var(--cyan)}
        .next-sub{font-size:16px;font-weight:300;line-height:1.75;color:rgba(255,255,255,0.4);max-width:560px;margin-bottom:48px}
        .next-cards{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:48px}
        .next-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--r-lg);padding:24px;transition:all 0.3s}
        .next-card:hover{background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.14)}
        .next-card-num{font-family:var(--font-display);font-size:11px;font-weight:500;color:var(--cyan);letter-spacing:0.04em;text-transform:uppercase;margin-bottom:10px}
        .next-card-title{font-family:var(--font-display);font-size:16px;font-weight:700;color:#fff;letter-spacing:-0.02em;margin-bottom:8px}
        .next-card-body{font-size:13px;font-weight:300;line-height:1.7;color:rgba(255,255,255,0.4)}
        .cta-group{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
        .btn-primary{display:inline-flex;align-items:center;gap:10px;background:#fff;color:var(--ink);padding:16px 36px;border-radius:var(--r-pill);font-size:15px;font-weight:600;letter-spacing:-0.01em;transition:all 0.3s;box-shadow:0 4px 20px rgba(0,0,0,0.2);font-family:var(--font-sans);border:none;cursor:pointer;text-decoration:none}
        .btn-primary:hover{background:var(--cyan);color:var(--ink);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,240,255,0.25)}
        .cta-note{margin-top:20px;font-size:12px;color:rgba(255,255,255,0.2);font-family:var(--font-sans)}

        /* FOOTER */
        .r-footer{background:#111113;padding:36px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;border-top:1px solid rgba(255,255,255,0.04)}
        .r-foot-brand{display:flex;align-items:center;gap:10px;color:#fff;font-family:var(--font-display);font-size:15px;font-weight:700;letter-spacing:-0.02em}
        .r-foot-mark{width:28px;height:28px;border-radius:6px;background:rgba(0,240,255,0.08);color:var(--cyan);border:1px solid rgba(0,240,255,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}
        .r-foot-copy{font-size:12px;color:rgba(255,255,255,0.2);letter-spacing:-0.01em}
        .r-foot-links{display:flex;gap:24px}
        .r-foot-links a{font-size:12px;color:rgba(255,255,255,0.25);transition:color 0.2s}
        .r-foot-links a:hover{color:var(--cyan)}

        /* REVEAL */
        .reveal{opacity:0;transform:translateY(28px);transition:opacity 0.65s ease,transform 0.65s ease}
        .reveal.in{opacity:1;transform:none}
        .d1{transition-delay:0s}.d2{transition-delay:0.1s}.d3{transition-delay:0.2s}.d4{transition-delay:0.3s}

        /* RESPONSIVE */
        @media(max-width:900px){
          .r-nav{padding:14px 20px}
          .r-hero,.r-section,.next-section{padding-left:24px;padding-right:24px}
          .primary-grid,.persona-wrap,.next-cards{grid-template-columns:1fr}
          .secondary-grid{grid-template-columns:1fr 1fr}
        }
        @media(max-width:500px){.secondary-grid{grid-template-columns:1fr}}
      `}</style>

      {/* NAV */}
      <nav className="r-nav">
        <a href="/" className="r-nav-logo">
          <div className="r-nav-mark">A</div>
          ALIGN
        </a>
        <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="r-nav-cta">
          {tier === 'A' ? 'Book a Strategy Session' : tier === 'B' ? 'Book a Discovery Call' : 'Watch Kaz\'s Korner'}
        </a>
      </nav>

      {/* HERO */}
      <section className="r-hero">
        <div className="r-hero-inner">
          <h1 className="r-hero-title">
            {firstName ? `${firstName}, your` : 'Your'} Retirement Profile:<br />
            <em>{tr.incomeSource} · {tr.incomeStructure}</em>
          </h1>
          <p className="r-hero-desc">
            Your income preferences and planning approach are well-defined. Here's what your answers reveal about how your retirement strategy should be structured.
          </p>
        </div>
      </section>

      {/* PRIMARY TRAITS */}
      <section className="r-section" style={{ background: 'var(--bg)' }}>
        <div className="r-section-inner">
          <div className="r-tag">Primary Traits</div>
          <h2 className="r-h">Two dimensions that define<br />your <em>income strategy.</em></h2>
          <p className="r-sub">These traits have the most influence on which retirement income structure fits you. They reflect how you genuinely think about money — not how a generic plan assumes you do.</p>

          <div className="primary-grid">
            {/* Income Source */}
            <div className="trait-card reveal d1">
              <div className="trait-num">01 — Primary</div>
              <div className="trait-name">Income Source</div>
              <div className="trait-result"><div className="trait-result-dot"></div>{tr.incomeSource}</div>
              <div className="trait-spectrum">
                <div className="spectrum-labels">
                  <span className="spec-label">Contractual</span>
                  <span className="spec-label">Market-Driven</span>
                </div>
                <div className="spectrum-track">
                  <div className="spectrum-fill" id="spec1"><div className="spectrum-marker"></div></div>
                </div>
              </div>
              <p className="trait-body">{incomeSourceCopy}</p>
            </div>

            {/* Income Structure */}
            <div className="trait-card reveal d2">
              <div className="trait-num">02 — Primary</div>
              <div className="trait-name">Income Structure</div>
              <div className="trait-result"><div className="trait-result-dot"></div>{tr.incomeStructure}</div>
              <div className="trait-spectrum">
                <div className="spectrum-labels">
                  <span className="spec-label">Committed</span>
                  <span className="spec-label">Adjustable</span>
                </div>
                <div className="spectrum-track">
                  <div className="spectrum-fill" id="spec2"><div className="spectrum-marker"></div></div>
                </div>
              </div>
              <p className="trait-body">{incomeStructCopy}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECONDARY TRAITS */}
      <section className="r-section" style={{ background: 'var(--bg-alt)' }}>
        <div className="r-section-inner">
          <div className="r-tag">Secondary Traits</div>
          <h2 className="r-h">Four dimensions that shape<br />your <em>planning approach.</em></h2>
          <p className="r-sub">These preferences inform how your income strategy is structured, paced, and funded — and they're specific to you.</p>

          <div className="secondary-grid">
            {secondaryTraits.map(({ label, icon, val, num, desc }, i) => {
              const copy = val ? SECONDARY_TRAIT_COPY[secondaryKey(val)] : null;
              return (
                <div key={label} className={`sec-card reveal d${i + 1}`}>
                  <div className="sec-icon">{icon}</div>
                  <div className="sec-num">{num} — Secondary</div>
                  <div className="sec-name">{label}</div>
                  <div className="sec-result">{val || '—'}</div>
                  <p className="sec-body">
                    {copy
                      ? copy.slice(0, copy.indexOf('\n\n') > 0 ? copy.indexOf('\n\n') : 220)
                      : desc}
                  </p>
                  <div className="sec-bar-wrap"><div className="sec-bar" id={`sb${i + 1}`}></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PERSONA */}
      <section className="r-section persona-bg">
        <div className="r-section-inner">
          <div className="r-tag">Implementation Persona</div>
          <h2 className="r-h">How you work <em>best with advice.</em></h2>
          <p className="r-sub">Beyond what strategy fits — this is how you engage with the process itself. Your persona shapes every conversation and every decision point.</p>

          <div className="persona-wrap">
            <div className="persona-card reveal d1">
              <div className="persona-quadrant-label">{personaQuadrantLabel}</div>
              <div className="persona-name">{results.persona}</div>
              <div className="persona-tags">
                {personaData.quadrant.split('/').map((t) => (
                  <div key={t} className="p-tag">{t.trim()}</div>
                ))}
              </div>
              <p className="persona-desc">{personaData.description}</p>
            </div>

            <div className="reveal d2">
              <div style={{ marginBottom: '10px' }}>
                <div className="matrix-axis-h">
                  <span className="axis-label">Low Self-Efficacy</span>
                  <span className="axis-label">High Self-Efficacy</span>
                </div>
              </div>
              <div className="persona-matrix">
                {[
                  { name: 'Collaborative Partner', sub: 'High advisor + High confidence' },
                  { name: 'Strategic Delegator',   sub: 'High advisor + Low confidence' },
                  { name: 'Confident Investor',    sub: 'Low advisor + High confidence' },
                  { name: 'Independent Learner',   sub: 'Low advisor + Low confidence' },
                ].map((cell) => (
                  <div key={cell.name} className={`pm-cell${results.persona === cell.name ? ' active' : ''}`}>
                    {cell.name}
                    <div className="pm-cell-sub">{cell.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '0 2px' }}>
                <span className="axis-label">Low Advisor Value</span>
                <span className="axis-label">High Advisor Value</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — varies by tier */}
      <section className="next-section" id="cta-section">
        <div className="next-inner">
          <div className="next-tag">What Comes Next</div>
          <h2 className="next-h">{cta.heading.includes('isn\'t built yet') ? <>Your profile is ready.<br /><em>Your strategy isn't built yet.</em></> : cta.heading}</h2>
          <p className="next-sub">{cta.sub}</p>

          <div className="next-cards">
            {[cta.card1, cta.card2, cta.card3].map((card) => (
              <div key={card.num} className={`next-card reveal d${parseInt(card.num)}`}>
                <div className="next-card-num">{card.num}</div>
                <div className="next-card-title">{card.title}</div>
                <p className="next-card-body">{card.body}</p>
              </div>
            ))}
          </div>

          <div className="cta-group">
            <a href={cta.btnUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {cta.btnText} &nbsp;→
            </a>
          </div>
          <div className="cta-note">FINRA Registered · CLU® ChFC® RICP® · No obligation · Chamblee, GA</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="r-footer">
        <div className="r-foot-brand">
          <div className="r-foot-mark">A</div>
          ALIGN
        </div>
        <div className="r-foot-copy">© 2026 Convergent Financial Partners · Adam Kazinec · Chamblee, GA · FINRA Registered</div>
        <div className="r-foot-links">
          <a href="#">Privacy</a>
          <a href="#">Disclosures</a>
          <a href="/">Back to Home</a>
        </div>
      </footer>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px 40px', fontFamily: 'sans-serif', color: '#555' }}>
        Loading your profile…
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
