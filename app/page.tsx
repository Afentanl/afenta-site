"use client";

import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <About />
      <Services />
    </div>
  );
}
