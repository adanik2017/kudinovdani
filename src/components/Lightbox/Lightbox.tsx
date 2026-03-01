import { useEffect, useRef } from 'react'
import type { LightboxState, StoryboardFrame } from '../../types'

interface LightboxProps {
  lightbox: LightboxState
  shots: StoryboardFrame[]
  onClose: () => void
  onGoTo: (idx: number) => void
  closeLabel: string
}

export function Lightbox({ lightbox, shots, onClose, onGoTo, closeLabel }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    const el = overlayRef.current
    if (!el) return

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current
      if (Math.abs(dx) > 50) {
        if (dx < 0 && lightbox.idx < shots.length - 1) onGoTo(lightbox.idx + 1)
        else if (dx > 0 && lightbox.idx > 0) onGoTo(lightbox.idx - 1)
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [lightbox.idx, shots.length, onGoTo])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.97)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Prev button */}
      {lightbox.idx > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onGoTo(lightbox.idx - 1) }}
          style={{
            position: 'absolute', left: '24px', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid #333',
            color: '#999', cursor: 'pointer', fontSize: '20px',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 201,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#999'}
        >
          ←
        </button>
      )}

      {/* Image */}
      <img
        src={lightbox.src}
        style={{
          maxWidth: '88vw', maxHeight: '84vh',
          objectFit: 'contain', userSelect: 'none', pointerEvents: 'none',
        }}
        onClick={e => e.stopPropagation()}
      />

      {/* Next button */}
      {lightbox.idx < shots.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onGoTo(lightbox.idx + 1) }}
          style={{
            position: 'absolute', right: '24px', top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.05)', border: '1px solid #333',
            color: '#999', cursor: 'pointer', fontSize: '20px',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 201,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#999'}
        >
          →
        </button>
      )}

      {/* Top bar */}
      <div
        style={{
          position: 'absolute', top: '20px', width: '100%',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '0 24px', zIndex: 201,
        }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ color: '#444', fontSize: '10px', letterSpacing: '0.3em' }}>
          {lightbox.idx + 1} / {shots.length}
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: '1px solid #333', color: '#888',
            cursor: 'pointer', fontSize: '10px', letterSpacing: '0.25em',
            fontFamily: 'inherit', padding: '6px 14px',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#fff'}
          onMouseLeave={e => e.currentTarget.style.color = '#888'}
        >
          ✕ {closeLabel}
        </button>
      </div>

      {/* Dot navigation */}
      <div
        style={{ position: 'absolute', bottom: '20px', display: 'flex', gap: '6px', zIndex: 201 }}
        onClick={e => e.stopPropagation()}
      >
        {shots.map((_, i) => (
          <div
            key={i}
            onClick={() => onGoTo(i)}
            style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: i === lightbox.idx ? '#fff' : '#333',
              cursor: 'pointer', transition: 'background .2s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
