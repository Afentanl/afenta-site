"use client";

import Link from "next/link";

export default function Cases() {
  const items = [
    {
      title: "Afenta Ads ROI",
      kpi: "+212% leads, CPA −43%",
      desc:
        "Always-on performance con paid + CRO. Landing rápida (Core Web Vitals < 1.2s) y dashboards claros.",
    },
    {
      title: "E-commerce speed revamp",
      kpi: "LCP 1.1s · CR +18%",
      desc:
        "Refactor de frontend + optimización de assets y caching. Incremento medible en conversión.",
    },
    {
      title: "Brand system & site",
      kpi: "98/100 Lighthouse",
      desc:
        "Sistema de marca escalable y web accesible con rendimiento top, preparado para growth.",
    },
  ];

  return (
    <section id="cases" className="section-divider py-20 md:py-28">
      <div className="container-afenta">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-12 text-gradient-afenta">
          Cases
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm"
            >
              <h3 className="font-bold text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{c.kpi}</p>
              <p className="mt-3 text-[var(--color-muted)]">{c.desc}</p>
              <div className="mt-5">
                <Link href="#contact" className="btn-afenta-outline">Work with us</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
