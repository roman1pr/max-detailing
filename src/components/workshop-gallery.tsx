"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { shotById, type StudioShot } from "@/data/studio";
import { Reveal } from "@/components/reveal";

const ORDER: StudioShot["id"][] = [
  "hex",
  "facade",
  "chemistry-wide",
  "tools",
  "chemistry",
  "prep",
  "chemistry-front",
  "facade-side",
];

const SLICES: StudioShot["id"][] = ["tools", "chemistry", "prep", "chemistry-front"];

type Props = {
  className?: string;
};

export function WorkshopGallery({ className = "" }: Props) {
  const reduce = useReducedMotion();
  const labelId = useId();
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const indexOf = (id: StudioShot["id"]) => ORDER.indexOf(id);

  const close = useCallback(() => setOpen(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((current) => {
        if (current === null) return current;
        return (current + dir + ORDER.length) % ORDER.length;
      });
    },
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const active = open === null ? null : shotById(ORDER[open]);

  return (
    <div className={className}>
      <Reveal>
        <Tile
          shot={shotById("hex")}
          className="aspect-[4/3] md:aspect-[16/9]"
          sizes="(max-width: 1400px) 100vw, 1400px"
          onOpen={() => setOpen(indexOf("hex"))}
        />
      </Reveal>

      <Reveal delay={0.06} className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_1.4fr]">
        <Tile
          shot={shotById("facade")}
          className="aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]"
          sizes="(max-width: 1024px) 100vw, 45vw"
          onOpen={() => setOpen(indexOf("facade"))}
        />
        <Tile
          shot={shotById("chemistry-wide")}
          className="aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]"
          sizes="(max-width: 1024px) 100vw, 55vw"
          onOpen={() => setOpen(indexOf("chemistry-wide"))}
        />
      </Reveal>

      <Reveal delay={0.08} className="studio-slices mt-3">
        {SLICES.map((id) => (
          <Tile
            key={id}
            shot={shotById(id)}
            className="studio-slice aspect-[4/3] md:aspect-auto"
            sizes="(max-width: 768px) 50vw, 25vw"
            onOpen={() => setOpen(indexOf(id))}
          />
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <Tile
          shot={shotById("facade-side")}
          className="mt-3 aspect-[4/3] md:aspect-[2.35/1]"
          sizes="(max-width: 1400px) 100vw, 1400px"
          onOpen={() => setOpen(indexOf("facade-side"))}
        />
      </Reveal>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {active && open !== null ? (
                <motion.div
                  className="fixed inset-0 z-[70] flex flex-col bg-ink"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={labelId}
                >
                  <div className="flex items-center justify-between px-4 py-4 md:px-8">
                    <p id={labelId} className="text-sm text-foam">
                      {active.label}
                    </p>
                    <button
                      type="button"
                      onClick={close}
                      className="grid size-11 place-items-center rounded-full bg-white/8 text-foam ring-1 ring-white/10"
                      aria-label="Закрыть фото"
                    >
                      <X weight="light" className="size-5" />
                    </button>
                  </div>
                  <div className="flex min-h-0 flex-1 items-center gap-2 px-2 pb-6 md:gap-4 md:px-6">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-white/8 text-foam ring-1 ring-white/10"
                      aria-label="Предыдущее фото"
                    >
                      <CaretLeft weight="light" className="size-6" />
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="relative h-full min-h-[50vh] w-full cursor-zoom-out"
                      aria-label="Закрыть фото"
                    >
                      <Image
                        key={active.id}
                        src={active.src}
                        alt={active.alt}
                        fill
                        priority
                        sizes="100vw"
                        quality={90}
                        className="pointer-events-none object-contain"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="grid size-11 shrink-0 place-items-center rounded-full bg-white/8 text-foam ring-1 ring-white/10"
                      aria-label="Следующее фото"
                    >
                      <CaretRight weight="light" className="size-6" />
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

function Tile({
  shot,
  className,
  sizes,
  onOpen,
}: {
  shot: StudioShot;
  className: string;
  sizes: string;
  onOpen: () => void;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.6rem] bg-ink-800 ring-1 ring-white/8 transition-[box-shadow] duration-300 hover:ring-white/16 ${className}`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 cursor-zoom-in text-left focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal"
        aria-label={`Открыть: ${shot.label}`}
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes={sizes}
          quality={90}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/12" />
      </button>
    </div>
  );
}
