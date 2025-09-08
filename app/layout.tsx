// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import GlobalBackground from "./components/global-background";
import { LanguageProvider } from "./components/language-provider";
import Analytics, { GTMNoScript } from "./components/analytics";
import { baseMetadata } from "./seo-config";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground min-h-screen antialiased`}>
        {/* GTM <noscript> (se muestra si el usuario tiene JS desactivado) */}
        <GTMNoScript />

        {/* Fondo global premium */}
        <GlobalBackground />

        {/* Providers */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {/* Cargas de Analytics (GTM/GA4) */}
            <Analytics />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
