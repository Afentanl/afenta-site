"use client";
import Analytics from "./analytics";
import { useConsent } from "./consent-provider";

export default function AnalyticsGate() {
  const { consent } = useConsent();
  if (!consent.decided || !(consent.analytics || consent.marketing)) return null;
  return <Analytics consent={consent} />;
}
