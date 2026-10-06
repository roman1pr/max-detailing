import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Гарантия",
  description: "Гарантия на покрытия MAXДЕТЕЙЛИНГ: керамика ServFaces, воск, кварц, химчистка.",
};

const items = [
  {
    title: "Керамика ServFaces",
    text: "От года при бережном уходе: без абразива и без сухой тряпки. Если гидрофоб ушёл раньше по нашей вине, корректируем покрытие.",
  },
  {
    title: "Кварц Mizu и твёрдый воск",
    text: "Это расходный слой, не броня. Mizu: недели. Soft99 и Gyeon: месяцы. Гарантия: равномерное нанесение, не вечный блеск.",
  },
  {
    title: "Химчистка",
    text: "Если пятно или развод остались, доделываем на том же заезде или на ближайшем слоте без доплаты.",
  },
  {
    title: "Что не покрывает",
    text: "Сколы гравия, жёсткие щётки и абразив, самостоятельная полировка поверх керамики.",
  },
];

export default function GuaranteePage() {
  return (
    <div className="section pt-28">
      <div className="wrap max-w-3xl">
        <h1 className="font-display text-4xl tracking-tight md:text-6xl">Гарантия</h1>
        <p className="mt-4 text-mist">
          Пишем срок, который держит материал, не маркетинговый «навсегда».
        </p>
        <ul className="mt-12 grid gap-8">
          {items.map((item) => (
            <li key={item.title} className="border-t border-white/8 pt-6">
              <h2 className="font-display text-2xl text-foam">{item.title}</h2>
              <p className="mt-2 text-mist">{item.text}</p>
            </li>
          ))}
        </ul>
        <Link href="/price" className="btn-ghost mt-12">
          К прайсу
        </Link>
      </div>
    </div>
  );
}
