import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Skills that pay. Taught properly.`,
    description:
      "Live online AI and automation training across Pakistan. Monthly fees, small batches, real client work.",
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
    <html lang="en" className={manrope.variable}>
      <body className="flex min-h-dvh flex-col antialiased">{children}</body>
    </html>
  );
}
