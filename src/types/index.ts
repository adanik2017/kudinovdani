export interface StoryboardFrame {
  src: string
  label: string
}

export interface Project {
  id: number
  title: string
  category: string
  date: string
  director: string
  client: string
  producer?: string
  aiCreators?: string[]
  description: string
  description_en: string
  brief: string
  brief_en: string
  duration: string
  tools: string[]
  image: string
  video: string
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
