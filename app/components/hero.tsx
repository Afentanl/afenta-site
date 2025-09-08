/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "./language-provider";

/* ---------- Framer helpers ---------- */
const EASE = [0.16, 1, 0.3, 1] as const; // ≈ easeOutQuint
const SPRING = { type: "spring" as const, stiffness: 420, damping: 28 };

const fadeInUp = (delay = 0) => ({
  initial: { y: 14, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, ease: EASE, delay },
});

/* ───────── TEXTOS ───────── */
const T = {
  en: {
    kicker: "Afenta — Brand · Websites · Performance",
    title: "We turn vision into measurable growth",
    subtitle:
      "We blend design and engineering to build fast, beautiful experiences that convert — then we scale the performance.",
    primary: "Start a project",
    secondary: "View cases",
    tertiary: "About us",
    servicesLabel: "Our services",
    services: ["Marketing", "Frontend", "Backend", "Data", "Cybersecurity", "AI"],
    stat1: "↑ 3–5x",
    stat1Label: "Improved conversion",
    stat2: "< 1.2s",
    stat2Label: "Core Web Vitals",
    stat3: "98/100",
    stat3Label: "Lighthouse score",
    kpiLeads: "Leads (7d)",
    kpiCPA: "CPA",
    kpiCR: "CR",
    trend: "Trend · last 14 days",
    conv: "Conversions",
    sales: "Sales",
    brand: "Brand awareness",
    caseTitle: "Case — Afenta Ads ROI",
    caseLink: "View case",
    tabs: { all: "ALL", ads: "ADS", web: "WEB" },
  },
  nl: {
    kicker: "Afenta — Brand · Websites · Performance",
    title: "Wij zetten visie om in meetbare groei",
    subtitle:
      "We brengen design en engineering samen voor snelle, prachtige experiences die converteren — en daarna schalen we de performance.",
    primary: "Project starten",
    secondary: "Bekijk cases",
    tertiary: "Over ons",
    servicesLabel: "Onze diensten",
    services: ["Marketing", "Frontend", "Backend", "Data", "Cybersecurity", "AI"],
    stat1: "↑ 3–5x",
    stat1Label: "Hogere conversie",
    stat2: "< 1.2s",
    stat2Label: "Core Web Vitals",
    stat3: "98/100",
    stat3Label: "Lighthouse score",
    kpiLeads: "Leads (7d)",
    kpiCPA: "CPA",
    kpiCR: "CR",
    trend: "Trend · laatste 14 dagen",
    conv: "Conversies",
    sales: "Sales",
    brand: "Merkbekendheid",
    caseTitle: "Case — Afenta Ads ROI",
    caseLink: "Case bekijken",
    tabs: { all: "ALL", ads: "ADS", web: "WEB" },
  },
} as const;

/* ───────── Hook count-up ───────── */
function useCountUp(target: number, duration = 700, deps: React.DependencyList = []) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = 0;
    const t0 = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setVal(Math.round(start + (target - start) * p));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return val;
}

/* ───────── CHARTS (SVG) ───────── */
function TinyBars({ bars }: { bars: number[] }) {
  const max = Math.max(...bars);
  return (
    <svg viewBox="0 0 120 56" className="w-full h-[76px]">
      <defs>
        <linearGradient id="gradBar" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-violet)" />
          <stop offset="50%" stopColor="var(--color-fuchsia)" />
          <stop offset="100%" stopColor="var(--color-brand-gold)" />
        </linearGradient>
      </defs>
      {bars.map((v, i) => {
        const h = (v / (max || 1)) * 52;
        const x = 8 + i * 16;
        return (
          <g key={i} className="grow-y">
            <rect x={x} y={56 - h} width="10" height={h} rx="2" fill="url(#gradBar)" />
          </g>
        );
      })}
    </svg>
  );
}
function TinyLine({ points, height = 56 }: { points: number[]; height?: number }) {
  const W = 120,
    H = height;
  const max = Math.max(...points),
    min = Math.min(...points);
  const step = W / (points.length - 1 || 1);
  const y = (v: number) => H - ((v - min) / (max - min || 1)) * (H - 8) - 4;
  const d = points.map((v, i) => `${i ? "L" : "M"} ${i * step} ${y(v)}`).join(" ");
  return (
    <svg viewBox={`0 0 120 ${H}`} className="w-full" style={{ height: H }}>
      <defs>
        <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-violet)" />
          <stop offset="50%" stopColor="var(--color-fuchsia)" />
          <stop offset="100%" stopColor="var(--color-brand-gold)" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#gradLine)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function TinyDonut({ value }: { value: number }) {
  const pct = Math.max(4, Math.min(96, value));
  const C = 18,
    R = 14,
    P = 2 * Math.PI * R,
    stroke = (pct / 100) * P;
  return (
    <svg viewBox="0 0 36 36" className="h-12 w-12">
      <defs>
        <linearGradient id="gradDonut" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-violet)" />
          <stop offset="50%" stopColor="var(--color-fuchsia)" />
          <stop offset="100%" stopColor="var(--color-brand-gold)" />
        </linearGradient>
      </defs>
      <circle cx={C} cy={C} r={R} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="6" />
      <circle
        cx={C}
        cy={C}
        r={R}
        fill="none"
        stroke="url(#gradDonut)"
        strokeWidth="6"
        strokeDasharray={`${stroke} ${P - stroke}`}
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>
  );
}

