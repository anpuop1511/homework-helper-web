import Link from "next/link";

export const metadata = {
  title: "Changelog | Homework Helper",
  description: "See what's new in Homework Helper.",
};

const updates = [
  {
    version: "v2.7.0",
    date: "April 2026",
    title: "Public Release 🎉",
    changes: [
      "Welcome to the first public release of Homework Helper.",
      "Friends, requests, and pending items are organized more clearly.",
      "Real-time updates for friend request activity are faster and easier to follow.",
      "The social page is scrollable on Web so you can see everything.",
      "Settings, Battle Pass, and AI Chat all received UI improvements for a cleaner experience.",
      "A customizable bottom navigation bar now keeps Home pinned for consistency.",
      "Some features may require a user-provided API key in Settings.",
      "If you find an issue, please open a GitHub Issue to help shape the next update.",
    ],
  },
  {
    version: "v1.2.0",
    date: "April 12, 2026",
    title: "The Web Update 🌐",
    changes: [
      "Launched the official Web App, accessible from any browser (perfect for iOS!).",
      "Added fully automated GitHub Action deployment pipeline.",
      "Implemented dynamic Material 3 design on the new landing page.",
      "Added deep-linking support for shared profile and project URLs."
    ]
  },
  {
    version: "v1.1.0",
    date: "March 2026",
    title: "Social Quad & NFC Bump 🤝",
    changes: [
      "Introduced the Social Quad for native class collaboration.",
      "Added NFC Bump to instantly add friends securely offline.",
      "Squashed bugs related to login state persistence."
    ]
  },
  {
    version: "v1.0.0",
    date: "January 2026",
    title: "Initial Release 🚀",
    changes: [
      "Core assignment tracking and progress rings.",
      "Gemini AI voice chat integration for instant tutoring.",
      "Firebase authentication and real-time syncing.",
      "Study streaks and leveling system."
    ]
  }
];

export default function Changelog() {
  return (
    <main className="min-h-screen py-24 px-6 selection:bg-blue-500/30" style={{ background: "var(--surface)", color: "var(--on-surface)" }}>
      <div className="max-w-4xl mx-auto fade-in-up">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block mb-6 font-medium" style={{ color: "var(--primary)" }}>
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Changelog & Updates</h1>
          <p className="text-lg" style={{ color: "var(--on-surface-variant)" }}>Discover the latest features, fixes, and improvements.</p>
        </div>

        <div className="m3-card !rounded-3xl p-8 md:p-10 mb-10" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-3">Android first public release</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Homework Helper is now public.</h2>
          <p className="text-lg leading-relaxed max-w-3xl">
            v2.7.0 is the first public version of the app. Check the GitHub releases page for the full release notes, install steps, and future updates.
          </p>
        </div>

        <div className="space-y-8">
          {updates.map((update, idx) => (
            <div key={idx} className="m3-card !rounded-3xl p-8 md:p-10 relative overflow-hidden transition-transform hover:-translate-y-1">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 border-b" style={{ borderColor: "var(--outline-variant)" }}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-4 py-1 rounded-full text-sm font-bold" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>
                      {update.version}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--on-surface-variant)" }}>
                      {update.date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold">{update.title}</h2>
                </div>
              </div>
              
              <ul className="space-y-4 mt-4">
                {update.changes.map((change, i) => (
                  <li key={i} className="flex gap-4 text-lg items-start" style={{ color: "var(--on-surface-variant)" }}>
                    <span className="mt-1" style={{ color: "var(--primary)" }}>✨</span>
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="https://github.com/anpuop1511/homework-helper/releases"
            target="_blank"
            className="m3-button-tonal inline-block"
          >
            View raw commits on GitHub
          </Link>
        </div>
      </div>
    </main>
  );
}
