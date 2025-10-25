"use client";

import Link from "next/link";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";

type Dict = {
  badge: string;
  whats: string;
  process: string;
  faq: string;
  start: string;
  contactTitle: string;
  contactDesc: string;
  btn: string;
  discover: string;
  d1: string;
  d2: string;
  d3: string;
};

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const { lang } = useLanguage();

  const dict: Dict =
    lang === "nl"
      ? {
          badge: "Dienst",
          whats: "Wat is inbegrepen",
          process: "Proces",
          faq: "FAQ",
          start: "Volgende stap",
          contactTitle: "Project starten",
          contactDesc: "Vertel ons je doelen — we reageren binnen 1–2 werkdagen.",
          btn: "Contact",
          discover: "Discover",
          d1: "Doelen, randvoorwaarden & baseline analytics.",
          d2: "Merk/systeem & snelle web-experience of setup.",
          d3: "Always-on groei: paid + CRO + reporting.",
        }
      : {
          badge: "Service",
          whats: "What’s included",
          process: "Process",
          faq: "FAQ",
          start: "Next step",
          contactTitle: "Start a project",
          contactDesc: "Tell us about your goals — we’ll reply within 1–2 business days.",
          btn: "Contact",
          discover: "Discover",
          d1: "Goals, constraints & baseline analytics.",
          d2: "Brand/system & fast web experience or setup.",
          d3: "Always-on growth: paid + CRO + reporting.",
        };

  const data = ServicesContent[lang];
  const item = data.find((s) => s.href.endsWith("/" + slug));

  // Fallback a EN si NL no encuentra (los href deberían ser iguales)
  const title = item?.title ?? ServicesContent.en.find((s) => s.href.endsWith("/" + slug))?.title ?? "";
  const items = item?.items ?? ServicesContent.en.find((s) => s.href.endsWith("/" + slug))?.items ?? [];

  if (!title) return null;

  return <StaticDetail enTitle={title} dict={dict} items={items} />;
}

function StaticDetail({
  enTitle,
  dict,
  items,
}: {
  enTitle: string;
  dict: Dict;
  items: string[];
}) {
  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="container-afenta py-10">
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
          {dict.badge}
        </div>
        <h1 className="mt-3 h-display text-3xl md:text-5xl font-black">{enTitle}</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-prose">
          {dict.discover}: {dict.d1}
        </p>
      </section>

      <section className="container-afenta pb-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main */}
        <div className="lg:col-span-8 space-y-8">
          {/* Features */}
          <div className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <h2 className="font-bold text-lg mb-4">{dict.whats}</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-[var(--color-muted)]">
              {items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Process */}
          <div className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <h2 className="font-bold text-lg mb-4">{dict.process}</h2>
            <ol className="relative pl-7 space-y-4">
              <span aria-hidden className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-[var(--color-ring)]" />
              {[{ t: "Discover", d: dict.d1 }, { t: "Design & build", d: dict.d2 }, { t: "Launch & scale", d: dict.d3 }].map((s, i) => (
                <li key={i} className="relative pl-5">
                  <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                  <div className="font-semibold">{s.t}</div>
                  <div className="text-sm text-[var(--color-muted)]">{s.d}</div>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]">
            <h2 className="font-bold text-lg mb-4">{dict.faq}</h2>
            <div className="space-y-4 text-sm">
              <details className="rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <summary className="font-semibold cursor-pointer">{dict.discover}?</summary>
                <p className="mt-2 text-[var(--color-muted)]">{dict.d1}</p>
              </details>
              <details className="rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]">
                <summary className="font-semibold cursor-pointer">ROI?</summary>
                <p className="mt-2 text-[var(--color-muted)]">GA4/dashboards, weekly deltas & funnels per channel.</p>
              </details>
            </div>
          </div>
        </div>

        {/* Aside */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="rounded-2xl p-5 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm">
              <div className="text-sm text-[var(--color-muted)]">{dict.start}</div>
              <div className="text-xl font-extrabold mt-1">{dict.contactTitle}</div>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{dict.contactDesc}</p>
              <div className="mt-3">
                <Link href="/contact" className="btn-afenta-solid">
                  {dict.btn}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "↑ 3–5x", l: "Conversion" },
                { k: "< 1.2s", l: "CWV" },
                { k: "98/100", l: "Lighthouse" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] text-center">
                  <div className="text-lg font-extrabold">{k.k}</div>
                  <div className="text-[10px] text-[var(--color-muted)]">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
