// @ts-nocheck

'use client';
import { useEffect } from 'react';
import './landing.css';

export default function Home() {
  useEffect(() => {
    
/* CAR ACCORDION */
document.querySelectorAll('.car-panel').forEach(function(panel){
  panel.addEventListener('click',function(){
    document.querySelectorAll('.car-panel').forEach(function(p){p.classList.remove('active')});
    panel.classList.add('active');
  });
});

/* NAV */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>60)});

/* HAMBURGER */
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobile-menu');
const mobileClose=document.getElementById('mobile-close');
function openMenu(){hamburger.classList.add('open');mobileMenu.classList.add('open');document.body.style.overflow='hidden';}
function closeMenu(){hamburger.classList.remove('open');mobileMenu.classList.remove('open');document.body.style.overflow='';}
hamburger.addEventListener('click',function(){mobileMenu.classList.contains('open')?closeMenu():openMenu();});
mobileClose.addEventListener('click',closeMenu);
mobileMenu.querySelectorAll('.mobile-link').forEach(function(a){a.addEventListener('click',closeMenu);});

/* REVEAL */
const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:0.1});
document.querySelectorAll('.reveal').forEach(e=>ro.observe(e));

/* FAQ */
(window as any).toggleFaq = function(el: any){
  const item=el.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen)item.classList.add('open');
}

