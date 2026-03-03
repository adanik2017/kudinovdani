interface AboutTranslations {
  about: string
  bioRole: string
  badges: string[]
  bio1a: string
  bio1b: string
  bio1c: string
  bio2: string
  quote: string
  clientQuote: string
  clientName: string
  clientRole: string
  stats: [string, string, string][]
}

interface AboutSectionProps {
  isMobile: boolean
  t: AboutTranslations
}

import { Reveal } from '../Reveal'

export function AboutSection({ isMobile, t }: AboutSectionProps) {
  return (
    <section id="about" style={{ borderTop: '1px solid #1a1a1a', padding: '0' }}>
      {/* Hero stripe */}
      <div style={{ padding: isMobile ? '56px 20px 0' : '96px 48px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Label row */}
          <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: '#333' }} />
            <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.55em', margin: 0 }}>{t.about}</p>
          </div>
          </Reveal>

          {/* Main hero grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '80px',
            alignItems: 'center',
            marginBottom: isMobile ? '56px' : '80px',
          }}>
            {/* LEFT — avatar + name */}
            <Reveal delay={0} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {/* Avatar with glow ring */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: isMobile ? '80px' : '96px',
                    height: isMobile ? '80px' : '96px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, #333, #111)',
                    padding: '2px',
                  }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                      <img
                        src="https://pub-c86678aba1ff49b582b0c2a2947f259c.r2.dev/%D0%AF/daniil.webp"
                        alt="Даниил Кудинов"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 8%' }}
                      />
                    </div>
                  </div>
                  {/* Status dot */}
                  <div style={{
                    position: 'absolute', bottom: '4px', right: '4px',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: '#4ade80', border: '2px solid #000',
                  }} />
                </div>

                <div>
                  <h2
                    className="brand"
                    style={{
                      fontSize: isMobile ? 'clamp(28px,8vw,38px)' : 'clamp(32px,3vw,44px)',
                      lineHeight: 0.9, margin: '0 0 8px',
                    }}
                  >
                    ДАНИИЛ<br />КУДИНОВ
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#666', fontSize: '9px', letterSpacing: '0.3em' }}>{t.bioRole}</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {t.badges.map(b => (
                  <span
                    key={b}
                    style={{ padding: '5px 12px', border: '1px solid #2a2a2a', color: '#888', fontSize: '9px', letterSpacing: '0.3em' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* RIGHT — bio */}
            <Reveal delay={150}>
              <p style={{ color: '#aaa', fontSize: isMobile ? '14px' : '15px', lineHeight: '1.9', marginBottom: '20px' }}>
                {t.bio1a}
                <strong style={{ color: '#fff', fontWeight: 500 }}>{t.bio1b}</strong>
                {t.bio1c}
              </p>
              <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.9', marginBottom: '28px' }}>
                {t.bio2}
              </p>
              {/* Quote */}
              <div style={{ borderLeft: '2px solid #2a2a2a', paddingLeft: '16px' }}>
                <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.7', fontStyle: 'italic', margin: 0 }}>
                  {t.quote}
                </p>
              </div>
              {/* Client quote */}
              <div style={{
                marginTop: '28px', padding: '20px 24px',
                background: '#060606', border: '1px solid #1e1e1e',
              }}>
                <p style={{ color: '#999', fontSize: '13px', lineHeight: '1.8', fontStyle: 'italic', margin: '0 0 12px' }}>
                  {t.clientQuote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '24px', height: '1px', background: '#333' }} />
                  <div>
                    <p style={{ color: '#888', fontSize: '10px', letterSpacing: '0.25em', margin: '0 0 2px' }}>{t.clientName}</p>
                    <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.3em', margin: 0 }}>{t.clientRole}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ borderTop: '1px solid #141414', borderBottom: '1px solid #141414' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
        }}>
          {t.stats.map(([n, l, sub], i) => (
            <Reveal
              key={i}
              delay={i * 100}
              style={{
                padding: isMobile ? '28px 20px' : '36px 32px',
                borderRight: !isMobile && i < 3 ? '1px solid #141414' : 'none',
                borderBottom: isMobile && i % 2 === 0 ? '1px solid #141414' : 'none',
              }}
            >
              <p className="brand" style={{ fontSize: isMobile ? '36px' : '48px', color: '#fff', lineHeight: 1, marginBottom: '6px' }}>
                {n}
              </p>
              <p style={{ color: '#bbb', fontSize: '10px', letterSpacing: '0.25em', marginBottom: '6px' }}>{l}</p>
              <p style={{ color: '#444', fontSize: '10px', lineHeight: '1.5' }}>{sub}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
