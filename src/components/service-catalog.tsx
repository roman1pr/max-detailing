"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import { minPrice, priceCategories } from "@/data/price";
import { formatRub } from "@/lib/format";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { ServiceIcon } from "@/components/service-icon";

const copy: Record<string, { kicker: string; text: string; days: string }> = {
  moyka: {
    kicker: "1-4 часа",
    text: "От трехфазной до Detailing Pro. Кузов, диски, если нужно салон.",
    days: "в день обращения",
  },
  kompleks: {
    kicker: "2-5 часов",
    text: "Мойка плюс салон, кварц, двигатель. Один заезд, один регламент.",
    days: "в день обращения",
  },
  plyonka: {
    kicker: "50-60 мин",
    text: "Отдельный шампунь, чтобы не убить клей и гидрофоб плёнки.",
    days: "в день обращения",
  },
  dop: {
    kicker: "от 10 мин",
    text: "Битум, вкрапления, антидождь, воск, диски. Добавляем к мойке.",
    days: "к основной услуге",
  },
  polirovka: {
    kicker: "3-8 часов",
    text: "Глянец, восстановление, ServFaces. Без голограмм на солнце.",
    days: "1 день",
  },
  himchistka: {
    kicker: "до 6 часов",
    text: "Салон, потолок, кожа LeTech, озонация если запах въелся.",
    days: "1 день",
  },
};

export function ServiceCatalog() {
  return (
    <RevealGroup className="grid gap-3" stagger={0.08}>
      {priceCategories.map((cat, i) => {
        const meta = copy[cat.slug];
        const from = Math.min(...cat.services.map(minPrice));
        return (
          <RevealItem key={cat.id} variant={i % 2 === 0 ? "left" : "right"}>
            <Link
              href={`/services/${cat.slug}`}
              className="group grid gap-4 rounded-[1.6rem] bg-surface p-5 ring-1 ring-white/7 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6"
            >
              <span className="grid size-14 place-items-center rounded-2xl bg-teal/10 text-teal">
                <ServiceIcon name={cat.icon} className="size-7" />
              </span>
              <div>
                <p className="text-xs text-mist">{meta.kicker}</p>
                <h3 className="mt-1 font-display text-2xl text-foam">{cat.name}</h3>
                <p className="mt-1 max-w-[60ch] text-sm text-mist">{meta.text}</p>
              </div>
              <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
                <p className="font-display text-xl text-teal">{formatRub(from, true)}</p>
                <span className="inline-flex items-center gap-2 text-sm text-foam">
                  Подробнее
                  <span className="grid size-8 place-items-center rounded-full bg-white/8">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
              </div>
              {i === 0 || i === 4 ? (
                <div className="relative -mx-5 -mb-5 aspect-[16/7] overflow-hidden rounded-b-[1.6rem] md:col-span-3 md:mx-0 md:mb-0 md:mt-2 md:rounded-[1.2rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.cover} alt="" className="h-full w-full object-cover" />
                </div>
              ) : null}
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
