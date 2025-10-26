import Services from "../components/services";
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  openGraph: { images: ["/og?title=Services"] },
  twitter:   { images: ["/og?title=Services"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Analytics />
      <Services variant="page" />
    </main>
  );
}
