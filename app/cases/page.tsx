"use client";
import { useLanguage } from "../components/language-provider";

export default function CasesPage() {
  const { lang } = useLanguage();
  const t = {
    h1: lang === "nl" ? "Cases" : "Cases",
    p: lang === "nl" ? "Selectie werk met meetbare groei." : "Selected work showing measurable growth.",
  };

  return (
    <div className="pt-20 md:pt-24">
      <section className="container-afenta py-10">
        <h1 className="h-display text-3xl md:text-5xl font-black">{t.h1}</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-prose">{t.p}</p>
      </section>

      <section className="container-afenta pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
              <div className="text-sm text-[var(--color-muted)] mb-2">Case {i}</div>
              <div className="font-semibold">Campaign ROI +2.1x</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">Short description…</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
