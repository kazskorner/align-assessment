'use client';

/**
 * ALIGN Results — Tier C
 * Design: matches landing page (dark theme, muted accent, Plus Jakarta Sans)
 * CTA: No Calendly. Two resource links: YouTube + Convergent FP website
 * Video hero: selected by age range (demographics.ageRange from Q29)
 */

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PRIMARY_TRAITS,
  SECONDARY_TRAITS,
  PERSONAS,
  getVideoSrc,
  TIER_CONFIG,
} from '../copy-matrix';

// ── STYLES ────────────────────────────────────────────────────────────────────
const ACCENT = '#a8c5d6'; // Tier C: muted steel blue

const S = {
  page: {
    background: '#000', color: '#fff',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    minHeight: '100vh', overflowX: 'hidden',
    WebkitFontSmoothing: 'antialiased',
  },
  hero: {
    position: 'relative', height: '100vh', minHeight: 700,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    textAlign: 'center', overflow: 'hidden', padding: '0 40px',
  },
  videoWrap: { position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' },
  video: {
    position: 'absolute', top: '50%', left: '50%',
    minWidth: '100%', minHeight: '100%',
    width: 'auto', height: 'auto',
    transform: 'translate(-50%,-50%)',
    objectFit: 'cover', pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 30%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.88) 100%)',
  },
  heroContent: { position: 'relative', zIndex: 4, maxWidth: 860 },
  tierBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(0,0,0,0.45)',
    border: `1px solid rgba(168,197,214,0.3)`,
    borderRadius: 999, padding: '7px 18px 7px 8px',
    fontSize: 12, fontWeight: 600, color: `rgba(168,197,214,0.9)`,
    marginBottom: 28, letterSpacing: '0.06em', backdropFilter: 'blur(14px)',
  },
  tierDot: {
    width: 20, height: 20, borderRadius: '50%',
    background: ACCENT, display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
    fontSize: 10, fontWeight: 800, color: '#000',
  },
  heroName: {
    fontSize: 'clamp(14px,1.4vw,18px)', fontWeight: 400,
    color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em',
    textTransform: 'uppercase', marginBottom: 16,
  },
  heroH1: {
    fontSize: 'clamp(36px,6.5vw,84px)', fontWeight: 700, lineHeight: 1.0,
    letterSpacing: '-0.03em', color: '#fff', marginBottom: 20,
    textShadow: '0 2px 40px rgba(0,0,0,0.6)',
  },
  heroCyan: { color: ACCENT, fontStyle: 'italic' },
  heroSub: { fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto 36px' },
  section: { maxWidth: 1060, margin: '0 auto', padding: '80px 40px' },
  sectionNarrow: { maxWidth: 780, margin: '0 auto', padding: '0 40px 80px' },
  sectionTag: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: `rgba(168,197,214,0.07)`, border: `1px solid rgba(168,197,214,0.18)`,
    borderRadius: 999, padding: '6px 14px',
    fontSize: 11, fontWeight: 600, color: ACCENT,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700,
    lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff', marginBottom: 12,
  },
  sectionDesc: { fontSize: 16, color: '#a0a0a0', lineHeight: 1.7 },
  traitCard: { background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 28, padding: '44px 48px', marginBottom: 16 },
  traitBody: { fontSize: 15, color: '#a0a0a0', lineHeight: 1.8, whiteSpace: 'pre-line' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 48 },
  secCard: { background: '#111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px' },
  secLabel: { fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#767676', marginBottom: 8 },
  secValue: { fontSize: 16, fontWeight: 600, color: ACCENT, marginBottom: 14, letterSpacing: '-0.01em' },
  secBody: { fontSize: 14, color: '#a0a0a0', lineHeight: 1.7, whiteSpace: 'pre-line' },
  personaCard: {
    background: `linear-gradient(135deg,rgba(168,197,214,0.05),transparent)`,
    border: `1px solid rgba(168,197,214,0.15)`,
    borderRadius: 36, padding: '52px', position: 'relative', overflow: 'hidden', marginTop: 64,
  },
  personaQuote: {
    position: 'absolute', top: -20, right: 32,
    fontSize: 200, fontWeight: 700,
    color: `rgba(168,197,214,0.04)`,
    lineHeight: 1, fontFamily: 'Georgia,serif', pointerEvents: 'none',
  },
  personaLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, marginBottom: 12 },
  personaName: { fontSize: 'clamp(24px,3vw,38px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 24 },
  personaBody: { fontSize: 15, color: '#a0a0a0', lineHeight: 1.8, whiteSpace: 'pre-line' },
  // Tier C CTA — Two resource links, no Calendly
  ctaBand: {
    margin: '0 40px 80px', background: '#111',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 36, padding: '72px 60px',
    textAlign: 'center', position: 'relative', overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
    width: 480, height: 480, borderRadius: '50%',
    background: `radial-gradient(circle,rgba(168,197,214,0.06) 0%,transparent 65%)`,
    pointerEvents: 'none',
  },
  ctaTitle: {
    fontSize: 'clamp(28px,4vw,52px)', fontWeight: 700,
    letterSpacing: '-0.025em', color: '#fff',
    marginBottom: 16, position: 'relative', lineHeight: 1.1,
  },
  ctaBody: { fontSize: 16, color: '#767676', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7, position: 'relative' },
  // Two side-by-side resource cards for Tier C
  resourceGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 16, maxWidth: 640, margin: '0 auto', position: 'relative',
  },
  resourceCard: {
    background: '#161616', border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 20, padding: '28px 24px',
    textAlign: 'center', textDecoration: 'none', color: '#fff',
    transition: 'border-color 0.25s, background 0.25s',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
  },
  resourceIcon: {
    width: 44, height: 44, borderRadius: 12,
    background: `rgba(168,197,214,0.1)`, border: `1px solid rgba(168,197,214,0.2)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, marginBottom: 4,
  },
  resourceLabel: { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#767676' },
  resourceTitle: { fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.3 },
  resourceArrow: { fontSize: 13, color: ACCENT, marginTop: 4 },
  ctaSub: { fontSize: 12, color: '#4a4a4a', marginTop: 24, position: 'relative' },
  divider: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 40px' },
  footer: { padding: '36px 40px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 },
  footBrand: { display: 'flex', alignItems: 'center', gap: 10 },
  footLogo: { width: 28, height: 28, borderRadius: 8, background: '#00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#000' },
  footName: { fontSize: 15, fontWeight: 700, letterSpacing: '0.03em' },
  footCenter: { fontSize: 12, color: '#767676', textAlign: 'center', lineHeight: 1.6 },
  footLinks: { display: 'flex', gap: 24 },
  footLink: { fontSize: 12, fontWeight: 500, color: '#767676', textDecoration: 'none' },
};

function TierCPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try { setResults(JSON.parse(decodeURIComponent(data))); }
      catch (e) { console.error('ALIGN: Error parsing results', e); }
    }
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, [searchParams]);

  if (!results) {
    return (
      <div style={{ ...S.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#767676', fontSize: 14 }}>Loading your results…</p>
      </div>
    );
  }

  const { traitResults, persona, demographics, respondentName } = results;
  const primaryCombo = `${traitResults.incomeSource} + ${traitResults.incomeStructure}`;
  const videoSrc = getVideoSrc(demographics?.ageRange);
  const firstName = respondentName?.split(' ')[0] || '';

  return (
    <div style={S.page}>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#000}::-webkit-scrollbar-thumb{background:#4a4a4a;border-radius:99px}
        a{text-decoration:none;color:inherit}
        .resource-card:hover{border-color:rgba(168,197,214,0.3)!important;background:#1e1e1e!important}
        @media(max-width:700px){.grid2{grid-template-columns:1fr!important}.resource-grid{grid-template-columns:1fr!important}.ctaBand{margin:0 20px 60px!important;padding:48px 24px!important}.traitCard{padding:32px 24px!important}.personaCard{padding:36px 28px!important}.section{padding:60px 20px!important}}
      `}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.videoWrap}>
          <video autoPlay muted loop playsInline preload="auto" style={S.video}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div style={S.overlay} />
        <div style={{ position:'absolute',inset:0,zIndex:1,pointerEvents:'none',background:`radial-gradient(ellipse 80% 50% at 50% 100%,rgba(168,197,214,0.07) 0%,transparent 65%)` }} />
        <div style={{ position:'absolute',bottom:0,left:0,right:0,height:200,zIndex:2,pointerEvents:'none',background:'linear-gradient(to bottom,transparent,#000)' }} />
        <div style={S.heroContent}>
          {firstName && <p style={S.heroName}>{firstName}'s ALIGN Assessment</p>}
          <div style={S.tierBadge}>
            <div style={S.tierDot}>C</div>
            {TIER_CONFIG.C.badge}
          </div>
          <h1 style={S.heroH1}>
            Your Retirement<br />Income Personality is<br />
            <span style={S.heroCyan}>{traitResults.incomeSource} &amp; {traitResults.incomeStructure}</span>
          </h1>
          <p style={S.heroSub}>
            {TIER_CONFIG.C.heroLine} Your personalized breakdown is below — use it to start building your foundation.
          </p>
        </div>
        <div style={{ position:'absolute',bottom:40,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:10,zIndex:4 }}>
          <span style={{ fontSize:9,fontWeight:600,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)' }}>Scroll to explore</span>
          <div style={{ width:1,height:44,background:`linear-gradient(to bottom,rgba(168,197,214,0.5),transparent)` }} />
        </div>
      </section>

      {/* ── PRIMARY TRAITS ── */}
      <div style={S.section} className="section">
        <div style={S.sectionTag}>Your Income Engine</div>
        <h2 style={S.sectionTitle}>Income Source: <span style={{ color: ACCENT }}>{traitResults.incomeSource}</span></h2>
        <div style={S.traitCard} className="traitCard">
          <div style={S.traitBody}>{PRIMARY_TRAITS.incomeSource[traitResults.incomeSource] || 'Description coming soon.'}</div>
        </div>
        <div style={{ ...S.sectionTag, marginTop: 48 }}>Your Income Rhythm</div>
        <h2 style={S.sectionTitle}>Income Structure: <span style={{ color: ACCENT }}>{traitResults.incomeStructure}</span></h2>
        <div style={S.traitCard} className="traitCard">
          <div style={S.traitBody}>{PRIMARY_TRAITS.incomeStructure[traitResults.incomeStructure] || 'Description coming soon.'}</div>
        </div>
      </div>

      <div style={S.divider} />

      {/* ── SECONDARY TRAITS ── */}
      <div style={S.section} className="section">
        <div style={S.sectionTag}>What Else We Learned</div>
        <h2 style={S.sectionTitle}>Your Four Supporting <span style={{ color: ACCENT }}>Dimensions</span></h2>
        <p style={S.sectionDesc}>Each secondary trait reflects how your primary income profile plays out in real life — day to day, year to year.</p>
        <div style={S.grid2} className="grid2">
          <div style={S.secCard}><div style={S.secLabel}>Mindset</div><div style={S.secValue}>{traitResults.mindset}</div><div style={S.secBody}>{SECONDARY_TRAITS.mindset?.[traitResults.mindset]?.[primaryCombo] || 'Description coming soon.'}</div></div>
          <div style={S.secCard}><div style={S.secLabel}>Liquidity Preference</div><div style={S.secValue}>{traitResults.liquidity}</div><div style={S.secBody}>{SECONDARY_TRAITS.liquidity?.[traitResults.liquidity]?.[primaryCombo] || 'Description coming soon.'}</div></div>
          <div style={S.secCard}><div style={S.secLabel}>Spending Pattern</div><div style={S.secValue}>{traitResults.spender}</div><div style={S.secBody}>{SECONDARY_TRAITS.spender?.[traitResults.spender]?.[primaryCombo] || 'Description coming soon.'}</div></div>
          <div style={S.secCard}><div style={S.secLabel}>Payout Pattern</div><div style={S.secValue}>{traitResults.payoutPattern}</div><div style={S.secBody}>{SECONDARY_TRAITS.payoutPattern?.[traitResults.payoutPattern]?.[primaryCombo] || 'Description coming soon.'}</div></div>
        </div>
      </div>

      <div style={S.divider} />

      {/* ── PERSONA ── */}
      <div style={S.sectionNarrow} className="section">
        <div style={S.sectionTag}>How You Work Best</div>
        <h2 style={S.sectionTitle}>Your Implementation <span style={{ color: ACCENT }}>Persona</span></h2>
        <div style={S.personaCard} className="personaCard">
          <div style={S.personaQuote}>"</div>
          <div style={S.personaLabel}>Implementation Persona</div>
          <div style={S.personaName}>{persona}</div>
          <div style={S.personaBody}>{PERSONAS[persona] || 'Description coming soon.'}</div>
        </div>
      </div>

      <div style={S.divider} />

      {/* ── CTA — TIER C: No Calendly. Two resource links. ── */}
      <div style={S.ctaBand} className="ctaBand">
        <div style={S.ctaGlow} />
        <div style={{ ...S.sectionTag, justifyContent:'center', marginBottom:20 }}>Keep Learning</div>
        <h2 style={S.ctaTitle}>
          Your foundation starts<br />
          <span style={{ color: ACCENT }}>with understanding yourself.</span>
        </h2>
        <p style={S.ctaBody}>
          The best next step is education. Explore Adam's content and learn what a retirement income strategy built around your personality actually looks like.
        </p>

        {/* Two resource cards — YouTube + Convergent FP */}
        <div style={S.resourceGrid} className="resource-grid">
          <a
            href="https://www.youtube.com/@KazsKornerPodcast"
            target="_blank"
            rel="noopener noreferrer"
            style={S.resourceCard}
            className="resource-card"
          >
            <div style={S.resourceIcon}>▶</div>
            <div style={S.resourceLabel}>Watch &amp; Learn</div>
            <div style={S.resourceTitle}>Kaz's Korner Podcast on YouTube</div>
            <div style={S.resourceArrow}>Watch free content →</div>
          </a>

          <a
            href="https://www.convergentfp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={S.resourceCard}
            className="resource-card"
          >
            <div style={S.resourceIcon}>🏛</div>
            <div style={S.resourceLabel}>About Adam</div>
            <div style={S.resourceTitle}>Convergent Financial Partners</div>
            <div style={S.resourceArrow}>Visit the website →</div>
          </a>
        </div>

        <p style={S.ctaSub}>
          Free resources · No obligation · Start learning at your own pace
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer style={S.footer}>
        <div style={S.footBrand}><div style={S.footLogo}>A</div><span style={S.footName}>ALIGN</span></div>
        <div style={S.footCenter}>Assessment for Long-term Income &amp; Goal Navigation<br />© 2026 Adam Kazinec · Kaz's Korner · All rights reserved</div>
        <div style={S.footLinks}>
          <a href="https://www.youtube.com/@KazsKornerPodcast" target="_blank" rel="noopener noreferrer" style={S.footLink}>YouTube</a>
          <a href="https://www.convergentfp.com" target="_blank" rel="noopener noreferrer" style={S.footLink}>Convergent FP</a>
        </div>
      </footer>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ background:'#000',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'sans-serif' }}><p style={{ color:'#767676' }}>Loading your results…</p></div>}>
      <TierCPage />
    </Suspense>
  );
}
