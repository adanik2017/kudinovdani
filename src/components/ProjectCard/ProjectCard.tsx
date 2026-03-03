import { useEffect, useRef } from 'react'
import type { Project, Language } from '../../types'

interface ProjectCardProps {
  project: Project
  lang: Language
  isMobile: boolean
  cardIdx: number
  copied: number | null
  shareLabel: string
  copiedLabel: string
  onOpen: () => void
  onShare: (e: React.MouseEvent) => void
  onCursorFill: (fill: boolean) => void
}

export function ProjectCard({
  project, lang, isMobile, cardIdx,
  copied, shareLabel, copiedLabel,
  onOpen, onShare, onCursorFill,
}: ProjectCardProps) {
  const p = project
  const description = lang === 'en' ? (p.description_en || p.description) : p.description
  const title = lang === 'en' ? (p.title_en || p.title) : p.title
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const delay = (cardIdx % 2) * 100
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'none'
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.06 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [cardIdx])

  return (
    <div
      ref={cardRef}
      style={{
        cursor: 'pointer',
        opacity: 0,
        transform: 'translateY(24px)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
      onClick={onOpen}
    >
      {/* Thumbnail */}
      <div
        style={{ aspectRatio: '21/9', background: '#080808', overflow: 'hidden', position: 'relative' }}
        onMouseEnter={e => {
          const img = e.currentTarget.querySelector('img') as HTMLImageElement
          const vid = e.currentTarget.querySelector('video') as HTMLVideoElement
          const bg = e.currentTarget.querySelector('.ov-bg') as HTMLElement
          const tit = e.currentTarget.querySelector('.ov-title') as HTMLElement
          if (img) img.style.transform = 'scale(1.04)'
          if (bg) bg.style.opacity = '1'
          if (tit) { tit.style.transform = 'translateY(0)'; tit.style.opacity = '1' }
          if (vid && !isMobile) { vid.style.opacity = '1'; vid.play().catch(() => {}) }
          onCursorFill(true)
        }}
        onMouseLeave={e => {
          const img = e.currentTarget.querySelector('img') as HTMLImageElement
          const vid = e.currentTarget.querySelector('video') as HTMLVideoElement
          const bg = e.currentTarget.querySelector('.ov-bg') as HTMLElement
          const tit = e.currentTarget.querySelector('.ov-title') as HTMLElement
          if (img) img.style.transform = 'scale(1)'
          if (bg) bg.style.opacity = '0'
          if (tit) { tit.style.transform = 'translateY(12px)'; tit.style.opacity = '0' }
          if (vid) { vid.pause(); vid.currentTime = 0; vid.style.opacity = '0' }
          onCursorFill(false)
        }}
      >
        <img
          src={p.image}
          alt={p.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.7s ease', position: 'absolute', inset: 0,
          }}
        />
        {!isMobile && (
          <video
            src={p.preview}
            muted
            loop
            playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: 0, transition: 'opacity 0.4s ease',
            }}
          />
        )}
        <div
          className="ov-bg"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
            opacity: 0, transition: 'opacity 0.35s ease',
          }}
        />
        <div
          className="ov-title"
          style={{
            position: 'absolute', bottom: '16px', left: '18px', right: '18px',
            transform: 'translateY(12px)', opacity: 0, transition: 'all 0.35s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4L20 12L6 20V4Z" />
              </svg>
            </div>
            <span className="brand" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#fff' }}>
              {title}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
              {p.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ paddingTop: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
          <p className="brand" style={{ fontSize: '18px', letterSpacing: '0.12em', color: '#fff' }}>{title}</p>
          <p style={{ color: '#666', fontSize: '10px', marginLeft: '16px', flexShrink: 0, letterSpacing: '0.1em' }}>
            {p.duration}
          </p>
        </div>
        <p style={{ color: '#777', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 300, marginBottom: '10px' }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(p.tools || []).map(tool => (
              <span
                key={tool}
                style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#888', border: '1px solid #444', padding: '3px 8px' }}
              >
                {tool}
              </span>
            ))}
          </div>
          <button
            onClick={onShare}
            style={{
              background: 'none', border: '1px solid #444', color: '#aaa',
              cursor: 'pointer', fontSize: '9px', letterSpacing: '0.2em',
              fontFamily: 'inherit', padding: '4px 12px', flexShrink: 0,
              transition: 'all .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.borderColor = '#444' }}
          >
            {copied === p.id ? copiedLabel : shareLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
