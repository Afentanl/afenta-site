// app/components/about.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import Reveal from "./reveal";
import { Search, PenTool, Rocket } from "lucide-react";

const COPY = {
  en: {
    kicker: "About us",
    h2: "We turn vision into impact end-to-end.",
    p: "We’re a small, senior team that blends brand, websites and always-on performance. One stack, one team, measurable outcomes.",
    bullets: [
      "Brand systems that scale",
      "Conversion-first websites (Core Web Vitals < 1.2s)",
      "Always-on growth (paid + CRO)",
      "Transparent ROI — dashboards you can trust",
    ],
    kpi1: ["98/100", "Lighthouse score"],
    kpi2: ["↑ 3–5x", "Improved conversion"],
    kpi3: ["< 1.2s", "Core Web Vitals"],
    cta: { primary: "Start a project", secondary: "View cases" },
    timelineTitle: "How we work",
    steps: [
      { t: "Discover", d: "Goals, constraints & baseline analytics.", icon: Search },
      { t: "Design & build", d: "Brand, system, and a fast web experience.", icon: PenTool },
      { t: "Launch & scale", d: "Always-on growth: paid + CRO + reporting.", icon: Rocket },
    ],
    micro: "Brand · Websites · Performance",
    more: "More about us",
  },
  nl: {
    kicker: "Over ons",
    h2: "Wij zetten visie om in impact end-to-end.",
    p: "Klein senior team dat merk, websites en always-on performance combineert. Eén stack, één team, meetbare resultaten.",
    bullets: [
      "Merksystemen die schaalbaar zijn",
      "Conversie-first websites (Core Web Vitals < 1.2s)",
      "Always-on groei (paid + CRO)",
      "Transparante ROI — dashboards die kloppen",
    ],
    kpi1: ["98/100", "Lighthouse-score"],
    kpi2: ["↑ 3–5x", "Hogere conversie"],
    kpi3: ["< 1.2s", "Core Web Vitals"],
    cta: { primary: "Project starten", secondary: "Cases bekijken" },
    timelineTitle: "Onze werkwijze",
    steps: [
      { t: "Discover", d: "Doelen, randvoorwaarden & baseline analytics.", icon: Search },
      { t: "Design & build", d: "Merk, systeem en snelle web-experience.", icon: PenTool },
      { t: "Launch & scale", d: "Always-on groei: paid + CRO + reporting.", icon: Rocket },
    ],
    micro: "Brand · Websites · Performance",
    more: "Meer over ons",
  },
} as const;

export default function About({ variant = "home" }: { variant?: "home" | "page" }) {
  const { lang } = useLanguage();
  const t = COPY[lang as "en" | "nl"];

  return (
    <section
      id={variant === "home" ? "about" : undefined}
      className={variant === "home" ? "py-18 md:py-24" : "section-divider py-16 md:py-24"}
    >
      <div className="container-afenta">
        {/* Header (mismo estilo que Services) */}
        <div className={`text-center ${variant === "home" ? "mb-10" : "mb-8"}`}>
          <div className="inline-flex p-[1px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-background/80 backdrop-blur ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
              {t.kicker}
              <span className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold animate-pulse" />
            </span>
          </div>

          {variant === "page" ? (
            <h1 className="mt-3 h-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
                {t.h2}
              </span>
            </h1>
          ) : (
            <h2 className="mt-3 h-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
                {t.h2}
              </span>
            </h2>
          )}

          <div className="mx-auto mt-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold shadow-[0_0_18px_rgba(124,58,237,.35)]" />

          <p className="mt-4 text-base md:text-lg text-[var(--color-muted)] max-w-[60ch] mx-auto">
            {t.p}
          </p>

          <p className="mt-2 text-xs md:text-sm text-[var(--color-muted)]">{t.micro}</p>
        </div>

        {/* Contenido */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Izquierda */}
          <div className="md:col-span-7">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {t.bullets.map((b, i) => (
                <Reveal key={b} delay={i * 0.06} y={16}>
                  <li className="flex items-start gap-2 text-sm md:text-base">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                    <span>{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal y={16} delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-3 justify-start">
                <Link href="/contact" className="btn-afenta-solid no-underline">
                  {t.cta.primary}
                </Link>
                <Link href="/cases" className="btn-afenta-solid no-underline">
                  {t.cta.secondary}
                </Link>
                <Link href="/about" className="btn-afenta-outline no-underline">
                  {t.more}
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Derecha */}
          <div className="md:col-span-5">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              {([t.kpi1, t.kpi2, t.kpi3] as [string, string][]).map(([v, l], i) => (
                <Reveal key={l} delay={i * 0.06} y={16}>
                  <div className="rounded-xl p-4 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm text-center">
                    <div className="text-lg md:text-2xl font-extrabold">{v}</div>
                    <div className="text-xs text-[var(--color-muted)]">{l}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Timeline */}
            <Reveal y={18} delay={0.12}>
              <div className="mt-6 rounded-2xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm p-5">
                <div className="text-sm font-semibold mb-3">{t.timelineTitle}</div>
                <ol className="relative pl-7 md:pl-8 space-y-4">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-3 md:left-3.5 top-0 bottom-0 w-px bg-[var(--color-ring)]"
                  />
                  {t.steps.map((s) => {
                    const Icon = s.icon ?? Search;
                    return (
                      <li key={s.t} className="relative pl-5">
                        <span className="absolute left-0 top-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
                          <Icon className="h-3 w-3 text-[var(--color-foreground)]/80" aria-hidden />
                        </span>
                        <div className="font-semibold">{s.t}</div>
                        <div className="text-sm text-[var(--color-muted)]">{s.d}</div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
