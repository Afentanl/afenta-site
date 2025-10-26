import Services from "../components/services";
export const metadata = { title: "Services" };
export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <Services variant="page" />
    </main>
  );
}
