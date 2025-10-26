import Contact from "../components/contact";
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  openGraph: { images: ["/og?title=Contact"] },
  twitter:   { images: ["/og?title=Contact"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Analytics />
      <Contact />
    </main>
  );
}
