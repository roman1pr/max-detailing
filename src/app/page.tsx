import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { FaqList } from "@/components/faq-list";
import { GiftBlock } from "@/components/gift-block";
import { WorkshopBlock } from "@/components/workshop-block";
import { HeroCanvas } from "@/components/hero-canvas";
import { LeadForm } from "@/components/lead-form";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { HeroReveal, Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { ServiceCatalog } from "@/components/service-catalog";
import { ServiceIcon } from "@/components/service-icon";
import { SiteLogo } from "@/components/site-logo";
import { featuredHomePrices, minPrice } from "@/data/price";
import { formatMinutes, formatRub } from "@/lib/format";
import { advantages, site, steps } from "@/data/site";

export default function HomePage() {
  const featured = featuredHomePrices();

  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative z-[1] mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-end px-4 pb-10 pt-24 md:px-6 md:pb-14">
          <HeroReveal variant="scale" delay={0.05}>
            <SiteLogo
              href={false}
              size={112}
              className="mb-5 drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
              priority
            />
          </HeroReveal>
          <HeroReveal delay={0.18}>
            <p className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-teal ring-1 ring-teal/40">
              Детейлинг центр
            </p>
          </HeroReveal>
          <HeroReveal delay={0.28} variant="blur">
            <h1 className="mt-4 max-w-[14ch] font-display text-4xl leading-[1.05] tracking-tight text-foam md:text-6xl">
              {site.tagline}
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.4}>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-mist md:text-base">
              Цена по классу авто до старта работ.
            </p>
          </HeroReveal>
          <HeroReveal delay={0.52}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/price" className="btn-primary">
                Прайс-лист
                <span className="btn-orb">
                  <ArrowUpRight weight="bold" />
                </span>
              </Link>
              <Link href="/portfolio" className="btn-ghost">
                Смотреть работы
              </Link>
            </div>
          </HeroReveal>
        </div>
      </section>

      <section className="border-y border-white/8">
        <RevealGroup
          className="wrap grid md:grid-cols-2 xl:grid-cols-4"
          stagger={0.1}
          amount={0.25}
        >
          {advantages.map((item, i) => (
            <RevealItem
              key={item.title}
              as="article"
              variant="up"
              className={`border-white/8 px-5 py-8 ${
                i < advantages.length - 1 ? "md:border-r" : ""
              } ${i < 3 ? "xl:border-r" : "xl:border-r-0"} ${i === 3 ? "xl:border-r-0" : ""}`}
            >
              <h2 className="font-display text-xl text-foam">{item.title}</h2>
              <p className="mt-3 max-w-[36ch] text-sm leading-relaxed text-mist">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal variant="blur">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Услуги</h2>
            <p className="mt-3 max-w-[50ch] text-mist">
              Прайс с продакшена MAX. Суммы разные для седана, SUV и коммерции.
            </p>
          </Reveal>
          <div className="mt-10">
            <ServiceCatalog />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <Reveal variant="blur">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Портфолио</h2>
            <p className="mt-3 max-w-[50ch] text-mist">
              В сетке микс: до/после и живое видео. Полный набор — в портфолио, вкладка «все».
            </p>
          </Reveal>
          <div className="mt-10">
            <Suspense fallback={<p className="text-mist">Загрузка…</p>}>
              <PortfolioGrid limit={4} />
            </Suspense>
          </div>
          <Reveal delay={0.1}>
            <Link href="/portfolio" className="btn-ghost mt-8">
              Все кейсы
            </Link>
          </Reveal>
        </div>
      </section>

      <WorkshopBlock />

      <section className="section bg-ink-800">
        <div className="wrap grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal variant="left">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Как заезд проходит</h2>
            <p className="mt-4 max-w-[42ch] text-mist">
              Без сюрпризов на выдаче. Если объём больше, чем казалось по фото, говорим до старта работ.
            </p>
          </Reveal>
          <RevealGroup as="ol" className="grid gap-6" stagger={0.12}>
            {steps.map((step, i) => (
              <RevealItem key={step.title} as="li" variant="right">
                <div className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="font-display text-3xl text-teal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg text-foam">{step.title}</h3>
                    <p className="mt-1 text-sm text-mist">{step.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal variant="blur">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Цены</h2>
            <p className="mt-3 max-w-[50ch] text-mist">
              Ниже минимум по классу 1. Полный прайс переключается по четырём классам.
            </p>
          </Reveal>
          <RevealGroup as="ul" className="mt-10 grid gap-3 md:grid-cols-2" stagger={0.06}>
            {featured.map(({ category, service }) => (
              <RevealItem key={service.id} as="li" variant="up">
                <div className="flex items-center justify-between gap-4 rounded-[1.3rem] bg-surface px-5 py-4 ring-1 ring-white/6">
                  <div className="flex items-center gap-3">
                    <ServiceIcon name={service.icon} className="size-5 text-teal" />
                    <div>
                      <p className="text-foam">{service.name}</p>
                      <p className="text-xs text-mist">
                        {category.name} · {formatMinutes(service.prices[0].minutes)}
                      </p>
                    </div>
                  </div>
                  <p className="shrink-0 font-display text-teal">
                    {formatRub(minPrice(service), Boolean(service.isFrom))}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.12}>
            <Link href="/price" className="btn-primary mt-8">
              Полный прайс
              <span className="btn-orb">
                <ArrowUpRight weight="bold" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-ink-800">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal variant="left">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Рассчитать стоимость</h2>
            <p className="mt-4 max-w-[44ch] text-mist">
              Марка, задача, телефон. Ответим суммой по классу, не вилкой «от и до».
            </p>
          </Reveal>
          <Reveal variant="right" delay={0.08}>
            <div className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-white/8 sm:p-8">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal variant="blur">
            <h2 className="font-display text-4xl tracking-tight md:text-5xl">Вопросы</h2>
          </Reveal>
          <Reveal className="mt-8" delay={0.08}>
            <FaqList />
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <Reveal variant="scale" className="wrap rounded-[2rem] bg-surface px-6 py-12 ring-1 ring-white/8 md:px-12">
          <GiftBlock />
        </Reveal>
      </section>

      <section className="section pt-0">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <Reveal variant="left">
            <h2 className="font-display text-4xl tracking-tight">Контакты</h2>
            <address className="mt-6 not-italic text-mist">
              <p className="text-foam">{site.address}</p>
              <p className="mt-2">{site.hours}</p>
              <p className="mt-4">
                <a href={site.phoneHref} className="text-xl text-foam">
                  {site.phone}
                </a>
              </p>
              <p className="mt-2">
                <a href={site.telegram} className="text-teal">
                  {site.telegramHandle}
                </a>
              </p>
            </address>
          </Reveal>
          <Reveal variant="right" delay={0.1}>
            <iframe
              title="Карта MAXДЕТЕЙЛИНГ"
              src={site.mapEmbed}
              className="h-72 w-full rounded-[1.5rem] ring-1 ring-white/8"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
