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
          <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-12 text-gradient-afenta">
            {heading}
          </h2>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <Link href={s.href} className="group block focus:outline-none cursor-pointer" aria-label={s.title}>
                <div
                  className="
                    rounded-2xl p-6 ring-1 ring-[var(--color-ring)]
                    bg-[var(--color-surface-2)]/70 backdrop-blur-sm
                    transition-all
                    hover:scale-[1.03] hover:shadow-xl hover:bg-[var(--color-surface)]/90
                  "
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
