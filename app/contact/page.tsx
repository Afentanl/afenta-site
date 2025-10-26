import Contact from "../components/contact";
export const metadata = {
  openGraph: { images: ["/og?title=Contact"] },
  twitter:   { images: ["/og?title=Contact"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Contact />
    </main>
  );
}
