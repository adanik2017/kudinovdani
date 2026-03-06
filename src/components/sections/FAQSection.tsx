import { useState } from 'react'

interface FAQSectionProps {
  isMobile: boolean
  t: {
    faq: string
    faqItems: [string, string][]
  }
}

export function FAQSection({ isMobile, t }: FAQSectionProps) {
  const [sectionOpen, setSectionOpen] = useState(false)
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ borderTop: '1px solid #111', background: '#020202' }}>
      <button
        onClick={() => setSectionOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '18px 20px' : '22px 48px',
          background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <span style={{ color: '#444', fontSize: '9px', letterSpacing: '0.4em', fontFamily: 'inherit' }}>
          {t.faq}
        </span>
        <span style={{
          color: '#333', fontSize: '16px',
          transform: sectionOpen ? 'rotate(45deg)' : 'none',
          transition: 'transform 0.3s ease',
          display: 'inline-block',
        }}>+</span>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: sectionOpen ? '2000px' : '0',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: isMobile ? '8px 20px 32px' : '8px 48px 40px', maxWidth: '860px' }}>
          {t.faqItems.map(([q, a], i) => (
            <div key={i} style={{ borderBottom: '1px solid #141414' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: '16px',
                  padding: isMobile ? '16px 0' : '20px 0',
                  background: 'none', border: 'none', cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? '14px' : '15px',
                  letterSpacing: '0.06em',
                  color: open === i ? '#fff' : '#888',
                  transition: 'color 0.2s',
                }}>
                  {q}
                </span>
                <span style={{
                  flexShrink: 0, color: '#333', fontSize: '16px',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease',
                  display: 'inline-block',
                }}>+</span>
              </button>
              <div style={{
                overflow: 'hidden',
                maxHeight: open === i ? '300px' : '0',
                transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
              }}>
                <p style={{ color: '#555', fontSize: '12px', lineHeight: '1.85', paddingBottom: '18px', margin: 0 }}>
                  {a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
