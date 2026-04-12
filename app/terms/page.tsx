import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Homework Helper",
  description: "Terms of Service for Homework Helper",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen py-24 px-6 selection:bg-blue-500/30" style={{ background: "var(--surface)", color: "var(--on-surface)" }}>
      <div className="max-w-4xl mx-auto m3-card !rounded-3xl p-8 md:p-12 fade-in-up">
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block mb-6 font-medium" style={{ color: "var(--primary)" }}>
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms of Service</h1>
          <p style={{ color: "var(--on-surface-variant)" }}>Last updated: April 12, 2026</p>
        </div>

        <div className="space-y-8 text-lg" style={{ color: "var(--on-surface-variant)" }}>
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>1. Introduction</h2>
            <p>
              By accessing or using Homework Helper (the "App"), you agree to be bound by these 
              Terms of Service. If you disagree with any part of these terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) 
              on Homework Helper for personal, non-commercial transitory viewing only. You may use our service 
              to manage academic assignments, utilize generative AI tools responsibly, and connect with peers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>3. User Conduct</h2>
            <p>
              You agree not to use the application to abuse, harass, threaten, or distribute illicit, 
              harmful, or inappropriate material in shared workspaces (Social Quad). You are fully responsible 
              for the data you generate, upload, and share using Homework Helper.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>4. Disclaimer</h2>
            <p>
              The materials on Homework Helper, including AI-generated responses (Gemini Voice), are provided 
              on an 'as is' basis. Homework Helper makes no warranties, expressed or implied, regarding 
              the absolute accuracy of AI outputs. Users should verify factual information independently for important 
              assignments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--on-surface)" }}>5. Modifications</h2>
            <p>
              Homework Helper may revise these terms of service for its website and app at any time without notice. 
              By using these services, you are agreeing to be bound by the then current version of these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
