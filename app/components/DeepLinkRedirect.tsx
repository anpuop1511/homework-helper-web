"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function DeepLinkRedirect({
  appScheme,
  title,
  description,
}: {
  appScheme: string;
  title: string;
  description: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Automatically attempt to open the app on mount
    window.location.href = appScheme;
  }, [appScheme]);

  if (!mounted) return null;

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 selection:bg-blue-500/30"
      style={{ background: "var(--surface)", color: "var(--on-surface)" }}
    >
      <div className="m3-card p-10 md:p-14 max-w-lg w-full text-center fade-in-up">
        {/* Animated App Icon / Spinner */}
        <div
          className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center text-4xl mb-8 pulse-glow"
          style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}
        >
          📱
        </div>

        <h1 className="text-3xl font-extrabold mb-4 tracking-tight">{title}</h1>
        <p className="text-lg mb-10" style={{ color: "var(--on-surface-variant)" }}>
          {description}
        </p>

        <div className="flex flex-col gap-4">
          <a href={appScheme} className="m3-button-filled text-lg">
            Open in App
          </a>
          <Link
            href="https://github.com/anpuop1511/homework-helper/releases/latest"
            target="_blank"
            className="m3-button-tonal text-lg"
          >
            Download Android App
          </Link>
          <Link
            href="/"
            className="text-sm font-medium mt-4 hover:opacity-70 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}