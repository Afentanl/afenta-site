import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-afenta py-20 text-center">
      <h1 className="h-display text-3xl md:text-5xl font-black">Page not found</h1>
      <p className="mt-3 text-[var(--color-muted)]">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-6 inline-block btn-afenta-solid">Go home</Link>
    </main>
  );
}
