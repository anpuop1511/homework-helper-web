import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Homework Helper",
  description: "Privacy Policy for Homework Helper",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen py-24 px-6 selection:bg-blue-500/30" style={{ background: "var(--surface)", color: "var(--on-surface)" }}>
      <div className="max-w-4xl mx-auto m3-card !rounded-3xl p-8 md:p-12 fade-in-up">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-6 font-medium" style={{ color: "var(--primary)" }}>
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p style={{ color: "var(--on-surface-variant)" }}>Last updated: April 12, 2026</p>
        </div>

        <div className="space-y-8 text-lg" style={{ color: "var(--on-surface-variant)" }}>
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when using Homework Helper. 
              This may include account information (email, username), profile data, and the content 
              of the assignments and chat interactions you submit to the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>2. How We Use Your Information</h2>
            <p>
              Your data is used specifically to provide, maintain, and improve the Homework Helper service. 
              This includes synchronizing your assignments across devices, processing voice inputs via 
              AI integrations (Gemini), and managing Social Quad networking features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>3. Third-Party Integrations</h2>
            <p>
              Homework Helper integrates with third-party services such as Firebase (for database and authentication) 
              and Google Gemini (for AI assistance). By using Homework Helper, you acknowledge that your data 
              may be processed by these services strictly to provide the core functionality of the app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. App features like 
              Biometric Passkeys and App Lock remain local to your device to ensure maximum privacy of your immediate sessions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us by creating an issue on our GitHub Repository.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
