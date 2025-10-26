"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const EASE = [0.16, 0.84, 0.44, 1] as const;

export default function Reveal({
  children,
  delay = 0,
  y = 34,
  once = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0% -10% 0%", amount: 0.12, once });
  const controls = useAnimation();
  const pathname = usePathname();

  // resetea al cambiar de ruta
  useEffect(() => {
    controls.set("hidden");
    // “despierta” IO por si acaso
    requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
  }, [pathname, controls]);

  useEffect(() => {
    if (inView) controls.start("show");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, delay, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
