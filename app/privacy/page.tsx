export const metadata = {
  title: "Privacy Policy | Afenta",
};

export default function PrivacyPage() {
  return (
    <main className="pt-16 md:pt-24 pb-16">
      <div className="container-afenta max-w-3xl text-sm text-[var(--color-foreground)] space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-[var(--color-muted)]">
            This Privacy Policy explains how Afenta (“we”, “us”) collects, uses and protects your personal data when you use our website and services.
          </p>
        </header>

        <section>
          <h2 className="font-semibold text-lg mb-1">1. Who we are</h2>
          <p>
            Afenta, based in Eindhoven, The Netherlands. If you have any questions about this policy, you can contact us at{" "}
            <a href="mailto:info@afenta.com" className="link-underline">
              info@afenta.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">2. What data we collect</h2>
          <p>We may collect:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Contact details (name, email, phone) when you contact us or start a project.</li>
            <li>Business information you share about your company, website and goals.</li>
            <li>Usage data (such as pages visited, browser, device) via analytics tools.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">3. How we use your data</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Respond to your enquiries and project requests.</li>
            <li>Prepare proposals and deliver our services.</li>
            <li>Improve our website and marketing based on aggregated analytics.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">4. Legal bases (GDPR)</h2>
          <p>We process your data based on:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Performance of a contract or steps prior to entering into a contract.</li>
            <li>Our legitimate interest to improve our services and website.</li>
            <li>Your consent for optional cookies or newsletter subscriptions.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">5. Data retention</h2>
          <p>
            We keep your data only as long as necessary for the purposes outlined above, or to comply with legal obligations.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">6. Sharing your data</h2>
          <p>
            We do not sell your data. We may share it with trusted service providers (such as email or analytics providers) who process data on our behalf and under data processing agreements.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">7. Your rights</h2>
          <p>Under GDPR you have the right to:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Access your personal data.</li>
            <li>Correct inaccurate data.</li>
            <li>Request deletion of your data where applicable.</li>
            <li>Object to certain processing or withdraw consent.</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact{" "}
            <a href="mailto:info@afenta.com" className="link-underline">
              info@afenta.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">8. Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version is always available on this page.
          </p>
        </section>
      </div>
    </main>
  );
}
