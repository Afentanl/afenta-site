import About from "../components/about";
import { Analytics } from "@vercel/analytics/next"
export const metadata = { title: "About" };
export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Analytics>
      </Analytics>
      <About variant="page" />
    </main>
  );
}
