// app/page.tsx
import Hero from "./components/hero";
import Services from "./components/services";
import About from "./components/about";
import Contact from "./components/contact";
import { Analytics } from "@vercel/analytics/next"

export default function Page() {
  return (
    <>
      <Analytics />
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
}
