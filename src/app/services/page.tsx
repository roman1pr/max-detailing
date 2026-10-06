import type { Metadata } from "next";
import { ServiceCatalog } from "@/components/service-catalog";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Полировка, керамика, химчистка и дополнительные работы MAXДЕТЕЙЛИНГ.",
};

export default function ServicesPage() {
  return (
    <div className="section pt-28">
      <div className="wrap">
        <h1 className="font-display text-4xl tracking-tight md:text-6xl">Услуги</h1>
        <p className="mt-4 max-w-[54ch] text-mist">
          Каталог совпадает с прайсом в CRM. Внутри каждой категории цены по четырём классам авто.
        </p>
        <div className="mt-12">
          <ServiceCatalog />
        </div>
      </div>
    </div>
  );
}
