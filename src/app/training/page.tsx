import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Обучение",
  description: "Стажировка и работа в MAXДЕТЕЙЛИНГ, Академка.",
};

export default function TrainingPage() {
  return (
    <div className="section pt-28">
      <div className="wrap grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl tracking-tight md:text-6xl">Обучение и работа</h1>
          <p className="mt-4 max-w-[50ch] text-mist">
            Ищем людей на мойку и салон. Учим регламенту, химии и классам авто. Студия в Академке,
            {` ${site.hours.toLowerCase()}.`}
          </p>
          <ul className="mt-8 grid gap-3 text-mist">
            <li>Смена на ногах, не за стойкой</li>
            <li>Оклад плюс процент с услуг</li>
            <li>Инструмент и химия студии, своё не таскать</li>
          </ul>
        </div>
        <div className="rounded-[1.6rem] bg-surface p-8 ring-1 ring-white/8">
          <h2 className="font-display text-2xl">Отклик</h2>
          <div className="mt-6">
            <LeadForm intent="booking" defaultService="Отклик на работу / обучение" />
          </div>
        </div>
      </div>
    </div>
  );
}
