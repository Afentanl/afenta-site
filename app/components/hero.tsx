/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundFX from "./background-fx";
import { useLanguage } from "./language-provider";

/* ─────────────────────────  Textos  ───────────────────────── */
const TEXT = {
    en: {
    kicker: "Afenta — Brand · Websites · Performance",
    title: "We turn vision into measurable growth",
    subtitle:
        "We blend design and engineering to build fast, beautiful experiences that convert — and then we scale the performance.",
    primary: "Start a project",
    secondary: "View cases",
    trust: "Trusted by teams in",
    stat1: "↑ 3–5x",
    stat1Label: "Improved conversion",
    stat2: "< 1.2s",
    stat2Label: "Core Web Vitals",
    stat3: "98/100",
    stat3Label: "Lighthouse score",
    },
    nl: {
    kicker: "Afenta — Brand · Websites · Performance",
    title: "Wij zetten visie om in meetbare groei",
    subtitle:
        "We brengen design en engineering samen voor snelle, prachtige experiences die converteren — en daarna schalen we de performance.",
    primary: "Project starten",
    secondary: "Bekijk cases",
    trust: "Vertrouwd door teams in",
    stat1: "↑ 3–5x",
    stat1Label: "Hogere conversie",
    stat2: "< 1.2s",
    stat2Label: "Core Web Vitals",
    stat3: "98/100",
    stat3Label: "Lighthouse score",
    },
} as const;

/* ───────────────────────  Botones premium  ─────────────────────── */
function PrimaryCTA({ children }: { children: React.ReactNode }) {
    return (
    <button
        className="relative overflow-hidden rounded-xl px-6 py-3 font-extrabold
                    text-white dark:text-black
                    bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                    bg-[length:300%_300%] animate-[ctaGradient_6s_linear_infinite]
                    shadow-[0_10px_28px_rgba(124,58,237,.35)]
                    transition-all duration-300 ease-out
                    hover:scale-[1.03] active:scale-95"
    >
        <span className="relative z-10">{children}</span>
        <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.6),transparent)] bg-[length:200%_100%] animate-[sheen_3s_ease-in-out_infinite]"
        />
    </button>
    );
}

function SecondaryCTA({ children }: { children: React.ReactNode }) {
    return (
    <button className="relative rounded-xl px-[1px] py-[1px] transition-transform duration-300 hover:scale-[1.02] active:scale-95">
        <span className="absolute inset-0 rounded-xl
                        bg-[linear-gradient(90deg,var(--color-brand-violet),var(--color-fuchsia),var(--color-brand-gold))]" />
        <span className="relative block rounded-[11px] px-5 py-2.5
                        bg-white text-zinc-900 shadow-[0_4px_16px_rgba(0,0,0,.06)]
                        hover:shadow-[0_8px_22px_rgba(0,0,0,.10)]
                        dark:bg-zinc-900/70 dark:text-white dark:shadow-[0_6px_18px_rgba(0,0,0,.35)]
                        backdrop-blur">
        {children}
        </span>
    </button>
    );
}

