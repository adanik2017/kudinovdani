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
    ctaFilmHeading: string
    ctaFilmSub: string
    telegram: string
    email: string
  }
}

export function ProjectDetail({ project, lang, setLang, isMobile, onClose, onPrev, onNext, projIdx, projTotal, t }: ProjectDetailProps) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const [videoLang, setVideoLang] = useState(0)
  // detect touch device regardless of orientation
  const [isPhone, setIsPhone] = useState(() => window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsPhone(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
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
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, p.storyboard, onClose, onPrev, onNext])

  // Trackpad horizontal swipe
  useEffect(() => {
    let accum = 0
    let timer: ReturnType<typeof setTimeout> | null = null
    const handler = (e: WheelEvent) => {
      if (lightbox) return
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
      accum += e.deltaX
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if (accum > 80 && onNext) onNext()
        else if (accum < -80 && onPrev) onPrev()
        accum = 0
      }, 60)
    }
    window.addEventListener('wheel', handler, { passive: true })
    return () => window.removeEventListener('wheel', handler)
  }, [lightbox, onPrev, onNext])
  const brief = lang === 'en' ? (p.brief_en || p.brief) : p.brief
  const description = lang === 'en' ? (p.description_en || p.description) : p.description
  const title = lang === 'en' ? (p.title_en || p.title) : p.title
  const director = lang === 'en' ? (p.director_en || p.director) : p.director
  const client = lang === 'en' ? (p.client_en || p.client) : p.client
  const producer = lang === 'en' ? (p.producer_en || p.producer) : p.producer
  const aiCreators = lang === 'en' ? (p.aiCreators_en || p.aiCreators) : p.aiCreators

  const meta: [string, string][] = [
    [t.fLabel, director],
    [t.cLabel, client],
    [t.yLabel, p.date],
    [t.dLabel, p.duration],
    ...(producer ? [[t.pLabel, producer] as [string, string]] : []),
  ]

  return (
    <div style={{ paddingBottom: '96px' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      {/* Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, width: '100%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isPhone ? '14px 20px' : '20px 48px',
        background: '#000', zIndex: 50, borderBottom: '1px solid #0d0d0d',
      }}>
        <div className="brand" style={{ fontSize: isPhone ? '14px' : '20px', letterSpacing: '0.15em' }}>
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
        padding: isPhone ? '60px 20px 0' : '80px 48px 0',
        maxWidth: '1600px', margin: '0 auto',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Project header */}
        <div style={{
          order: 2,
          padding: isPhone ? '20px 0' : '40px 0',
          borderBottom: 'none',
        }}>
          <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.45em', marginBottom: '12px' }}>
            {t.catName[p.category] || p.category} / {p.date}
          </p>
          <h1 className="brand" style={{ fontSize: isPhone ? 'clamp(36px,9vw,60px)' : 'clamp(44px,5vw,80px)', lineHeight: 0.9, marginBottom: isPhone ? '20px' : '32px' }}>
            {title}
          </h1>

          <div style={{ display: 'flex', gap: isPhone ? '16px' : '48px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {meta.map(([k, v]) => (
              <div key={k}>
                <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '6px' }}>{k}</p>
                <p style={{ color: '#aaa', fontSize: '13px' }}>{v}</p>
              </div>
            ))}
            {aiCreators && (
              <div>
                <p style={{ color: '#666', fontSize: '9px', letterSpacing: '0.4em', marginBottom: '6px' }}>{t.aiLabel}</p>
                {aiCreators.map(c => (
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
        <div style={{ order: 1, margin: isPhone ? '0 -20px 0' : '0 0 0' }}>
          {p.videoVersions && !isPhone && (
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
          {p.videoVersions && isPhone && (
            <div style={{ display: 'flex', gap: '6px', padding: '10px 20px 0' }}>
              {p.videoVersions.map((v, i) => (
                <button
                  key={v.label}
                  onClick={() => setVideoLang(i)}
                  style={{
                    background: videoLang === i ? '#fff' : 'none',
                    border: '1px solid ' + (videoLang === i ? '#fff' : '#333'),
                    color: videoLang === i ? '#000' : '#555',
                    cursor: 'pointer', fontSize: '9px', letterSpacing: '0.3em',
                    fontFamily: 'inherit', padding: '6px 16px', transition: 'all .2s',
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
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
          gridTemplateColumns: isPhone ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
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
        {/* CTA after storyboard */}
        <div style={{
          order: 7,
          borderTop: '1px solid #111',
          margin: isPhone ? '0 0 0' : '0',
          padding: isPhone ? '48px 0 32px' : '64px 0 48px',
          display: 'flex',
          flexDirection: isPhone ? 'column' : 'row',
          alignItems: isPhone ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}>
          <div>
            <h2 className="brand" style={{
              fontSize: isPhone ? 'clamp(32px,9vw,52px)' : 'clamp(36px,3.5vw,60px)',
              lineHeight: 0.9, marginBottom: '16px', color: '#fff',
            }}>
              {t.ctaFilmHeading}
            </h2>
            <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.8', maxWidth: '400px', margin: 0 }}>
              {t.ctaFilmSub}
            </p>
          </div>
          <a
            href="https://t.me/kudinovdani"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => (window as any).ym?.(107083695, 'reachGoal', 'click_contact')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '16px 36px', background: 'none', color: '#ccc',
              textDecoration: 'none', fontSize: '10px', letterSpacing: '0.35em',
              fontFamily: "'Bebas Neue',sans-serif", transition: 'all 0.2s',
              flexShrink: 0, border: '1px solid #444',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#ccc'; e.currentTarget.style.borderColor = '#444' }}
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
              padding: '16px 36px', background: 'none', color: '#888',
              textDecoration: 'none', fontSize: '10px', letterSpacing: '0.35em',
              fontFamily: "'Bebas Neue',sans-serif", transition: 'all 0.2s',
              flexShrink: 0, border: '1px solid #333',
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
      </div>

      {/* Nav — mobile: bottom bar, desktop: floating side arrows */}
      {isPhone ? (
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
              color: onPrev ? '#888' : '#2a2a2a', padding: '8px 0', transition: 'color .2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
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
              color: onNext ? '#888' : '#2a2a2a', padding: '8px 0', transition: 'color .2s',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          {onPrev && (
            <button
              onClick={onPrev}
              style={{
                position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: '1px solid #222', color: '#555',
                cursor: 'pointer', zIndex: 50, padding: '20px 14px',
                transition: 'all .2s', display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#555' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#222' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: '1px solid #222', color: '#555',
                cursor: 'pointer', zIndex: 50, padding: '20px 14px',
                transition: 'all .2s', display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#555' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#222' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </>
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
