import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Политика конфиденциальности" };

export default function PrivacyPage() {
  return (
    <article className="section pt-28">
      <div className="wrap max-w-2xl text-sm leading-relaxed text-mist">
        <h1 className="font-display text-4xl text-foam">Политика конфиденциальности</h1>
        <p className="mt-6">
          {site.legalName} обрабатывает имя, телефон, марку авто и текст заявки, чтобы связаться с
          вами и оказать услугу. Данные не продаём. Храним, пока это нужно для записи и бухгалтерии.
        </p>
        <p className="mt-4">
          Cookie: только чтобы запомнить согласие на баннер и отправить форму. Вопросы: {site.email}.
        </p>
      </div>
    </article>
  );
}
