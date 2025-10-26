import About from "../components/about";
export const metadata = { title: "About" };
export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <About variant="page" />
    </main>
  );
}
