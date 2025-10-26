"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.22, 1, 0.36, 1] as const; // más suave para móvil

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Detecta móvil para bajar duración y quitar la cortina
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  const duration = reduce ? 0 : isMobile ? 0.25 : 0.35;

  return (
    <div className="grid">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          style={{
            gridArea: "1 / 1",
            willChange: "transform, opacity",
            backfaceVisibility: "hidden",
          }}
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.995 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8, scale: 0.995 }}
          transition={{ duration, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Cortina: solo desktop para evitar jank en mobile */}
      {!reduce && !isMobile && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname + "-curtain"}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[60] bg-background/60"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            exit={{ x: 0 }}
            transition={{ duration, ease: EASE }}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
