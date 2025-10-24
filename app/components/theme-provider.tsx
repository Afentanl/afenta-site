//components theme-provider.tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"       // pone/quita 'dark' en <html>
      defaultTheme="light"    // arranca SIEMPRE en claro
      enableSystem={false}    // ignora el tema del SO
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
    
  );
}
