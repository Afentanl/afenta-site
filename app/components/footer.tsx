/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { X, Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { useState, FormEvent } from "react";

const T = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      cases: "Cases",
      about: "About us",
      contact: "Contact",
    },
    tagline: "We turn vision into measurable growth.",
    rights: "All rights reserved.",
    newsletter: {
      title: "Newsletter",
      desc: "No spam. Just smart growth tips.",
      ok: "Subscribed!",
    },
  },
  nl: {
    nav: {
      home: "Home",
      services: "Diensten",
      cases: "Cases",
      about: "Over ons",
      contact: "Contact",
    },
    tagline: "Wij zetten visie om in meetbare groei.",
    rights: "Alle rechten voorbehouden.",
    newsletter: {
      title: "Nieuwsbrief",
      desc: "Geen spam. Alleen slimme groei-tips.",
      ok: "Ingeschreven!",
    },
  },
} as const;

export default function Footer() {
  const { lang } = useLanguage();
  const t = T[lang as "en" | "nl"];

  // solo idle / ok, sin error drama
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "ok">(
    "idle"
  );
  const [loading, setLoading] = useState(false);

  async function handleNewsletter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // guarda la referencia al form ANTES del await
    const form = e.currentTarget;

    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim();
    if (!email) return;

    setLoading(true);
    setNewsletterStatus("ok"); // al user siempre le mostramos éxito

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      // si peta, lo verás en consola/Resend
    } catch (err) {
      console.error("Newsletter fetch error:", err);
    } finally {
      setLoading(false);
      form.reset(); // usamos la ref guardada, no e.currentTarget
    }
  }

  return (
    <footer className="mt-20 md:mt-28 border-t border-[var(--color-ring)]/70 bg-[var(--color-surface)]/70 backdrop-blur">
      <div className="container-afenta py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Columna izquierda: brand + datos empresa + redes */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/logo-afenta.png"
                alt="Afenta"
                className="h-10 w-10 rounded-xl"
              />
              <div className="text-xl font-extrabold">Afenta</div>
            </div>
            <p className="mt-3 text-sm text-[var(--color-muted)] max-w-prose">
              {t.tagline}
            </p>

            {/* 🔹 Datos empresa */}
            <div className="mt-4 text-xs text-[var(--color-muted)] space-y-1">
              <p>Based in Eindhoven, NL</p>
              <p>
                KVK: <span className="font-mono">98056042</span>
              </p>
              <p>BTW: NL005306281B39</p>
              <p>
                Phone:{" "}
                <a href="tel:+31615099812" className="link-underline">
                  +31 6 1509 9812
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:info@afenta.com" className="link-underline">
                  info@afenta.com
                </a>
              </p>
            </div>

            {/* Redes + nuevo icono WhatsApp */}
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/afenta.official/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg p-2 ring-1 ring-[var(--color-ring)] hover:translate-y-[-1px] transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/afenta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-lg p-2 ring-1 ring-[var(--color-ring)] hover:translate-y-[-1px] transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Afentanl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg p-2 ring-1 ring-[var(--color-ring)] hover:translate-y-[-1px] transition"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/Afenta_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="rounded-lg p-2 ring-1 ring-[var(--color-ring)] hover:translate-y-[-1px] transition"
              >
                <X className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/31615099812"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-lg p-2 ring-1 ring-[var(--color-ring)] hover:translate-y-[-1px] transition"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav className="md:col-span-4 grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <Link href="/" className="link-underline link-gradient">
                {t.nav.home}
              </Link>
              <div>
                <Link href="/services" className="link-underline link-gradient">
                  {t.nav.services}
                </Link>
              </div>
              <div>
                <Link href="/cases" className="link-underline link-gradient">
                  {t.nav.cases}
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <Link href="/about" className="link-underline link-gradient">
                  {t.nav.about}
                </Link>
              </div>
              <div>
                <Link href="/contact" className="link-underline link-gradient">
                  {t.nav.contact}
                </Link>
              </div>
              <div>
                <a
                  href="/site.webmanifest"
                  className="link-underline link-gradient"
                >
                  PWA
                </a>
              </div>
            </div>
          </nav>

          {/* Newsletter */}
          <div className="md:col-span-3 text-sm min-w-0 w-full overflow-hidden">
            <div className="rounded-2xl p-4 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] w-full">
              <div className="font-semibold mb-1">{t.newsletter.title}</div>
              <p className="text-[var(--color-muted)] mb-3">
                {t.newsletter.desc}
              </p>

              <form onSubmit={handleNewsletter} className="w-full">
                <div className="flex items-center gap-2 w-full">
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className="flex-1 min-w-0 rounded-lg px-3 py-2 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]"
                  />
                  <button
                    type="submit"
                    className="btn-afenta-solid shrink-0 px-4 py-2"
                    disabled={loading}
                  >
                    {loading ? "…" : "OK"}
                  </button>
                </div>

                {/* Status message */}
                <div className="mt-2 h-4 text-xs">
                  {newsletterStatus === "ok" && (
                    <span className="text-green-500">{t.newsletter.ok}</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-muted)]">
          <div>
            © {new Date().getFullYear()} Afenta. {t.rights}
          </div>
          <div className="flex items-center gap-3">
            <Link className="link-underline" href="/privacy">
              Privacy
            </Link>
            <Link className="link-underline" href="/terms">
              Terms
            </Link>
            <Link className="link-underline" href="/cookies">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
