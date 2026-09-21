"use client";

import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { nav, site } from "@/data/site";
import { SiteLogo } from "@/components/site-logo";
import { useUI } from "@/components/ui-provider";

export function Header() {
  const { openBooking } = useUI();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5">
        <div
          className={`pointer-events-auto mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 rounded-full px-3 pl-5 ring-1 transition-[background,box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "bg-ink/80 ring-white/10 shadow-[0_12px_40px_rgba(12,14,17,0.45)]"
              : "bg-ink/40 ring-white/8"
          }`}
        >
          <SiteLogo size={40} priority />
          <nav className="hidden items-center gap-5 xl:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] text-mist transition-colors duration-300 hover:text-foam"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden text-[13px] text-foam md:inline">
              {site.phone}
            </a>
            <button type="button" onClick={openBooking} className="btn-primary !px-4 !py-2 text-sm">
              Записаться
              <span className="btn-orb !size-7">
                <ArrowUpRight weight="bold" className="size-3.5" />
              </span>
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full bg-white/5 text-foam xl:hidden"
              onClick={() => setOpen(true)}
              aria-label="Меню"
            >
              <List weight="light" className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 bg-ink px-6 pt-8 text-foam xl:hidden">
          <div className="flex items-center justify-between">
            <SiteLogo size={44} href="/" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid size-11 place-items-center rounded-full bg-white/5"
              aria-label="Закрыть меню"
            >
              <X weight="light" className="size-5" />
            </button>
          </div>
          <nav className="mt-10 grid gap-5">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl tracking-tight"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={site.phoneHref} className="mt-10 block text-mist">
            {site.phone}
          </a>
        </div>
      ) : null}
    </>
  );
}
