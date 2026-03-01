# KUDINOV FILMS

Портфолио сайт режиссёра ИИ-видео Даниила Кудинова.

## Стек

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS**

## Возможности

- 9 видеопроектов с раскадровкой и цветовой палитрой
- Двуязычный интерфейс (RU / EN)
- Кастомный курсор
- Лайтбокс-галерея (клавиатура + свайп)
- Hover-превью видео на карточках
- Адаптивная вёрстка (mobile / desktop)
- URL-роутинг через hash (`#project-9`)
- Поддержка Range Requests для стриминга видео

## Запуск

```bash
npm install
npm run dev
```

Открыть: [http://localhost:5173](http://localhost:5173)

## Структура

```
src/
├── components/
│   ├── Cursor/
│   ├── LangSwitcher/
│   ├── Lightbox/
│   ├── LoadingScreen/
│   ├── Navigation/
│   ├── ProjectCard/
│   ├── ProjectDetail/
│   └── sections/
│       ├── AboutSection.tsx
│       ├── ContactSection.tsx
│       ├── Footer.tsx
│       ├── PrivacySection.tsx
│       ├── ProjectsSection.tsx
│       └── ServicesSection.tsx
├── data/
│   └── projects.ts
├── hooks/
│   └── useIsMobile.ts
├── translations/
│   └── index.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Медиафайлы

Видео и изображения проектов хранятся локально и не включены в репозиторий (`.gitignore`). Для запуска разместите папки с медиафайлами рядом с проектом в директории `Сайт резервный/`.

## Контакт

Telegram: [@kudinovdani](https://t.me/kudinovdani)
