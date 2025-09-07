"use client";

/**
 * Fondo premium universal:
 * - Auroras animadas (2 capas)
 * - Glow radial en esquinas
 * - Grid sutil
 * - Grano suave
 * - Viñeta ligera
 *
 * Coloca este componente 1 sola vez a nivel de layout.
 */
export default function GlobalBackground() {
    return (
    <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base suave (ligero gradiente diagonal) */}
        <div className="absolute inset-0 bg-[radial-gradient(140%_120%_at_100%_0%,rgba(250,204,21,.12),transparent_50%),radial-gradient(110%_110%_at_0%_100%,rgba(124,58,237,.10),transparent_55%)]" />

      {/* auroras (dos blobs con keyframes suaves) */}
        <div className="absolute -top-24 -right-16 h-[52vmax] w-[52vmax] rounded-full blur-3xl opacity-70 animate-aurora
                        bg-[conic-gradient(from_0deg,rgba(124,58,237,.55),rgba(217,70,239,.35),rgba(250,204,21,.35),rgba(124,58,237,.55))]" />
        <div className="absolute -bottom-24 -left-24 h-[56vmax] w-[56vmax] rounded-full blur-3xl opacity-70 animate-aurora
                        [animation-duration:18s] [animation-direction:alternate]
                        bg-[conic-gradient(from_180deg,rgba(250,204,21,.38),rgba(217,70,239,.35),rgba(124,58,237,.42),rgba(250,204,21,.38))]" />

      {/* grid premium súper sutil */}
        <div className="absolute inset-0 opacity-[.06] dark:opacity-[.08]"
            style={{
                backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.8) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                mixBlendMode: "multiply",
            }} />

      {/* grano suave (procedural) */}
        <div className="absolute inset-0 opacity-[.05] dark:opacity-[.07] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,.7)_0,rgba(0,0,0,.7)_1px,transparent_1px,transparent_2px)]"
            style={{ backgroundSize: "auto 2px", mixBlendMode: "multiply" }} />

      {/* viñeta ligera para foco central */}
        <div className="absolute inset-0 pointer-events-none
                        bg-[radial-gradient(80%_60%_at_50%_40%,transparent_55%,rgba(0,0,0,.08)_80%,rgba(0,0,0,.14)_100%)]" />
    </div>
    );
}
