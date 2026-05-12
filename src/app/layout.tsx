import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vanshgupta.dev"),
  title: {
    default: "Vansh Gupta | AI/ML & Agentic AI Engineer",
    template: "%s | Vansh Gupta"
  },
  description:
    "Premium developer portfolio for Vansh Gupta, an AI/ML, GenAI, VLM, and agentic systems developer building intelligent products and research-driven systems.",
  keywords: [
    "Vansh Gupta",
    "AI engineer",
    "ML engineer",
    "Agentic AI",
    "GenAI",
    "VLM",
    "LLM",
    "IIIT Bhopal",
    "portfolio"
  ],
  authors: [{ name: "Vansh Gupta" }],
  creator: "Vansh Gupta",
  openGraph: {
    title: "Vansh Gupta | AI/ML & Agentic AI Engineer",
    description:
      "AI-first portfolio showcasing agentic systems, ML pipelines, hackathon wins, and production-minded projects.",
    url: "https://vanshgupta.dev",
    siteName: "Vansh Gupta Portfolio",
    images: [
      {
        url: "https://opengraph.githubassets.com/vanshgupta/vansh7266/vansh7266",
        width: 1200,
        height: 630,
        alt: "Vansh Gupta GitHub profile"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vansh Gupta | AI/ML & Agentic AI Engineer",
    description:
      "Building intelligent systems with LLMs, VLMs, RL environments, and production AI apps."
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
