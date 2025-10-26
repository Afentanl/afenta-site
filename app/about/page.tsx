import About from "../components/about";

export const metadata = {
  openGraph: { images: ["/og?title=About"] },
  twitter:   { images: ["/og?title=About"] },
};
export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <About variant="page" />
    </main>
  );
}
