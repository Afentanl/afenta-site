"use client";

import { useRef, useState } from "react";
import { useLanguage } from "./language-provider";
import { ServicesContent } from "../services-content";
import { trackLead, dl } from "../lib/gtag";

const T = {
  en: {
    kicker: "Start a project",
    title: "Start a project with Afenta",
    subtitle:
      "Tell us about your business, budget and timeline. We’ll review everything and come back with a proposal or next steps within 1–2 business days.",
    stepLabel: "Project intake",
    name: "Your name",
    email: "Work email",
    business: "Business / brand name",
    website: "Current website (optional)",
    role: "Your role (optional)",
    servicesQ: "What do you need help with?",
    revenueQ: "Monthly revenue (roughly)",
    budgetQ: "Monthly marketing budget",
    startQ: "When do you want to start?",
    startNow: "ASAP (0–2 weeks)",
    startSoon: "Soon (1–2 months)",
    startLater: "Later (3+ months)",
    goals: "Tell us about the project and your goals",
    goalsPlaceholder:
      "What are you trying to achieve? What’s not working today? Any deadlines or constraints?",
    howHeard: "How did you hear about Afenta? (optional)",
    submit: "Send project details",
    ok: "Thanks — we’ll review your project and get back to you soon.",
    err: "Something went wrong. Please try again.",
  },
  nl: {
    kicker: "Start een project",
    title: "Start een project met Afenta",
    subtitle:
      "Vertel ons over je bedrijf, budget en timing. We bekijken alles en komen binnen 1–2 werkdagen terug met een voorstel of de volgende stappen.",
    stepLabel: "Project intake",
    name: "Je naam",
    email: "Zakelijk e-mailadres",
    business: "Bedrijfs- / merknaam",
    website: "Huidige website (optioneel)",
    role: "Jouw rol (optioneel)",
    servicesQ: "Waar heb je hulp bij nodig?",
    revenueQ: "Maandelijkse omzet (globaal)",
    budgetQ: "Maandelijks marketingbudget",
    startQ: "Wanneer wil je starten?",
    startNow: "Zo snel mogelijk (0–2 weken)",
    startSoon: "Binnen 1–2 maanden",
    startLater: "Later (3+ maanden)",
    goals: "Vertel iets over het project en je doelen",
    goalsPlaceholder:
      "Wat wil je bereiken? Wat werkt nu niet? Zijn er deadlines of beperkingen?",
    howHeard: "Hoe heb je van Afenta gehoord? (optioneel)",
    submit: "Project versturen",
    ok: "Bedankt — we bekijken je project en nemen snel contact op.",
    err: "Er ging iets mis. Probeer het opnieuw.",
  },
} as const;

const revenueOptions = [
  "Pre-revenue / startup",
  "< €10k / month",
  "€10k – €50k / month",
  "€50k – €150k / month",
  "> €150k / month",
];

const budgetOptions = [
  "< €1k / month",
  "€1k – €3k / month",
  "€3k – €10k / month",
  "> €10k / month",
];

