const BOT = /TelegramBot|Twitterbot|facebookexternalhit|WhatsApp|vkShare|LinkedInBot|Slackbot|Discordbot|Googlebot|YandexBot/i

const CDN = 'https://pub-c86678aba1ff49b582b0c2a2947f259c.r2.dev'

const projects: Record<number, { title: string; desc: string; image: string }> = {
  11: {
    title: 'ФБС',
    desc: 'Имиджевый ролик для ФБС — от пшеничных полей до дронового шоу в небе.',
    image: `${CDN}/%D0%A4%D0%91%D0%A1/cover.webp`,
  },
  9: {
    title: 'МЕЖДУНАРОДНАЯ ТОРГОВАЯ КОМПАНИЯ',
    desc: 'От пшеничных полей до торговых маршрутов Москва–Гуанчжоу. Масштаб одной компании.',
    image: `${CDN}/%D0%A1%D0%A4%D0%95%D0%A0%D0%9E%D0%A2%D0%95%D0%A5/cover.webp`,
  },
  5: {
    title: 'ЭР ТОШТУК',
    desc: 'Тизер к ИИ-фильму по мотивам древнего кыргызского эпоса.',
    image: `${CDN}/%D0%A2%D0%B8%D0%B7%D0%B5%D1%80%20%D0%BA%20%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D1%83%20/%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp`,
  },
  4: {
    title: 'WAR',
    desc: 'FPV-дроны. Снежные горы. Человек против машины.',
    image: `${CDN}/%D0%92%D0%BE%D0%B5%D0%BD%D1%8B%D0%B9%20%D1%80%D0%BE%D0%BB%D0%B8%D0%BA/%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp`,
  },
  2: {
    title: 'COCA-COLA KIDS',
    desc: 'Coca-Cola Kids — рождественская история для всей семьи, созданная ИИ.',
    image: `${CDN}/%D0%9F%D0%B8%D0%BA%D1%81%D0%B0%D1%80%20%D0%9A%D0%BE%D0%BA%D0%B0%20%D0%BA%D0%BE%D0%BB%D0%B0/%D0%BE%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0.webp`,
  },
  6: {
    title: 'KUDUZOV ACADEMY',
    desc: 'Рекламный ролик первого обучения по свадебной съёмке от лучшего свадебного видеографа Чечни.',
    image: `${CDN}/Samurai/cover.webp`,
  },
  3: {
    title: 'LIT ENERGY × STRANGER THINGS',
    desc: 'Lit Energy × Stranger Things — тёмная сторона вкуса.',
    image: `${CDN}/Lit%20enegry%20Stranger%20things/cover.webp`,
  },
  1: {
    title: 'LIT ENERGY',
    desc: 'Lit Energy — новый вкус Гранат. Энергия в каждом глотке.',
    image: `${CDN}/lit%20energy/cover.webp`,
  },
  7: {
    title: 'ECLIPSE',
    desc: 'Реклама жвачки Eclipse — живая съёмка, интегрированная с ИИ.',
    image: `${CDN}/Eclipse/cover.webp`,
  },
  8: {
    title: 'JACOBS MONARCH',
    desc: 'Рекламный ролик Jacobs Monarch — съёмка на Sony FX3 и ИИ-генерация.',
    image: `${CDN}/Jacobs%20monarch/cover.webp`,
  },
  10: {
    title: 'KVINS',
    desc: 'Имиджевый ИИ-ролик для бренда KVINS.',
    image: `${CDN}/Kvins/cover.webp`,
  },
}

export const config = {
  matcher: '/project/:id*',
}

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent') || ''
  if (!BOT.test(ua)) return

  const url = new URL(request.url)
  const id = parseInt(url.pathname.replace('/project/', ''), 10)
  const p = projects[id]
  if (!p) return

  const siteUrl = `https://${url.host}`
  const pageUrl = `${siteUrl}/project/${id}`

  const html = `<!DOCTYPE html>
<html lang="ru"><head>
  <meta charset="UTF-8" />
  <title>${p.title} — KUDINOV FILMS</title>
  <meta name="description" content="${p.desc}" />
  <meta property="og:title" content="${p.title} — KUDINOV FILMS" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:image" content="${p.image}" />
  <meta property="og:image:width" content="1280" />
  <meta property="og:image:height" content="549" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${p.title} — KUDINOV FILMS" />
  <meta name="twitter:description" content="${p.desc}" />
  <meta name="twitter:image" content="${p.image}" />
</head><body></body></html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
