"use client";

import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";

export default function Services() {
  const { lang } = useLanguage();
  const services = ServicesContent[lang as "en" | "nl"];

  return (
    <section id="services" className="section-divider py-20">
      <div className="container-afenta">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-gradient-afenta">
          {lang === "en" ? "Our Services" : "Diensten"}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)] hover:bg-[var(--color-surface)] transition group"
            >
              <h3 className="font-bold text-lg mb-4 group-hover:text-gradient-afenta">
                {s.title}
              </h3>
              <ul className="space-y-2 text-[var(--color-muted)]">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-[var(--color-brand-violet)] font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
