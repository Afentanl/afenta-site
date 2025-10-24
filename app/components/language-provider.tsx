//components language-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "nl";
type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");

  // lee idioma guardado
    useEffect(() => {
    const saved = localStorage.getItem("afenta_lang");
    if (saved === "en" || saved === "nl") setLang(saved);
    }, []);

  // guarda y emite evento para otros componentes
    useEffect(() => {
    localStorage.setItem("afenta_lang", lang);
    window.dispatchEvent(new CustomEvent("afenta:langchange", { detail: lang }));
    }, [lang]);

    return (
    <LanguageContext.Provider value={{ lang, setLang }}>
        {children}
    </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within <LanguageProvider>");
    return ctx;
}
