/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
import Header from "./components/header";
import Hero from "./components/hero";
import Services from "./components/services";
import About from "./components/about";
import Contact from "./components/contact";
import Footer from "./components/footer";
import SectionDivider from "./components/section-divider";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero /><Services /><About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
