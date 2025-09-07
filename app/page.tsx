import Header from "./components/header";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import SectionDivider from "./components/section-divider";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Services />
      </main>
    </>
  );
}