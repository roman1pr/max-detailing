import type { Metadata } from "next";
import { site } from "@/data/site";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Контакты",
  description: `MAXДЕТЕЙЛИНГ, ${site.address}. Телефон ${site.phone}.`,
};

export default function ContactsPage() {
  return (
    <div className="section pt-28">
      <div className="wrap grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl tracking-tight md:text-6xl">Контакты</h1>
          <ul className="mt-8 grid gap-5 text-mist">
            <li>
              <p className="text-sm">Адрес</p>
              <a href={site.mapUrl} className="text-foam">
                {site.address}
              </a>
            </li>
            <li>
              <p className="text-sm">Телефон</p>
              <a href={site.phoneHref} className="text-2xl text-foam">
                {site.phone}
              </a>
            </li>
            <li>
              <p className="text-sm">Мессенджеры</p>
              <div className="flex flex-wrap gap-4 text-teal">
                <a href={site.telegram}>Telegram</a>
                <a href={site.whatsapp}>WhatsApp</a>
                <a href={site.vk}>VK</a>
              </div>
            </li>
            <li>
              <p className="text-sm">Почта</p>
              <a href={`mailto:${site.email}`} className="text-foam">
                {site.email}
              </a>
            </li>
            <li>
              <p className="text-sm">Часы</p>
              <p className="text-foam">{site.hours}</p>
            </li>
          </ul>
          <div className="mt-10 max-w-md">
            <LeadForm intent="booking" />
          </div>
        </div>
        <iframe
          title="Карта"
          src={site.mapEmbed}
          className="min-h-[420px] w-full rounded-[1.6rem] ring-1 ring-white/8"
          loading="lazy"
        />
      </div>
    </div>
  );
}
