"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback } from "react";

/**
    * FX de fondo:
    * - Modo claro: canvas blanco puro + glows sutiles (no ensucian).
    * - Modo oscuro: gradiente profundo + auroras animadas.
    * Importante: todas las capas "oscuras" están envueltas en `dark:*`.
    */
export default function BackgroundFX() {
    // Parallax muy suave
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x1 = useTransform(mx, [0, 1], [-14, 14]);
    const y1 = useTransform(my, [0, 1], [-8, 8]);
    const x2 = useTransform(mx, [0, 1], [12, -12]);
    const y2 = useTransform(my, [0, 1], [7, -7]);

    const onMouseMove = useCallback((e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    }, [mx, my]);

    return (
    <div onMouseMove={onMouseMove} className="absolute inset-0 overflow-hidden" aria-hidden>
        {/* ============ LIGHT ============ */}
        {/* Fondo blanco puro */}
        <div className="absolute inset-0 bg-white dark:hidden" />
        {/* Glows MUY suaves (no oscurecen) */}
        <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-40 -left-32 w-[60vw] h-[60vw] blur-3xl rounded-full dark:hidden"
        >
        <div className="w-full h-full rounded-full
                        bg-[radial-gradient(closest-side,rgba(124,58,237,.12),transparent_72%)]" />
        </motion.div>
        <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute bottom-[-22vh] right-[-18vw] w-[55vw] h-[55vw] blur-3xl rounded-full dark:hidden"
        >
        <div className="w-full h-full rounded-full
                        bg-[radial-gradient(closest-side,rgba(250,204,21,.10),transparent_72%)]" />
        </motion.div>
        {/* Nada de grid/beam/vignette en light */}

        {/* ============ DARK ============ */}
        {/* Base profunda */}
        <div className="hidden dark:block absolute inset-0
                        bg-gradient-to-b from-[#0B0B0E] via-zinc-900/60 to-black" />
        {/* Aurora morada */}
        <motion.div
        style={{ x: x1, y: y1 }}
        className="hidden dark:block absolute -top-32 -left-28 w-[60vw] h-[60vw] blur-3xl rounded-full"
        >
        <div className="w-full h-full rounded-full
                        bg-[conic-gradient(from_120deg,rgba(124,58,237,.45),rgba(217,70,239,.28),transparent_70%)]
                        animate-[blobMove_12s_ease-in-out_infinite]" />
        </motion.div>
        {/* Aurora dorada */}
        <motion.div
        style={{ x: x2, y: y2 }}
        className="hidden dark:block absolute bottom-[-20vh] right-[-15vw] w-[55vw] h-[55vw] blur-3xl rounded-full"
        >
        <div className="w-full h-full rounded-full
                        bg-[conic-gradient(from_300deg,rgba(250,204,21,.35),rgba(217,70,239,.22),transparent_70%)]
                        animate-[blobMove_14s_ease-in-out_infinite]" />
        </motion.div>
    </div>
    );
}
