"use client";
import Contact from "../components/contact";
import { useLanguage } from "../components/language-provider";

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = {
    h1: lang === "nl" ? "Contact" : "Contact",
    p: lang === "nl"
      ? "Vertel ons je doelen — we reageren binnen 1–2 werkdagen."
      : "Tell us your goals — we’ll reply within 1–2 business days.",
  };

  return (
    <div className="pt-20 md:pt-24">
      <section className="container-afenta py-10">
        <h1 className="h-display text-3xl md:text-5xl font-black">{t.h1}</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-prose">{t.p}</p>
      </section>
      <Contact />
    </div>
  );
}