/* ───────── MOCK con tabs + autorotate ───────── */
type Tab = "all" | "ads" | "web";
const DATA: Record<
  Tab,
  { leads: number; cpa: number; cr: number; conv: number; bars: number[]; brand: number[]; trend: number[] }
> = {
  all: {
    leads: 312,
    cpa: -43,
    cr: 18,
    conv: 216,
    bars: [12, 16, 22, 26, 28, 30, 26],
    brand: [8, 10, 9, 11, 12, 11, 13],
    trend: [12, 17, 15, 20, 18, 22, 27, 25, 28, 26, 30, 29, 31, 34],
  },
  ads: {
    leads: 420,
    cpa: -41,
    cr: 22,
    conv: 260,
    bars: [10, 13, 18, 22, 23, 25, 21],
    brand: [6, 7, 8, 9, 10, 9, 11],
    trend: [10, 12, 14, 16, 18, 17, 19, 22, 24, 23, 25, 27, 28, 29],
  },
  web: {
    leads: 180,
    cpa: -22,
    cr: 14,
    conv: 140,
    bars: [8, 10, 12, 14, 18, 20, 18],
    brand: [5, 6, 6, 7, 7, 8, 9],
    trend: [6, 8, 9, 10, 12, 11, 13, 14, 16, 17, 18, 19, 19, 20],
  },
};

