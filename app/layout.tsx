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
import FocusOnRoute from "./components/focus-on-route";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://afenta.nl"),
  title: {
    default: "Afenta",
    template: "%s — Afenta",
  },
  description: "Brand · Websites · Performance",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Afenta",
    description: "Brand · Websites · Performance",
    siteName: "Afenta",
    url: "/",
    type: "website",
    images: [
      {
        url: "/og.png",           // <-- usa tu PNG
        width: 1200,
        height: 630,
        alt: "Afenta",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afenta",
    description: "Brand · Websites · Performance",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://afenta.nl";

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:bg-background focus:text-foreground focus:ring-2 focus:ring-brand-gold px-3 py-2 rounded">Skip to content</a>
        <FocusOnRoute/>
        <GlobalBackground />
        <ThemeProvider>
          <LanguageProvider>
            <ConsentProvider>
              <AnalyticsGate />
              <GTMNoScript />
              <Header />
              <SkipLink />
              {/* IMPORTANTE: id="main" para accesibilidad */}
              <main id="main" tabIndex={-1}>
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <CookieBanner />
            </ConsentProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* JSON-LD global: Organization + Website */}
        <script
          type="application/ld+json"
          // Organization
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Afenta",
              url: base,
              logo: `${base}/logo-afenta.png`,
              sameAs: [
                "https://www.instagram.com/...",
                "https://www.linkedin.com/company/..."
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          // Website (con SearchAction si algún día tienes /search)
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: base,
              name: "Afenta",
              potentialAction: {
                "@type": "SearchAction",
                target: `${base}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
