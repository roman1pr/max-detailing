"use client";

import Image from "next/image";

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/media/hero-bay.webp"
        alt="Чёрный седан в детейлинг-центре MAXДЕТЕЙЛИНГ под гексагональным светом"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-[68%_center]"
      />
    </div>
  );
}
