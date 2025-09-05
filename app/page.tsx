"use client";

import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header fijo arriba */}
      <Header />

      {/* Hero ocupa la pantalla principal */}
      <Hero />

      {/* Aquí después metemos Services, Cases, Contact */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-black">Services</h2>
        <p className="mt-2 opacity-70 max-w-2xl">
          We design and build high-performance brands, websites and growth systems.
        </p>
      </section>
    </div>
  );
}


