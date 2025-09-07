"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PenTool, Code2, Rocket, LineChart, ShieldCheck, Gauge } from "lucide-react";
import { useLanguage } from "./language-provider";

/* easing */
const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp = (d = 0) => ({
    initial: { y: 14, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: EASE, delay: d },
});

/* textos (igual que tenías) */
const T = {
    en: {
    kicker: "What we do",
    title: "Services designed to turn vision into growth",
    subtitle:
        "From brand foundations to fast, conversion-first websites and always-on performance. One stack, one team, measurable outcomes.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See pricing",
    cards: {
        brand: {
        title: "Brand & Identity",
        body:
            "Positioning, visual identity systems, design language and guidelines to express who you are — clearly and consistently.",
        points: ["Positioning workshop", "Logo & system", "Design language", "Brand guidelines"],
        },
        web: {
        title: "Websites that convert",
        body:
            "Next.js + edge-ready performance, UX research and CRO baked in. Launch faster with a design system and clean CMS.",
        points: ["Design system", "Next.js + Headless CMS", "SEO + CWV < 1.2s", "A/B testing & CRO"],
        },
        perf: {
        title: "Acquisition & Performance",
        body:
            "Full-funnel growth: paid, organic, and analytics. We instrument, test, and scale what works with clear KPIs.",
        points: ["Paid search & social", "Attribution & analytics", "Content & SEO", "Dashboards & KPIs"],
        },
    },
    metrics: [
        { k: "↑ 3–5x", l: "Better conversion" },
        { k: "< 1.2s", l: "Core Web Vitals" },
        { k: "98/100", l: "Lighthouse score" },
    ],
    process: {
        title: "Our process — fast, simple, measurable",
        steps: [
        { t: "Discover", d: "Goals, users, and success metrics. We align KPIs first." },
        { t: "Design", d: "Brand/UX flows, design system, content and interactions." },
        { t: "Build", d: "Clean Next.js + CMS, analytics, and SEO baked in." },
        { t: "Launch & Scale", d: "CRO, paid, and dashboards. Iterate weekly on data." },
        ],
    },
    faqs: {
        title: "FAQs",
        q1: { q: "How long does a site take?", a: "Most sites ship in 3–6 weeks depending on scope and content readiness." },
        q2: { q: "Do you work with my stack?", a: "Yes — we prefer Next.js, Tailwind and a headless CMS, but integrate with your tools." },
        q3: { q: "Can we start with performance only?", a: "Absolutely. We often begin with analytics + paid to learn, then rebuild." },
    },
    },
    nl: {
    kicker: "Wat we doen",
    title: "Diensten die visie omzetten in groei",
    subtitle:
        "Van merkfundament tot snelle, conversiegerichte websites en always-on performance. Eén stack, één team, meetbare resultaten.",
    ctaPrimary: "Project starten",
    ctaSecondary: "Bekijk prijzen",
    cards: {
        brand: {
        title: "Merk & Identiteit",
        body:
            "Positionering, visuele identiteit, design language en guidelines om jezelf duidelijk en consistent te tonen.",
        points: ["Positionering workshop", "Logo & systeem", "Design language", "Brand guidelines"],
        },
        web: {
        title: "Websites die converteren",
        body:
            "Next.js + edge-performance, UX-onderzoek en CRO ingebouwd. Snelle launch met design system en schone CMS.",
        points: ["Design system", "Next.js + Headless CMS", "SEO + CWV < 1.2s", "A/B-testen & CRO"],
        },
        perf: {
        title: "Acquisitie & Performance",
        body:
            "Full-funnel groei: paid, organisch en analytics. We instrumenteren, testen en schalen op duidelijke KPI’s.",
        points: ["Paid search & social", "Attributie & analytics", "Content & SEO", "Dashboards & KPI’s"],
        },
    },
    metrics: [
        { k: "↑ 3–5x", l: "Betere conversie" },
        { k: "< 1.2s", l: "Core Web Vitals" },
        { k: "98/100", l: "Lighthouse-score" },
    ],
    process: {
        title: "Onze werkwijze — snel, simpel, meetbaar",
        steps: [
        { t: "Discover", d: "Doelen, gebruikers en succesmetrics. KPI’s eerst." },
        { t: "Design", d: "Brand/UX-flows, design system, content en interacties." },
        { t: "Build", d: "Schone Next.js + CMS, analytics en SEO geïntegreerd." },
        { t: "Launch & Scale", d: "CRO, paid en dashboards. Wekelijks itereren op data." },
        ],
    },
    faqs: {
        title: "Veelgestelde vragen",
        q1: { q: "Hoe lang duurt een site?", a: "De meeste sites gaan live in 3–6 weken afhankelijk van scope en content." },
        q2: { q: "Werken jullie met onze stack?", a: "Ja — voorkeur voor Next.js, Tailwind en headless CMS, maar we integreren." },
        q3: { q: "Kan ik starten met performance?", a: "Zeker. We beginnen vaak met analytics + paid en bouwen daarna door." },
    },
    },
} as const;

