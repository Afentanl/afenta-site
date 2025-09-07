/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import BrandName from "./brand-name";
import { useLanguage } from "./language-provider";

const NAV = {
  en: { home: "Home", services: "Services", cases: "Cases", contact: "Contact", slogan: "Where vision becomes impact", cta: "Start a project" },
  nl: { home: "Home", services: "Diensten", cases: "Cases", contact: "Contact", slogan: "Waar visie impact wordt", cta: "Project starten" },
} as const;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} className="link-underline link-gradient">{children}</a>;
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = NAV[lang];

  /* scroll-reactive brand scale */
  const lastY = useRef(0);
  const [dir, setDir] = useState<"up" | "down">("up");
  const [y, setY] = useState(0);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY || 0;
      setDir(cur > lastY.current ? "down" : "up");
      lastY.current = cur;
      setY(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 1.08 al top subiendo, 0.94 al bajar
  const target = useMemo(() => {
    const yClamp = Math.min(y, 140);
    if (dir === "down") return 1 - Math.min(0.06, (yClamp / 140) * 0.06);
    return 1 + (1 - yClamp / 140) * 0.08;
  }, [dir, y]);
  const brandScale = useSpring(target, { stiffness: 260, damping: 28, mass: 0.6 });

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-background/80 shadow-[0_1px_0_0_rgba(0,0,0,.04)] dark:shadow-[0_1px_0_0_rgba(255,255,255,.06)]">
      <div className="container-afenta header-h flex items-center justify-between gap-4">
        {/* logo + marca */}
        <Link
          href="/"
          aria-label="Go to Home"
          className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
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
            <img src="/logo-afenta.png" alt="Afenta logo" className="h-12 w-12 rounded-xl" />
          </motion.div>

          <motion.div style={{ scale: brandScale }} className="leading-tight origin-left">
            <div className="transition-transform duration-200 ease-out group-hover:scale-[1.02]">
              <BrandName />
            </div>
            <div className="text-xs opacity-70">{t.slogan}</div>
          </motion.div>
        </Link>

        {/* nav desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink href="#home">{t.home}</NavLink>
          <NavLink href="#services">{t.services}</NavLink>
          <NavLink href="#cases">{t.cases}</NavLink>
          <NavLink href="#contact">{t.contact}</NavLink>
        </nav>

        {/* acciones desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {/* idioma */}
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-2 py-1 text-xs">
            <Languages className="h-4 w-4 opacity-70" />
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 rounded transition-colors ${lang === "en" ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-inner" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("nl")}
              className={`px-2 py-1 rounded transition-colors ${lang === "nl" ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 shadow-inner" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}
            >
              NL
            </button>
          </div>

          {/* tema */}
          <button
            onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm transition-colors bg-transparent text-foreground hover:bg-zinc-900 hover:text-white dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
            aria-label="Toggle theme"
          >
            {!mounted ? <div className="h-4 w-4" /> : theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <span className="hidden sm:inline">{!mounted ? "…" : theme === "dark" ? "Dark" : "Light"}</span>
          </button>

          {/* CTA consistente */}
          <a href="#contact" className="btn-afenta-solid no-underline">{t.cta}</a>
        </div>

        {/* botón móvil */}
        <button
          className="md:hidden inline-flex items-center gap-2 rounded-lg px-3 py-2 ring-1 ring-[var(--color-ring)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      {/* drawer móvil */}
      {open && (
        <div className="md:hidden">
          <div className="backdrop-afenta" onClick={() => setOpen(false)} />
          <div id="mobile-nav" className="container-afenta py-3 relative z-10 border-t border-[var(--color-ring)] bg-background">
            <div className="flex flex-col gap-2 text-sm">
              <a href="#home" onClick={() => setOpen(false)} className="py-2 link-gradient">{t.home}</a>
              <a href="#services" onClick={() => setOpen(false)} className="py-2 link-gradient">{t.services}</a>
              <a href="#cases" onClick={() => setOpen(false)} className="py-2 link-gradient">{t.cases}</a>
              <a href="#contact" onClick={() => setOpen(false)} className="py-2 link-gradient">{t.contact}</a>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl border border-zinc-200 dark:border-zinc-800 px-2 py-1 text-xs">
                  <Languages className="h-4 w-4 opacity-70" />
                  <button onClick={() => setLang("en")} className={`px-2 py-1 rounded ${lang === "en" ? "bg-zinc-200 dark:bg-zinc-800" : ""}`}>EN</button>
                  <button onClick={() => setLang("nl")} className={`px-2 py-1 rounded ${lang === "nl" ? "bg-zinc-200 dark:bg-zinc-800" : ""}`}>NL</button>
                </div>

                <button
                  onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm"
                >
                  {!mounted ? <div className="h-4 w-4" /> : theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span>{!mounted ? "…" : theme === "dark" ? "Dark" : "Light"}</span>
                </button>
              </div>

              <a href="#contact" className="mt-3 btn-afenta-solid text-center no-underline" onClick={() => setOpen(false)}>
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
