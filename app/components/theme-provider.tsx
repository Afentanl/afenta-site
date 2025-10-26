"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"      // añade/remueve la clase 'dark' en <html>
      defaultTheme="system"  // usa el tema del SO por defecto
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}
