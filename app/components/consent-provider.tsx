"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Consent = { decided: boolean; analytics: boolean; marketing: boolean };
const DEFAULT: Consent = { decided: false, analytics: false, marketing: false };
export const CONSENT_KEY = "afenta_consent_v2";

type Ctx = {
  consent: Consent;
  setConsent: (c: Consent) => void;
  setAndPersist: (c: Consent) => void;
};

const ConsentContext = createContext<Ctx | null>(null);

function read(): Consent {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? ({ ...DEFAULT, ...JSON.parse(raw) } as Consent) : DEFAULT;
  } catch { return DEFAULT; }
}
function write(c: Consent) {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  window.dispatchEvent(new CustomEvent("afenta:consentchange", { detail: c }));
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent>(DEFAULT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setConsent(read()); setMounted(true); }, []);

  const setAndPersist = (c: Consent) => { setConsent(c); write(c); };

  if (!mounted) return null;
  return (
    <ConsentContext.Provider value={{ consent, setConsent, setAndPersist }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within <ConsentProvider>");
  return ctx;
}
