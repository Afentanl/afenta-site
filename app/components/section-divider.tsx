//components section-divider.tsx
"use client";

export default function SectionDivider() {
    return (
    <div className="relative">
      {/* línea hairline con degradado */}
        <div className="h-px w-full bg-[linear-gradient(90deg,transparent,var(--color-ring),transparent)]" />
      {/* glow suave (muy ligero) */}
        <div className="pointer-events-none absolute inset-x-0 -top-5 h-10 opacity-60
                        bg-[radial-gradient(120%_120%_at_50%_0%,rgba(124,58,237,.06),rgba(250,204,21,.04)_35%,transparent_70%)]" />
    </div>
    );
}
