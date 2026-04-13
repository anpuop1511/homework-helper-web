"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--outline-variant)", marginBottom: isOpen ? "1rem" : "0" }}>
      <button 
        className="w-full text-left py-5 flex justify-between items-center focus:outline-none transition-opacity hover:opacity-80"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-xl font-bold pr-4" style={{ color: "var(--on-surface)" }}>{question}</h4>
        <span 
          className="text-3xl font-light transform transition-transform duration-300" 
          style={{ color: "var(--primary)", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-lg leading-relaxed pb-6" style={{ color: "var(--on-surface-variant)" }}>
          {answer}
        </p>
      </div>
    </div>
  );
};

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
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("auto");

  useEffect(() => {
    // Check initial system preference or localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", isSystemDark ? "dark" : "light");
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" || (theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches) 
      ? "light" 
      : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

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
            <button onClick={toggleTheme} className="text-2xl hover:scale-110 transition-transform" title="Toggle Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
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
          
          <Link href="/app/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform" style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)" }}>
            <span className="flex w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            🎉 We're live on the Web! Try out Homework Helper directly in your browser.
          </Link>

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
            <Link 
              href="/app/" 
              className="m3-button-tonal text-lg w-full sm:w-auto text-center font-bold text-blue-500 hover:scale-105 transition-transform"
            >
              Launch Web App 🚀
            </Link>
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

      {/* Community & iOS Specific Features */}
      <section className="py-24 px-6 relative z-10" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 fade-in-up">
          
          {/* iOS Install Card */}
          <div className="flex-1 m3-card !rounded-3xl p-10 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-4xl mb-6">🍎</div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 pb-2">Native on iPhone</h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: "var(--on-surface-variant)" }}>
                You don't have to wait for the App Store. Because our Web App is fully PWA-supported, 
                you can install Homework Helper onto your home screen instantly. It runs in full-screen 
                and feels just like a native iOS app.
              </p>
              
              <ol className="space-y-4 font-medium" style={{ color: "var(--on-surface)" }}>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>1</span>
                  Open our site using Safari
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>2</span>
                  Tap the <b className="px-2 py-1 rounded bg-gray-500/20 text-sm flex items-center">Share <svg className="w-4 h-4 ml-1 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg></b> icon at the bottom
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full" style={{ background: "var(--primary-container)", color: "var(--on-primary-container)" }}>3</span>
                  Scroll down and tap <b>"Add to Home Screen"</b>
                </li>
              </ol>
            </div>
            {/* Decoration */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ background: "var(--primary)" }}></div>
          </div>

          {/* Open Source Card */}
          <div className="flex-1 m3-card !rounded-3xl p-10 md:p-12 relative overflow-hidden" style={{ background: "var(--secondary-container)", color: "var(--on-secondary-container)" }}>
            <div className="relative z-10">
              <div className="text-4xl mb-6">💻</div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 pb-2">100% Open Source</h2>
              <p className="text-lg leading-relaxed mb-6 opacity-90">
                Homework Helper is built transparently in the open. 
                Whether you want to audit our security, report an issue, or contribute 
                a new feature to help fellow students, you're welcome to jump into the code.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  href="https://github.com/anpuop1511/homework-helper" 
                  target="_blank"
                  className="px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                  style={{ background: "var(--on-secondary-container)", color: "var(--secondary-container)" }}
                >
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  View the Code
                </Link>
                <Link 
                  href="https://github.com/anpuop1511/homework-helper/issues" 
                  target="_blank"
                  className="px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-colors hover:bg-black/10"
                >
                  🐞 Report a Bug
                </Link>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full opacity-10 pointer-events-none" style={{ background: "var(--on-secondary-container)" }}></div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto fade-in-up">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl" style={{ color: "var(--on-surface-variant)" }}>Everything you need to know about the app.</p>
          </div>

          <div className="space-y-12">
            {/* General Questions */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-3" style={{ color: "var(--primary)" }}>
                <span className="text-3xl">🌎</span> General Questions
              </h3>
              <div className="m3-card !rounded-3xl p-6 md:p-8">
                <FAQItem 
                  question="Is Homework Helper free?" 
                  answer="Yes! All core features of Homework Helper, including task tracking, AI voice chat, and the social quad are completely free to use." 
                />
                <FAQItem 
                  question="How does the AI Voice Chat work?" 
                  answer="We integrate with Google's Gemini AI. When you ask a question using your microphone, Gemini analyzes it and provides a spoken, step-by-step educational breakdown right back to you." 
                />
                <FAQItem 
                  question="Is my data shared or sold?" 
                  answer="Absolutely not. Your assignment data is securely stored using Firebase solely for syncing across your own devices. We never sell your study habits." 
                />
              </div>
            </div>

            {/* iOS Questions */}
            <div>
              <h3 className="text-2xl font-extrabold mb-6 flex items-center gap-3" style={{ color: "var(--primary)" }}>
                <span className="text-3xl">🍎</span> iPhone & Waitlist
              </h3>
              <div className="m3-card !rounded-3xl p-6 md:p-8">
                <FAQItem 
                  question="Can I download the app on my iPhone?" 
                  answer="Currently, the native mobile app is exclusive to Android. However, iOS users can access the fully-featured Web App directly from Safari just by going to our website!" 
                />
                <FAQItem 
                  question="Will there be an iOS App Store release?" 
                  answer="Native Apple development is currently on hold due to the $99/year Apple Developer fee. However, as our user base grows, we definitely plan to release an official iOS version! For now, the Web App is fully optimized for Safari on iPhone." 
                />
                <FAQItem 
                  question="Do the NFC bump features work on the Web App for iPhone?" 
                  answer="NFC bumping requires deep hardware access which standard web browsers don't support yet. Web users can still join groups via invite links or QR codes." 
                />
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

      {/* Developer Note */}
      <section className="py-12 border-t" style={{ borderColor: "var(--outline-variant)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-lg" style={{ color: "var(--on-surface-variant)" }}>
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <span className="text-3xl">👨‍💻</span>
            <div>
              <p className="font-bold mb-1" style={{ color: "var(--on-surface)" }}>Crafted with ☕ and code.</p>
              <p className="text-sm">Built to make studying smarter, not harder.</p>
            </div>
          </div>
          <div className="bg-blue-500/10 px-4 py-2 rounded-full font-medium" style={{ color: "var(--primary)" }}>
            Made for Students, by Students 🎒
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t" style={{ borderColor: "var(--outline-variant)", background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-6">
          <div className="text-xl font-bold" style={{ color: "var(--primary)" }}>
            HomeworkHelper
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium" style={{ color: "var(--on-surface-variant)" }}>
            <Link href="https://github.com/anpuop1511/homework-helper" target="_blank" className="hover:text-current transition-colors">GitHub Repository</Link>
            <Link href="/changelog" className="hover:text-current transition-colors">Changelog</Link>
            <Link href="/privacy" className="hover:text-current transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-current transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}