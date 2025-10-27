// app/components/contact.tsx
"use client";

import { useMemo, useState } from "react";
import { trackLead, dl } from "../lib/gtag";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";

const T = {
  en: {
    kicker: "Let’s talk",
    title: "Let’s talk",
    subtitle: "Tell us about your goals — we’ll reply within 1–2 business days.",
    name: "Name",
    email: "Email",
    budget: "Budget (optional)",
    message: "Message",
    servicesQ: "Which services are you interested in?",
    startQ: "When do you want to start?",
    startNow: "ASAP (0–2 weeks)",
    startSoon: "Soon (1–2 months)",
    startLater: "Later (3+ months)",
    send: "Send",
    ok: "Thanks! We’ll get back to you.",
    err: "Something went wrong. Please try again.",
  },
  nl: {
    kicker: "Laten we praten",
    title: "Laten we praten",
    subtitle: "Vertel ons je doelen — we reageren binnen 1–2 werkdagen.",
    name: "Naam",
    email: "E-mail",
    budget: "Budget (optioneel)",
    message: "Bericht",
    servicesQ: "Voor welke diensten heb je interesse?",
    startQ: "Wanneer wil je starten?",
    startNow: "Zo snel mogelijk (0–2 weken)",
    startSoon: "Binnen 1–2 maanden",
    startLater: "Later (3+ maanden)",
    send: "Verzenden",
    ok: "Bedankt! We nemen snel contact op.",
    err: "Er ging iets mis. Probeer het opnieuw.",
  },
} as const;

export default function Contact() {
  const { lang } = useLanguage();
  const t = T[lang as "en" | "nl"];

  // Servicios (multi-select) desde tu contenido
  const serviceOptions = useMemo(
    () => ServicesContent[lang as "en" | "nl"].map((s) => s.title),
    [lang]
  );

  const [startWhen, setStartWhen] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    // 1) recolectar servicios (multi)
    const selectedServices = fd.getAll("services").map(String);
    fd.delete("services");

    // 2) convertir FormData → Record<string, string> (sin any)
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
      // si algún día añades Files, aquí podrías decidir cómo serializarlos
    });

    // 3) añadimos los campos calculados
    payload.services = selectedServices.join(", ");
    if (startWhen) payload.startWhen = startWhen;

    try {
      setLoading(true);
      dl("contact_submit_attempt");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json?.ok) {
        setOk(true);
        (e.target as HTMLFormElement).reset();
        setStartWhen("");
        trackLead("form");
        dl("contact_submit_success");
      } else {
        setOk(false);
        dl("contact_submit_error", { msg: json?.error || "unknown" });
      }
    } catch (err) {
      setOk(false);
      dl("contact_submit_error", { msg: String(err) });
    } finally {
      setLoading(false);
    }
  }

  // estilos base
  const fieldBase =
    "w-full rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/70";
  const boxBase =
    "rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm p-3 md:p-4";

  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="container-afenta">
        {/* Header con badge y puntico animado (igual que Services/About) */}
        <div className="mb-8 text-left">
          <div className="inline-flex p-[1px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-background/80 backdrop-blur ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
              {t.kicker}
              <span className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold animate-pulse" />
            </span>
          </div>

          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
          <div className="mt-3 text-[var(--color-muted)] max-w-prose">
            {t.subtitle}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 max-w-3xl">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                {t.name}
              </label>
              <input id="name" required name="name" className={fieldBase} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                {t.email}
              </label>
              <input id="email" required type="email" name="email" className={fieldBase} />
            </div>
          </div>

          {/* Budget */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium mb-1">
              {t.budget}
            </label>
            <input id="budget" name="budget" className={fieldBase} />
          </div>

          {/* SERVICES — chips multi-select con colores de marca */}
          <div className={boxBase}>
            <span className="block text-sm font-semibold mb-2">{t.servicesQ}</span>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((title, i) => {
                const id = `svc-${i}`;
                return (
                  <div key={title} className="relative">
                    <input id={id} type="checkbox" name="services" value={title} className="peer sr-only" />
                    <label
                      htmlFor={id}
                      className="
                        inline-flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer select-none
                        ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] text-[var(--color-foreground)]
                        transition-colors
                        hover:bg-[var(--color-surface-2)]
                        peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet/70
                        peer-checked:ring-brand-violet/70 peer-checked:text-brand-gold
                      "
                    >
                      {title}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* START — selector con borde de marca al elegir */}
          <div className={boxBase}>
            <label htmlFor="startWhen" className="block text-sm font-semibold mb-2">
              {t.startQ}
            </label>
            <select
              id="startWhen"
              value={startWhen}
              onChange={(e) => setStartWhen(e.target.value)}
              name="startWhen"
              className={`${fieldBase} ${startWhen ? "ring-brand-violet/70" : ""}`}
            >
              <option value="">{/* placeholder vacío */}—</option>
              <option value={t.startNow}>{t.startNow}</option>
              <option value={t.startSoon}>{t.startSoon}</option>
              <option value={t.startLater}>{t.startLater}</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              {t.message}
            </label>
            <textarea id="message" required name="message" rows={6} className={fieldBase} />
          </div>

          {/* Submit + feedback */}
          <div className="flex items-center gap-3">
            <button disabled={loading} className="btn-afenta-solid">
              {loading ? "…" : t.send}
            </button>
            <span
              aria-live="polite"
              className={`text-sm ${
                ok === true
                  ? "text-green-600 dark:text-green-400"
                  : ok === false
                  ? "text-rose-600 dark:text-rose-400"
                  : ""
              }`}
            >
              {ok === true ? t.ok : ok === false ? t.err : ""}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
