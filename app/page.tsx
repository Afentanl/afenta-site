"use client";

import Header from "./components/header";
import Hero from "./components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />

      {/* Services con contenedor 4K */}
      <section id="services" className="container-afenta py-16 sm:py-20 md:py-24">
        <h2 className="h-display text-fluid-title font-black">Services</h2>
        <p className="mt-2 opacity-70 max-w-2xl text-fluid-body">
          We design and build high-performance brands, websites and growth systems.
        </p>
      </section>
    </div>
  );
}
