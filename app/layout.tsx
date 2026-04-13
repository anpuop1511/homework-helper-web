import type { Metadata } from "next";
import { Google_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homework Helper - Your AI Study Buddy",
  description: "Organize assignments, track study streaks, connect with friends, and learn faster with AI-powered homework help.",
  openGraph: {
    title: "Homework Helper",
    description: "Your AI Study Buddy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
