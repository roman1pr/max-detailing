"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
  title: string;
  autoPlay?: boolean;
  controls?: boolean;
  priority?: boolean;
};

export function LazyVideo({
  src,
  poster,
  className,
  title,
  autoPlay = true,
  controls = false,
  priority = false,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | null>(priority ? src : null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = wrap.current;
    if (!node || priority) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [src, priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc) return;
    const onReady = () => setReady(true);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, [activeSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const node = wrap.current;
    if (!video || !node || !autoPlay) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.readyState >= 2) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [autoPlay, ready]);

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-ink-800 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {activeSrc ? (
        <video
          ref={videoRef}
          className={`relative z-[1] h-full w-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          poster={poster}
          src={activeSrc}
          muted
          loop
          playsInline
          preload={priority ? "metadata" : "none"}
          controls={controls}
          title={title}
        />
      ) : null}
    </div>
  );
}
