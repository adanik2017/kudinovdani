# Claude Code Rules — kudinovdani

## Git
- **НИКОГДА** не делать `git commit` и `git push` без явной команды пользователя
- Коммит и пуш только когда пользователь сказал "закоммить", "запушить", "да и пуш" и т.п.

## Деплой
- **НИКОГДА** не запускать `vercel --prod` или `vercel deploy` напрямую
- Деплой происходит **только через GitHub**: `git push` → Vercel автоматически деплоит

## Медиафайлы
- Все медиафайлы (видео, изображения) хранятся в **Cloudflare R2**, не в git
- Бакет: `kudinovdani-media`
- CDN URL: `https://pub-c86678aba1ff49b582b0c2a2947f259c.r2.dev`
- Локальная папка `media/` — только для локальной разработки, в git не попадает
- В `projects.ts` все пути должны указывать на CDN R2, не на локальные файлы
- Для загрузки новых файлов в R2: использовать boto3 (S3-compatible) с credentials из Cloudflare Dashboard

## Изображения
- **Любое изображение для сайта** (шоты, обложки, фото, UI-ассеты) — всегда оптимизировать перед использованием
- Формат: **WebP**, максимум 1280px по ширине, quality 85, method 6
- Конвертация: Python Pillow (`img.save(dst, "WebP", quality=85, method=6)`)
- После конвертации оригинал (jpg/png) удалять
- Загружать в Cloudflare R2, в `projects.ts` использовать CDN URL

## Видео
- Сжатие: ffmpeg CRF 23, preset medium
- После сжатия оригиналы удалять

## Добавление нового проекта/видео (порядок действий)
1. **Сжать видео**: ffmpeg CRF 23, preset medium
2. **Извлечь 12 шотов**: равномерно по видео (начало, середина, финал), выбирать красивые кадры
   - Команда: `ffmpeg -i video.mp4 -vf fps=1/N -q:v 2 shot_%02d.jpg` (N = длина/15)
   - Или вручную по таймкодам через `ffmpeg -ss HH:MM:SS -i video.mp4 -frames:v 1 shot_XX.jpg`
   - Конвертировать шоты в WebP 1280px (Pillow)
3. **Создать превью-клип** (для быстрого hover-просмотра на карточке):
   - 4 секунды с ~20% позиции видео, 640px, без звука, CRF 30
   - `ffmpeg -ss START -i video.mp4 -t 4 -vf "scale=640:-2" -c:v libx264 -crf 30 -preset fast -an preview.mp4`
   - Загрузить в R2 как `ПАПКА/preview.mp4`
   - Добавить поле `preview:` в `projects.ts`
4. **Создать обложку** (постер карточки и OG-превью при шэринге):
   - Формат 21:9, 1280×549px, WebP quality 85
   - Загрузить в R2 как `ПАПКА/cover.webp`
   - Поле `image:` в `projects.ts` должно указывать на этот файл
5. **Загрузить медиа в Cloudflare R2**: boto3, скрипт `/tmp/upload_r2.py`
6. **Обновить `src/data/projects.ts`**: добавить новый проект с CDN URL (включая `preview` и `image`)
7. **Добавить проект в `middleware.ts`**: в объект `projects` добавить запись с `id`, `title`, `desc`, `image` — иначе при шэринге ссылки не будет превью в Telegram/соцсетях
8. **Закоммитить и запушить** (только по команде пользователя): `git push` → Vercel деплоит

## Стек проекта
- React + TypeScript + Vite + Tailwind CSS
- Пакетный менеджер: npm
- Кириллические папки в `media/` — нормально, S3 поддерживает Unicode ключи

## R2 Upload
- Скрипт загрузки: `/tmp/upload_r2.py` (boto3)
- Endpoint: `https://5d76b6315a46aa0eb738867b75a25781.r2.cloudflarestorage.com`
- После загрузки файлов обновить пути в `src/data/projects.ts` на CDN URL
