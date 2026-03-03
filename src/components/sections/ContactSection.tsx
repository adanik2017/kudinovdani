interface ContactTranslations {
  startProject: string
  ctaLines: [string, string, string]
  ctaDesc: string
  telegram: string
  email: string
  process: string
  steps: [string, string, string][]
}

interface ContactSectionProps {
  isMobile: boolean
  t: ContactTranslations
}

import { Reveal } from '../Reveal'

export function ContactSection({ isMobile, t }: ContactSectionProps) {
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? '56px 20px 64px' : '96px 48px 112px',
        borderTop: '1px solid #1a1a1a',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
          <span style={{ display: 'block', width: '32px', height: '1px', background: '#333' }} />
          <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.55em', margin: 0 }}>{t.startProject}</p>
        </div>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '48px' : '80px',
          alignItems: 'start',
        }}>
          {/* LEFT — CTA */}
          <Reveal delay={0}>
            <h2
              className="brand"
              style={{
                fontSize: isMobile ? 'clamp(36px,10vw,52px)' : 'clamp(44px,4.5vw,72px)',
                lineHeight: 0.9, marginBottom: '24px',
              }}
            >
              {t.ctaLines[0]}<br />{t.ctaLines[1]}<br />{t.ctaLines[2]}
            </h2>
            <p style={{ color: '#666', fontSize: '13px', lineHeight: '1.85', marginBottom: '36px' }}>
              {t.ctaDesc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://t.me/kudinovdani"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => (window as any).ym?.(107083695, 'reachGoal', 'click_contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 28px', background: '#fff', color: '#000',
                  textDecoration: 'none', fontSize: '10px', letterSpacing: '0.35em',
                  fontFamily: "'Bebas Neue',sans-serif", transition: 'all 0.2s',
                  width: 'fit-content',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#ddd'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.05 9.656c-.148.658-.543.818-1.1.508l-3.05-2.246-1.47 1.415c-.163.163-.3.3-.614.3l.22-3.1 5.64-5.095c.245-.22-.054-.34-.38-.12L6.93 14.41l-3-.935c-.654-.204-.667-.654.136-.968l11.69-4.508c.544-.197 1.02.132.807.25z" />
                </svg>
                {t.telegram}
              </a>
              <a
                href="mailto:adanik2017@gmail.com"
                onClick={() => (window as any).ym?.(107083695, 'reachGoal', 'click_contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '10px',
                  padding: '14px 28px', background: 'none', color: '#888',
                  textDecoration: 'none', fontSize: '10px', letterSpacing: '0.35em',
                  fontFamily: "'Bebas Neue',sans-serif", transition: 'all 0.2s',
                  width: 'fit-content', border: '1px solid #333',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#666' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#333' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                {t.email}
              </a>
            </div>
          </Reveal>

          {/* RIGHT — process */}
          <Reveal delay={150}>
            <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.45em', marginBottom: '28px' }}>{t.process}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {t.steps.map(([num, title, desc], i, arr) => (
                <div
                  key={num}
                  style={{
                    display: 'flex', gap: '20px',
                    paddingBottom: '24px',
                    borderBottom: i < arr.length - 1 ? '1px solid #111' : 'none',
                    marginBottom: i < arr.length - 1 ? '24px' : '0',
                  }}
                >
                  <div style={{
                    flexShrink: 0, display: 'flex',
                    flexDirection: 'column', alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#333', letterSpacing: '0.2em', lineHeight: 1 }}>
                      {num}
                    </span>
                    {i < arr.length - 1 && (
                      <div style={{ width: '1px', flex: 1, background: '#1a1a1a', marginTop: '8px', minHeight: '20px' }} />
                    )}
                  </div>
                  <div>
                    <p className="brand" style={{ fontSize: '14px', letterSpacing: '0.08em', color: '#ddd', margin: '0 0 6px', lineHeight: 1 }}>
                      {title}
                    </p>
                    <p style={{ color: '#666', fontSize: '11px', lineHeight: '1.75', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
