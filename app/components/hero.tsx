 
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import BackgroundFX from "./background-fx";

/* ──────────────────────────────────────────────────────────
    CONTENEDOR REUSABLE (pégalo igual en header/servicios)
   ────────────────────────────────────────────────────────── */
import { CONTAINER } from "./layout";
<div className={`relative z-10 ${CONTAINER} pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24`}>
  {/* ...tu grid y todo lo demás sin tocar */}
</div>
;

/* ──────────────────────────────────────────────────────────
    TEXTOS (igual que tenías)
   ────────────────────────────────────────────────────────── */
const T = {
  en: {
    kicker: "Afenta — Brand · Websites · Performance",
    title: "We turn vision into measurable growth",
    subtitle:
      "We blend design and engineering to build fast, beautiful experiences that convert — then we scale the performance.",
    primary: "Start a project",
    secondary: "View cases",
    trust: "Trusted by teams in",
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
    trust: "Vertrouwd door teams in",
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

/* ──────────────────────────────────────────────────────────
   CTA (igual al del header)
   ────────────────────────────────────────────────────────── */
function BtnSolid({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="relative overflow-hidden rounded-xl px-6 py-3 font-extrabold
                 text-white dark:text-black
                 bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                 bg-[length:300%_300%] animate-[ctaGradient_6s_linear_infinite]
                 shadow-[0_10px_28px_rgba(124,58,237,.35)]
                 transition-all duration-300 ease-out
                 hover:scale-105 hover:shadow-[0_16px_40px_rgba(124,58,237,.55)]
                 active:scale-95 cursor-pointer"
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0
                   bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.6),transparent)]
                   bg-[length:200%_100%] animate-[sheen_3s_ease-in-out_infinite]"
      />
    </button>
  );
}

/* ──────────────────────────────────────────────────────────
   HOOK: Count-up para KPIs
   ────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────
  CHART HELPERS (SVG) — igual que tenías
   ────────────────────────────────────────────────────────── */
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

/* ──────────────────────────────────────────────────────────
   MOCK con tabs + autorotate + animaciones (tal cual)
   ────────────────────────────────────────────────────────── */
type Tab = "all" | "ads" | "web";
const DATA: Record<
  Tab,
  {
    leads: number;
    cpa: number;
    cr: number;
    conv: number;
    bars: number[];
    brand: number[];
    trend: number[];
  }
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

function Mock({ t }: { t: (typeof T)["en"] | (typeof T)["nl"] }) {
  const order: Tab[] = useMemo(() => ["all", "ads", "web"], []);
  const [tab, setTab] = useState<Tab>("all");
  const [pausedUntil, setPausedUntil] = useState<number>(0);
  const timer = useRef<number | null>(null);

  // autorotate
  useEffect(() => {
    const tick = () => {
      if (Date.now() < pausedUntil) return;
      setTab((prev) => {
        const i = order.indexOf(prev);
        return order[(i + 1) % order.length];
      });
    };
    timer.current = window.setInterval(tick, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [order, pausedUntil]);

  const pause = (ms: number) => setPausedUntil(Date.now() + ms);

  const ds = DATA[tab];

  // valores animados por KPI
  const leadsAnim = useCountUp(ds.leads, 700, [tab, ds.leads]);
  const cpaAnim = useCountUp(Math.abs(ds.cpa), 700, [tab, ds.cpa]);
  const crAnim = useCountUp(ds.cr, 700, [tab, ds.cr]);

  return (
    <div
      className="relative rounded-2xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] overflow-hidden"
      onMouseEnter={() => pause(10_000)}
    >
      {/* “cromado” exterior del mock */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.18]
                   bg-[radial-gradient(90%_140%_at_0%_0%,rgba(124,58,237,.35),transparent_60%),radial-gradient(90%_140%_at_100%_100%,rgba(250,204,21,.28),transparent_60%)]"
      />

      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--color-ring)] relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_120%_at_0%_0%,rgba(124,58,237,.12),transparent),radial-gradient(60%_120%_at_100%_50%,rgba(250,204,21,.12),transparent)]" />
        <div className="relative z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-afenta.png"
              alt="Afenta"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full hidden sm:block"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[var(--color-brand-violet)] via-[var(--color-fuchsia)] to-[var(--color-brand-gold)] sm:hidden" />
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
        {/* KPIs (count-up + fade) */}
        <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-3 animate-fade" key={`kpi-${tab}`}>
          {[
            { l: t.kpiLeads, v: `+${leadsAnim}`, key: "leads" },
            { l: t.kpiCPA, v: `-${cpaAnim}%`, key: "cpa" },
            { l: t.kpiCR, v: `+${crAnim}%`, key: "cr" },
          ].map((k) => (
            <div
              key={k.key}
              className="min-w-[116px] h-[74px] rounded-xl p-3 ring-1 ring-[var(--color-ring)]
                         bg-[color:var(--color-surface-2)] text-[var(--color-text)]
                         flex flex-col justify-between"
              onMouseEnter={() => pause(4000)}
            >
              <div className="text-[11px] text-[var(--color-muted)] leading-tight">{k.l}</div>
              <div className="text-[20px] font-extrabold leading-none">{k.v}</div>
            </div>
          ))}
        </div>

        {/* Trend alto + centrado */}
        <div
          className="col-span-12 md:col-span-7 rounded-xl ring-1 ring-[var(--color-ring)]
                     bg-[var(--color-surface-2)] p-4 md:p-5 animate-fade
                     flex flex-col items-center justify-center h-[140px]"
          key={`trend-${tab}`}
        >
          <div className="w-full max-w-[95%]">
            <TinyLine points={ds.trend} height={96} />
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1 text-center">{t.trend}</div>
        </div>

        {/* Cards inferiores */}
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

