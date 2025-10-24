"use client";
import { useState } from "react";
import { useLanguage } from "./language-provider";

const T = {
    en: { chat: "Chat", close: "Close" },
    nl: { chat: "Chat", close: "Sluiten" },
} as const;

export default function ChatWidget() {
    const { lang } = useLanguage();
    const t = T[lang as "en" | "nl"];
    const [open, setOpen] = useState(false);

    return (
    <>
        <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="fixed bottom-6 right-6 z-[90] rounded-full h-12 w-12
                    bg-[var(--color-foreground)] text-[var(--color-surface)]
                    hadow-lg hover:scale-105 active:scale-95 transition"
      >
        💬
        </button>

        {open && (
        <div
            className="fixed bottom-24 right-6 z-[90] w-[320px] max-w-[90vw] rounded-2xl
                        ring-1 ring-[var(--color-ring)] bg-[var(--color-surface)] shadow-soft p-3"
        >
            <div className="font-semibold mb-2">{t.chat}</div>
            <div className="text-sm text-[var(--color-muted)] mb-3">
            Plug de tu proveedor (Intercom, Crisp, Tidio…)
            </div>
            <button onClick={() => setOpen(false)} className="btn-afenta-outline w-full">
            {t.close}
            </button>
        </div>
        )}
    </>
    );
}
