import Link from 'next/link';

export default function Home() {
  const videoSrc = process.env.NEXT_PUBLIC_VIDEO_URL || '/videos/AdamAssessmentIntro_FINAL2.mp4';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0d2137',
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Nav */}
      <header style={{
        width: '100%',
        padding: '20px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '22px', fontWeight: '700', color: '#d4af37', letterSpacing: '2px' }}>
          ALIGN
        </div>
      </header>

      {/* Hero */}
      <main style={{
        width: '100%',
        maxWidth: '900px',
        padding: '40px 24px 80px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 52px)',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '16px',
          color: '#ffffff',
        }}>
          What's Your Retirement<br />
          <span style={{ color: '#d4af37' }}>Wealth Blueprint?</span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#9bbcd4',
          marginBottom: '40px',
          maxWidth: '600px',
          lineHeight: '1.6',
        }}>
          36 questions. Your personalized ALIGN score. A retirement strategy built around how you actually think about income.
        </p>

        {/* Video */}
        <div style={{
          width: '100%',
          maxWidth: '800px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '40px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          backgroundColor: '#000',
          aspectRatio: '16/9',
          position: 'relative',
        }}>
          <video
            controls
            preload="metadata"
            poster=""
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit: 'cover',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* CTA */}
        <Link href="/quiz" style={{
          display: 'inline-block',
          padding: '18px 56px',
          backgroundColor: '#d4af37',
          color: '#0d2137',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '18px',
          fontWeight: '800',
          letterSpacing: '0.5px',
          boxShadow: '0 4px 20px rgba(212,175,55,0.35)',
          transition: 'transform 0.15s ease',
        }}>
          Start Your Assessment
        </Link>

        <p style={{ fontSize: '13px', color: '#557a99', marginTop: '16px' }}>
          Takes about 5 minutes · No credit card required
        </p>
      </main>
    </div>
  );
}
