import type { Metadata } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Anushidh — Software Engineer",
    template: "%s | Anushidh",
  },
  description:
    "Software engineer specializing in scalable web applications with React, Angular, NestJS, Express, TypeScript, and MongoDB.",
  keywords: [
    "software engineer",
    "full stack developer",
    "React",
    "Node.js",
    "TypeScript",
    "MongoDB",
  ],
  authors: [{ name: "Anushidh" }],
  creator: "Anushidh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anushidh.dev",
    siteName: "Anushidh",
    title: "Anushidh — Software Engineer",
    description:
      "Software engineer specializing in scalable web applications with React, Angular, NestJS, Express, TypeScript, and MongoDB.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anushidh — Software Engineer",
    description:
      "Software engineer specializing in scalable web applications with React, Angular, NestJS, Express, TypeScript, and MongoDB.",
    creator: "@anushidh",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
