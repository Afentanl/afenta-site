"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./language-provider";
import { useConsent } from "./consent-provider";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const { consent, setConsent, setAndPersist } = useConsent();
  const [manage, setManage] = useState(false);
  const open = !consent.decided;

  const copy =
    lang === "nl"
      ? {
          title: "Cookies",
          desc: "We gebruiken cookies voor basisfunctionaliteit en om prestaties te meten. Je kunt je voorkeuren beheren.",
          accept: "Alles accepteren",
          manage: "Instellingen beheren",
          save: "Opslaan en doorgaan",
          analytics: "Analytics",
          analyticsSub: "Help ons prestaties te meten (GA4/GTM).",
          marketing: "Marketing/Ads",
          marketingSub: "Advertenties en remarketing (Google Ads, Meta, LinkedIn).",
        }
      : {
          title: "Cookies",
          desc: "We use cookies for basic functionality and to measure performance. You can manage your preferences.",
          accept: "Accept all",
          manage: "Manage settings",
          save: "Save & continue",
          analytics: "Analytics",
          analyticsSub: "Help us measure performance (GA4/GTM).",
          marketing: "Marketing/Ads",
          marketingSub: "Ads & remarketing (Google Ads, Meta, LinkedIn).",
        };

  // Bloquear scroll mientras esté abierto
  useEffect(() => {
    if (!open) return;
    const el = document.documentElement;
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => { el.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] p-5 shadow-soft">
        <div className="h-display text-xl md:text-2xl font-black">{copy.title}</div>
        <p className="mt-2 text-sm text-[var(--color-muted)]">{copy.desc}</p>

        {manage && (
          <div className="mt-4 space-y-3">
            {/* Analytics */}
            <div className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70">
              <input
                id="opt-analytics"
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={!!consent.analytics}
                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
              />
              <label htmlFor="opt-analytics" className="cursor-pointer">
                <div className="font-semibold text-sm">{copy.analytics}</div>
                <div className="text-xs text-[var(--color-muted)]">{copy.analyticsSub}</div>
              </label>
            </div>
            {/* Marketing */}
            <div className="flex items-start gap-3 rounded-xl p-3 ring-1 ring-[var(--color-ring)] bg-[var(--color-surface-2)]/70">
              <input
                id="opt-marketing"
                type="checkbox"
                className="mt-1 h-4 w-4"
                checked={!!consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
              />
              <label htmlFor="opt-marketing" className="cursor-pointer">
                <div className="font-semibold text-sm">{copy.marketing}</div>
                <div className="text-xs text-[var(--color-muted)]">{copy.marketingSub}</div>
              </label>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            className="btn-afenta-solid"
            onClick={() => setAndPersist({ decided: true, analytics: true, marketing: true })}
          >
            {copy.accept}
          </button>

          {!manage ? (
            <button className="btn-afenta-outline" onClick={() => setManage(true)}>
              {copy.manage}
            </button>
          ) : (
            <button
              className="btn-afenta-outline"
              onClick={() => setAndPersist({ ...consent, decided: true })}
            >
              {copy.save}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
