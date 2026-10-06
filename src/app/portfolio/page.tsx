import type { Metadata } from "next";
import { Suspense } from "react";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Портфолио",
  description: "Примеры работ MAXДЕТЕЙЛИНГ: полировка, керамика, химчистка.",
};

type Props = { searchParams: Promise<{ service?: string }> };

export default async function PortfolioPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return (
    <div className="section pt-28">
      <div className="wrap">
        <Reveal variant="blur">
          <h1 className="font-display text-4xl tracking-tight md:text-6xl">Портфолио</h1>
          <p className="mt-4 max-w-[54ch] text-mist">
            На вкладке «все» — 12 кейсов: часть ячеек до/после, часть просто видео. Дальше фильтр по
            услуге из прайса.
          </p>
        </Reveal>
        <div className="mt-10">
          <Suspense fallback={<p className="text-mist">Загрузка…</p>}>
            <PortfolioGrid initialService={service || "все"} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
