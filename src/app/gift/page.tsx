import type { Metadata } from "next";
import { GiftBlock } from "@/components/gift-block";

export const metadata: Metadata = {
  title: "Подарочные сертификаты",
  description: "Сертификат MAXДЕТЕЙЛИНГ на любую услугу. Номинал от 5 000 до 100 000 ₽.",
};

export default function GiftPage() {
  return (
    <div className="section pt-28">
      <div className="wrap rounded-[2rem] bg-surface px-6 py-12 ring-1 ring-white/8 md:px-12">
        <GiftBlock />
      </div>
    </div>
  );
}
