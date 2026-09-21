"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { priceCategories, vehicleClasses, priceForClass, type PriceCategory } from "@/data/price";
import { formatMinutes, formatRub } from "@/lib/format";
import { ServiceIcon } from "@/components/service-icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { worksByService } from "@/data/portfolio";

export function PriceBoard({ category }: { category?: PriceCategory }) {
  const [classId, setClassId] = useState(vehicleClasses[1].id);
  const groups = category ? [category] : priceCategories;
  const current = useMemo(
    () => vehicleClasses.find((c) => c.id === classId) ?? vehicleClasses[0],
    [classId],
  );

  return (
    <div>
      <Reveal variant="blur" className="flex flex-col gap-4">
        <p className="text-sm text-mist">Класс автомобиля</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {vehicleClasses.map((cls) => {
            const on = cls.id === classId;
            return (
              <button
                key={cls.id}
                type="button"
                onClick={() => setClassId(cls.id)}
                className={`rounded-[1.2rem] px-4 py-3 text-left ring-1 transition-colors duration-300 ${
                  on ? "bg-teal/15 ring-teal text-foam" : "bg-surface ring-white/8 text-mist"
                }`}
              >
                <span className="flex items-center gap-2 font-display text-lg text-foam">
                  <ServiceIcon name={cls.icon} className="size-5" />
                  {cls.name}
                </span>
                <span className="mt-1 block text-xs leading-snug">{cls.description}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-8 text-sm text-mist">
          Сейчас: {current.name}. {current.description}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-16">
        {groups.map((group, gi) => (
          <Reveal key={group.id} as="section" id={group.slug} delay={gi * 0.04} variant="up">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <ServiceIcon name={group.icon} className="size-7 text-teal" />
                <h2 className="font-display text-3xl tracking-tight text-foam">{group.name}</h2>
              </div>
              {worksByService(group.slug).length > 0 ? (
                <Link
                  href={`/portfolio?service=${group.slug}`}
                  className="text-sm text-teal hover:text-foam"
                >
                  Примеры работ →
                </Link>
              ) : null}
            </div>
            <RevealGroup as="ul" className="grid gap-3" stagger={0.04}>
              {group.services.map((service) => {
                const price = priceForClass(service, classId);
                return (
                  <RevealItem key={service.id} as="li" variant="up">
                    <div className="grid gap-3 rounded-[1.3rem] bg-surface px-5 py-4 ring-1 ring-white/6 md:grid-cols-[1fr_auto] md:items-center">
                      <div>
                        <p className="flex items-center gap-2 text-foam">
                          <ServiceIcon name={service.icon} className="size-4 text-teal" />
                          {service.name}
                        </p>
                        {service.description ? (
                          <p className="mt-1 max-w-[70ch] text-sm text-mist">{service.description}</p>
                        ) : null}
                      </div>
                      <div className="flex items-baseline gap-4 md:text-right">
                        <span className="font-display text-xl text-teal">
                          {formatRub(price.amount, service.isFrom)}
                        </span>
                        <span className="text-sm text-mist">{formatMinutes(price.minutes)}</span>
                      </div>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
