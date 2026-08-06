import type { Metadata } from "next";
import { Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `AI Automation & Digital Skills Course Pakistan | ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Live online AI and automation training across Pakistan. Monthly fees, small batches, real client work. Apply free — WhatsApp +92 329 1522376.",
  keywords: [
    "AI automation course Pakistan",
    "digital skills course Pakistan",
    "freelancing course Pakistan",
    "online AI training Pakistan",
    "n8n course Pakistan",
    "SkillsProMax",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Skills that pay. Taught properly.`,
    description:
      "Live online AI and automation training across Pakistan. Monthly fees, small batches, real client work before you finish.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Skills that pay. Taught properly.`,
    description:
      "AI and automation training online across Pakistan. Apply free. WhatsApp +92 329 1522376.",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${libreBaskerville.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">{children}</body>
    </html>
  );
}
