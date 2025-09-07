import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import GlobalBackground from "./components/global-background";
import { LanguageProvider } from "./components/language-provider"; // <- mantén tu provider
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Afenta",
  description: "Brand · Websites · Performance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-background text-foreground min-h-screen antialiased`}>
        {/* FONDO GLOBAL PREMIUM */}
        <GlobalBackground />

        {/* Providers + theme */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
