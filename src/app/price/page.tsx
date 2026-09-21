import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { PriceBoard } from "@/components/price-board";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Прайс-лист",
  description:
    "Цены MAXДЕТЕЙЛИНГ по классу авто: мойка, полировка, керамика, химчистка. Прайс с продакшена CRM.",
};

export default function PricePage() {
  return (
    <div className="section pt-28">
      <div className="wrap">
        <Reveal variant="blur">
          <h1 className="font-display text-4xl tracking-tight md:text-6xl">Прайс-лист</h1>
          <p className="mt-4 max-w-[58ch] text-mist">
            Платите за объём, который нужен машине. Суммы ниже из рабочей CRM MAX. Итог может чуть
            сдвинуться после осмотра, и это будет сказано до старта.
          </p>
        </Reveal>
        <div className="mt-12">
          <PriceBoard />
        </div>
        <Reveal
          variant="scale"
          className="mt-20 grid gap-8 rounded-[1.8rem] bg-surface p-8 ring-1 ring-white/8 lg:grid-cols-2"
        >
          <div>
            <h2 className="font-display text-3xl">Рассчитать для вашей машины</h2>
            <p className="mt-3 max-w-[44ch] text-sm text-mist">
              Напишите марку. Ответим классом и суммой, без вилки на всякий случай.
            </p>
          </div>
          <LeadForm />
        </Reveal>
      </div>
    </div>
  );
}
