"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { faqs } from "@/data/site";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-white/8 border-y border-white/8">
      {faqs.map((item, i) => {
        const active = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              onClick={() => setOpen(active ? null : i)}
              aria-expanded={active}
            >
              <span className="font-display text-lg text-foam md:text-xl">{item.q}</span>
              <CaretDown
                weight="light"
                className={`size-5 shrink-0 text-teal transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  active ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden pb-5 text-sm leading-relaxed text-mist md:max-w-[65ch]">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
