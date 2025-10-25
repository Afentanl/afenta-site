import About from "../components/about";

export const metadata = { title: "About · Afenta" };

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="container-afenta py-10">
        <h1 className="h-display text-3xl md:text-5xl font-black">About</h1>
        <p className="mt-3 text-[var(--color-muted)] max-w-prose">
          We turn vision into impact end-to-end.
        </p>
      </section>
      <About />
    </div>
  );
}
