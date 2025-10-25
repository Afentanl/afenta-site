"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";

/* --- Reveal por CONTENEDOR (estables en pantallas grandes) --- */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const { lang } = useLanguage();
  const services = ServicesContent[lang as "en" | "nl"];
  const title = lang === "en" ? "Our Services" : "Diensten";

  return (
    <section id="services" className="section-divider py-20 md:py-28">
      <div className="container-afenta">
        <h2 className="text-center text-2xl md:text-3xl font-extrabold mb-12 text-gradient-afenta">
          {title}
        </h2>

        {/* 👇 el grid entero controla el reveal; los hijos solo tienen variants */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15, margin: "-12% 0px -8% 0px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((s) => (
            <motion.div key={s.title} variants={item}>
              <Link
                href={s.href}
                className="group block focus:outline-none cursor-pointer"
                aria-label={s.title}
              >
                <div
                  className="
                    rounded-2xl p-6 ring-1 ring-[var(--color-ring)]
                    bg-[var(--color-surface-2)]/70 backdrop-blur-sm
                    transition-all
                    hover:scale-[1.03] hover:shadow-xl hover:bg-[var(--color-surface)]/90
                  "
                >
                  <h3 className="font-bold text-lg mb-4 group-hover:text-gradient-afenta">
                    {s.title}
                  </h3>
                  <ul className="space-y-2 text-[var(--color-muted)]">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold link-gradient">
                    <span>{lang === "en" ? "Explore" : "Ontdek"}</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