/* QUIZ */
let curQ=1,answers={};
document.querySelectorAll('.opt').forEach(o=>{
  o.addEventListener('click',function(){
    const q=this.dataset.q,s=parseInt(this.dataset.score);
    document.querySelectorAll(`.opt[data-q="${q}"]`).forEach(x=>x.classList.remove('sel'));
    this.classList.add('sel');answers[q]=s;
    (document.getElementById('qnext') as HTMLButtonElement).disabled=false;
  });
});
function qNext(){
  if(!answers[curQ])return;
  if(curQ<5){
    document.getElementById(`q${curQ}`).classList.remove('on');
    curQ++;
    document.getElementById(`q${curQ}`).classList.add('on');
    document.getElementById(`pb${curQ}`).classList.add('on');
    (document.getElementById('qback') as HTMLElement).style.visibility='visible';
    (document.getElementById('qnext') as HTMLButtonElement).disabled=!answers[curQ];
    if(curQ===5)(document.getElementById('qnext') as HTMLElement).textContent='See My Results →';
  } else showResults();
}
function qPrev(){
  if(curQ>1){
    document.getElementById(`q${curQ}`).classList.remove('on');
    curQ--;
    document.getElementById(`q${curQ}`).classList.add('on');
    document.getElementById(`pb${curQ+1}`).classList.remove('on');
    (document.getElementById('qback') as HTMLElement).style.visibility=curQ===1?'hidden':'visible';
    (document.getElementById('qnext') as HTMLButtonElement).disabled=!answers[curQ];
    (document.getElementById('qnext') as HTMLElement).textContent=curQ===5?'See My Results →':'Continue →';
  }
}
function showResults(){
  const total=Object.values(answers).reduce((a,b)=>a+b,0);
  const pct=Math.round(total/20*100);
  document.querySelectorAll('.qblock').forEach(b=>b.style.display='none');
  (document.getElementById('qprog') as HTMLElement).style.display='none';
  (document.getElementById('qnav') as HTMLElement).style.display='none';
  const res=document.getElementById('results');res.style.display='block';
  const r=45;const circ=2*Math.PI*r;
  setTimeout(()=>{
    (document.getElementById('rFill') as unknown as SVGCircleElement).style.strokeDashoffset=circ-(circ*pct/100);
    animN(document.getElementById('rVal'),0,total,1400);
  },300);
  const profiles=[
    {min:0,max:8,t:'Significant Misalignment Detected',d:"Your responses suggest a meaningful gap between how you think about money and how most strategies are built. This is the most important signal you can get — and exactly what ALIGN is designed to address."},
    {min:9,max:12,t:'Partially Aligned',d:"You have some right pieces in place, but there are dimensions where strategy and psychology likely diverge. The full assessment will pinpoint exactly where the gaps are."},
    {min:13,max:16,t:'Largely Aligned',d:"A solid foundation. There are still specific areas where fine-tuning could prevent quiet misalignments from compounding over time."},
    {min:17,max:20,t:'Strongly Aligned',d:"Your instincts and approach are well-matched. The full assessment will confirm your strengths and identify any remaining blind spots worth addressing."}
  ];
  const p=profiles.find(x=>total>=x.min&&total<=x.max)||profiles[0];
  document.getElementById('rTitle').textContent=p.t;
  document.getElementById('rDesc').textContent=p.d;
  const dims=[
    {name:'Income Security Preference',score:answers[1]||1,labels:['Market-Driven','Blended','Stability-Leaning','Contractual']},
    {name:'Strategy Flexibility',score:answers[2]||1,labels:['Wants Full Control','Prefers Flexibility','Moderate','Committed Structure']},
    {name:'Income vs. Net Worth',score:answers[3]||1,labels:['Net Worth Focus','Portfolio Growth','Income-Leaning','Income Mindset']},
    {name:'Advisor Value',score:answers[4]||1,labels:['Self-Directed','Some Advisor Value','Values Guidance','High Advisor Value']},
    {name:'Spending Pattern',score:answers[5]||1,labels:['Back-Loaded','Even Spending','Somewhat Front-Loaded','Front-Loaded']}
  ];
  const c=document.getElementById('rDims') as HTMLElement;c.innerHTML='';
  dims.forEach((d,i)=>{
    const bp=Math.max(((d.score-1)/3*100),5);
    const el=document.createElement('div');el.className='r-dim';
    el.innerHTML=`<div class="r-dim-name">${d.name}</div><div class="r-dim-track"><div class="r-dim-fill" id="df${i}"></div></div><div class="r-dim-val">${d.labels[d.score-1]}</div>`;
    c.appendChild(el);
    setTimeout(()=>{const f=document.getElementById(`df${i}`);if(f)f.style.width=bp+'%'},500+i*120);
  });
}
function animN(el: any, from: any, to: any, dur: any){
  const s=performance.now();
  (function go(now){const p=Math.min((now-s)/dur,1);el.textContent=Math.round(from+(to-from)*p);if(p<1)requestAnimationFrame(go)})(performance.now());
}
function qReset(){
  curQ=1;Object.keys(answers).forEach((k: string) => delete answers[parseInt(k, 10)]);
  document.querySelectorAll('.opt').forEach(o=>o.classList.remove('sel'));
  document.querySelectorAll('.qblock').forEach(b=>{(b as HTMLElement).style.display='';b.classList.remove('on')});
  (document.getElementById('q1') as HTMLElement).classList.add('on');
  (document.getElementById('qprog') as HTMLElement).style.display='';
  (document.getElementById('qnav') as HTMLElement).style.display='';
  document.querySelectorAll('.qpb').forEach((b,i)=>b.classList.toggle('on',i===0));
  (document.getElementById('qnext') as HTMLButtonElement).disabled=true;
  (document.getElementById('qnext') as HTMLElement).textContent='Continue →';
  (document.getElementById('qback') as HTMLElement).style.visibility='hidden';
  (document.getElementById('results') as HTMLElement).style.display='none';
  (document.getElementById('rFill') as unknown as SVGCircleElement).style.strokeDashoffset='283';
  (document.getElementById('quiz') as HTMLElement).scrollIntoView({behavior:'smooth'});
}

  }, []);

  return (
    <>
      


<nav id="nav">
  <div className="nav-logo">
    <img src="/ALIGN_Logo_White_Primary.png" alt="ALIGN" className="nav-logo-img nav-logo-img--light" onError={(e) => { /* naive ignore for now */ }} />
    <img src="/ALIGN_Logo_Black_Primary.png" alt="ALIGN" className="nav-logo-img nav-logo-img--dark" onError={(e) => { /* naive ignore for now */ }} />
    <div className="nav-logo-mark nav-logo-fallback" style={{ display: 'none' }}>ALN</div>
  </div>
  <div className="nav-links">
    <a href="#why">Why It Matters</a>
    <a href="#video">Watch</a>
    <a href="#discover">What You Learn</a>
    <a href="#adam">About Adam</a>
  </div>
  <a href="https://www.retirewithkaz.com/quiz" target="_blank" className="nav-cta">Take the Assessment →</a>
  <button className="nav-hamburger" id="hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>


<div className="nav-mobile-menu" id="mobile-menu">
  <button className="nav-mobile-close" id="mobile-close" aria-label="Close menu">✕</button>
  <a href="#why" className="mobile-link">Why It Matters</a>
  <a href="#video" className="mobile-link">Watch</a>
  <a href="#discover" className="mobile-link">What You Learn</a>
  <a href="#adam" className="mobile-link">About Adam</a>
  <a href="https://www.retirewithkaz.com/quiz" target="_blank" className="nav-mobile-cta">Take the Assessment →</a>
</div>


<section className="hero" id="top">
  
  <div className="hero-video-bg">
    <video autoPlay muted loop playsInline preload="auto" className="hero-video">
      <source src="/video/align-hero.mp4" type="video/mp4" />
    </video>
    <div className="hero-video-overlay"></div>
  </div>

  <div className="hero-corner tl"></div>
  <div className="hero-corner tr"></div>
  <div className="hero-corner bl"></div>
  <div className="hero-corner br"></div>

  <div className="hero-inner">

    <h1>
      <span className="subtitle-line">Discover Your Retirement Income Personality</span>
    </h1>

    <p className="hero-subtext">
      After nearly 20 years helping people retire, I've found that most retirement plans fail for one reason: <strong>the strategy doesn't match how you actually think and feel about money.</strong> This changes that.
    </p>

    <div className="hero-cta-group">
      <a href="https://www.retirewithkaz.com/quiz" target="_blank" className="btn-primary">
        Discover My Income Personality <span className="btn-arr">→</span>
      </a>
      <a href="#video" className="btn-secondary">
        Watch Adam Explain ↓
      </a>
    </div>

    <div className="hero-trust">
      <div className="trust-item"><span className="trust-icon">✦</span> Completely Free</div>
      <div className="trust-div"></div>
      <div className="trust-item"><span className="trust-icon">✦</span> 8 Minutes to Complete</div>
      <div className="trust-div"></div>
      <div className="trust-item"><span className="trust-icon">✦</span> Instant Personalized Results</div>
      <div className="trust-div"></div>
      <div className="trust-item"><span className="trust-icon">✦</span> No Obligation</div>
    </div>
  </div>
</section>


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
    <div className="stat-num" style={{ fontSize: 'clamp(13px,1.3vw,16px)', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontWeight: '400', marginTop: '-6px', letterSpacing: '0.01em' }}>Personalized Report Combinations</div>
    <div className="stat-label">Unique Outcome Profiles</div>
  </div>
  <div className="stat-item">
    <div className="stat-num">CLU · ChFC · RICP</div>
    <div className="stat-label">Professional Designations</div>
  </div>
</div>


<section className="problem" id="why">
  <div className="section-inner">
    <div className="section-tag">The Problem</div>
    <h2 className="section-h">Most retirement plans fail<br />not because of bad <em>math —</em><br />but because of bad alignment.</h2>

    <div className="problem-grid">
      <div className="problem-left reveal">
        <p className="problem-lead">
          A plan you don't <strong>emotionally believe in</strong> is a plan you'll abandon under pressure — exactly when you need it most.
        </p>
        <p className="problem-body">
          I've watched it happen hundreds of times. Someone builds a market-driven strategy but loses sleep during every downturn. Someone commits to a guaranteed income structure but resents the lack of flexibility. The strategy isn't wrong in theory — it's wrong <em>for them.</em>
          <br /><br />
          This misalignment creates real costs: unnecessary taxes, penalties for getting out of the wrong products, missed growth, and worst of all — a retirement built around anxiety instead of confidence.
          <br /><br />
          Two households that look financially identical can require completely different strategies. Your neighbor's plan is not your plan. The ALIGN assessment identifies exactly where you fall on every spectrum that matters — so we can build something that fits.
        </p>
      </div>

      <div className="problem-right reveal d2">
        <div className="mismatch-card">
          <div className="mismatch-title">The Costly Mismatch in Action</div>

          <div className="mismatch-pair">
            <div className="mismatch-side bad">
              <div className="ms-label">Their Emotions</div>
              Needs reliable income regardless of market. Loses sleep during volatility.
            </div>
            <div className="mismatch-arrow">≠</div>
            <div className="mismatch-side bad">
              <div className="ms-label">Their Strategy</div>
              Fully market-driven portfolio. Income depends on performance.
            </div>
          </div>

          <div className="mismatch-cost">
            <strong>The real cost:</strong> Panic selling at the bottom, unnecessary fees to restructure, emotional decisions that compound across 20+ years of retirement.
          </div>

          <div style={{ marginTop: '20px' }}>
            <div className="mismatch-pair" style={{ marginBottom: '0' }}>
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
  </div>
</section>

<div className="divider"></div>


<section className="video-sec" id="video">
  <div className="section-inner">
    <div className="section-tag" style={{ marginBottom: '16px' }}>Hear It From Adam</div>
    <h2 className="section-h">Why I Created ALIGN.</h2>
  </div>

  <div className="video-wrap reveal" style={{ maxWidth: '800px', margin: '48px auto 0' }}>
    <iframe
      src="https://www.youtube.com/embed/sJzrmBE8lic?rel=0&modestbranding=1"
      title="Adam Kazinec explains the ALIGN assessment"
      allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  </div>
  <p className="video-caption reveal d2">
    "A strategy or a plan that you put in place that doesn't connect to your emotional status will not be a strategy you stick to." — Adam Kazinec, CLU, ChFC, RICP
  </p>
</section>


<section className="discover" id="discover">
  <div className="section-inner">
    <div className="section-tag">What You Discover</div>
    <h2 className="section-h">Think of your retirement plan<br />like a <em>car.</em></h2>
    <p className="section-sub" style={{ maxWidth: '680px' }}>
      Every car has an engine, an interior, and a driver assistance system. Each one plays a different role — and together, they determine how the whole ride feels. Your retirement plan works the same way. The ALIGN assessment reveals all three layers of how yours is built.
    </p>

    
    <div className="car-accordion-wrap reveal" style={{ marginTop: '56px', maxWidth: '780px' }}>

      <div className="car-panel active" data-panel="car1">
        <div className="car-bg" style={{ background: 'url("/Car_Engine.jpg") center/cover' }}></div>
        <div className="car-overlay"></div>
        <div className="car-collapsed">
          <span className="car-num">01</span>
          <span className="car-label">Primary Traits — The Engine</span>
        </div>
        <div className="car-expanded">
          <div className="car-tag">01 — Primary Traits</div>
          <h3>The Engine</h3>
          <p>The engine determines how the car fundamentally runs. If the engine is built for stability, the ride feels smooth and dependable. If it's built for performance and flexibility, the ride may change depending on conditions. Your primary traits shape the core way your retirement plan operates day to day.</p>
        </div>
      </div>

      <div className="car-panel" data-panel="car2">
        <div className="car-bg" style={{ background: 'url("/Car_Interior.jpg") center/cover' }}></div>
        <div className="car-overlay"></div>
        <div className="car-collapsed">
          <span className="car-num">02</span>
          <span className="car-label">Secondary Traits — The Interior Features</span>
        </div>
        <div className="car-expanded">
          <div className="car-tag">02 — Secondary Traits</div>
          <h3>The Interior Features</h3>
          <p>The seats, temperature controls, sound system, and storage spaces affect how comfortable you feel while riding in the car. Secondary traits influence how you emotionally experience retirement — how comfortable you feel spending, saving, accessing money, and adapting along the way.</p>
        </div>
      </div>

      <div className="car-panel" data-panel="car3">
        <div className="car-bg" style={{ background: 'url("/Car_Navigation.jpg") center/cover' }}></div>
        <div className="car-overlay"></div>
        <div className="car-collapsed">
          <span className="car-num">03</span>
          <span className="car-label">Implementation — The Driver Assistance System</span>
        </div>
        <div className="car-expanded">
          <div className="car-tag">03 — Implementation</div>
          <h3>The Driver Assistance System</h3>
          <p>Some people want full GPS guidance, lane assist, and alerts helping them drive. Others prefer full control with minimal assistance. Implementation reflects how you prefer to make decisions and how much guidance or support you want while navigating retirement.</p>
        </div>
      </div>

    </div>
  </div>
</section>


<section className="how" id="how">
  <div className="section-inner">
    <div className="section-tag">How It Works</div>
    <h2 className="section-h">Three steps to your<br /><em>personalized results.</em></h2>

    <div className="how-steps">
      <div className="how-step reveal d1">
        <div className="how-step-num">01</div>
        <div className="how-step-title">Take the Assessment</div>
        <div className="how-step-body">No financial knowledge required. Questions explore how you think and feel about income, risk, flexibility, and your retirement vision — not your account balances.</div>
      </div>
      <div className="how-step reveal d2">
        <div className="how-step-num">02</div>
        <div className="how-step-title">Instant Personalized Report</div>
        <div className="how-step-body">Receive a comprehensive report showing your exact profile — with detailed descriptions of what each result means and how it should shape your retirement strategy.</div>
      </div>
      <div className="how-step reveal d3">
        <div className="how-step-num">03</div>
        <div className="how-step-title">Strategy Integration</div>
        <div className="how-step-body">Opportunity to schedule a strategy session to integrate these insights into your retirement plan.</div>
      </div>
    </div>
  </div>
</section>


<section className="about" id="adam" style={{ padding: '100px 48px' }}>
  <div className="about-inner">
    <div className="about-left reveal">
      <div className="adam-photo-wrap">
        <img className="adam-photo" src="/images/placeholder.jpg" alt="Adam Kazinec" />
        <div className="adam-photo-badge">
          CLU · ChFC · RICP<br />Retirement Income<br />Certified Professional
        </div>
      </div>
    </div>

    <div className="about-right reveal d2">
      <div className="about-tag">About Adam Kazinec</div>
      <h2 className="about-h">
        Nearly two decades.<br />One consistent conclusion:<br /><em>the numbers aren't enough.</em>
      </h2>
      <p className="about-body">
        After almost 20 years of helping individuals plan for retirement, enter retirement, and live throughout their retirement, Adam has reached a consistent conclusion: the plans that fail aren't failing because of math. They're failing because the strategy doesn't match the emotional construct of the person executing it.
        <br /><br />
        Two households that look financially identical — same assets, same timeline, same income needs — can require completely different strategies. Because the people are different. Their tolerance for uncertainty is different. Their relationship with money is different. Their priorities are different.
        <br /><br />
        The ALIGN assessment exists because Adam believes clarity about your financial psychology should come before any product recommendation — not after.
      </p>
      <div className="about-creds">
        <div className="about-cred"><div className="cred-dot"></div>Chartered Life Underwriter (CLU)</div>
        <div className="about-cred"><div className="cred-dot"></div>Chartered Financial Consultant (ChFC)</div>
        <div className="about-cred"><div className="cred-dot"></div>Retirement Income Certified Professional (RICP)</div>
        <div className="about-cred"><div className="cred-dot"></div>Nearly 20 years specializing in retirement income planning</div>
      </div>
    </div>
  </div>
</section>





<section className="faq" id="faq">
  <div className="section-inner">
    <div className="section-tag">Common Questions</div>
    <h2 className="section-h" style={{ marginBottom: '16px' }}>Everything you need to<br />know before you <em>begin.</em></h2>
  </div>

  <div className="faq-grid">
    <div className="faq-item reveal">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>Who is this assessment designed for?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">Anyone who is planning for retirement, nearing retirement, or already retired and wants to stress-test their current strategy. Whether you're 10 years out or already drawing income, understanding your emotional relationship with money will help you build — or refine — a plan you'll actually stick with.</div>
    </div>

    <div className="faq-item reveal d2">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>How long does the full assessment take?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">The full ALIGN assessment takes approximately 8 minutes to complete. You'll receive a personalized, multi-dimensional report immediately when you finish — no waiting, and you don't need to speak with anyone to see your results.</div>
    </div>

    <div className="faq-item reveal d3">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>Is this really free? What's the catch?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">It's completely free, with no hidden obligation. Adam believes that clarity about your financial psychology should be accessible before any financial decision. If your results qualify you for a personalized strategy session, you'll have the option to schedule one — but there is absolutely no pressure or obligation to do so.</div>
    </div>

    <div className="faq-item reveal d4">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>Does the assessment recommend specific products?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">No. The ALIGN assessment identifies your behavioral and emotional preferences — it does not recommend specific financial products. Your results tell you what types of strategies fit your psychology. Any specific product discussion happens separately, if and when you choose to engage.</div>
    </div>

    <div className="faq-item reveal d5">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>I already have a financial advisor. Should I still take this?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">Absolutely. Many people who take the assessment are surprised to discover that their current strategy doesn't align with how they actually think about money — even when the numbers look fine. The results can be a powerful conversation starter with your existing advisor, or help you identify if a second opinion is worth seeking.</div>
    </div>

    <div className="faq-item reveal">
      <div className="faq-q" onClick={(e) => (window as any).toggleFaq(e.currentTarget)}>
        <span>Why does emotional alignment matter as much as the math?</span>
        <div className="faq-icon">+</div>
      </div>
      <div className="faq-a">After nearly 20 years, Adam's consistent observation is that plans fail not because the math was wrong — but because the client couldn't stay committed to the strategy. A plan that conflicts with your instincts will be abandoned under pressure, exactly when discipline matters most. Alignment isn't a nice-to-have. It's the foundation everything else is built on.</div>
    </div>
  </div>
</section>


<div className="cta-band">
  <div style={{ position: 'relative', zIndex: '1', textAlign: 'left', maxWidth: '1100px', margin: '0 auto' }}>
    <div className="section-tag" style={{ marginBottom: '20px' }}>Start Today — It's Free</div>
    <h2 className="section-h" style={{ margin: '0 0 20px' }}>Move beyond a money manager.<br /><em>Hire a distribution strategist.</em></h2>
    <p className="section-sub" style={{ margin: '0 0 44px' }}>The ALIGN assessment takes 8 minutes and delivers a personalized map of your financial personality — built around how you actually think and feel about money. Not a template. Not generic advice. Yours.</p>
    <a href="https://www.retirewithkaz.com/quiz" target="_blank" className="btn-primary" style={{ fontSize: '16px', padding: '18px 40px', marginTop: '0' }}>
      Discover My Retirement Income Personality <span className="btn-arr">→</span>
    </a>
    <div className="cta-detail" style={{ textAlign: 'left', marginTop: '20px' }}>Free · 8 Minutes · Instant Results · No Obligation</div>
  </div>
</div>


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
    <a href="https://www.retirewithkaz.com/quiz" target="_blank">Take Assessment ↗</a>
  </div>
</footer>



    </>
  );
}
