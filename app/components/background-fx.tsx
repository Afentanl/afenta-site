// background-fx.tsx
"use client";
import React from "react";

/**
 * Fondo global reusable:
 * - Capa de "dots" sutil (se adapta a light/dark)
 * - Auroras animadas (muy livianas, respetan reduce-motion)
 * - z-0 para que siempre quede por debajo del contenido (la sección usa `isolate`)
 */
export default function BackgroundFX({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-0 ${className}`}>
      {/* Dots */}
      <div
        className="
          absolute inset-0
          bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,.06)_1px,transparent_1px)]
          [background-size:16px_16px]
          dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,.06)_1px,transparent_1px)]
        "
      />
      {/* Auroras animadas */}
      <div
        className="
          absolute inset-0 animate-aurora
          bg-[radial-gradient(60%_45%_at_18%_20%,rgba(124,58,237,.18),transparent_62%),radial-gradient(60%_48%_at_85%_85%,rgba(250,204,21,.16),transparent_60%)]
          dark:bg-[radial-gradient(60%_45%_at_18%_20%,rgba(124,58,237,.14),transparent_62%),radial-gradient(60%_48%_at_85%_85%,rgba(250,204,21,.12),transparent_60%)]
        "
      />
    </div>
  );
}
