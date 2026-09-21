"use client";

import { useEffect, useRef } from "react";

type Bubble = {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rot: number;
  vx: number;
  vy: number;
  phase: number;
  alpha: number;
};

function seedBubbles(w: number, h: number): Bubble[] {
  const list: Bubble[] = [];
  // Soft foam only on the frame edges — keep the center clear
  const mounds = [
    { cx: 0.08, cy: 0.78, rx: 0.14, ry: 0.16, n: 28 },
    { cx: 0.92, cy: 0.72, rx: 0.14, ry: 0.18, n: 32 },
    { cx: 0.88, cy: 0.18, rx: 0.12, ry: 0.12, n: 18 },
    { cx: 0.5, cy: 0.94, rx: 0.28, ry: 0.08, n: 24 },
  ];

  for (const m of mounds) {
    for (let i = 0; i < m.n; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.pow(Math.random(), 0.4);
      const roll = Math.random();
      const base =
        roll > 0.9
          ? 14 + Math.random() * 16
          : roll > 0.45
            ? 5 + Math.random() * 9
            : 2 + Math.random() * 4;
      const squash = 0.72 + Math.random() * 0.45;
      list.push({
        x: (m.cx + Math.cos(a) * d * m.rx) * w,
        y: (m.cy + Math.sin(a) * d * m.ry) * h,
        rx: base,
        ry: base * squash,
        rot: Math.random() * Math.PI,
        vx: (Math.random() - 0.5) * 3,
        vy: -1.2 - Math.random() * 4,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.1 + Math.random() * 0.18,
      });
    }
  }
  return list;
}

export function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let bubbles: Bubble[] = [];
    let raf = 0;
    let last = performance.now();
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      reduced = mq.matches;
    };
    mq.addEventListener("change", onMq);

    let cssW = 0;
    let cssH = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      if (Math.abs(rect.width - cssW) < 0.5 && Math.abs(rect.height - cssH) < 0.5) return;
      cssW = rect.width;
      cssH = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubbles = seedBubbles(rect.width, rect.height);
    };

    const drawBubble = (b: Bubble, t: number) => {
      const pulse = 1 + Math.sin(t * 1.2 + b.phase) * 0.04;
      const rx = b.rx * pulse;
      const ry = b.ry * pulse;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rot + Math.sin(t * 0.4 + b.phase) * 0.08);
      const g = ctx.createRadialGradient(-rx * 0.15, -ry * 0.2, 0, 0, 0, Math.max(rx, ry));
      g.addColorStop(0, `rgba(255,255,255,${Math.min(0.55, b.alpha + 0.08)})`);
      g.addColorStop(0.45, `rgba(246,250,250,${b.alpha * 0.7})`);
      g.addColorStop(0.8, `rgba(228,240,238,${b.alpha * 0.18})`);
      g.addColorStop(1, "rgba(228,240,238,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = (now: number) => {
      const rect = parent.getBoundingClientRect();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, rect.width, rect.height);
      const t = now / 1000;

      for (const b of bubbles) {
        if (!reduced) {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
          b.vx += Math.sin(t * 0.7 + b.phase) * 2 * dt;
          if (b.y < -b.ry * 2 || b.x < -b.rx * 2 || b.x > rect.width + b.rx * 2) {
            const edge = Math.random();
            if (edge < 0.35) {
              b.x = (0.06 + Math.random() * 0.12) * rect.width;
              b.y = (0.7 + Math.random() * 0.25) * rect.height;
            } else if (edge < 0.7) {
              b.x = (0.82 + Math.random() * 0.16) * rect.width;
              b.y = (0.55 + Math.random() * 0.35) * rect.height;
            } else {
              b.x = (0.25 + Math.random() * 0.5) * rect.width;
              b.y = (0.9 + Math.random() * 0.08) * rect.height;
            }
            b.vy = -1.2 - Math.random() * 4;
            b.vx = (Math.random() - 0.5) * 3;
          }
        }
        drawBubble(b, t);
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
