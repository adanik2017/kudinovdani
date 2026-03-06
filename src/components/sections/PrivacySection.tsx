import { useState } from 'react'
import type { Language } from '../../types'

interface PrivacySectionProps {
  lang: Language
  isMobile: boolean
}

const privacyRu = [
  ['1. ОПЕРАТОР', 'Кудинов Даниил (далее — Оператор). Контакт: t.me/kudinovdani'],
  ['2. СОБИРАЕМЫЕ ДАННЫЕ', 'При посещении Сайта автоматически собираются технические данные: IP-адрес устройства, тип и версия браузера, тип устройства и операционная система, дата и время обращения к Сайту, просмотренные страницы. Формы ввода персональных данных и регистрация на Сайте отсутствуют.'],
  ['3. ЦЕЛИ ОБРАБОТКИ', '• Обеспечение работы Сайта\n• Защита от несанкционированного доступа\n• Улучшение качества Сайта и пользовательского опыта'],
  ['4. ПРАВОВЫЕ ОСНОВАНИЯ', 'Обработка осуществляется на основании законного интереса Оператора (ст. 6 ч. 1 п. 5 ФЗ № 152-ФЗ) и подразумеваемого согласия пользователя, выраженного фактом использования Сайта.'],
  ['5. ТРЕТЬИ СТОРОНЫ', 'Сайт использует сторонние сервисы, которые могут самостоятельно обрабатывать технические данные:\n• Google LLC (Google Fonts) — загрузка шрифтов. Политика: policies.google.com/privacy\n• Cloudflare, Inc. (Tailwind CSS CDN, unpkg CDN) — доставка контента\n• Telegram Messenger Inc. — при переходе по контактной ссылке\nОператор не несёт ответственности за практики обработки данных этих сервисов.'],
  ['6. ТРАНСГРАНИЧНАЯ ПЕРЕДАЧА', 'Сайт использует сервисы иностранных компаний (Google LLC, Cloudflare, Inc.), серверы которых расположены за пределами РФ. Используя Сайт, вы соглашаетесь с возможной трансграничной передачей технических данных. Оператор принимает разумные меры для обеспечения надлежащей защиты передаваемых данных.'],
  ['7. ФАЙЛЫ COOKIE', 'Сайт может использовать технические файлы cookie, необходимые для его функционирования. Вы можете отключить cookie в настройках браузера; это может повлиять на работу Сайта.'],
  ['8. ПРАВА СУБЪЕКТОВ', 'В соответствии с ФЗ № 152-ФЗ вы вправе:\n• Получить сведения об обработке ваших персональных данных\n• Требовать исправления неточных данных\n• Требовать удаления данных\n• Отозвать согласие на обработку\n• Обратиться с жалобой в Роскомнадзор (rkn.gov.ru)'],
  ['9. СРОКИ ХРАНЕНИЯ', 'Технические данные хранятся не более 12 месяцев с момента получения, после чего удаляются или обезличиваются.'],
  ['10. ИЗМЕНЕНИЯ', 'Оператор вправе вносить изменения в настоящую Политику. Актуальная версия всегда доступна на Сайте. Продолжение использования Сайта означает принятие обновлённой Политики.'],
]

const privacyEn = [
  ['1. OPERATOR', 'Daniil Kudinov (hereinafter — the Operator). Contact: t.me/kudinovdani'],
  ['2. DATA COLLECTED', 'When you visit the Site, the following technical data is automatically collected: IP address, browser type and version, device type and OS, date and time of access, pages viewed. No registration forms or personal data entry fields are present on the Site.'],
  ['3. PURPOSES', '• Ensuring the operation of the Site\n• Protection against unauthorized access\n• Improving Site quality and user experience'],
  ['4. LEGAL BASIS', "Processing is carried out on the basis of the legitimate interest of the Operator (Art. 6 para. 1 subpara. 5 of Federal Law No. 152-FZ) and the user's implied consent by using the Site."],
  ['5. THIRD-PARTY SERVICES', 'The Site uses third-party services that may independently process technical data:\n• Google LLC (Google Fonts) — font delivery. Privacy policy: policies.google.com/privacy\n• Cloudflare, Inc. (Tailwind CSS CDN, unpkg CDN) — content delivery\n• Telegram Messenger Inc. — when clicking the contact link\nThe Operator is not responsible for the data processing practices of these services.'],
  ['6. CROSS-BORDER TRANSFER', 'The Site uses services of foreign companies (Google LLC, Cloudflare, Inc.) whose servers are located outside the Russian Federation. By using the Site, you agree to the possible cross-border transfer of your technical data. The Operator takes reasonable steps to ensure adequate protection of transferred data.'],
  ['7. COOKIES', "The Site may use technical cookies necessary for its operation. You may disable cookies in your browser settings; this may affect the Site's functionality."],
  ['8. USER RIGHTS', 'In accordance with Federal Law No. 152-FZ you have the right to:\n• Obtain information about the processing of your personal data\n• Request correction of inaccurate data\n• Request deletion of your data\n• Withdraw consent to processing\n• File a complaint with Roskomnadzor (rkn.gov.ru)'],
  ['9. RETENTION PERIOD', 'Technical data is retained for no more than 12 months from the date of collection, after which it is deleted or anonymised.'],
  ['10. AMENDMENTS', 'The Operator reserves the right to amend this Policy. The current version is always available on the Site. Continued use of the Site constitutes acceptance of the updated Policy.'],
]

export function PrivacySection({ lang, isMobile }: PrivacySectionProps) {
  const [open, setOpen] = useState(false)
  const items = lang === 'en' ? privacyEn : privacyRu
  const label = lang === 'en' ? 'PRIVACY POLICY' : 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ'
  const footer = lang === 'en'
    ? 'This Policy is governed by the legislation of the Russian Federation, in particular Federal Law No. 152-FZ of 27.07.2006 "On Personal Data" and related regulatory acts. Last updated: March 2026.'
    : 'Настоящая Политика регулируется законодательством Российской Федерации, в частности Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и связанными с ним нормативными актами. Последнее обновление: март 2026 г.'

  return (
    <section id="privacy" style={{ borderTop: '1px solid #111', background: '#020202' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '18px 20px' : '22px 48px',
          background: 'none', border: 'none', cursor: 'pointer',
          borderBottom: open ? '1px solid #1a1a1a' : 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#060606'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'block', width: '24px', height: '1px', background: '#333' }} />
          <span style={{ color: '#666', fontSize: '11px', letterSpacing: '0.4em' }}>{label}</span>
        </div>
        <span style={{
          color: '#555', fontSize: '18px', lineHeight: 1,
          transition: 'transform 0.3s', display: 'block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          +
        </span>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '6000px' : '0',
        transition: 'max-height 0.6s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: isMobile ? '40px 20px 56px' : '48px 48px 64px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: '#2a2a2a' }} />
              <p style={{ color: '#444', fontSize: '9px', letterSpacing: '0.55em', margin: 0 }}>{label}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px 64px' }}>
              {items.map(([title, text]) => (
                <div key={title}>
                  <p style={{ color: '#555', fontSize: '9px', letterSpacing: '0.35em', marginBottom: '10px', fontFamily: 'monospace' }}>
                    {title}
                  </p>
                  <p style={{ color: '#444', fontSize: '11px', lineHeight: '1.85', margin: 0, whiteSpace: 'pre-line' }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #111' }}>
              <p style={{ color: '#2a2a2a', fontSize: '10px', lineHeight: '1.7', margin: 0 }}>{footer}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
