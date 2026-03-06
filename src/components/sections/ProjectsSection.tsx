import type { Project, Language } from '../../types'
import { ProjectCard } from '../ProjectCard/ProjectCard'

interface ProjectsSectionProps {
  projects: Project[]
  lang: Language
  isMobile: boolean
  copied: number | null
  shareLabel: string
  copiedLabel: string
  onOpenProject: (p: Project) => void
  onShareProject: (e: React.MouseEvent, id: number) => void
  onCursorFill: (fill: boolean) => void
  toolFilter: string | null
  onToolFilter: (tool: string) => void
}

export function ProjectsSection({
  projects, lang, isMobile, copied,
  shareLabel, copiedLabel,
  onOpenProject, onShareProject, onCursorFill,
  toolFilter, onToolFilter,
}: ProjectsSectionProps) {
  const rows: React.ReactNode[] = []
  let lastYear: string | null = null
  let cardIdx = 0

  projects.forEach(p => {
    if (p.date !== lastYear) {
      lastYear = p.date
      rows.push(
        <div
          key={'yr' + p.date}
          style={{
            gridColumn: '1 / -1',
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: cardIdx === 0 ? '0 0 16px' : '48px 0 16px',
          }}
        >
          <div style={{ width: '24px', height: '1px', background: '#333', flexShrink: 0 }} />
          <span
            className="brand"
            style={{
              fontSize: isMobile ? '13px' : '14px', color: '#666',
              lineHeight: 1, flexShrink: 0, letterSpacing: '0.45em',
            }}
          >
            {p.date}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, #222, transparent)' }} />
        </div>
      )
    }

    const idx = cardIdx++
    rows.push(
      <ProjectCard
        key={p.id}
        project={p}
        lang={lang}
        isMobile={isMobile}
        cardIdx={idx}
        copied={copied}
        shareLabel={shareLabel}
        copiedLabel={copiedLabel}
        onOpen={() => onOpenProject(p)}
        onShare={e => onShareProject(e, p.id)}
        onCursorFill={onCursorFill}
        toolFilter={toolFilter}
        onToolFilter={onToolFilter}
      />
    )
  })

  return (
    <section
      id="projects"
      style={{
        padding: isMobile ? '80px 16px 64px' : '120px 48px 128px',
        maxWidth: '2000px', margin: '0 auto',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit,minmax(500px,1fr))',
        gap: isMobile ? '40px' : '32px',
      }}>
        {rows}
      </div>
    </section>
  )
}
