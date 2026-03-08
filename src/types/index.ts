declare global {
  interface Window {
    ym?: (id: number, method: string, goal: string, params?: Record<string, string>) => void
  }
}

export interface StoryboardFrame {
  src: string
  label: string
}

export interface Project {
  id: number
  title: string
  title_en?: string
  category: string
  date: string
  director: string
  director_en?: string
  client: string
  client_en?: string
  producer?: string
  producer_en?: string
  aiCreators?: string[]
  aiCreators_en?: string[]
  description: string
  description_en: string
  brief: string
  brief_en: string
  views: number
  duration: string
  tools: string[]
  image: string
  video: string
  preview: string
  videoVersions?: { label: string; src: string }[]
  palette: string[]
  storyboard: StoryboardFrame[]
}

export type Language = 'ru' | 'en'

export interface CursorState {
  x: number
  y: number
  big: boolean
  fill: boolean
}

export interface LightboxState {
  src: string
  idx: number
}
