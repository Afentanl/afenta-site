import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { baseMetadata } from "./seo-config";

import GlobalBackground from "./components/global-background";
import { LanguageProvider } from "./components/language-provider";
import { ThemeProvider } from "next-themes";

import Header from "./components/header";
import Footer from "./components/footer";

import { ConsentProvider } from "./components/consent-provider";
import CookieBanner from "./components/cookie-banner";
import AnalyticsGate from "./components/analytics-gate";
import GTMNoScript from "./components/gtm-noscript";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = baseMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground min-h-screen antialiased flex flex-col`}>
        <GTMNoScript />
        <GlobalBackground />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <ConsentProvider>
              <Header />
              <main className="flex-1 pt-16 md:pt-[72px]">
                <AnalyticsGate />
                <CookieBanner />
                {children}
              </main>
              <Footer />
            </ConsentProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
