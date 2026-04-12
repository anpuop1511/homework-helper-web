"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="m3-card p-8 fade-in-up">
    <div className="w-14 h-14 m3-icon-container text-2xl mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--on-surface)" }}>{title}</h3>
    <p className="text-base" style={{ color: "var(--on-surface-variant)" }}>{description}</p>
  </div>
);

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen selection:bg-blue-500/30" style={{ background: "var(--surface)", color: "var(--on-surface)" }}>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 transition-all duration-300" style={{ background: scrollY > 20 ? "var(--surface-container-low)" : "transparent" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
            HomeworkHelper
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="hover:opacity-70 transition-opacity">Features</a>
            <a href="#showcase" className="hover:opacity-70 transition-opacity">Showcase</a>
            <Link href="https://github.com/anpuop1511/homework-helper/releases/latest" target="_blank" className="m3-button-filled">
              Download
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 opacity-40 blur-[100px] pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--primary-container) 0%, transparent 70%)",
            transform: `translate(-50%, ${scrollY * 0.2}px)`,
          }}
        />

        <div className="relative z-10 max-w-5xl text-center space-y-8 fade-in-up">
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-tight">
            Learn smarter with your <br className="hidden md:block"/>
            <span style={{ color: "var(--primary)" }}>AI Study Buddy</span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium" style={{ color: "var(--on-surface-variant)" }}>
            Organize assignments, chat with Gemini AI using your voice, track your study streaks, and collaborate with your classmates seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              href="https://github.com/anpuop1511/homework-helper/releases/latest"
              target="_blank"
              className="m3-button-filled text-lg w-full sm:w-auto text-center shadow-lg"
            >
              Get for Android
            </Link>
            <button className="m3-button-tonal text-lg w-full sm:w-auto opacity-70 cursor-not-allowed">
              Web App Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Expressive Graphic Divider */}
      <div className="w-full flex justify-center py-12">
        <div className="h-2 w-32 rounded-full" style={{ background: "var(--surface-container-highest)" }}></div>
      </div>

      {/* Expanded Features Section */}
      <section id="features" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 md:mb-24 fade-in-up max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Everything you need, built right in.</h2>
            <p className="text-xl" style={{ color: "var(--on-surface-variant)" }}>
              Homework Helper combines task management, artificial intelligence, and social collaboration natively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🤖"
              title="Voice AI Chat"
              description="Speak directly to Gemini AI. Ask complex questions, get homework help, and hear the explanations read back to you natively."
            />
            <FeatureCard
              icon="📊"
              title="Progress Tracking"
              description="Subject folders display dynamic progress rings. Track missing, in-progress, and completed assignments efficiently."
            />
            <FeatureCard
              icon="🤝"
              title="Social Quad"
              description="NFC bump or scan QR codes to instantly add friends. Collaborate in classes or create independent study groups."
            />
            <FeatureCard
              icon="🔐"
              title="Biometric Passkeys"
              description="Keep your assignments secure. Optional App Lock and Biometric Passkeys ensure only you can access your study data."
            />
            <FeatureCard
              icon="🔥"
              title="Study Streaks"
              description="Log in and complete tasks daily to build your streak. Level up your account from 'Study Buddy' to 'Homework Hero'."
            />
            <FeatureCard
              icon="✨"
              title="Dynamic Theming"
              description="Built with pure Material You. The app matches your device's exact color scheme automatically (Android 12+)."
            />
            <FeatureCard
              icon="📋"
              title="Group Bulletins"
              description="Collaborative group projects feature real-time synced task boards (Todo, In Progress, Done) and bulletin posts."
            />
            <FeatureCard
              icon="🔗"
              title="Deep Links"
              description="Share project invites directly. Click an invite deep link and jump straight into your shared assignment group."
            />
            <FeatureCard
              icon="🚀"
              title="Fast & Lightweight"
              description="Optimized with Provider state management and direct Firestore bindings for zero-wait performance."
            />
          </div>
        </div>
      </section>

      {/* Interactive Showcase */}
      <section id="showcase" className="py-32 px-6" style={{ background: "var(--surface-container-lowest)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Experience fluid design.</h2>
          </div>

          {/* M3 Tabs */}
          <div className="flex justify-start md:justify-center gap-2 mb-12 overflow-x-auto pb-4 px-2 snap-x hide-scrollbar">
            {["Dashboard", "Voice Chat", "NFC Friends"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className="px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all snap-center"
                style={{
                  background: activeTab === tab.toLowerCase() ? "var(--secondary-container)" : "transparent",
                  color: activeTab === tab.toLowerCase() ? "var(--on-secondary-container)" : "var(--on-surface-variant)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Showcase Display Area */}
          <div className="m3-card !rounded-[40px] p-8 md:p-16 fade-in-up" style={{ minHeight: "450px" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6 order-2 lg:order-1">
                {activeTab === "dashboard" && (
                  <>
                    <h3 className="text-3xl lg:text-4xl font-bold">Your Daily Hub</h3>
                    <p className="text-lg leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                      Start your day with a customized motivational quote. See your total pending work at a glance, and jump directly into the assignments needing your immediate attention.
                    </p>
                  </>
                )}
                {activeTab === "voice chat" && (
                  <>
                    <h3 className="text-3xl lg:text-4xl font-bold">Unleash Gemini AI</h3>
                    <p className="text-lg leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                      Stuck on a problem? Tap the mic, speak your question, and let Gemini analyze it. It will break down complex topics and use Text-to-Speech to guide you through it.
                    </p>
                  </>
                )}
                {activeTab === "nfc friends" && (
                  <>
                    <h3 className="text-3xl lg:text-4xl font-bold">Bump To Connect</h3>
                    <p className="text-lg leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                      Hold your phones together. Using the native NFC bump feature, securely exchange profiles and instantly become study buddies.
                    </p>
                  </>
                )}
                <div className="pt-4">
                  <div className="inline-flex w-12 h-2 rounded-full" style={{ background: "var(--primary)" }}></div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                {/* Abstract Phone Representation */}
                <div className="w-[280px] h-[580px] rounded-[48px] p-3 shadow-2xl relative" style={{ background: "var(--surface-container-highest)" }}>
                  <div className="w-full h-full rounded-[38px] overflow-hidden relative" style={{ background: "var(--surface)" }}>
                    
                    {/* Dynamic inner content based on tab */}
                    <div className="w-full h-full relative">
                      {activeTab === "dashboard" && (
                        <Image src="/bump.png" alt="Dashboard Screen" fill className="object-cover object-top" />
                      )}
                      {activeTab === "voice chat" && (
                        <Image src="/dashboard.png" alt="AI Chat Screen" fill className="object-cover object-top" />
                      )}
                      {activeTab === "nfc friends" && (
                        <Image src="/chat.png" alt="NFC Bump Screen" fill className="object-cover object-top" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto m3-card !rounded-[48px] p-12 text-center fade-in-up" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to level up?</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">Join the ecosystem where students manage assignments and master subjects with next-gen AI.</p>

          <Link
            href="https://github.com/anpuop1511/homework-helper/releases/latest"
            target="_blank"
            className="m3-button-filled inline-block text-xl shadow-xl hover:-translate-y-1"
          >
            Download Latest Release
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t" style={{ borderColor: "var(--outline-variant)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold" style={{ color: "var(--primary)" }}>
            HomeworkHelper
          </div>
          <div className="flex gap-8 text-sm font-medium" style={{ color: "var(--on-surface-variant)" }}>
            <Link href="https://github.com/anpuop1511/homework-helper" className="hover:text-current transition-colors">GitHub Repository</Link>
            <a href="#" className="hover:text-current transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-current transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}