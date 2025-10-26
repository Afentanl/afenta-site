import Cases from "../components/cases";
export const metadata = {
  openGraph: { images: ["/og?title=Cases"] },
  twitter:   { images: ["/og?title=Cases"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Cases />
    </main>
  );
}