export default function StartProject() {
  const { lang } = useLanguage();
  const t = T[lang as "en" | "nl"];

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  const startedAtRef = useRef<number>(Date.now());

  // estilos base reutilizados
  const fieldBase =
    "w-full rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet/70";
  const boxBase =
    "rounded-xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70 backdrop-blur-sm p-3 md:p-4";

  const serviceOptions = ServicesContent[lang as "en" | "nl"].map((s) => s.title);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const selectedServices = fd.getAll("services").map(String);

    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const business = String(fd.get("business") || "");
    const website = String(fd.get("website") || "");
    const role = String(fd.get("role") || "");
    const revenue = String(fd.get("revenue") || "");
    const budget = String(fd.get("budget") || "");
    const startWhen = String(fd.get("startWhen") || "");
    const goals = String(fd.get("goals") || "");
    const howHeard = String(fd.get("howHeard") || "");

    // Componemos un mensaje más rico para el backend
    const composedMessage = [
      `Source: start-project`,
      `Business: ${business || "-"}`,
      `Website: ${website || "-"}`,
      `Role: ${role || "-"}`,
      `Monthly revenue: ${revenue || "-"}`,
      `Monthly marketing budget: ${budget || "-"}`,
      `How did you hear about us: ${howHeard || "-"}`,
      "",
      `Selected services: ${selectedServices.join(", ") || "-"}`,
      "",
      "Project / goals:",
      goals || "-",
    ].join("\n");

    const payload = {
      name,
      email,
      budget,
      services: selectedServices.join(", "),
      startWhen,
      message: composedMessage,
      _elapsed: String(Date.now() - startedAtRef.current),
      // honeypot vacío (el backend lo usa como anti-spam, NO usarlo para la empresa real)
      company: "",
    };

    try {
      setLoading(true);
      setOk(null);
      dl("start_project_submit_attempt");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json?.ok) {
        setOk(true);
        form.reset();
        startedAtRef.current = Date.now();
        trackLead("start-project");
        dl("start_project_submit_success");
      } else {
        setOk(false);
        dl("start_project_submit_error", { msg: json?.error || "unknown" });
      }
    } catch (err) {
      console.error(err);
      setOk(false);
      dl("start_project_submit_error", { msg: String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-16 md:py-24">
      <div className="container-afenta max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex p-[1px] rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,theme(colors.brand-violet),theme(colors.fuchsia),theme(colors.brand-gold),theme(colors.brand-violet))]">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-background/80 backdrop-blur ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
              {t.kicker}
              <span className="inline-block h-1 w-1 rounded-full bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold animate-pulse" />
            </span>
          </div>

          <h1 className="mt-3 text-3xl md:text-5xl font-black tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-brand-violet via-fuchsia to-brand-gold bg-clip-text text-transparent">
              {t.title}
            </span>
          </h1>
          <p className="mt-3 text-[var(--color-muted)] max-w-prose">
            {t.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          {/* honeypot para bots */}
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            className="hidden"
          />

          <div className={boxBase}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)] mb-4">
              {t.stepLabel}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  {t.name}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={fieldBase}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  {t.email}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={fieldBase}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="business">
                  {t.business}
                </label>
                <input
                  id="business"
                  name="business"
                  className={fieldBase}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="website">
                  {t.website}
                </label>
                <input
                  id="website"
                  name="website"
                  className={fieldBase}
                  placeholder="https://"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                {t.role}
              </label>
              <input id="role" name="role" className={fieldBase} />
            </div>
          </div>

          {/* Services */}
          <fieldset className={boxBase}>
            <legend className="block text-sm font-semibold mb-2">
              {t.servicesQ}
            </legend>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((title, i) => {
                const id = `sp-svc-${i}`;
                return (
                  <div key={title} className="relative">
                    <input
                      id={id}
                      type="checkbox"
                      name="services"
                      value={title}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className="
                        group inline-flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer select-none
                        ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] text-[var(--color-foreground)]
                        transition-all hover:bg-[var(--color-surface-2)]
                        peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-brand-violet/70
                        peer-checked:ring-brand-violet/70 peer-checked:shadow-[0_0_0_3px_rgba(124,58,237,.18)]
                      "
                    >
                      <svg
                        className="h-3.5 w-3.5 -ml-1 opacity-0 transition-opacity peer-checked:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-medium">{title}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          {/* Revenue / budget / start */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={boxBase}>
              <label className="block text-sm font-semibold mb-1" htmlFor="revenue">
                {t.revenueQ}
              </label>
              <select id="revenue" name="revenue" className={fieldBase}>
                <option value="">—</option>
                {revenueOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className={boxBase}>
              <label className="block text-sm font-semibold mb-1" htmlFor="budget">
                {t.budgetQ}
              </label>
              <select id="budget" name="budget" className={fieldBase}>
                <option value="">—</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className={boxBase}>
              <label className="block text-sm font-semibold mb-1" htmlFor="startWhen">
                {t.startQ}
              </label>
              <select id="startWhen" name="startWhen" className={fieldBase}>
                <option value="">—</option>
                <option value={t.startNow}>{t.startNow}</option>
                <option value={t.startSoon}>{t.startSoon}</option>
                <option value={t.startLater}>{t.startLater}</option>
              </select>
            </div>
          </div>

          {/* Goals */}
          <div className={boxBase}>
            <label className="block text-sm font-semibold mb-1" htmlFor="goals">
              {t.goals}
            </label>
            <textarea
              id="goals"
              name="goals"
              required
              rows={6}
              className={fieldBase}
              placeholder={t.goalsPlaceholder}
            />
          </div>

          {/* How heard */}
          <div className={boxBase}>
            <label className="block text-sm font-semibold mb-1" htmlFor="howHeard">
              {t.howHeard}
            </label>
            <input id="howHeard" name="howHeard" className={fieldBase} />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button type="submit" disabled={loading} className="btn-afenta-solid">
              {loading ? "…" : t.submit}
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
