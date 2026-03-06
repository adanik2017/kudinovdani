import { useEffect, useRef, useState } from 'react'
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

  const LAUNCH = new Date('2026-03-03').getTime()
  const days = Math.floor((Date.now() - LAUNCH) / 86400000)
  const dailyGrowth = Math.floor(p.views * 0.009) + (p.id % 5) + 2
  const currentViews = p.views + dailyGrowth * days
  const views = currentViews >= 1000
    ? `${(currentViews / 1000).toFixed(1).replace('.0', '')}K`
    : currentViews

  const baseLikes = Math.floor(p.views * 0.07) + (p.id * 3)
  const likeKey = `liked_${p.id}`
  const [liked, setLiked] = useState(() => localStorage.getItem(likeKey) === '1')
  const likesCount = baseLikes + (liked ? 1 : 0)
  const likesDisplay = likesCount >= 1000
    ? `${(likesCount / 1000).toFixed(1).replace('.0', '')}K`
    : likesCount

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, marginLeft: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#555', fontSize: '10px', letterSpacing: '0.08em' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {views}
            </span>
            <span style={{ color: '#666', fontSize: '10px', letterSpacing: '0.1em' }}>{p.duration}</span>
          </div>
        </div>
        <p style={{ color: '#777', fontSize: '11px', letterSpacing: '0.08em', fontWeight: 300, marginBottom: '10px' }}>
          {description}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minHeight: '28px' }}>
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', maxWidth: '50%' }}>
            {(p.tools || []).map(tool => (
              <span
                key={tool}
                style={{ fontSize: '9px', letterSpacing: '0.2em', color: '#888', border: '1px solid #333', padding: '3px 8px', whiteSpace: 'nowrap' }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0, alignItems: 'center' }}>
            <button
              onClick={e => {
                e.stopPropagation()
                const next = !liked
                setLiked(next)
                localStorage.setItem(likeKey, next ? '1' : '0')
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'none', border: '1px solid ' + (liked ? '#e54' : '#444'),
                color: liked ? '#e54' : '#888',
                cursor: 'pointer', fontSize: '9px', letterSpacing: '0.15em',
                fontFamily: 'inherit', padding: '4px 10px',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { if (!liked) { e.currentTarget.style.color = '#e54'; e.currentTarget.style.borderColor = '#e54' }}}
              onMouseLeave={e => { if (!liked) { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#444' }}}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {likesDisplay}
            </button>
            <button
              onClick={onShare}
              style={{
                background: 'none', border: '1px solid #444', color: '#aaa',
                cursor: 'pointer', fontSize: '9px', letterSpacing: '0.2em',
                fontFamily: 'inherit', padding: '4px 12px',
                transition: 'all .2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#aaa'; e.currentTarget.style.borderColor = '#444' }}
            >
              {copied === p.id ? copiedLabel : shareLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
