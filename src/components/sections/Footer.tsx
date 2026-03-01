interface FooterProps {
  isMobile: boolean
}

export function Footer({ isMobile }: FooterProps) {
  return (
    <footer style={{
      padding: isMobile ? '24px 20px' : '32px 48px',
      borderTop: '1px solid #1a1a1a',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div className="brand" style={{ fontSize: '16px', color: '#888', lineHeight: 1, letterSpacing: '0.12em' }}>
        KUDINOV FILMS
      </div>
      <span style={{ color: '#444', fontSize: '11px' }}>© 2026 KUDINOV FILMS</span>
    </footer>
  )
}
