"use client";

import Header from "./components/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-4xl font-black">Hello Afenta 👋</h1>
        <p className="mt-2 opacity-70">Ya tenemos Header con idioma y tema.</p>
      </main>
    </div>
  );
}

