import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import { LanguageProvider } from "./components/language-provider";

export const metadata: Metadata = {
  title: "Afenta — Where vision becomes impact",
  description: "Marketing + Tech Agency",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
