/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Languages } from "lucide-react";
import BrandName from "./brand-name";
import { useLanguage } from "./language-provider";

/* Diccionario EN/NL */
const NAV = {
    en: {
    home: "Home",
    services: "Services",
    cases: "Cases",
    contact: "Contact",
    slogan: "Where vision becomes impact",
    cta: "Start a project",
    },
    nl: {
    home: "Home",
    services: "Diensten",
    cases: "Cases",
    contact: "Contact",
    slogan: "Waar visie impact wordt",
    cta: "Project starten",
    },
} as const;

/* Link helper con underline + gradiente en texto */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
    <a href={href} className="link-underline link-gradient">
        {children}
    </a>
    );
}

export default function Header() {
    const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // evita hydration mismatch
  const { lang, setLang } = useLanguage();       // 👈 idioma global reactivo
    const t = NAV[lang];

    useEffect(() => setMounted(true), []);

    return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo + marca (link a Home) */}
        <Link
            href="/"
            aria-label="Go to Home"
            className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          {/* Logo animado con framer-motion */}
            <motion.div
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.96, rotate: 0 }}
            animate={{
                y: [0, -1.5, 0],
                filter: [
                "drop-shadow(0 6px 18px rgba(124,58,237,.30))",
                "drop-shadow(0 12px 30px rgba(124,58,237,.48))",
                "drop-shadow(0 6px 18px rgba(124,58,237,.30))",
                ],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-xl"
            >
            <img
              src="/logo-afenta.png"  /* asegúrate de tener /public/logo-afenta.png (o cámbialo a .svg) */
                alt="Afenta logo"
                className="h-12 w-12 rounded-xl"
            />
            </motion.div>

            <div className="leading-tight">
            {/* El texto también reacciona un poco al hover del logo */}
            <div className="transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                <BrandName />
            </div>
            <div className="text-xs opacity-70">{t.slogan}</div>
            </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink href="#home">{t.home}</NavLink>
            <NavLink href="#services">{t.services}</NavLink>
            <NavLink href="#cases">{t.cases}</NavLink>
            <NavLink href="#contact">{t.contact}</NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Idioma */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-2 py-1 text-xs">
            <Languages className="h-4 w-4 opacity-70" />
            <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded transition-colors ${
                lang === "en"
                    ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-inner"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
            >
                EN
            </button>
            <button
                onClick={() => setLang("nl")}
                className={`px-2 py-1 rounded transition-colors ${
                lang === "nl"
                    ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-inner"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
            >
                NL
            </button>
            </div>

          {/* Tema (hover claro: fondo oscuro + texto blanco) */}
            <button
            onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800
                        px-3 py-2 text-sm transition-colors
                        bg-transparent text-foreground
                        hover:bg-zinc-900 hover:text-white
                        dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            aria-label="Toggle theme"
            >
            {!mounted ? (
                <div className="h-4 w-4" />
            ) : theme === "dark" ? (
                <Moon className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{!mounted ? "…" : theme === "dark" ? "Dark" : "Light"}</span>
            </button>

          {/* CTA con gradiente loop + sheen + hover dinámico */}
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
                <span className="relative z-10">{t.cta}</span>
                <span
                aria-hidden
                className="pointer-events-none absolute inset-0
                            bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.6),transparent)]
                            bg-[length:200%_100%] animate-[sheen_3s_ease-in-out_infinite]"
                />
            </button>
            </a>
        </div>
        </div>
    </header>
    );
}
