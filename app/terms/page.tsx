export const metadata = {
  title: "Terms of Service | Afenta",
};

export default function TermsPage() {
  return (
    <main className="pt-16 md:pt-24 pb-16">
      <div className="container-afenta max-w-3xl text-sm text-[var(--color-foreground)] space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-[var(--color-muted)]">
            These Terms of Service apply to the use of the Afenta website and to any proposals or services we offer.
          </p>
        </header>

        <section>
          <h2 className="font-semibold text-lg mb-1">1. Use of the website</h2>
          <p>
            The content on this site is for general information about our services. We try to keep it up to date, but we do not guarantee that all information is complete or error-free.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">2. No automatic offer</h2>
          <p>
            Information on this website does not constitute a binding offer. A project only starts when both parties agree in writing (for example by email or signed proposal).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">3. Liability</h2>
          <p>
            We are not liable for any indirect or consequential damages resulting from the use of this website. For client projects, liability is limited to what is agreed in the specific proposal or contract.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">4. Intellectual property</h2>
          <p>
            All content on this website (design, text, visuals) is owned by Afenta or our partners and may not be reused without permission.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-lg mb-1">5. Governing law</h2>
          <p>
            These terms are governed by the laws of The Netherlands. Any disputes will be handled by the competent court in The Netherlands.
          </p>
        </section>
      </div>
    </main>
  );
}
