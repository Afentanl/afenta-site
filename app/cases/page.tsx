import Cases from "../components/cases";
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  openGraph: { images: ["/og?title=Cases"] },
  twitter:   { images: ["/og?title=Cases"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Analytics/>
      <Cases />
    </main>
  );
}
