//app font.tsx
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

export const display = Space_Grotesk({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-display",
});

export const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-sans",
});

export const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-mono",
});
