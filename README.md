# MAXДЕТЕЙЛИНГ

Сайт-конкурент Ghost Detailing: те же сценарии (прайс, запись, сертификат, FAQ), другой визуал.

Прайс выгружен с продакшена CRM `maxdeteling-crm.ru` (MAXДЕТЕЙЛИНГ, Бугры).

```bash
npm install
npm run dev
```

Открыть http://localhost:3000

## Что важно

- Классы авто 1-4 переключаются на `/price`
- Портфолио: постер сразу, mp4 грузится только в viewport
- Hero: Three.js (капля на капоте). При `prefers-reduced-motion` статичный кадр
- Иконки: Phosphor Light, один набор
- Формы бьют в `POST /api/lead`

Телефон и соцсети в `src/data/site.ts`.
