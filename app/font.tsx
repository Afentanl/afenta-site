import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Fonts oficiales Afenta:
 * - Display: Space Grotesk (titulares)
 * - Sans: Plus Jakarta Sans (texto)
 * - Mono: JetBrains Mono (código/metrics)
 *
 * No necesitas instalar nada extra: next/font descarga y sirve las fuentes automáticamente.
 */

export const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-sans",
    display: "swap",
});

export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-mono",
    display: "swap",
});