function useCountUpVal(target: number, deps: React.DependencyList) {
  return useCountUp(target, 700, deps);
}
function Mock({ t }: { t: (typeof T)["en"] | (typeof T)["nl"] }) {
  const order: Tab[] = useMemo(() => ["all", "ads", "web"], []);
  const [tab, setTab] = useState<Tab>("all");
  const [pausedUntil, setPausedUntil] = useState<number>(0);
  const timer = useRef<number | null>(null);
  useEffect(() => {
    const tick = () => {
      if (Date.now() < pausedUntil) return;
      setTab((prev) => order[(order.indexOf(prev) + 1) % order.length]);
    };
    timer.current = window.setInterval(tick, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [order, pausedUntil]);
  const pause = (ms: number) => setPausedUntil(Date.now() + ms);
  const ds = DATA[tab];
  const leadsAnim = useCountUpVal(ds.leads, [tab, ds.leads]);
  const cpaAnim = useCountUpVal(Math.abs(ds.cpa), [tab, ds.cpa]);
  const crAnim = useCountUpVal(ds.cr, [tab, ds.cr]);

  return (
    <div
      className="relative rounded-2xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] overflow-hidden"
      onMouseEnter={() => pause(10_000)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.18] bg-[radial-gradient(90%_140%_at_0%_0%,rgba(124,58,237,.35),transparent_60%),radial-gradient(90%_140%_at_100%_100%,rgba(250,204,21,.28),transparent_60%)]"
      />
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-ring)] relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_0%_0%,rgba(124,58,237,.12),transparent),radial-gradient(60%_120%_at_100%_50%,rgba(250,204,21,.12),transparent)]" />
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Logo (oculto si falla) */}
            <img
              src="/logo-afenta.png"
              alt="Afenta"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full hidden sm:block"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="leading-tight">
              <div className="text-sm font-bold text-[var(--color-text)] flex items-center gap-1.5">
                Afenta <span className="text-amber-400">Ads</span>
              </div>
              <div className="text-[11px] text-[var(--color-muted)]">Dashboard overview</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2" role="tablist" aria-label="Mock tabs">
            {(["all", "ads", "web"] as Tab[]).map((k) => {
              const active = tab === k;
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setTab(k);
                    pause(10_000);
                  }}
                  className={`px-3 py-1.5 text-xs rounded-lg ring-1 ring-[var(--color-ring)] cursor-pointer transition-all
                    ${
                      active
                        ? "bg-[var(--color-surface-2)] text-[var(--color-text)] shadow-[0_6px_14px_rgba(0,0,0,.08)]"
                        : "bg-[var(--color-surface-2)]/70 text-[var(--color-text)]/80 hover:bg-[var(--color-surface-2)] hover:translate-y-[0.5px] active:translate-y-[1px]"
                    }`}
                >
                  {t.tabs[k]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 grid grid-cols-12 gap-4">
        {/* KPIs */}
        <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-3 animate-fade" key={`kpi-${tab}`}>
          {[
            { l: t.kpiLeads, v: `+${leadsAnim}`, key: "leads" },
            { l: t.kpiCPA, v: `-${cpaAnim}%`, key: "cpa" },
            { l: t.kpiCR, v: `+${crAnim}%`, key: "cr" },
          ].map((k) => (
            <div
              key={k.key}
              className="min-w-[116px] h-[74px] rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] text-[var(--color-text)] flex flex-col justify-between"
              onMouseEnter={() => pause(4000)}
            >
              <div className="text-[11px] text-[var(--color-muted)] leading-tight">{k.l}</div>
              <div className="text-[20px] font-extrabold leading-none">{k.v}</div>
            </div>
          ))}
        </div>

        {/* Trend */}
        <div
          className="col-span-12 md:col-span-7 rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] p-4 md:p-5 animate-fade flex flex-col items-center justify-center h-[140px]"
          key={`trend-${tab}`}
        >
          <div className="w-full max-w-[95%]">
            <TinyLine points={ds.trend} height={96} />
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1 text-center">{t.trend}</div>
        </div>

        {/* Cards */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-3 animate-fade" key={`cards-${tab}`}>
          <div className="rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] p-4">
            <div className="text-sm font-semibold text-[var(--color-text)]">{t.conv}</div>
            <div className="mt-3 flex items-center gap-3">
              <TinyDonut value={Math.min(100, Math.round((ds.conv / 300) * 100))} />
              <div className="text-2xl font-extrabold text-[var(--color-text)]">+{ds.conv}</div>
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] p-4">
            <div className="text-sm font-semibold text-[var(--color-text)]">{t.sales}</div>
            <div className="mt-2">
              <TinyBars bars={ds.bars} />
            </div>
          </div>
          <div className="rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] p-4">
            <div className="text-sm font-semibold text-[var(--color-text)]">{t.brand}</div>
            <div className="mt-2">
              <TinyLine points={ds.brand} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[var(--color-ring)] flex items-center justify-between">
        <div>
          <div className="font-bold text-[var(--color-text)]">{t.caseTitle}</div>
          <div className="text-xs text-[var(--color-muted)]">+212% leads, CPA −43%</div>
        </div>
        <Link href="#cases" className="text-xs font-semibold link-underline link-gradient">
          {t.caseLink}
        </Link>
      </div>
    </div>
  );
}

