import { useState, useEffect, useRef } from 'react'
import { LangSwitcher } from '../LangSwitcher/LangSwitcher'
import { Lightbox } from '../Lightbox/Lightbox'
import type { Project, Language, LightboxState } from '../../types'

interface ProjectDetailProps {
  project: Project
  lang: Language
  setLang: (l: Language) => void
  isMobile: boolean
  onClose: () => void
  onPrev: (() => void) | null
  onNext: (() => void) | null
  projIdx: number
  projTotal: number
  t: {
    catName: Record<string, string>
    close: string
    fLabel: string
    cLabel: string
    yLabel: string
    dLabel: string
    pLabel: string
    aiLabel: string
    palette: string
    storyboard: string
    aiNote: string
    hybridNote: string
  }
}

export function ProjectDetail({ project, lang, setLang, isMobile, onClose, onPrev, onNext, projIdx, projTotal, t }: ProjectDetailProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [videoLang, setVideoLang] = useState(0)
  const p = project
  const activeVideo = p.videoVersions ? p.videoVersions[videoLang].src : p.video
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (dx > 60 && onPrev) onPrev()
    else if (dx < -60 && onNext) onNext()
  }

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox) {
        const shots = p.storyboard
        if (e.key === 'ArrowRight' && lightbox.idx < shots.length - 1) {
          setLightbox({ src: shots[lightbox.idx + 1].src, idx: lightbox.idx + 1 })
        }
        if (e.key === 'ArrowLeft' && lightbox.idx > 0) {
          setLightbox({ src: shots[lightbox.idx - 1].src, idx: lightbox.idx - 1 })
        }
        if (e.key === 'Escape') setLightbox(null)
        return
      }
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, p.storyboard, onClose])
  const brief = lang === 'en' ? (p.brief_en || p.brief) : p.brief
  const description = lang === 'en' ? (p.description_en || p.description) : p.description

  const meta: [string, string][] = [
    [t.fLabel, p.director],
    [t.cLabel, p.client],
    [t.yLabel, p.date],
    [t.dLabel, p.duration],
    ...(p.producer ? [[t.pLabel, p.producer] as [string, string]] : []),
  ]

  return (
    <div style={{ paddingBottom: '96px' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '14px 20px' : '20px 48px',
        background: '#000', zIndex: 50, borderBottom: '1px solid #0d0d0d',
      }}>
        <div className="brand" style={{ fontSize: isMobile ? '14px' : '20px', letterSpacing: '0.15em' }}>
          KUDINOV FILMS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              color: '#888', background: 'none', border: '1px solid #222',
              cursor: 'pointer', fontSize: '11px', letterSpacing: '0.25em',
              fontFamily: 'inherit', padding: '8px 18px', transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#555' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#222' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>{t.close}</span>
          </button>
        </div>
      </header>

      <div style={{
        paddingTop: '80px',
        padding: isMobile ? '60px 20px 0' : '80px 48px 0',
        maxWidth: '1600px', margin: '0 auto',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Project header */}
        <div style={{
          order: isMobile ? 2 : 1,
          padding: isMobile ? '20px 0' : '60px 0',
          borderBottom: isMobile ? 'none' : '1px solid #0d0d0d',
        }}>
          <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.45em', marginBottom: '12px' }}>
            {t.catName[p.category] || p.category} / {p.date}
          </p>
          <h1 className="brand" style={{ fontSize: isMobile ? 'clamp(36px,9vw,60px)' : 'clamp(50px,8vw,110px)', lineHeight: 0.9, marginBottom: isMobile ? '20px' : '40px' }}>
            {p.title}
          </h1>

          <div style={{ display: 'flex', gap: isMobile ? '16px' : '48px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '6px' }}>{k}</p>
                <p style={{ color: '#aaa', fontSize: '13px' }}>{v}</p>
              </div>
            ))}
            {p.aiCreators && (
              <div>
                <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '6px' }}>{t.aiLabel}</p>
                {p.aiCreators.map(c => (
                  <p key={c} style={{ color: '#aaa', fontSize: '13px' }}>{c}</p>
                ))}
              </div>
            )}
          </div>

          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.9', maxWidth: '640px' }}>{brief}</p>

          {p.tools && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
              {p.tools.map(tool => (
                <span
                  key={tool}
                  style={{ fontSize: '9px', letterSpacing: '0.25em', color: '#aaa', border: '1px solid #555', padding: '5px 12px' }}
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Video */}
        <div style={{ order: isMobile ? 1 : 2, margin: isMobile ? '0 -20px 0' : '48px 0' }}>
          {p.videoVersions && (
            <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
              {p.videoVersions.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setVideoLang(i)}
                  style={{
                    background: videoLang === i ? '#fff' : 'none',
                    border: '1px solid ' + (videoLang === i ? '#fff' : '#333'),
                    color: videoLang === i ? '#000' : '#555',
                    cursor: 'pointer', fontSize: '9px', letterSpacing: '0.3em',
                    fontFamily: 'inherit', padding: '5px 14px', transition: 'all .2s',
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ background: '#050505' }}>
            <video
              key={activeVideo}
              controls
              playsInline
              preload="metadata"
              style={{ width: '100%', display: 'block' }}
              poster={p.image}
            >
              <source src={activeVideo} type="video/mp4" />
            </video>
          </div>
        </div>


        {/* Color palette */}
        <div style={{ order: 4, marginBottom: '48px' }}>
          <p style={{ color: '#333', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '16px' }}>{t.palette}</p>
          <div style={{ display: 'flex', gap: '4px', height: '32px' }}>
            {(p.palette || []).map((c, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: c, borderRadius: '2px' }} title={c} />
            ))}
          </div>
        </div>

        {/* Storyboard */}
        <div style={{ order: 5, borderBottom: '1px solid #0d0d0d', marginBottom: '20px', paddingBottom: '12px' }}>
          <p style={{ color: '#444', fontSize: '11px', letterSpacing: '0.4em' }}>{t.storyboard}</p>
        </div>
        <div style={{
          order: 6,
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: '6px', paddingBottom: '64px',
        }}>
          {p.storyboard.map((s, i) => (
            <div key={i} onClick={() => setLightbox({ src: s.src, idx: i })} style={{ cursor: 'zoom-in' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#080808', marginBottom: '4px' }}>
                <img
                  src={s.src}
                  alt={s.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.12em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile swipe nav */}
      {isMobile && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px', background: 'rgba(0,0,0,0.95)',
          borderTop: '1px solid #1a1a1a', zIndex: 50,
        }}>
          <button
            onClick={onPrev ?? undefined}
            disabled={!onPrev}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: onPrev ? 'pointer' : 'default',
              color: onPrev ? '#888' : '#2a2a2a', fontSize: '10px', letterSpacing: '0.2em',
              fontFamily: 'inherit', padding: '8px 0', transition: 'color .2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            ПРЕД
          </button>

          <span style={{ color: '#333', fontSize: '9px', letterSpacing: '0.4em' }}>
            {String(projIdx + 1).padStart(2, '0')} / {String(projTotal).padStart(2, '0')}
          </span>

          <button
            onClick={onNext ?? undefined}
            disabled={!onNext}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'none', border: 'none', cursor: onNext ? 'pointer' : 'default',
              color: onNext ? '#888' : '#2a2a2a', fontSize: '10px', letterSpacing: '0.2em',
              fontFamily: 'inherit', padding: '8px 0', transition: 'color .2s',
            }}
          >
            СЛЕД
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          lightbox={lightbox}
          shots={p.storyboard}
          onClose={() => setLightbox(null)}
          onGoTo={idx => setLightbox({ src: p.storyboard[idx].src, idx })}
          closeLabel={t.close}
        />
      )}
    </div>
  )
}
