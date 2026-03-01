import { Fragment } from 'react'
import type { Language } from '../../types'

interface LangSwitcherProps {
  lang: Language
  setLang: (l: Language) => void
  style?: React.CSSProperties
}

export function LangSwitcher({ lang, setLang, style }: LangSwitcherProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', ...style }}>
      {(['ru', 'en'] as Language[]).map((l, i) => (
        <Fragment key={l}>
          {i > 0 && (
            <span style={{ color: '#333', fontSize: '9px', padding: '0 2px' }}>/</span>
          )}
          <button
            onClick={() => setLang(l)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: lang === l ? '#fff' : '#444',
              fontSize: '10px',
              letterSpacing: '0.2em',
              fontFamily: 'inherit',
              padding: '2px 4px',
              transition: 'color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = lang === l ? '#fff' : '#444')}
          >
            {l.toUpperCase()}
          </button>
        </Fragment>
      ))}
    </div>
  )
}
