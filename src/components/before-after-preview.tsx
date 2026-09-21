"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  before: string;
  after: string;
  video?: string;
  title: string;
  className?: string;
  /** When true, loads and plays the full clip over the split once ready */
  playVideo?: boolean;
  priority?: boolean;
};

export function BeforeAfterPreview({
  before,
  after,
  video,
  title,
  className,
  playVideo = false,
  priority = false,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(
    playVideo && priority && video ? video : null,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!playVideo || !video) return;
    const node = wrap.current;
    if (!node || priority) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(video);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [video, priority, playVideo]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !activeSrc) return;
    const onReady = () => setReady(true);
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);
    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [activeSrc]);

  useEffect(() => {
    const el = videoRef.current;
    const node = wrap.current;
    if (!el || !node || !playVideo) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el.readyState >= 2) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ready, playVideo]);

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-ink-800 ${className ?? ""}`}>
      <div
        className={`absolute inset-0 z-[1] grid grid-cols-2 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          ready && playVideo ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-left"
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-foam backdrop-blur-sm">
            До
          </span>
        </div>
        <div className="relative overflow-hidden border-l border-white/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={after}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
          />
          <span className="absolute right-3 top-3 rounded-full bg-teal/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
            После
          </span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-[2] w-px -translate-x-1/2 bg-foam/80" />
      </div>

      {playVideo && activeSrc ? (
        <video
          ref={videoRef}
          className={`relative z-[3] h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={activeSrc}
          muted
          loop
          playsInline
          preload={priority ? "metadata" : "none"}
          title={title}
        />
      ) : null}
    </div>
  );
}
