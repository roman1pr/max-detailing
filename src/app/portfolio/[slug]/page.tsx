import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterPreview } from "@/components/before-after-preview";
import { LeadForm } from "@/components/lead-form";
import { VideoPreview } from "@/components/video-preview";
import { works } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  return { title: work ? `${work.car}: ${work.title}` : "Кейс" };
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <div className="section pt-28">
      <div className="wrap">
        <Link href="/portfolio" className="text-sm text-mist hover:text-foam">
          Все работы
        </Link>
        <h1 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{work.car}</h1>
        <p className="mt-2 text-mist">{work.title}</p>
        <Link
          href={`/portfolio?service=${work.serviceSlug}`}
          className="mt-4 inline-flex rounded-full bg-teal/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-teal ring-1 ring-teal/30 hover:text-foam"
        >
          {work.serviceLabel}
        </Link>
        <div className="mt-8 max-w-md overflow-hidden rounded-[1.6rem] ring-1 ring-white/8">
          {work.preview === "split" ? (
            <BeforeAfterPreview
              before={work.posterBefore}
              after={work.posterAfter}
              video={work.video}
              title={work.title}
              className="aspect-[9/16]"
              playVideo
              priority
            />
          ) : (
            <VideoPreview
              poster={work.poster}
              video={work.video}
              title={work.title}
              className="aspect-[9/16]"
              play
              priority
            />
          )}
        </div>
        <div className="mt-12 max-w-xl">
          <h2 className="font-display text-2xl">Хотите так же</h2>
          <div className="mt-6">
            <LeadForm defaultService={`${work.car}: ${work.title}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
