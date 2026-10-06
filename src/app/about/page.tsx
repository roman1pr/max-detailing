import type { Metadata } from "next";
import Link from "next/link";
import { WorkshopGallery } from "@/components/workshop-gallery";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "О нас",
  description: "Детейлинг-центр MAXДЕТЕЙЛИНГ: прайс по классу авто, химия с именами.",
};

export default function AboutPage() {
  return (
    <div className="section pt-28">
      <div className="wrap">
        <h1 className="font-display text-4xl tracking-tight md:text-6xl">О детейлинг-центре</h1>
        <p className="mt-6 max-w-[60ch] text-mist">
          MAXДЕТЕЙЛИНГ — детейлинг-центр у метро Академическая. Полировка, керамика и химчистка
          салона. Прайс, который видите на сайте, тот же, что в кассе CRM.
        </p>
        <p className="mt-4 max-w-[60ch] text-mist">
          Берём Polo и Prado по одному регламенту. Разница только в классе и состоянии, не в
          отношении к машине.
        </p>
        <dl className="mt-10 grid max-w-xl grid-cols-2 gap-6">
          <div>
            <dt className="text-sm text-mist">Адрес</dt>
            <dd className="mt-1 text-foam">{site.address}</dd>
          </div>
          <div>
            <dt className="text-sm text-mist">Режим</dt>
            <dd className="mt-1 text-foam">{site.hours}</dd>
          </div>
        </dl>

        <h2 id="masterskaya" className="mt-16 font-display text-4xl tracking-tight md:text-5xl">
          Мастерская
        </h2>
        <p className="mt-4 max-w-[52ch] text-mist">
          Чёрный кирпич, гексагональный свет, химия на виду. Можно остаться в зоне и смотреть, как
          идёт работа, или оставить машину.
        </p>
        <WorkshopGallery className="mt-10" />

        <Link href="/contacts" className="btn-ghost mt-10">
          Как доехать
        </Link>
      </div>
    </div>
  );
}
