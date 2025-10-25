"use client";

import Link from "next/link";
import { useLanguage } from "../components/language-provider";
import { ServicesContent } from "../services-content";

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = {
    title: lang === "nl" ? "Diensten" : "Services",
    h1: lang === "nl" ? "Merk · Websites · Performance" : "Brand · Websites · Performance",
    p: lang === "nl"
      ? "Eén stack, één team. Van strategie en identiteit tot web en always-on groei."
      : "One stack, one team. From strategy and identity to web and always-on growth.",
    explore: lang === "nl" ? "Ontdek" : "Explore",
    ctaTitle: lang === "nl" ? "Klaar om te groeien?" : "Ready to grow?",
    ctaDesc: lang === "nl" ? "Vertel ons je doelen — we reageren binnen 1–2 werkdagen."
                           : "Tell us your goals — we’ll reply within 1–2 business days.",
    ctaBtn: lang === "nl" ? "Project starten" : "Start a project",
  };

  const services = ServicesContent[lang];

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="container-afenta py-10">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
          {t.title}
        </div>
        <h1 className="mt-3 h-display text-3xl md:text-5xl font-black">{t.h1}</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-prose">{t.p}</p>
      </section>

      {/* Grid */}
      <section className="container-afenta pb-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group block rounded-2xl p-6 ring-1 ring-[var(--color-ring)]
                         bg-[var(--color-surface-2)]/70 backdrop-blur-sm
                         transition-all hover:scale-[1.03] hover:shadow-xl hover:bg-[var(--color-surface)]/90"
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
                <span>{t.explore}</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-afenta pb-24">
        <div className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] text-center">
          <h2 className="h-display text-2xl md:text-3xl font-black">{t.ctaTitle}</h2>
          <p className="mt-2 text-[var(--color-muted)]">{t.ctaDesc}</p>
          <div className="mt-4">
            <Link href="/contact" className="btn-afenta-solid">{t.ctaBtn}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
