import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Согласие на обработку ПД" };

export default function ConsentPage() {
  return (
    <article className="section pt-28">
      <div className="wrap max-w-2xl text-sm leading-relaxed text-mist">
        <h1 className="font-display text-4xl text-foam">Согласие на обработку персональных данных</h1>
        <p className="mt-6">
          Отправляя форму на сайте {site.legalName}, вы соглашаетесь на обработку имени, телефона и
          сведений об автомобиле для связи и оказания услуг. Согласие можно отозвать письмом на{" "}
          {site.email}.
        </p>
      </div>
    </article>
  );
}
