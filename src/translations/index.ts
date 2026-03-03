import type { Language } from '../types'

interface Translations {
  about: string
  contact: string
  close: string
  categories: string
  navigation: string
  discuss: string
  share: string
  copied: string
  fLabel: string
  cLabel: string
  yLabel: string
  dLabel: string
  pLabel: string
  aiLabel: string
  palette: string
  storyboard: string
  catName: Record<string, string>
  aiNote: string
  hybridNote: string
  projCount: (n: number) => string
  bioRole: string
  badges: string[]
  bio1a: string
  bio1b: string
  bio1c: string
  bio2: string
  quote: string
  clientQuote: string
  clientName: string
  clientRole: string
  stats: [string, string, string][]
  servicesLabel: string
  servicesCount: string
  services: [string, string, string, string | null][]
  ctaNote: string
  startProject: string
  ctaLines: [string, string, string]
  ctaDesc: string
  telegram: string
  process: string
  steps: [string, string, string][]
  ctaFilmHeading: string
  ctaFilmSub: string
  email: string
}

const ru: Translations = {
  about: 'О РЕЖИССЁРЕ',
  contact: 'КОНТАКТ',
  close: 'ЗАКРЫТЬ',
  categories: 'КАТЕГОРИИ',
  navigation: 'НАВИГАЦИЯ',
  discuss: 'ОБСУДИТЬ ПРОЕКТ',
  share: '⤴\uFE0E ПОДЕЛИТЬСЯ',
  copied: '✓ СКОПИРОВАНО',
  fLabel: 'РЕЖИССЁР МОНТАЖА',
  cLabel: 'ЗАКАЗЧИК',
  yLabel: 'ГОД',
  dLabel: 'ХРОНОМЕТРАЖ',
  pLabel: 'ПРОДЮСЕР',
  aiLabel: 'ИИ-КРЕАТОР',
  palette: 'ЦВЕТОВАЯ ПАЛИТРА',
  storyboard: 'РАСКАДРОВКА',
  catName: { 'ИИ-ВИДЕО': 'ИИ-ВИДЕО' },
  aiNote: 'Производство полностью на основе генеративных нейросетей. Итоговый результат — синтез технологии и творческого видения.',
  hybridNote: 'Съёмка велась в несколько смен — городская натура, студия, финальный аэросъёмочный день.',
  projCount: (n) => (n === 1 ? 'ПРОЕКТ' : 'ПРОЕКТА'),
  bioRole: 'РЕЖИССЁР · МОСКВА',
  badges: ['ЯНДЕКС', 'КИНОСТУДИИ', 'БРЕНДЫ', 'ИИ с 2025'],
  bio1a: 'Создаю ИИ-ролики и рекламные видео — ',
  bio1b: 'для брендов и агентств',
  bio1c: ' по всему миру: от небольших проектов до крупных рекламных кампаний. Работаю из Москвы, сотрудничаю с клиентами из Европы и Азии.',
  bio2: 'С августа 2025 года полностью перешёл на ИИ-производство. ИИ-видео для бренда — от идеи до финального ролика, без съёмочной группы. Нейросети как инструмент кинематографического мышления, а не замена ему.',
  quote: '«Меня интересует не то, что могут нейросети — а то, чего без них не существовало бы вообще.»',
  clientQuote: '«Даниил сразу понял задачу и предложил нестандартное визуальное решение. Работали быстро, без лишних правок — результат закрыл все наши ожидания.»',
  clientName: 'ИРИНА',
  clientRole: 'ОТДЕЛ МАРКЕТИНГА · ЯНДЕКС',
  stats: [
    ['5+', 'БРЕНДОВ', 'Яндекс, Lit Energy, Coca-Cola и др.'],
    ['2024', 'KUDINOV FILMS', 'Год основания студии'],
    ['ИИ', 'С АВГУСТА 2025', 'Полный переход на AI-production'],
    ['∞', 'ФОРМАТОВ', 'Ролик, аватар, хромакей, тизер'],
  ],
  servicesLabel: 'УСЛУГИ',
  servicesCount: '09 НАПРАВЛЕНИЙ',
  services: [
    ['01', 'ПОЛНЫЙ ИИ-РОЛИК', 'От идеи до финального кадра — сценарий, генерация, монтаж, звук. Готовый продукт без съёмочной группы.', '→ КЛЮЧЕВАЯ УСЛУГА'],
    ['02', 'ИИ-АВАТАР В СЦЕНЕ', 'Цифровой персонаж по вашему образу в любой сгенерированной среде — прошлое, будущее, другие миры.', null],
    ['03', 'ХРОМАКЕЙ × ИИ', 'Реальный человек + фантастический ИИ-мир. Снимаем на хромакей, интегрируем в полноценный фильм.', null],
    ['04', 'РЕКЛАМНЫЙ РОЛИК', 'Видеореклама для брендов, продуктов и событий. Кинематографическое качество в сжатые сроки.', null],
    ['05', 'ИИ-АНИМАЦИЯ', 'Motion-графика и анимация на базе нейросетей. Для соцсетей, презентаций, OLV-кампаний.', null],
    ['06', 'СЦЕНАРИЙ И КОНЦЕПЦИЯ', 'Идея, сценарий, мудборд, раскадровка. Полная предпродакшн-концепция под ключ.', null],
    ['07', 'МОНТАЖ И ЦВЕТОКОРРЕКЦИЯ', 'DaVinci Resolve — монтаж, цветокоррекция и финальный мастеринг для любой платформы.', null],
    ['08', 'САУНДТРЕК И ЗВУК', 'Оригинальный AI-саундтрек (Suno), SFX-дизайн и сведение звука для любого формата.', null],
    ['09', 'ТИЗЕР / ТРЕЙЛЕР', 'Кинематографический тизер или трейлер для фильма, сериала, игры, события.', null],
  ],
  ctaNote: 'Ответим в течение часа',
  startProject: 'НАЧАТЬ ПРОЕКТ',
  ctaLines: ['СОЗДАДИМ', 'ЧТО-ТО', 'ВМЕСТЕ'],
  ctaDesc: 'Напишите в Telegram — обсудим задачу, сроки и формат. Отвечаем в течение часа.',
  telegram: 'НАПИСАТЬ В TELEGRAM',
  ctaFilmHeading: 'ПОНРАВИЛСЯ РОЛИК?',
  ctaFilmSub: 'Обсудим твой проект — напишите в Telegram, ответим в течение часа.',
  email: 'НАПИСАТЬ НА ПОЧТУ',
  process: 'КАК МЫ РАБОТАЕМ',
  steps: [
    ['01', 'БРИФ', 'Пишете задачу в Telegram — продукт, цель, референсы. Можно голосом. Отвечаем в течение часа.'],
    ['02', 'КОНЦЕПТ', 'Разрабатываем визуальную идею и раскадровку. Утверждаете перед началом производства.'],
    ['03', 'ПРОИЗВОДСТВО', 'Генерация, монтаж, звук, цветокоррекция. Готовый файл в нужном формате и разрешении.'],
  ],
}

