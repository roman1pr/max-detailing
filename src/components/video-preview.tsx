"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  poster: string;
  video: string;
  title: string;
  className?: string;
  /** Autoplay muted clip when in view (grid). Case page can force play. */
  play?: boolean;
  priority?: boolean;
};

/** Full-bleed video cell — poster until clip is ready. */
export function VideoPreview({
  poster,
  video,
  title,
  className,
  play = true,
  priority = false,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(priority ? video : null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!play) return;
    const node = wrap.current;
    if (!node || priority) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(video);
          io.disconnect();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [video, priority, play]);

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
    if (!el || !node || !play) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el.readyState >= 2) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [ready, play]);

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-ink-800 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={`absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {activeSrc ? (
        <video
          ref={videoRef}
          className={`relative z-[2] h-full w-full object-cover transition-opacity duration-700 ${
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
