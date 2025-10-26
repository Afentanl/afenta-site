"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function FocusOnRoute() {
  const pathname = usePathname();
  useEffect(() => {
    const el = document.querySelector("#main") as HTMLElement | null;
    if (el) el.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
