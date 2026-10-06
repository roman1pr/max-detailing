import { priceCategories } from "@/data/price";

export type WorkPreview = "split" | "video";

export type Work = {
  slug: string;
  title: string;
  car: string;
  /** Matches priceCategories[].slug */
  serviceSlug: string;
  /** Human label for chips */
  serviceLabel: string;
  /** Grid cell: before/after split or plain video poster/clip */
  preview: WorkPreview;
  poster: string;
  posterBefore: string;
  posterAfter: string;
  video: string;
  isVideo: boolean;
};

const serviceBySlug = Object.fromEntries(
  priceCategories.map((c) => [c.slug, c.name]),
) as Record<string, string>;

/**
 * Stable layout: service categories + alternating preview types so the «все»
 * grid mixes split and video cells. Not inferred from clip content.
 */
const assignments: {
  id: string;
  serviceSlug: string;
  car: string;
  title: string;
  preview: WorkPreview;
}[] = [
  { id: "4281", serviceSlug: "himchistka", car: "Audi", title: "Химчистка салона", preview: "split" },
  { id: "4485", serviceSlug: "polirovka", car: "BMW 5", title: "Глянцевая полировка", preview: "split" },
  { id: "4326", serviceSlug: "himchistka", car: "Opel", title: "Химчистка ткани и ковров", preview: "video" },
  { id: "4542", serviceSlug: "dop", car: "Kia Rio", title: "Антидождь и доп. уход", preview: "split" },
  { id: "4659", serviceSlug: "polirovka", car: "Toyota Prado", title: "Восстановительная полировка", preview: "split" },
  { id: "4346", serviceSlug: "himchistka", car: "Mazda CX-5", title: "Глубокая чистка салона", preview: "split" },
  { id: "4756", serviceSlug: "dop", car: "BMW X5", title: "Диски и чернение", preview: "video" },
  { id: "4481", serviceSlug: "himchistka", car: "Infiniti", title: "Химчистка светлого салона", preview: "video" },
  { id: "4934", serviceSlug: "polirovka", car: "Mercedes E-Class", title: "Полировка с керамикой", preview: "video" },
  { id: "4939", serviceSlug: "dop", car: "Volkswagen Polo", title: "Удаление битума", preview: "split" },
  { id: "5175", serviceSlug: "himchistka", car: "Ford Focus", title: "Химчистка + озонация", preview: "split" },
  { id: "5389", serviceSlug: "polirovka", car: "Volvo XC60", title: "Полировка ЛКП", preview: "video" },
];

export const works: Work[] = assignments.map((item) => ({
  slug: `work-${item.id}`,
  title: item.title,
  car: item.car,
  serviceSlug: item.serviceSlug,
  serviceLabel: serviceBySlug[item.serviceSlug] ?? item.serviceSlug,
  preview: item.preview,
  poster: `/media/poster-work-${item.id}.jpg`,
  posterBefore: `/media/poster-before-${item.id}.jpg`,
  posterAfter: `/media/poster-after-${item.id}.jpg`,
  video: `/media/video/work-${item.id}.mp4`,
  isVideo: true,
}));

/** How many cards to show on the «все» chip when no explicit limit is passed. */
export const PORTFOLIO_ALL_COUNT = 12;

export const workServiceChips = [
  { slug: "все", label: "все" },
  ...priceCategories.map((c) => ({ slug: c.slug, label: c.name })),
] as const;

export function worksByService(serviceSlug: string) {
  if (serviceSlug === "все") return works;
  return works.filter((w) => w.serviceSlug === serviceSlug);
}

/** @deprecated use workServiceChips */
export const workTags = workServiceChips.map((c) => c.label);