/* ──────────────────────────────────────────────────────────
   UI HINTS (igual)
   ────────────────────────────────────────────────────────── */
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
          className="fixed bottom-6 right-6 z-40 rounded-full px-3.5 py-3 bg-[var(--color-text)] text-[var(--color-surface)] shadow-lg hover:scale-105 active:scale-95 transition"
        >
          ↑
        </button>
      )}
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   HERO (ajustes mobile + 4K)
   ────────────────────────────────────────────────────────── */
export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang as "en" | "nl"];

  return (
    <section
      id="home"
      className="
        relative isolate overflow-hidden
        min-h-[92svh] md:min-h-[88svh]
      "
    >
      {/* Fondo global */}
      <BackgroundFX />

      {/* contenedor FLUIDO y reusabe */}
      <div className={`relative z-10 ${CONTAINER} pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24`}>
        <div className="grid items-start grid-cols-1 lg:grid-cols-12 gap-y-12 sm:gap-y-14 lg:gap-x-10 xl:gap-x-14">
          {/* MOCK primero en móvil para que se vea arriba; luego texto en desktop */}
          <div className="lg:col-span-5 order-first lg:order-none">
            <div className="mx-auto w-[min(94%,28rem)] sm:w-[min(88%,32rem)] lg:w-full lg:max-w-[32rem] xl:max-w-[36rem]">
              <Mock t={t} />
            </div>
          </div>

          {/* Izquierda (copy) */}
          <div className="lg:col-span-7 [cursor:default]">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
              {t.kicker}
            </div>

            {/* Tipografía fluida (clamp) → se ve bien en móvil y 4K */}
            <h1 className="mt-4 h-display font-extrabold tracking-tight text-[clamp(2rem,6vw,3.75rem)] leading-[1.12] md:leading-[1.18] pb-2 bg-gradient-to-r from-[var(--color-brand-violet)] via-[var(--color-fuchsia)] to-[var(--color-brand-gold)] bg-clip-text text-transparent drop-shadow-[0_8px_28px_rgba(124,58,237,.22)]">
              {t.title}
            </h1>

            <p className="mt-5 text-[clamp(.95rem,1.2vw,1.125rem)] text-[var(--color-muted)] max-w-prose">
              {t.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#contact">
                <BtnSolid>{t.primary}</BtnSolid>
              </Link>
              <Link href="#cases">
                <BtnSolid>{t.secondary}</BtnSolid>
              </Link>
            </div>

            {/* Métricas */}
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

            {/* Logos */}
            <div className="mt-8 flex items-center gap-4 text-xs text-[var(--color-muted)]">
              <span className="shrink-0">{t.trust}</span>
              <div className="flex items-center gap-4 opacity-80">
                <Image src="/brands/brand-1.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-2.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-3.svg" alt="" width={60} height={20} className="h-5 w-auto" />
                <Image src="/brands/brand-4.svg" alt="" width={60} height={20} className="h-5 w-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* Separador hacia Servicios */}
        <div className="mt-12 md:mt-16">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-ring)] to-transparent" />
          <div
            className="mx-auto mt-4 h-10 w-10/12 rounded-[24px]
                        bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,.12),transparent_60%)]
                        dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,58,237,.18),transparent_60%)]"
          />
        </div>
      </div>

      <SmartNavHints />
    </section>
  );
}
