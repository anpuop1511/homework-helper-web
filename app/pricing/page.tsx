import Link from "next/link";

export const metadata = {
  title: "Pricing | Homework Helper",
  description:
    "Compare Helper+ and Helper Pass plans for Homework Helper. Purchase on Android and use benefits on web.",
};

const helperPlusFeatures = [
  "Unlimited classes and subjects",
  "Repeatable tasks",
  "Premium and custom themes",
  "500 coins every month",
];

const helperPassFeatures = [
  "Everything in Helper+",
  "Season battle pass access",
  "Exclusive Helper Pass badge",
  "750 coins every month",
  "BYOK model choice",
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
          <p
            className="text-sm uppercase tracking-[0.22em] font-semibold mb-4"
            style={{ color: "var(--primary)" }}
          >
            Homework Helper Paid Plans
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
            Pick your study power-up.
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: "var(--on-surface-variant)" }}
          >
            Purchase is currently available in the Android app. If you buy on
            Android, your plan benefits work on web too.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <article className="m3-card p-8 md:p-10 !rounded-3xl">
            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "var(--primary)" }}
              >
                Most Popular Starter
              </p>
              <h2 className="text-3xl font-extrabold mb-2">Helper+</h2>
              <p
                className="text-lg"
                style={{ color: "var(--on-surface-variant)" }}
              >
                $1.99/mo or $19.99/yr
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {helperPlusFeatures.map((feature) => (
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
              Effective yearly value is about $1.67 per month.
            </p>
          </article>

          <article
            className="m3-card p-8 md:p-10 !rounded-3xl border-2"
            style={{ borderColor: "var(--primary)" }}
          >
            <div className="mb-6">
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "var(--primary)" }}
              >
                Best Value Upgrade
              </p>
              <h2 className="text-3xl font-extrabold mb-2">Helper Pass</h2>
              <p
                className="text-lg"
                style={{ color: "var(--on-surface-variant)" }}
              >
                $2.99/mo
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              {helperPassFeatures.map((feature) => (
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
              Only $1 more than Helper+ with battle pass, badge, and BYOK model
              choice.
            </p>
          </article>
        </div>

        <div className="m3-card !rounded-3xl p-8 md:p-10 mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">How buying works right now</h3>
          <ol className="space-y-3" style={{ color: "var(--on-surface-variant)" }}>
            <li>1. Open Homework Helper on Android.</li>
            <li>2. Purchase Helper+ or Helper Pass in the app.</li>
            <li>3. Sign into the same account on web and your plan unlocks there too.</li>
          </ol>
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
