"use client";
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 -top-24 focus-visible:top-4 z-[999]
                 px-3 py-2 rounded-lg bg-foreground text-background
                 ring-1 ring-[var(--color-ring)] transition-all"
    >
      Skip to content
    </a>
  );
}
