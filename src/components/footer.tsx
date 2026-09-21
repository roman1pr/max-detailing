import Link from "next/link";
import { nav, site } from "@/data/site";
import { priceCategories } from "@/data/price";
import { SiteLogo } from "@/components/site-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink px-4 pb-10 pt-16 md:px-6">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <SiteLogo size={72} href="/" className="items-start" />
          <p className="mt-4 font-display text-2xl tracking-tight text-foam">{site.legalName}</p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-mist">
            {site.address}. Метро {site.metro}. {site.hours}.
          </p>
          <a href={site.phoneHref} className="mt-4 inline-block text-foam">
            {site.phone}
          </a>
        </div>
        <div>
          <p className="text-sm text-foam">Разделы</p>
          <ul className="mt-3 grid gap-2 text-sm text-mist">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foam">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/gift" className="hover:text-foam">
                Сертификаты
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-foam">Услуги</p>
          <ul className="mt-3 grid gap-2 text-sm text-mist">
            {priceCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/services/${c.slug}`} className="hover:text-foam">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1400px] flex-wrap gap-x-6 gap-y-2 text-xs text-mist/70">
        <span>© {new Date().getFullYear()} {site.legalName}</span>
        <Link href="/privacy">Политика конфиденциальности</Link>
        <Link href="/consent">Согласие на обработку ПД</Link>
      </div>
    </footer>
  );
}
