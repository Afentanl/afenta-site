"use client";

import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { motion, useMotionValue, useTransform } from "framer-motion";

/**
 * Fondo premium sin imágenes pesadas.
 * - Evita FOUC: hasta montar → BLANCO sólido.
 * - Render condicional: en light NUNCA existen capas dark y viceversa.
 * - Parallax suave con el cursor (barato en perf).
 */
export default function BackgroundFX() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

  // parallax
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x1 = useTransform(mx, [0, 1], [-16, 16]);
    const y1 = useTransform(my, [0, 1], [-10, 10]);
    const x2 = useTransform(mx, [0, 1], [14, -14]);
    const y2 = useTransform(my, [0, 1], [8, -8]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    }, [mx, my]);

    if (!mounted) return <div className="absolute inset-0 bg-white" aria-hidden />;

    const mode = (theme ?? resolvedTheme) === "dark" ? "dark" : "light";

    return (
    <div className="absolute inset-0 overflow-hidden" onMouseMove={onMouseMove} aria-hidden>
        {mode === "light" ? (
        <>
          {/* base blanca */}
            <div className="absolute inset-0 bg-white" />

          {/* grid puntitos ultrasuave para romper el vacío */}
            <div
            className="absolute inset-0 opacity-[.09]"
            style={{
                background:
                "radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)",
                backgroundSize: "18px 18px",
            }}
            />

          {/* glows */}
            <motion.div style={{ x: x1, y: y1 }} className="absolute -top-36 -left-28 w-[60vw] h-[60vw] blur-3xl rounded-full">
            <div className="w-full h-full rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.14),transparent_72%)]" />
            </motion.div>

            <motion.div style={{ x: x2, y: y2 }} className="absolute bottom-[-22vh] right-[-18vw] w-[56vw] h-[56vw] blur-3xl rounded-full">
            <div className="w-full h-full rounded-full bg-[radial-gradient(closest-side,rgba(250,204,21,.12),transparent_72%)]" />
            </motion.div>
        </>
        ) : (
        <>
          {/* base oscura */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E] via-zinc-900/60 to-black" />

          {/* auroras */}
            <motion.div style={{ x: x1, y: y1 }} className="absolute -top-28 -left-24 w-[60vw] h-[60vw] blur-3xl rounded-full">
            <div className="w-full h-full rounded-full bg-[conic-gradient(from_110deg,rgba(124,58,237,.45),rgba(217,70,239,.28),transparent_70%)] animate-[blobMove_12s_ease-in-out_infinite]" />
            </motion.div>
            <motion.div style={{ x: x2, y: y2 }} className="absolute bottom-[-18vh] right-[-14vw] w-[58vw] h-[58vw] blur-3xl rounded-full">
            <div className="w-full h-full rounded-full bg-[conic-gradient(from_290deg,rgba(250,204,21,.35),rgba(217,70,239,.22),transparent_70%)] animate-[blobMove_14s_ease-in-out_infinite]" />
            </motion.div>

          {/* grano leve */}
            <div
            className="absolute inset-0 opacity-[.06] mix-blend-soft-light"
            style={{
                background:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.8'/></svg>\")",
            }}
            />
        </>
        )}
    </div>
    );
}
