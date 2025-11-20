import StartProject from "../components/start-project";

export const metadata = {
  title: "Start a project | Afenta",
  openGraph: { images: ["/og?title=Start%20a%20project"] },
  twitter: { images: ["/og?title=Start%20a%20project"] },
};

export default function Page() {
  return (
    <main className="pt-16 md:pt-24">
      <StartProject />
    </main>
  );
}
