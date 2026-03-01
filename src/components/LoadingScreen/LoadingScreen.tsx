interface LoadingScreenProps {
  loading: boolean
  prog: number
  isMobile: boolean
}

export function LoadingScreen({ loading, prog, isMobile }: LoadingScreenProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: loading ? 1 : 0,
        pointerEvents: loading ? 'auto' : 'none',
        transition: 'opacity 0.8s ease',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <div
          className="brand"
          style={{
            fontSize: isMobile ? '38px' : '64px',
            lineHeight: 0.9,
            color: '#fff',
            letterSpacing: '0.12em',
          }}
        >
          KUDINOV FILMS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: isMobile ? '160px' : '280px',
              height: '1px',
              background: '#111',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: '#fff',
                transition: 'width 0.08s linear',
                width: prog + '%',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40%',
                  height: '100%',
                  background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.9), transparent)',
                  animation: 'shimmer 1.4s ease-in-out infinite',
                }}
              />
            </div>
          </div>
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '9px',
              color: '#333',
              letterSpacing: '0.35em',
            }}
          >
            {String(Math.min(prog, 100)).padStart(3, ' ')} %
          </span>
        </div>
      </div>
    </div>
  )
}
