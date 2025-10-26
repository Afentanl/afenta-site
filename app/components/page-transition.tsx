"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const EASE = [0.16, 0.84, 0.44, 1] as const;
const DUR_IN = 0.38;
const DUR_OUT = 0.32;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Contenido */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: mounted ? 0 : 1, x: mounted ? "6%" : "0%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-6%" }}
          transition={{ duration: DUR_IN, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Cortina */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pathname}-curtain`}
          aria-hidden
          className="fixed inset-0 z-[60] pointer-events-none bg-background"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: DUR_OUT, ease: EASE }}
        />
      </AnimatePresence>
    </>
  );
}
