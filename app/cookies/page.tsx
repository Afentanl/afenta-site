export const metadata = {
  title: "Cookie Policy | Afenta",
};

export default function CookiesPage() {
  return (
    <main className="pt-16 md:pt-24 pb-16">
      <div className="container-afenta max-w-3xl text-sm text-[var(--color-foreground)] space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-[var(--color-muted)]">
            This Cookie Policy explains which cookies we use on the Afenta website and how you can manage your preferences.
          </p>
        </header>

        <section>
          <h2 className="font-semibold text-lg mb-1">1. What are cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help the site function properly and provide us with insights into how it is used.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">2. Types of cookies we use</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Essential cookies</strong> – required for the basic functioning of the site (for example security or remembering your cookie choice).
            </li>
            <li>
              <strong>Analytics cookies</strong> – help us understand how visitors use the site (for example which pages are visited).
            </li>
            <li>
              <strong>Marketing cookies</strong> – used to measure and optimise campaigns (only if enabled).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">3. Managing cookies</h2>
          <p>
            On your first visit we show a cookie banner where you can accept or reject non-essential cookies. You can also adjust your browser settings to block or delete cookies.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">4. Updates</h2>
          <p>
            We may update this Cookie Policy when we change the way we use cookies. The latest version is always available on this page.
          </p>
        </section>
      </div>
    </main>
  );
}
