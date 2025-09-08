/* app/components/global-background.tsx */
"use client";

import React from "react";

/**
 * Fondo global premium:
 * - Dark: aurora + sparkles
 * - Light: mesh gradient suave
 * Todo en CSS para rendir súper bien y sin “cuaderno de mates”.
 */
export default function GlobalBackground({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`fixed inset-0 -z-10 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Capa base (light/dark) */}
      <div className="absolute inset-0 bg-global-base" />

      {/* Aurora solo en dark */}
      <div className="absolute inset-0 bg-aurora hidden dark:block" />

      {/* Sparkles sutiles en dark */}
      <div className="absolute inset-0 bg-sparkles hidden dark:block" />

      {/* Vignette muy suave para dar profundidad */}
      <div className="absolute inset-0 bg-vignette" />
    </div>
  );
}
