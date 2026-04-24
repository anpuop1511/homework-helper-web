import Link from "next/link";

export const metadata = {
  title: "Pricing | Homework Helper",
  description:
    "Homework Helper pricing: all core features are free across Android and web.",
};

const includedFeatures = [
  "Assignments, subjects, and class organization",
  "AI chat workflows and model selection",
  "Social features: QR invites, profiles, and group collaboration",
  "Study timer, streak momentum, and deadline reminders",
  "Google Classroom integration",
  "Theme customization and Material You vibe options",
  "Cross-device sync with the same account",
];

const upcomingSupportPerks = [
  "Early access feature previews",
  "Cosmetic packs and profile visuals",
  "Optional supporter badges",
];

export default function PricingPage() {
  return (
    <main
      className="min-h-screen py-24 px-6 selection:bg-blue-500/30"
      style={{ background: "var(--surface)", color: "var(--on-surface)" }}
    >
      <div className="max-w-6xl mx-auto fade-in-up">
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-block mb-6 font-medium"
            style={{ color: "var(--primary)" }}
          >
            ← Back to Home
          </Link>
          <p className="text-sm uppercase tracking-[0.22em] font-semibold mb-4" style={{ color: "var(--primary)" }}>
            Simple Pricing
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            One plan right now: Free.
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "var(--on-surface-variant)" }}
          >
            We removed paywalls while we focus on product quality. Core features
            are unlocked for everyone on Android and web.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <article className="m3-card p-8 md:p-10 !rounded-3xl lg:col-span-2 border-2" style={{ borderColor: "var(--primary)" }}>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: "var(--primary)" }}>
                Current Access
              </p>
              <h2 className="text-3xl font-extrabold mb-2">Free for everyone</h2>
              <p className="text-lg" style={{ color: "var(--on-surface-variant)" }}>
                $0 on web, $0 on Android
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className="inline-flex w-2 h-2 rounded-full mt-2"
                    style={{ background: "var(--primary)" }}
                  />
                  <span style={{ color: "var(--on-surface-variant)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
              This reflects the live app experience today.
            </p>
          </article>

          <article className="m3-card p-8 md:p-10 !rounded-3xl">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3" style={{ color: "var(--primary)" }}>
                Future
              </p>
              <h2 className="text-3xl font-extrabold mb-2">Supporter tiers</h2>
              <p className="text-lg" style={{ color: "var(--on-surface-variant)" }}>
                Planned later, not required
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {upcomingSupportPerks.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span
                    className="inline-flex w-2 h-2 rounded-full mt-2"
                    style={{ background: "var(--primary)" }}
                  />
                  <span style={{ color: "var(--on-surface-variant)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
              If we add monetization again, core study features will remain free.
            </p>
          </article>
        </div>

        <div className="m3-card !rounded-3xl p-8 md:p-10 mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">What you can do today</h3>
          <ul className="space-y-3" style={{ color: "var(--on-surface-variant)" }}>
            <li>1. Install Android or open web.</li>
            <li>2. Sign in once.</li>
            <li>3. Start tracking assignments, collaborating, and studying immediately.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://github.com/anpuop1511/homework-helper/releases/latest"
            target="_blank"
            className="m3-button-filled text-center"
          >
            Get Android App
          </Link>
          <Link href="/app/" className="m3-button-tonal text-center">
            Open Web App
          </Link>
        </div>
      </div>
    </main>
  );
}
