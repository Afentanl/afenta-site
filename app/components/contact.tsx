"use client";

import { useState } from "react";
import { trackLead, dl } from "../lib/gtag"; // si tu ruta real es ../../lib/gtag ajusta aquí
import { useLanguage } from "./language-provider";

const T = {
    en: {
    title: "Let's talk",
    subtitle: "Tell us about your goals — we’ll reply within 1–2 business days.",
    name: "Name", email: "Email", budget: "Budget (optional)", message: "Message",
    send: "Send", ok: "Thanks! We’ll get back to you.", err: "Something went wrong. Please try again."
    },
    nl: {
    title: "Laten we praten",
    subtitle: "Vertel ons je doelen — we reageren binnen 1–2 werkdagen.",
    name: "Naam", email: "E-mail", budget: "Budget (optioneel)", message: "Bericht",
    send: "Verzenden", ok: "Bedankt! We nemen snel contact op.", err: "Er ging iets mis. Probeer het opnieuw."
    }
} as const;

export default function Contact() {
    const { lang } = useLanguage();
    const t = T[lang as "en" | "nl"];

    const [loading, setLoading] = useState(false);
    const [ok, setOk] = useState<null | boolean>(null);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
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

    return (
    <section id="contact" className="relative section-divider py-16 md:py-24">
        <div className="container-afenta">
        <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-[var(--color-surface-2)] ring-1 ring-[var(--color-ring)] text-[var(--color-muted)]">
            {t.title}
            </div>
            <h2 className="mt-3 h-display text-3xl md:text-5xl font-black">{t.title}</h2>
            <p className="mt-3 text-[var(--color-muted)]">{t.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <input required name="name" placeholder={t.name} className="rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]" />
            <input required type="email" name="email" placeholder={t.email} className="rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]" />
            <input name="budget" placeholder={t.budget} className="md:col-span-2 rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]" />
            <textarea required name="message" placeholder={t.message} rows={6} className="md:col-span-2 rounded-xl px-4 py-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)]" />
            <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="btn-afenta-solid">{loading ? "…" : t.send}</button>
            {ok === true && <span className="text-sm text-green-600 dark:text-green-400">{t.ok}</span>}
            {ok === false && <span className="text-sm text-rose-600 dark:text-rose-400">{t.err}</span>}
            </div>
        </form>
        </div>
    </section>
    );
}
