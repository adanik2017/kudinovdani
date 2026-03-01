import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import type { Language } from '../../types'

interface NavigationProps {
  lang: Language
  setLang: (l: Language) => void
  cat: string
  setCat: (c: string) => void
  cats: readonly string[]
  projCount: number
  isMobile: boolean
  menuOpen: boolean
  setMenuOpen: (o: boolean | ((prev: boolean) => boolean)) => void
  t: {
    catName: Record<string, string>
    projCount: (n: number) => string
    about: string
    contact: string
    categories: string
    navigation: string
    discuss: string
  }
}

export function Navigation({
  lang, setLang, cat, setCat, cats, projCount,
  isMobile, menuOpen, setMenuOpen, t,
}: NavigationProps) {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 40, background: 'rgba(0,0,0,0.97)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '14px 20px' : '20px 48px',
      }}>
        <a href="#" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <div
            className="brand"
            style={{ fontSize: isMobile ? '18px' : '24px', color: '#fff', lineHeight: 1, letterSpacing: '0.12em' }}
          >
            KUDINOV FILMS
          </div>
        </a>

        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', fontSize: '13px', letterSpacing: '0.18em' }}>
          {!isMobile && cats.map(c => (
            <button
              key={c}
              onClick={() => {
                setCat(c)
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                color: cat === c ? '#fff' : '#666',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0 0 4px 0', fontFamily: 'inherit',
                fontSize: 'inherit', letterSpacing: 'inherit',
                borderBottom: cat === c ? '1px solid #fff' : '1px solid transparent',
                transition: 'all .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = cat === c ? '#fff' : '#666'}
            >
              {t.catName[c] || c}
            </button>
          ))}

          {!isMobile && (
            <span style={{ color: '#2a2a2a', fontSize: '9px', letterSpacing: '0.3em', marginLeft: '8px' }}>
              {String(projCount).padStart(2, '0')} {t.projCount(projCount)}
            </span>
          )}

          {!isMobile && [['#about', t.about], ['#contact', t.contact]].map(([h, l]) => (
            <a
              key={h}
              href={h}
              style={{ color: '#666', textDecoration: 'none', fontSize: '10px', letterSpacing: '0.22em' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#666'}
            >
              {l}
            </a>
          ))}

          {!isMobile && <LangSwitcher lang={lang} setLang={setLang} style={{ marginLeft: '8px' }} />}
        </div>

        {/* Hamburger — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px', display: 'flex', flexDirection: 'column',
              gap: '5px', alignItems: 'flex-end', marginLeft: '4px',
            }}
          >
            <span style={{
              display: 'block', height: '1px', background: '#fff',
              transition: 'all 0.3s', width: '22px',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', height: '1px', background: '#fff',
              transition: 'all 0.3s', width: '16px',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', height: '1px', background: '#fff',
              transition: 'all 0.3s', width: '22px',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobile && (
        <div style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '500px' : '0',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          borderTop: menuOpen ? '1px solid #1a1a1a' : '1px solid transparent',
        }}>
          <div style={{ padding: '8px 0 24px', display: 'flex', flexDirection: 'column' }}>
            {/* Category filter */}
            <div style={{ padding: '16px 20px 8px' }}>
              <p style={{ color: '#333', fontSize: '8px', letterSpacing: '0.4em', marginBottom: '12px' }}>
                {t.categories}
              </p>
              {cats.map(c => (
                <button
                  key={c}
                  onClick={() => {
                    setCat(c)
                    setMenuOpen(false)
                    setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 420)
                  }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    color: cat === c ? '#fff' : '#666',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '10px 0', fontFamily: 'inherit', fontSize: '13px',
                    letterSpacing: '0.2em', borderBottom: '1px solid #111',
                  }}
                >
                  {t.catName[c] || c} {cat === c && <span style={{ color: '#444', fontSize: '9px', marginLeft: '8px' }}>●</span>}
                </button>
              ))}
            </div>

            {/* Nav links */}
            <div style={{ padding: '8px 20px' }}>
              <p style={{ color: '#333', fontSize: '8px', letterSpacing: '0.4em', marginBottom: '12px', marginTop: '8px' }}>
                {t.navigation}
              </p>
              {[['#about', t.about], ['#contact', t.contact]].map(([h, l]) => (
                <a
                  key={h}
                  href={h}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block', color: '#888', textDecoration: 'none',
                    fontSize: '13px', letterSpacing: '0.2em',
                    padding: '10px 0', borderBottom: '1px solid #111',
                  }}
                >
                  {l}
                </a>
              ))}
              <a
                href="https://t.me/kudinovdani"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block', marginTop: '20px', padding: '12px 20px',
                  border: '1px solid #fff', color: '#fff', textDecoration: 'none',
                  fontSize: '10px', letterSpacing: '0.35em',
                  fontFamily: "'Bebas Neue',sans-serif", textAlign: 'center',
                  transition: 'all 0.2s',
                }}
              >
                {t.discuss}
              </a>
            </div>

            {/* Language switcher */}
            <div style={{
              padding: '16px 20px 0', borderTop: '1px solid #111',
              marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <span style={{ color: '#333', fontSize: '8px', letterSpacing: '0.4em', marginRight: '12px' }}>LANG</span>
              <LangSwitcher lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
