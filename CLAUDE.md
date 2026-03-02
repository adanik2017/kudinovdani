# Claude Code Rules — kudinovdani

## Деплой
- **НИКОГДА** не запускать `vercel --prod` или `vercel deploy` напрямую
- Деплой происходит **только через GitHub**: `git push` → Vercel автоматически деплоит
- Чтобы задеплоить: закоммить изменения и запушить в `main`

## Медиафайлы
- Все медиафайлы (видео, изображения) хранятся в **Cloudflare R2**, не в git
- Бакет: `kudinovdani-media`
- CDN URL: `https://pub-c86678aba1ff49b582b0c2a2947f259c.r2.dev`
- Локальная папка `media/` — только для локальной разработки, в git не попадает
- В `projects.ts` все пути должны указывать на CDN R2, не на локальные файлы
- Для загрузки новых файлов в R2: использовать boto3 (S3-compatible) с credentials из Cloudflare Dashboard

## Изображения
- Формат: **WebP**, максимум 1280px по ширине, quality 85
- Конвертация: Python Pillow (`from PIL import Image`)
- Скрипт конвертации: `/tmp/convert_webp.py`

## Видео
- Сжатие: ffmpeg CRF 22, preset medium
- После сжатия оригиналы удалять

## Стек проекта
- React + TypeScript + Vite + Tailwind CSS
- Пакетный менеджер: npm
- Кириллические папки в `media/` — нормально, S3 поддерживает Unicode ключи

## R2 Upload
- Скрипт загрузки: `/tmp/upload_r2.py` (boto3)
- Endpoint: `https://5d76b6315a46aa0eb738867b75a25781.r2.cloudflarestorage.com`
- После загрузки файлов обновить пути в `src/data/projects.ts` на CDN URL