export default function Services() {
    const { lang } = useLanguage();
    const t = T[lang as "en" | "nl"];

    return (
    <section id="services" className="relative overflow-hidden">
      {/* mismo fondo que el hero */}
        

        <div className="container-afenta py-20 md:py-28 relative z-10">
        {/* Header */}
        <motion.div
            {...fadeUp(0.0)}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]"
        >
            {t.kicker}
        </motion.div>

        <motion.h2 {...fadeUp(0.05)} className="mt-3 h-display text-3xl md:text-5xl font-black tracking-tight">
            {t.title}
        </motion.h2>

        <motion.p {...fadeUp(0.1)} className="mt-4 max-w-2xl text-base md:text-lg text-[var(--color-muted)]">
            {t.subtitle}
        </motion.p>

        {/* KPIs */}
        <motion.div {...fadeUp(0.15)} className="mt-8 grid grid-cols-3 gap-4 max-w-md text-sm">
            {t.metrics.map((m) => (
            <div key={m.l} className="rounded-xl p-4 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <div className="text-xl font-extrabold">{m.k}</div>
                <div className="text-[var(--color-muted)]">{m.l}</div>
            </div>
            ))}
        </motion.div>

        {/* Grid servicios */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
            <motion.div
            {...fadeUp(0.05)}
            className="group rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] hover:translate-y-[-2px] transition"
            >
            <div className="flex items-center gap-3">
                <span className="rounded-xl p-2 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <PenTool className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{t.cards.brand.title}</h3>
            </div>
            <p className="mt-3 text-[var(--color-muted)]">{t.cards.brand.body}</p>
            <ul className="mt-4 grid gap-2 text-sm">
                {t.cards.brand.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                    {p}
                </li>
                ))}
            </ul>
            </motion.div>

          {/* Web */}
            <motion.div
            {...fadeUp(0.1)}
            className="group rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] hover:translate-y-[-2px] transition"
            >
            <div className="flex items-center gap-3">
                <span className="rounded-xl p-2 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <Code2 className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{t.cards.web.title}</h3>
            </div>
            <p className="mt-3 text-[var(--color-muted)]">{t.cards.web.body}</p>
            <ul className="mt-4 grid gap-2 text-sm">
                {t.cards.web.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                    {p}
                </li>
                ))}
            </ul>
            </motion.div>

          {/* Performance */}
            <motion.div
            {...fadeUp(0.15)}
            className="group rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] hover:translate-y-[-2px] transition"
            >
            <div className="flex items-center gap-3">
                <span className="rounded-xl p-2 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <Rocket className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{t.cards.perf.title}</h3>
            </div>
            <p className="mt-3 text-[var(--color-muted)]">{t.cards.perf.body}</p>
            <ul className="mt-4 grid gap-2 text-sm">
                {t.cards.perf.points.map((p) => (
                <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                    {p}
                </li>
                ))}
            </ul>
            </motion.div>
        </div>

        {/* Feature strip */}
        <motion.div {...fadeUp(0.2)} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] flex items-start gap-3">
            <Gauge className="h-5 w-5 shrink-0" />
            <div>
                <div className="font-semibold">Speed as a feature</div>
                <div className="text-sm text-[var(--color-muted)]">Edge-ready Next.js, image/CDN, and CWV budgets baked in.</div>
            </div>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] flex items-start gap-3">
            <LineChart className="h-5 w-5 shrink-0" />
            <div>
                <div className="font-semibold">Analytics first</div>
                <div className="text-sm text-[var(--color-muted)]">Clear KPIs, dashboards, and experiments from day one.</div>
            </div>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0" />
            <div>
                <div className="font-semibold">Quality & maintainability</div>
                <div className="text-sm text-[var(--color-muted)]">Design system + clean CMS so you can update safely.</div>
            </div>
            </div>
        </motion.div>

        {/* CTA final */}
        <motion.div {...fadeUp(0.3)} className="mt-12 flex flex-wrap items-center gap-3">
            <Link href="#contact" className="btn-afenta-solid no-underline">{t.ctaPrimary}</Link>
            <Link href="#contact" className="btn-afenta-outline no-underline">{t.ctaSecondary}</Link>
        </motion.div>

        {/* FAQs */}
        <motion.div {...fadeUp(0.35)} className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <div className="font-semibold">{t.faqs.q1.q}</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">{t.faqs.q1.a}</div>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <div className="font-semibold">{t.faqs.q2.q}</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">{t.faqs.q2.a}</div>
            </div>
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <div className="font-semibold">{t.faqs.q3.q}</div>
            <div className="mt-2 text-sm text-[var(--color-muted)]">{t.faqs.q3.a}</div>
            </div>
        </motion.div>
        </div>
    </section>
    );
}
