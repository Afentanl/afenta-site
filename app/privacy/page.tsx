import { Analytics } from "@vercel/analytics/next"
export default function Privacy() {
    return (

    <main className="container-afenta py-16">
    <Analytics />
        <h1 className="h-display text-3xl md:text-5xl font-black">Privacy Policy</h1>
        <p className="mt-4 text-[var(--color-muted)]">
        We respect your privacy. This is a lightweight placeholder. Replace with your actual policy.
        </p>
    </main>
    );
}
