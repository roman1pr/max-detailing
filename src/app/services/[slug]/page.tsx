import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { LeadForm } from "@/components/lead-form";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { PriceBoard } from "@/components/price-board";
import { worksByService } from "@/data/portfolio";
import { priceCategories, minPrice } from "@/data/price";
import { formatRub } from "@/lib/format";
import { ServiceIcon } from "@/components/service-icon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return priceCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = priceCategories.find((c) => c.slug === slug);
  return { title: cat?.name ?? "Услуга" };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const cat = priceCategories.find((c) => c.slug === slug);
  if (!cat) notFound();

  return (
    <div className="section pt-28">
      <div className="wrap">
        <Link href="/services" className="text-sm text-mist hover:text-foam">
          Все услуги
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <ServiceIcon name={cat.icon} className="size-8 text-teal" />
          <h1 className="font-display text-4xl tracking-tight md:text-5xl">{cat.name}</h1>
        </div>
        <p className="mt-4 text-teal">{formatRub(Math.min(...cat.services.map(minPrice)), true)}</p>
        <div className="mt-8 overflow-hidden rounded-[1.6rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cat.cover} alt="" className="aspect-[21/9] w-full object-cover" />
        </div>
        <div className="mt-12">
          <PriceBoard category={cat} />
        </div>
        {worksByService(cat.slug).length > 0 ? (
          <div className="mt-16">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-display text-3xl tracking-tight">Примеры работ</h2>
              <Link href={`/portfolio?service=${cat.slug}`} className="text-sm text-teal hover:text-foam">
                Все по этой услуге →
              </Link>
            </div>
            <Suspense fallback={<p className="text-mist">Загрузка…</p>}>
              <PortfolioGrid initialService={cat.slug} limit={4} showChips={false} />
            </Suspense>
          </div>
        ) : null}
        <div className="mt-16 rounded-[1.6rem] bg-surface p-8 ring-1 ring-white/8">
          <h2 className="font-display text-2xl">Записаться</h2>
          <div className="mt-6">
            <LeadForm intent="booking" defaultService={cat.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
