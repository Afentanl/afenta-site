import "./globals.css";
import type { Metadata } from "next";
import GlobalBackground from "./components/global-background";
import { LanguageProvider } from "./components/language-provider";
import Analytics, { GTMNoScript } from "./components/analytics";
import { baseMetadata } from "./seo-config";
import { ThemeProvider } from "./components/theme-provider"; // usamos tu wrapper
import { display, sans, mono } from "./font";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={[
          display.variable,
          sans.variable,
          mono.variable,
          "bg-background text-foreground min-h-screen antialiased",
        ].join(" ")}
      >
        {/* GTM <noscript> */}
        <GTMNoScript />

        {/* Fondo global premium */}
        <GlobalBackground />

        {/* Providers */}
        <ThemeProvider>
          <LanguageProvider>
            <Analytics />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
