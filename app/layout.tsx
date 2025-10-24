import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GlobalBackground from "./components/global-background";
import { LanguageProvider } from "./components/language-provider";
import Analytics, { GTMNoScript } from "./components/analytics";
import { baseMetadata } from "./seo-config";
import { ThemeProvider } from "./components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"; // ← añade esto

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground min-h-screen antialiased`}>
        <GTMNoScript />
        <GlobalBackground />
        <ThemeProvider>
          <LanguageProvider>
            <Analytics />
            {children}
            <SpeedInsights /> {/* ← úsalo aquí */}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
