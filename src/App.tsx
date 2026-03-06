import { useState, useEffect } from 'react'
import { Cursor } from './components/Cursor/Cursor'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'
import { Navigation } from './components/Navigation/Navigation'
import { ProjectDetail } from './components/ProjectDetail/ProjectDetail'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { AboutSection } from './components/sections/AboutSection'
import { ServicesSection } from './components/sections/ServicesSection'
import { ContactSection } from './components/sections/ContactSection'
import { FAQSection } from './components/sections/FAQSection'
import { PrivacySection } from './components/sections/PrivacySection'
import { Footer } from './components/sections/Footer'
import { projects, CATEGORIES } from './data/projects'
import { T } from './translations'
import { useIsMobile } from './hooks/useIsMobile'
import type { Project, Language, CursorState } from './types'

export function App() {
  const [loading, setLoading] = useState(true)
  const [prog, setProg] = useState(0)
  const [cat, setCat] = useState('ИИ-ВИДЕО')
  const [proj, setProj] = useState<Project | null>(() => {
    const path = window.location.pathname
    if (!path.startsWith('/project/')) return null
    const id = parseInt(path.replace('/project/', ''), 10)
    return projects.find(p => p.id === id) ?? null
  })
  const [pageVis, setPageVis] = useState(true)
  const [copied, setCopied] = useState<number | null>(null)
  const [toolFilter, setToolFilter] = useState<string | null>(null)
  const [lang, setLang] = useState<Language>('ru')
  const [menuOpen, setMenuOpen] = useState(false)
  const [cur, setCur] = useState<CursorState>({ x: -100, y: -100, big: false, fill: false })
  const isMobile = useIsMobile()
  const t = T[lang]

  // Sync html lang attribute
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => setCur(c => ({ ...c, x: e.clientX, y: e.clientY }))
    const over = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('button,a,[style*="cursor:pointer"],[style*="cursor:zoom-in"]')) {
        setCur(c => ({ ...c, big: true }))
      } else {
        setCur(c => ({ ...c, big: false }))
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  // Loading screen
  useEffect(() => {
    let p = 0
    const iv = setInterval(() => {
      p += Math.floor(Math.random() * 15) + 5
      if (p >= 100) {
        setProg(100)
        clearInterval(iv)
        setTimeout(() => setLoading(false), 500)
      } else {
        setProg(p)
      }
    }, 40)
    return () => clearInterval(iv)
  }, [])

  // URL hash routing
  useEffect(() => {
    window.scrollTo(0, 0)
    if (proj) {
      history.pushState(null, '', '/project/' + proj.id)
    } else {
      history.pushState(null, '', '/')
    }
  }, [proj])


  const openProject = (p: Project) => {
    ;(window as any).ym?.(107083695, 'reachGoal', 'open_project', { project: p.title })
    setPageVis(false)
    setTimeout(() => { setProj(p); setPageVis(true) }, 280)
  }

  const navToProject = (p: Project) => {
    window.scrollTo(0, 0)
    setProj(p)
  }

  const closeProject = () => {
    setPageVis(false)
    setTimeout(() => { setProj(null); setPageVis(true) }, 280)
  }

  const shareProject = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    const url = window.location.origin + '/project/' + id
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const list = projects.filter(p => p.category === cat && (!toolFilter || (p.tools || []).includes(toolFilter)))
  const projIdx = proj ? list.findIndex(p => p.id === proj.id) : -1

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', cursor: 'none' }}>
      <Cursor cur={cur} />

      <LoadingScreen loading={loading} prog={prog} isMobile={isMobile} />

      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 1s' }}>
        <div style={{
          opacity: pageVis ? 1 : 0,
          transform: pageVis ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.28s ease, transform 0.28s ease',
        }}>
          {proj ? (
            <ProjectDetail
              project={proj}
              lang={lang}
              setLang={setLang}
              isMobile={isMobile}
              onClose={closeProject}
              onPrev={projIdx > 0 ? () => navToProject(list[projIdx - 1]) : null}
              onNext={projIdx < list.length - 1 ? () => navToProject(list[projIdx + 1]) : null}
              projIdx={projIdx}
              projTotal={list.length}
              t={t}
            />
          ) : (
            <div>
              <Navigation
                lang={lang}
                setLang={setLang}
                cat={cat}
                setCat={setCat}
                cats={CATEGORIES}
                projCount={list.length}
                isMobile={isMobile}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                t={t}
              />

              <ProjectsSection
                projects={list}
                lang={lang}
                isMobile={isMobile}
                copied={copied}
                shareLabel={t.share}
                copiedLabel={t.copied}
                onOpenProject={openProject}
                onShareProject={shareProject}
                onCursorFill={fill => setCur(c => ({ ...c, fill }))}
                toolFilter={toolFilter}
                onToolFilter={tool => {
                  setToolFilter(t => t === tool ? null : tool)
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />

              <AboutSection isMobile={isMobile} t={t} />

              <ServicesSection isMobile={isMobile} t={t} />

              <ContactSection isMobile={isMobile} t={t} />

              <FAQSection isMobile={isMobile} t={t} />

              <PrivacySection lang={lang} isMobile={isMobile} />

              <Footer isMobile={isMobile} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