const en: Translations = {
  about: 'ABOUT',
  contact: 'CONTACT',
  close: 'CLOSE',
  categories: 'CATEGORIES',
  navigation: 'NAVIGATION',
  discuss: 'DISCUSS PROJECT',
  share: '⤴\uFE0E SHARE',
  copied: '✓ COPIED',
  fLabel: 'DIRECTOR',
  cLabel: 'CLIENT',
  yLabel: 'YEAR',
  dLabel: 'DURATION',
  pLabel: 'PRODUCER',
  aiLabel: 'AI CREATOR',
  palette: 'COLOR PALETTE',
  storyboard: 'STORYBOARD',
  catName: { 'ИИ-ВИДЕО': 'AI VIDEO' },
  aiNote: 'Produced entirely with generative neural networks. The result — a synthesis of technology and creative vision.',
  hybridNote: 'Shot over multiple days — urban exteriors, studio, final aerial day.',
  projCount: (n) => (n === 1 ? 'PROJECT' : 'PROJECTS'),
  bioRole: 'DIRECTOR · MOSCOW',
  badges: ['YANDEX', 'FILM STUDIOS', 'BRANDS', 'AI SINCE 2025'],
  bio1a: 'I create AI video production and commercial films — ',
  bio1b: 'for brands and agencies',
  bio1c: ' worldwide: from independent projects to large-scale ad campaigns. Based in Moscow, working with clients across Europe and Asia.',
  bio2: 'Since August 2025 I have fully transitioned to AI production. AI video for brands — from concept to final film, no film crew required. Neural networks as a tool for cinematic thinking, not a replacement for it.',
  quote: '"I\'m not interested in what neural networks can do — but in what simply wouldn\'t exist without them."',
  clientQuote: '"Daniil understood the task immediately and proposed an unconventional visual solution. We worked fast, with minimal revisions — the result exceeded all our expectations."',
  clientName: 'IRINA',
  clientRole: 'MARKETING · YANDEX',
  stats: [
    ['5+', 'BRANDS', 'Yandex, Lit Energy, Coca-Cola et al.'],
    ['2024', 'KUDINOV FILMS', 'Studio founded'],
    ['AI', 'SINCE AUG 2025', 'Full transition to AI production'],
    ['∞', 'FORMATS', 'Ad film, avatar, chroma key, teaser'],
  ],
  servicesLabel: 'SERVICES',
  servicesCount: '09 SERVICES',
  services: [
    ['01', 'FULL AI FILM', 'From concept to final frame — script, generation, edit, sound. A finished product without a film crew.', '→ KEY SERVICE'],
    ['02', 'AI AVATAR IN SCENE', 'A digital character based on your likeness in any generated environment — past, future, other worlds.', null],
    ['03', 'CHROMA KEY × AI', 'Real person + AI-generated world. We shoot on chroma key and integrate into a full film.', null],
    ['04', 'AD FILM', 'Video advertising for brands, products, and events. Cinematic quality on a tight schedule.', null],
    ['05', 'AI ANIMATION', 'Motion graphics and animation powered by neural networks. For social media, presentations, OLV campaigns.', null],
    ['06', 'SCRIPT & CONCEPT', 'Idea, script, moodboard, storyboard. Full pre-production concept, turnkey.', null],
    ['07', 'EDIT & COLOR GRADE', 'DaVinci Resolve — editing, color grading, and final mastering for any platform.', null],
    ['08', 'SOUNDTRACK & SOUND', 'Original AI soundtrack (Suno), SFX design, and audio mix for any format.', null],
    ['09', 'TEASER / TRAILER', 'A cinematic teaser or trailer for a film, series, game, or event.', null],
  ],
  ctaNote: "We'll reply within an hour",
  startProject: 'START A PROJECT',
  ctaLines: ["LET'S CREATE", 'SOMETHING', 'TOGETHER'],
  ctaDesc: "Write on Telegram — we'll discuss the task, timeline, and format. We reply within an hour.",
  telegram: 'WRITE ON TELEGRAM',
  ctaFilmHeading: 'LIKED THE FILM?',
  ctaFilmSub: "Let's discuss your project — write on Telegram or email, we reply within an hour.",
  email: 'SEND AN EMAIL',
  process: 'HOW WE WORK',
  steps: [
    ['01', 'BRIEF', 'Send your task on Telegram — product, goal, references. Voice messages work too. We reply within an hour.'],
    ['02', 'CONCEPT', 'We develop the visual idea and storyboard. You approve it before production begins.'],
    ['03', 'PRODUCTION', 'Generation, editing, sound, color grading. Final file in your required format and resolution.'],
  ],
}

export const T: Record<Language, Translations> = { ru, en }
