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
    default: "Anushidh — Full Stack Developer",
    template: "%s | Anushidh",
  },
  description:
    "Full stack developer specializing in scalable web applications with React, Angular, NestJS, Express, Fastify, TypeScript, MongoDB, and PostgreSQL.",
  keywords: [
    "full stack developer",
    "software engineer",
    "React",
    "Angular",
    "NestJS",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [{ name: "Anushidh" }],
  creator: "Anushidh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anushidh.dev",
    siteName: "Anushidh",
    title: "Anushidh — Full Stack Developer",
    description:
      "Full stack developer specializing in scalable web applications with React, Angular, NestJS, Express, Fastify, TypeScript, MongoDB, and PostgreSQL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anushidh — Full Stack Developer",
    description:
      "Full stack developer specializing in scalable web applications with React, Angular, NestJS, Express, Fastify, TypeScript, MongoDB, and PostgreSQL.",
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
