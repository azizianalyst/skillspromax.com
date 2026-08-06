import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `AI Automation & Digital Skills Course Dubai | ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Live online AI and automation training from Dubai across the UAE. Monthly fees in AED, small batches, real client work. Apply free — WhatsApp +92 329 1522376.",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Skills that pay.`,
    description:
      "Live online AI and automation training from Dubai across the UAE. Monthly fees in AED, small batches, real client work.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Skills that pay.`,
    description:
      "AI and automation training online from Dubai. Apply free. WhatsApp +92 329 1522376.",
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
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">{children}</body>
    </html>
  );
}
