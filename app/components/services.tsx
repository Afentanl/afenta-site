"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";
import Reveal from "./reveal";

type Variant = "home" | "page";

export default function Services({
  variant = "home",
  title,
  subtitle,
}: {
  variant?: Variant;
  title?: string;
  subtitle?: string;
}) {
  const { lang } = useLanguage();
  const services = ServicesContent[lang as "en" | "nl"];

  const defaults =
    lang === "en"
      ? {
          homeTitle: "Our Services",
          pageTitle: "All Services",
          pageSubtitle: "End-to-end capabilities that drive measurable growth.",
        }
      : {
          homeTitle: "Diensten",
          pageTitle: "Alle diensten",
          pageSubtitle: "End-to-end capaciteiten die zorgen voor meetbare groei.",
        };

  const heading =
    title ?? (variant === "home" ? defaults.homeTitle : defaults.pageTitle);
  const sub = subtitle ?? (variant === "page" ? defaults.pageSubtitle : "");

  return (
    <section
      id={variant === "home" ? "services" : undefined}
      className={`section-divider ${variant === "home" ? "py-20 md:py-28" : "py-14 md:py-20"}`}
    >
      <div className="container-afenta">
{variant === "page" ? (
  <header className="mb-10">
    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
      {lang === "en" ? "Services" : "Diensten"}
    </div>
    <h1 className="mt-3 h-display text-3xl md:text-5xl font-black">{heading}</h1>
    {sub && <p className="mt-3 text-[var(--color-muted)] max-w-prose">{sub}</p>}
  </header>
) : (
  <div className="relative mb-12 text-center">
    {/* halo de fondo (muy sutil) */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[1] opacity-[.45]
                  bg-[radial-gradient(60%_70%_at_50%_0%,rgba(124,58,237,.18),transparent_60%),radial-gradient(40%_50%_at_50%_100%,rgba(250,204,21,.12),transparent_60%)]"
    />
    {/* badge con borde degradado */}
    <div className="inline-flex p-[1px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]">
      <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm
                        bg-background/80 backdrop-blur ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]
                        ">
        {lang === "en" ? "Our services" : "Onze diensten"}
        <span className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold animate-pulse" />
      </span>
    </div>

    {/* título con gradiente y subrayado glow */}
    <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
      <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
        {heading}
      </span>
    </h2>
    <div className="mx-auto mt-4 h-[2px] w-28 rounded-full
                    bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                    shadow-[0_0_18px_rgba(124,58,237,.35)]" />
    {/* microcopy opcional debajo (puedes borrar si no lo quieres) */}
    <p className="mt-3 text-sm text-[var(--color-muted)]">
      {lang === "en" ? "Brand · Websites · Performance" : "Brand · Websites · Performance"}
    </p>
  </div>
)}


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <Link href={s.href} className="group block focus:outline-none cursor-pointer" aria-label={s.title}>
                <div
                  className="
                      rounded-2xl p-6 ring-1 ring-[var(--color-ring)]
                      bg-[var(--color-surface-2)]/70 backdrop-blur-sm relative
                      transition-all
                      hover:scale-[1.03] hover:shadow-xl hover:bg-[var(--color-surface)]/90
                      before:absolute before:inset-0 before:rounded-2xl before:p-[1px]
                      before:bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity
                      before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
                      before:[mask-composite:xor]"
                >
                  <h3 className="font-bold text-lg mb-4 group-hover:text-gradient-afenta">{s.title}</h3>
                  <ul className="space-y-2 text-[var(--color-muted)]">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold link-gradient">
                    <span>{lang === "en" ? "Explore" : "Ontdek"}</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
