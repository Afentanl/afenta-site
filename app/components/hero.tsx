"use client";

import { useLanguage } from "./language-provider";
import BackgroundFX from "./background-fx";

const TEXT = {
    en: {
    title: "We turn vision into measurable growth",
    subtitle:
        "Brand + Websites + Performance. We merge design and engineering to build systems that convert.",
    primary: "Start a project",
    secondary: "View cases",
    },
    nl: {
    title: "Wij zetten visie om in meetbare groei",
    subtitle:
        "Brand + Websites + Performance. Design en engineering samengebracht voor systemen die converteren.",
    primary: "Project starten",
    secondary: "Bekijk cases",
    },
} as const;

export default function Hero() {
    const { lang } = useLanguage();
    const t = TEXT[lang];

    return (
    <section id="home" className="relative w-full min-h-[82vh] md:min-h-[88vh] overflow-hidden bg-white dark:bg-black">
        {/* Fondo FX */}
        <BackgroundFX />

        {/* Contenido */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
            <h1 className="h-display text-4xl md:text-6xl font-black leading-tight
                            bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                            bg-clip-text text-transparent drop-shadow-[0_6px_26px_rgba(124,58,237,.25)]">
            {t.title}
            </h1>

            <p className="mt-5 text-base md:text-lg text-zinc-800/80 dark:text-zinc-200/90 max-w-2xl">
            {t.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact">
                <button
                className="relative overflow-hidden rounded-xl px-6 py-3 font-extrabold
                            text-white dark:text-black
                            bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold
                            bg-[length:300%_300%] animate-[ctaGradient_6s_linear_infinite]
                            shadow-[0_10px_28px_rgba(124,58,237,.35)]
                            transition-all duration-300 ease-out
                            hover:scale-105 hover:shadow-[0_16px_40px_rgba(124,58,237,.55)]
                            active:scale-95"
                >
                <span className="relative z-10">{t.primary}</span>
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0
                                bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.6),transparent)]
                                bg-[length:200%_100%] animate-[sheen_3s_ease-in-out_infinite]"
                />
                </button>
            </a>

            <a href="#cases">
                <button className="relative rounded-xl px-[1px] py-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-95">
                <span className="absolute inset-0 rounded-xl bg-[linear-gradient(90deg,var(--color-brand-violet),var(--color-fuchsia),var(--color-brand-gold))]" />
                <span className="relative block rounded-[11px] px-5 py-2.5 bg-white/70 dark:bg-black/70 backdrop-blur text-black/90 dark:text-white/90">
                    {t.secondary}
                </span>
                </button>
            </a>
            </div>
        </div>
        </div>

      {/* Fade inferior: SOLO dark */}
      <div className="hidden dark:block pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

    </section>
  );
}