/* ───────────────  Hints de navegación (scroll y back-to-top) ─────────────── */
function SmartNavHints() {
    const [showCue, setShowCue] = useState(true);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
    const onScroll = () => {
        const y = window.scrollY;
        const doc = document.documentElement;
        const atBottom = y + window.innerHeight >= doc.scrollHeight - 2;
      setShowCue(y < window.innerHeight * 0.2 && !atBottom);
      setShowTop(y > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
    <>
        {showCue && (
        <Link
            href="#services"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40
            inline-flex items-center gap-2 rounded-full px-3 py-1.5
                            text-xs font-medium
                        bg-white/90 text-zinc-800 ring-1 ring-black/10 shadow-sm
                        dark:bg-zinc-900/70 dark:text-zinc-100 dark:ring-white/10"
        >
            <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Scroll
        </Link>
        )}

        {showTop && (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-40 rounded-full px-3.5 py-3
                        bg-black text-white shadow-lg
                        hover:scale-[1.05] active:scale-95 transition
                        dark:bg-white dark:text-black"
        >
            ↑
        </button>
        )}
    </>
        );
}

/* ───────────────────────────  Hero  ─────────────────────────── */
export default function Hero() {
    const { lang } = useLanguage();
    const t = TEXT[lang];

    // spotlight fino en light (cursor)
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
        const x = useTransform(mx, (v) => `${v}px`);
    const y = useTransform(my, (v) => `${v}px`);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
    <section
        id="home"
        aria-labelledby="hero-title"
        className="relative w-full min-h-[88vh] overflow-hidden bg-white dark:bg-black"
        onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
        }}
    >
      {/* Fondo premium */}
        <BackgroundFX />

      {/* Spotlight suave (solo light) */}
        {mounted && (
        <motion.div
            className="pointer-events-none absolute inset-0 hidden md:block dark:hidden"
            style={{
            background: `radial-gradient(230px 230px at ${x.get()} ${y.get()}, rgba(124,58,237,.10), rgba(250,204,21,.10) 35%, transparent 70%)`,
            }}
        />
        )}

      {/* Layout 7/5 para llenar la derecha con contenido */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-32 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          {/* ───────────── Columna izquierda ───────────── */}
            <div className="md:col-span-7">
            {/* Kicker */}
            <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-black/5 dark:bg-white/10 backdrop-blur  dark:text-zinc-500 ring-1 ring-black/10 dark:ring-white/10 forced-color-adjust-auto"
            >
                {t.kicker}
            </motion.div>

            {/* Headline */}
            <motion.h1
                id="hero-title"
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                className="h-display text-4xl md:text-6xl font-extrabold
                            leading-[1.19] tracking-tight pb-1
                            bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                            bg-clip-text text-transparent drop-shadow-[0_8px_28px_rgba(124,58,237,.22)]"
            >
                {t.title}
            </motion.h1>

            {/* Subtítulo con contraste real en light */}
            <motion.p
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
                className="mt-6 text-base md:text-lg forced-color-adjust-auto max-w-[44ch]"
            >
                {t.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
                className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="#contact" className="group">
                <PrimaryCTA>{t.primary}</PrimaryCTA>
              </Link>

              <Link href="#cases">
                <SecondaryCTA>{t.secondary}</SecondaryCTA>
              </Link>
            </motion.div>

            {/* Métricas */}
            <motion.div
                initial={{ y: 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.26 }}
                className="mt-8 grid grid-cols-3 max-w-md gap-4 text-sm"
            >
                <div>
                <div className="font-extrabold text-lg">{t.stat1}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{t.stat1Label}</div>
                </div>
                <div>
                <div className="font-extrabold text-lg">{t.stat2}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{t.stat2Label}</div>
                </div>
                <div>
                <div className="font-extrabold text-lg">{t.stat3}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{t.stat3Label}</div>
                </div>
            </motion.div>

            {/* Logos (pon tus svgs/png en /public/brands) */}
            <motion.div
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.34 }}
              className="mt-8 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400"
            >
              <span className="shrink-0">{t.trust}</span>
              <div className="flex items-center gap-4 opacity-80">
                <Image src="/brands/brand-1.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-2.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-3.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-4.svg" alt="" width={60} height={20} className="h-5 w-auto" />
              </div>
            </motion.div>
          </div>

          {/* ───────────── Columna derecha ───────────── */}
          <div className="md:col-span-5 relative min-h-[400px]">
            {/* Marco principal (mock) */}
            <motion.div
              initial={{ y: 20, opacity: 0, rotate: -1.5 }}
              whileInView={{ y: 0, opacity: 1, rotate: -0.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute right-0 top-0 w-[88%] rounded-2xl overflow-hidden
                         ring-1 ring-black/5 dark:ring-white/10
                         shadow-[0_20px_60px_rgba(124,58,237,.18)]
                         bg-white dark:bg-zinc-900"
            >
              {/* cabecera con glows */}
              <div className="h-40 bg-[radial-gradient(100%_80%_at_0%_0%,rgba(124,58,237,.22),transparent_60%),radial-gradient(100%_80%_at_100%_100%,rgba(250,204,21,.22),transparent_60%)]" />

              {/* mock/preview con fallback */}
              <div className="relative aspect-[16/10] w-full bg-white dark:bg-zinc-900">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#fafafa,#f6f6f6)] dark:bg-[linear-gradient(135deg,#0f0f12,#1a1a1f)]" />
                <Image
                  src="/hero/mock-dashboard.png"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* pie */}
              <div className="px-5 py-4 border-t border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900">
                <div className="font-bold">Case — Afenta Ads ROI</div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  +212% leads, CPA −43%
                </div>
              </div>
            </motion.div>

            {/* Onda SVG decorativa (ligera, sin imágenes) */}
            <svg
              className="absolute -left-6 bottom-10 w-40 h-40 md:w-48 md:h-48 opacity-70 dark:opacity-60"
              viewBox="0 0 200 200"
              aria-hidden
            >
              <defs>
                <linearGradient id="afentaWave" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgb(124,58,237)" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="rgb(217,70,239)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="rgb(250,204,21)" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              <path
                d="M40,100 C70,80 130,120 160,100"
                fill="none"
                stroke="url(#afentaWave)"
                strokeWidth="14"
                strokeLinecap="round"
              />
            </svg>

            {/* Badge flotante (ya no molesta) */}
            <motion.div
                initial={{ y: -10, opacity: 0, rotate: 1 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="absolute top-4 right-4 md:top-8 md:right-[-7%]
                            rounded-2xl px-4 py-3
                            bg-white/90 dark:bg-black/55 backdrop-blur
                            ring-1 ring-black/10 dark:ring-white/10
                            shadow-[0_12px_30px_rgba(0,0,0,.14)]
                            text-zinc-700 dark:text-zinc-200"
            >
                <div className="text-[11px] leading-none opacity-80">Last campaign</div>
                <div className="mt-1 text-lg font-extrabold tracking-tight">
                ↑ 312% <span className="font-semibold text-zinc-500 dark:text-zinc-400">leads</span>
                </div>
            </motion.div>
            </div>
        </div>
        </div>

      {/* Hints navegación */}
        <SmartNavHints />

      {/* Fade inferior solo dark */}
        <div className="hidden dark:block pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
    );
}