/* ───────── RainText ───────── */
function RainText({ text }: { text: string }) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
  };
  const child: Variants = {
    hidden: { y: -40, opacity: 0, rotate: 0.5 },
    show: { y: 0, opacity: 1, rotate: 0, transition: SPRING },
  };

  return (
    <motion.h1
      className="h-display text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.18] md:leading-[1.22] pb-2
                bg-gradient-to-r from-[var(--color-brand-violet)] via-[var(--color-fuchsia)] to-[var(--color-brand-gold)]
                bg-clip-text text-transparent drop-shadow-[0_8px_28px_rgba(124,58,237,.22)] select-none"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {text.split(" ").map((word, wi) => (
        <span key={`w-${wi}`} className="inline-block mr-[0.35ch] align-top">
          {Array.from(word).map((ch, ci) => (
            <motion.span key={`w${wi}c${ci}`} className="inline-block" variants={child}>
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}

/* ───────── UI Hints (scroll cue + back-to-top) ───────── */
function SmartNavHints() {
  const [showCue, setShowCue] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

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

    // cuando el footer entra en viewport, “eleva” el botón
    const footer = document.querySelector("footer");
    let obs: IntersectionObserver | null = null;
    if (footer) {
      obs = new IntersectionObserver(
        (entries) => setNearFooter(entries.some((e) => e.isIntersecting)),
        { rootMargin: "0px 0px 35% 0px", threshold: 0 }
      );
      obs.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (obs && footer) obs.unobserve(footer);
    };
  }, []);

  return (
    <>
      {showCue && (
        <Link
          href="#services"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium bg-[var(--color-surface)] text-[var(--color-text)] ring-1 ring-[var(--color-ring)] shadow-sm"
        >
          <svg className="h-4 w-4 animate-bounce" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Scroll
        </Link>
      )}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className={`fixed z-40 rounded-full px-3.5 py-3
                      bg-gradient-to-r from-[var(--color-brand-violet)] to-[var(--color-brand-gold)]
                      text-white shadow-lg hover:scale-105 active:scale-95 transition
                      ${nearFooter
                        ? "left-1/2 -translate-x-1/2 right-auto bottom-[96px]" // centrado, justo sobre el footer
                        : "right-10 bottom-6"                                     // en la esquina durante el scroll normal
                      }`}
          style={{ paddingInline: "0.9rem" }}
        >
          ↑
        </button>
      )}
    </>
  );
}

/* ───────── HERO ───────── */
export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang as "en" | "nl"];

  const services = t.services.map((label) => ({ label, href: "#services" }));
  const marquee = [...services, ...services]; // duplicado para loop perfecto

  return (
    <section id="home" className="relative min-h-[72vh] md:min-h-[60vh] overflow-hidden">
      {/* keyframes locales para el treadmill */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            animation: marquee 18s linear infinite;
            will-change: transform;
          }
          @media (prefers-reduced-motion: reduce) {
            .marquee-track { animation: none !important; }
          }
        `,
        }}
      />
      <div className="relative z-10 container-afenta pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start md:items-center">
          {/* izquierda */}
          <div className="md:col-span-7 select-none cursor-default">
            <motion.div
              {...fadeInUp(0.05)}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]"
            >
              {t.kicker}
            </motion.div>

            <RainText key={`${lang}-${t.title}`} text={t.title} />

            <motion.p {...fadeInUp(0.25)} className="mt-6 text-base md:text-lg text-[var(--color-muted)] max-w-[44ch]">
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 0.84, 0.44, 1], delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="#contact" className="btn-afenta-solid no-underline">
                {t.primary}
              </Link>
              <Link href="#cases" className="btn-afenta-solid no-underline">
                {t.secondary}
              </Link>
              <Link href="#about" className="btn-afenta-outline no-underline">
                {t.tertiary}
              </Link>
            </motion.div>

            {/* KPIs */}
            <div className="mt-8 grid grid-cols-3 max-w-md gap-4 text-sm">
              <div>
                <div className="font-extrabold text-lg text-[var(--color-text)]">{t.stat1}</div>
                <div className="text-[var(--color-muted)]">{t.stat1Label}</div>
              </div>
              <div>
                <div className="font-extrabold text-lg text-[var(--color-text)]">{t.stat2}</div>
                <div className="text-[var(--color-muted)]">{t.stat2Label}</div>
              </div>
              <div>
                <div className="font-extrabold text-lg text-[var(--color-text)]">{t.stat3}</div>
                <div className="text-[var(--color-muted)]">{t.stat3Label}</div>
              </div>
            </div>

            {/* Treadmill de servicios */}
            <div className="mt-8 text-xs text-[var(--color-muted)]">
              <div className="mb-2 font-semibold uppercase tracking-wide">{t.servicesLabel}</div>
              <div className="relative overflow-hidden">
                <div className="flex gap-3 marquee-track hover:[animation-play-state:paused] min-w-max">
                  {marquee.map((s, i) => (
                    <a
                      key={`${s.label}-${i}`}
                      href={s.href}
                      className="px-4 py-1.5 rounded-full ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] text-[var(--color-foreground)] transition whitespace-nowrap cursor-pointer"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* derecha / mock */}
          <div className="md:col-span-5 relative min-h-[420px]">
            <motion.div
              className="md:sticky md:top-24"
              initial={{ y: 40, opacity: 0, scale: 0.985 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Mock t={t} />
            </motion.div>
          </div>
        </div>
      </div>

      <SmartNavHints />
    </section>
  );
}
