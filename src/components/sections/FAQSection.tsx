import { useState } from 'react'
import { Reveal } from '../Reveal'

interface FAQSectionProps {
  isMobile: boolean
  t: {
    faq: string
    faqItems: [string, string][]
  }
}

export function FAQSection({ isMobile, t }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ borderTop: '1px solid #1a1a1a', padding: isMobile ? '56px 20px 64px' : '96px 48px 112px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
            <span style={{ display: 'block', width: '32px', height: '1px', background: '#333' }} />
            <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.55em', margin: 0 }}>{t.faq}</p>
          </div>
        </Reveal>

        <div style={{ maxWidth: '760px' }}>
          {t.faqItems.map(([q, a], i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{ borderBottom: '1px solid #141414' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', gap: '16px',
                    padding: isMobile ? '18px 0' : '22px 0',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    className="brand"
                    style={{
                      fontSize: isMobile ? '14px' : '16px',
                      letterSpacing: '0.06em',
                      color: open === i ? '#fff' : '#aaa',
                      transition: 'color 0.2s',
                    }}
                  >
                    {q}
                  </span>
                  <span style={{
                    flexShrink: 0, width: '20px', height: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#444', fontSize: '16px',
                    transform: open === i ? 'rotate(45deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}>
                    +
                  </span>
                </button>
                <div style={{
                  overflow: 'hidden',
                  maxHeight: open === i ? '300px' : '0',
                  transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                }}>
                  <p style={{
                    color: '#666', fontSize: '13px', lineHeight: '1.85',
                    paddingBottom: '20px', margin: 0,
                  }}>
                    {a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
