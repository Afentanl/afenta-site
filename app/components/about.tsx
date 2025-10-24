//components, about.tsx//
"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./language-provider";

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
        { t: "Discover", d: "Goals, constraints & baseline analytics." },
        { t: "Design & build", d: "Brand, system, and a fast web experience." },
        { t: "Launch & scale", d: "Always-on growth: paid + CRO + reporting." },
    ],
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
        { t: "Discover", d: "Doelen, randvoorwaarden & baseline analytics." },
        { t: "Design & build", d: "Merk, systeem en snelle web-experience." },
        { t: "Launch & scale", d: "Always-on groei: paid + CRO + reporting." },
    ],
    },
} as const;

const ease = [0.16, 0.84, 0.44, 1] as const;

const wrap: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const up: Variants = {
    hidden: { y: 18, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.52, ease } },
};

export default function About() {
    const { lang } = useLanguage();
    const t = COPY[lang as "en" | "nl"];

    return (
    <section id="about" className="relative overflow-hidden py-18 md:py-24">
        <div className="relative z-10 container-afenta">
        <motion.div
            variants={up}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]"
        >
            {t.kicker}
        </motion.div>

        <motion.div
            variants={wrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start"
        >
          {/* izquierda */}
            <motion.div variants={wrap} className="md:col-span-7">
            <motion.h2 variants={up} className="h-display text-3xl md:text-5xl font-black leading-[1.15]">
                {t.h2}
            </motion.h2>
            <motion.p variants={up} className="mt-4 text-base md:text-lg text-[var(--color-muted)] max-w-[52ch]">
                {t.p}
            </motion.p>

            <motion.ul variants={wrap} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t.bullets.map((b, i) => (
                <motion.li variants={up} key={i} className="flex items-start gap-2 text-sm md:text-base">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                    <span>{b}</span>
                </motion.li>
                ))}
            </motion.ul>

            <motion.div variants={up} className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="#contact" className="btn-afenta-solid no-underline">{t.cta.primary}</Link>
                <Link href="#cases" className="btn-afenta-solid no-underline">{t.cta.secondary}</Link>
                <Link href="/about" className="btn-afenta-outline no-underline">
                {lang === "nl" ? "Meer over ons" : "More about us"}
                </Link>
            </motion.div>
            </motion.div>

          {/* derecha */}
            <motion.div variants={wrap} className="md:col-span-5">
            <motion.div variants={wrap} className="grid grid-cols-3 gap-3">
                {([t.kpi1, t.kpi2, t.kpi3] as [string, string][]).map(([v, l], i) => (
                <motion.div
                    variants={up}
                    key={i}
                    className="rounded-xl p-4 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm text-center"

                >
                    <div className="text-lg md:text-2xl font-extrabold">{v}</div>
                    <div className="text-xs text-[var(--color-muted)]">{l}</div>
                </motion.div>
                ))}
            </motion.div>

           {/* Timeline limpio: dot sin comerse la primera letra */}
            <motion.div variants={up} className="mt-6 rounded-2xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm p-5">
                <div className="text-sm font-semibold mb-3">{t.timelineTitle}</div>
                <ol className="relative pl-7 md:pl-8 space-y-4">
                    <span
                        aria-hidden
                        className="pointer-events-none absolute left-3 md:left-3.5 top-0 bottom-0 w-px bg-[var(--color-ring)]"
            />
            {t.steps.map((s, i) => (
                <li key={i} className="relative pl-5">
                    <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                <div className="font-semibold">{s.t}</div>
                <div className="text-sm text-[var(--color-muted)]">{s.d}</div>
                </li>
        ))}
        </ol>
            </motion.div>
        </motion.div>
        </motion.div>
        </div>
    </section>
    );
}
