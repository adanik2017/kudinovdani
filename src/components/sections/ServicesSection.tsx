interface ServicesTranslations {
  servicesLabel: string
  servicesCount: string
  services: [string, string, string, string | null][]
  discuss: string
  ctaNote: string
}

interface ServicesSectionProps {
  isMobile: boolean
  t: ServicesTranslations
}

import { Reveal } from '../Reveal'

export function ServicesSection({ isMobile, t }: ServicesSectionProps) {
  return (
    <div style={{ padding: isMobile ? '48px 20px 56px' : '80px 48px 96px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Reveal>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '48px', flexWrap: 'wrap', gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: '#333' }} />
            <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.55em', margin: 0 }}>{t.servicesLabel}</p>
          </div>
          <p style={{ color: '#333', fontSize: '9px', letterSpacing: '0.25em', margin: 0 }}>{t.servicesCount}</p>
        </div>
        </Reveal>

        {/* Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '1px', background: '#161616' }}>
          {t.services.map(([num, title, desc, badge], si) => (
            <Reveal key={num} delay={si * 100}>
            <div
              style={{
                background: '#000', padding: '32px 28px',
                position: 'relative', transition: 'background 0.25s',
                cursor: 'default', height: '100%', boxSizing: 'border-box',
                borderBottom: isMobile ? '1px solid #161616' : 'none',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0a0a0a'}
              onMouseLeave={e => e.currentTarget.style.background = '#000'}
            >
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px',
              }}>
                <p style={{ color: '#2e2e2e', fontSize: '11px', letterSpacing: '0.4em', fontFamily: 'monospace', margin: 0 }}>
                  {num}
                </p>
                {badge && (
                  <span style={{ padding: '3px 8px', border: '1px solid #2a2a2a', color: '#666', fontSize: '8px', letterSpacing: '0.2em' }}>
                    {badge}
                  </span>
                )}
              </div>
              <p className="brand" style={{ fontSize: '17px', letterSpacing: '0.06em', marginBottom: '14px', color: '#eee', lineHeight: 1.1 }}>
                {title}
              </p>
              <p style={{ color: '#666', fontSize: '12px', lineHeight: '1.85', margin: 0 }}>{desc}</p>
            </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={100}>
        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <a
            href="https://t.me/kudinovdani"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '14px 36px',
              border: '1px solid #fff', color: '#fff', textDecoration: 'none',
              fontSize: '10px', letterSpacing: '0.35em',
              fontFamily: "'Bebas Neue',sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}
          >
            {t.discuss}
          </a>
          <p style={{ color: '#444', fontSize: '11px', margin: 0 }}>{t.ctaNote}</p>
        </div>
        </Reveal>
      </div>
    </div>
  )
}
