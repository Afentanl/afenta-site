// app/layout.tsx
import "./globals.css";
import GlobalBackground from "./components/global-background";
import type { Metadata } from "next";
import ThemeProvider from "./components/theme-provider";
import { ConsentProvider } from "./components/consent-provider";
import Header from "./components/header";
import Footer from "./components/footer";
import CookieBanner from "./components/cookie-banner";
import AnalyticsGate from "./components/analytics-gate";
import GTMNoScript from "./components/gtm-noscript";
import { LanguageProvider } from "./components/language-provider";
import PageTransition from "./components/page-transition";
import SkipLink from "./components/skip-link";

export const metadata: Metadata = { title: "Afenta", description: "…" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <GlobalBackground />
        <ThemeProvider>
        <LanguageProvider>
          <ConsentProvider>
          <AnalyticsGate />
          <GTMNoScript />
          <Header />
          <SkipLink />
        <main>
            <PageTransition>{children}</PageTransition>
        </main>
          <Footer />
          <CookieBanner />
          </ConsentProvider>
          </LanguageProvider>
          </ThemeProvider>
        <script
          type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Afenta",
      url: "https://afenta.nl",
      logo: "https://afenta.nl/logo-afenta.png",
      sameAs: ["https://www.instagram.com/...", "https://www.linkedin.com/company/..."],
    }),
  }}/>
      </body>  
    </html>
  );
}
