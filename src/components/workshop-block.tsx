import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { WorkshopGallery } from "@/components/workshop-gallery";
import { site } from "@/data/site";

export function WorkshopBlock() {
  return (
    <section id="masterskaya" className="section pt-0">
      <div className="wrap">
        <Reveal variant="blur">
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">Мастерская</h2>
          <p className="mt-4 max-w-[52ch] text-mist">
            Два бокса в Академке на Верности 9. Гексагональный свет для контроля ЛКП, химия на
            полках, можно ждать с кофе и смотреть, как идёт работа.
          </p>
          <dl className="mt-8 grid max-w-lg grid-cols-2 gap-6">
            <div>
              <dt className="text-sm text-mist">Боксы</dt>
              <dd className="font-display text-3xl text-teal">{site.boxes}</dd>
            </div>
            <div>
              <dt className="text-sm text-mist">Метро</dt>
              <dd className="font-display text-3xl text-teal">{site.metro}</dd>
            </div>
          </dl>
        </Reveal>
        <WorkshopGallery className="mt-10" />
        <Reveal delay={0.08}>
          <Link href="/about#masterskaya" className="btn-ghost mt-8">
            Подробнее
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
