import type { Metadata } from "next";
import { reviews } from "@/data/site";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Отзывы",
  description: "Отзывы клиентов детейлинг-центра MAXДЕТЕЙЛИНГ.",
};

export default function ReviewsPage() {
  return (
    <div className="section pt-28">
      <div className="wrap">
        <h1 className="font-display text-4xl tracking-tight md:text-6xl">Отзывы</h1>
        <p className="mt-4 max-w-[50ch] text-mist">
          Коротко, по делу. Если ваш заезд прошёл иначе, напишите. Разберём.
        </p>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {reviews.map((item) => (
            <li key={item.name} className="rounded-[1.5rem] bg-surface p-6 ring-1 ring-white/7">
              <p className="text-foam">{item.text}</p>
              <p className="mt-5 text-sm text-mist">
                {item.name}, {item.car}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-16 max-w-lg">
          <h2 className="font-display text-2xl">Оставить заявку</h2>
          <div className="mt-6">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
