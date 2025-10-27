"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";
import Reveal from "./reveal";
import {
  Megaphone,
  Code2,
  Server,
  MonitorSmartphone,
  BarChart3,
  ShieldCheck,
  Bot,
  ArrowRight,
} from "lucide-react";

type Variant = "home" | "page";

/** Título -> icono (EN y NL) */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  // EN
  "Marketing & Branding": Megaphone,
  "Technology & Web Development": Code2,
  "Data & Analytics": BarChart3,
  "Cybersecurity & Protection": ShieldCheck,
  "AI Solutions": Bot,
  Marketing: Megaphone,
  Frontend: MonitorSmartphone,
  Backend: Server,
  Data: BarChart3,
  Cybersecurity: ShieldCheck,
  AI: Bot,
  // NL
  Technologie: Code2,
  "Technologie & Webontwikkeling": Code2,
  Beveiliging: ShieldCheck,
};

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
          badge: "Our services",
          micro: "Brand · Websites · Performance",
          explore: "Explore",
          ctaTitle: "See all services",
          ctaText:
            "Strategy, design, development, data, security & AI — tailor-made.",
          ctaButton: "Go to Services",
        }
      : {
          homeTitle: "Diensten",
          pageTitle: "Alle diensten",
          pageSubtitle:
            "End-to-end capaciteiten die zorgen voor meetbare groei.",
          badge: "Onze diensten",
          micro: "Brand · Websites · Performance",
          explore: "Ontdek",
          ctaTitle: "Alle diensten bekijken",
          ctaText:
            "Strategie, design, development, data, beveiliging & AI — op maat.",
          ctaButton: "Naar diensten",
        };

  const heading =
    title ?? (variant === "home" ? defaults.homeTitle : defaults.pageTitle);
  const sub = subtitle ?? (variant === "page" ? defaults.pageSubtitle : "");

  /** ---- Cálculo del col-span de la CTA para tapar huecos ----
   * md: 2 columnas  → remainderMd = services.length % 2
   * lg: 3 columnas  → remainderLg = services.length % 3
   * La CTA se coloca al final y ocupa exactamente el espacio faltante.
   */
  const remainderMd = services.length % 2; // 0 o 1
  const remainderLg = services.length % 3; // 0,1,2
  const ctaSpan =
    `col-span-1 ` +
    `md:${remainderMd === 1 ? "col-span-1" : "col-span-2"} ` +
    `lg:${
      remainderLg === 0 ? "col-span-3" : remainderLg === 1 ? "col-span-2" : "col-span-1"
    }`;

  return (
    <section
      id={variant === "home" ? "services" : undefined}
      className={variant === "home" ? "py-20 md:py-28" : "section-divider py-14 md:py-20"}
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
          <div className="mb-12 text-center">
            <div className="inline-flex p-[1px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]">
              <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-background/80 backdrop-blur ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
                {defaults.badge}
                <span className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold animate-pulse" />
              </span>
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
                {heading}
              </span>
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-28 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold shadow-[0_0_18px_rgba(124,58,237,.35)]" />
            <p className="mt-3 text-sm text-[var(--color-muted)]">{defaults.micro}</p>
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <Link href={s.href} className="group block focus:outline-none cursor-pointer" aria-label={s.title}>
                <div className="relative rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm transition-all hover:scale-[1.03] hover:shadow-xl hover:bg-[var(--color-surface)]/90 before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:xor]">
                  {/* Título + icono */}
                  <div className="flex items-center gap-2.5 mb-4">
                    {(() => {
                      const Icon = ICONS[s.title] || Megaphone;
                      return <Icon className="h-5 w-5 text-[var(--color-foreground)]/90 transition-transform group-hover:scale-110" aria-hidden />;
                    })()}
                    <h3 className="font-bold text-lg tracking-tight group-hover:text-gradient-afenta">
                      {s.title}
                    </h3>
                  </div>

                  {/* Lista */}
                  <ul className="space-y-2 text-[var(--color-muted)]">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA de cada card */}
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-brand-gold)]">
                    <span>{defaults.explore}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* ---- CTA FINAL que rellena hueco ---- */}
          <Reveal delay={services.length * 0.06}>
            <Link
              href="/services"
              aria-label={defaults.ctaButton}
              className={`group block focus:outline-none cursor-pointer ${ctaSpan}`}
            >
              <div className="relative h-full rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm flex flex-col justify-center items-start gap-3 transition-all hover:scale-[1.02] hover:shadow-xl hover:bg-[var(--color-surface)]/90 before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] before:[mask-composite:xor]">
                <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
                  {defaults.ctaTitle}
                </h3>
                <p className="text-sm text-[var(--color-muted)] max-w-prose">
                  {defaults.ctaText}
                </p>
                <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)] transition-colors group-hover:text-[var(--color-brand-gold)]">
                  <span>{defaults.ctaButton}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
