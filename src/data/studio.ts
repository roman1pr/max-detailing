export const studioShots = [
  {
    id: "facade",
    src: "/media/studio/facade.webp",
    alt: "Фасад MAXДЕТЕЙЛИНГ вечером: чёрный кирпич, граффити на воротах, мокрый асфальт",
    label: "Фасад со стороны Верности",
  },
  {
    id: "hex",
    src: "/media/studio/hex.webp",
    alt: "Бокс с гексагональным светом и жёлтой бочкой",
    label: "Свет для контроля ЛКП",
  },
  {
    id: "chemistry-wide",
    src: "/media/studio/chemistry-wide.webp",
    alt: "Стеллажи с химией, компрессор и гексагональный свет",
    label: "Мойка и химия",
  },
  {
    id: "tools",
    src: "/media/studio/tools.webp",
    alt: "Стенд с падами, полировальными машинками и пылесосами",
    label: "Посты кузова",
  },
  {
    id: "chemistry",
    src: "/media/studio/chemistry.webp",
    alt: "Стеллаж с канистрами и компрессор у чёрной кирпичной стены",
    label: "Рабочая химия",
  },
  {
    id: "prep",
    src: "/media/studio/prep.webp",
    alt: "Полка с пастами, кофемашиной и зоной подготовки",
    label: "Подготовка и кофе",
  },
  {
    id: "chemistry-front",
    src: "/media/studio/chemistry-front.webp",
    alt: "Фронтальный вид стеллажей с химией и распылителями на сетке",
    label: "Стеллажи у ворот",
  },
  {
    id: "facade-side",
    src: "/media/studio/facade-side.webp",
    alt: "Фасад сбоку вечером: два бокса с граффити и жилой дом сзади",
    label: "Два бокса с улицы",
  },
] as const;

export type StudioShot = (typeof studioShots)[number];

export function shotById(id: StudioShot["id"]) {
  const shot = studioShots.find((item) => item.id === id);
  if (!shot) throw new Error(`Unknown studio shot: ${id}`);
  return shot;
}
