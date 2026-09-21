"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Play } from "@phosphor-icons/react";
import {
  PORTFOLIO_ALL_COUNT,
  workServiceChips,
  worksByService,
  type Work,
} from "@/data/portfolio";
import { BeforeAfterPreview } from "@/components/before-after-preview";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { VideoPreview } from "@/components/video-preview";

export function PortfolioGrid({
  limit,
  initialService = "все",
  showChips = true,
}: {
  limit?: number;
  initialService?: string;
  showChips?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fromUrl = searchParams.get("service");
  const [service, setService] = useState(fromUrl || initialService);

  useEffect(() => {
    setService(fromUrl || initialService);
  }, [fromUrl, initialService]);

  const list = useMemo(() => {
    const filtered = worksByService(service);
    if (typeof limit === "number") return filtered.slice(0, limit);
    if (service === "все") return filtered.slice(0, PORTFOLIO_ALL_COUNT);
    return filtered;
  }, [service, limit]);

  function selectService(slug: string) {
    setService(slug);
    if (!showChips) return;
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "все") params.delete("service");
    else params.set("service", slug);
    const q = params.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  }

  return (
    <div>
      {showChips ? (
        <Reveal variant="blur" className="flex flex-wrap gap-2">
          {workServiceChips.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => selectService(item.slug)}
              className={`rounded-full px-4 py-2 text-sm ring-1 transition-colors ${
                service === item.slug
                  ? "bg-foam text-ink ring-foam"
                  : "text-mist ring-white/10 hover:text-foam"
              }`}
            >
              {item.label}
            </button>
          ))}
        </Reveal>
      ) : null}
      {list.length === 0 ? (
        <p className="mt-8 text-mist">Пока нет примеров в этой категории.</p>
      ) : (
        <RevealGroup
          as="ul"
          className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-4 ${showChips ? "mt-8" : ""}`}
          stagger={0.07}
        >
          {list.map((work, i) => (
            <RevealItem key={`${service}-${work.slug}`} as="li" variant="scale">
              <WorkCard work={work} priority={i < 4} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

function WorkCard({ work, priority }: { work: Work; priority?: boolean }) {
  return (
    <Link href={`/portfolio/${work.slug}`} className="group block">
      <div className="relative aspect-[9/14] overflow-hidden rounded-[1.4rem] ring-1 ring-white/8">
        {work.preview === "split" ? (
          <BeforeAfterPreview
            before={work.posterBefore}
            after={work.posterAfter}
            title={work.title}
            className="h-full w-full"
            priority={priority}
          />
        ) : (
          <VideoPreview
            poster={work.poster}
            video={work.video}
            title={work.title}
            className="h-full w-full"
            play
            priority={priority}
          />
        )}
        <span className="pointer-events-none absolute bottom-4 left-3 z-[4] rounded-full bg-ink/75 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-foam backdrop-blur-sm">
          {work.serviceLabel}
        </span>
        <span className="pointer-events-none absolute bottom-4 right-4 z-[4] grid size-10 place-items-center rounded-full bg-foam text-ink opacity-90">
          <Play weight="fill" className="size-4" />
        </span>
      </div>
      <p className="mt-3 font-display text-xl text-foam">{work.car}</p>
      <p className="text-sm text-mist">{work.title}</p>
    </Link>
  );
}
