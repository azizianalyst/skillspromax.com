import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `AI Automation & Digital Skills Course Dubai | ${site.name}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Live online AI and automation training from Dubai for students worldwide. Monthly fees in USD, small batches, real client work. Apply free — WhatsApp +971 50 208 3909.",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Skills that pay.`,
    description:
      "Live online AI and automation training from Dubai for students worldwide. Monthly fees in USD, small batches, real client work.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Skills that pay.`,
    description:
      "AI and automation training online from Dubai. Join from anywhere. Apply free. WhatsApp +971 50 208 3909.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">{children}</body>
    </html>
  );
}
