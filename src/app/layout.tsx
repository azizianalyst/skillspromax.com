import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Digital & AI skills training, Depalpur, Okara`,
    template: `%s · ${site.name}`,
  },
  description:
    "Professional AI, automation and digital skills training in Tehsil Depalpur, District Okara. Separate halls for boys and girls, flexible timings, monthly fees, and real client work before you finish.",
  keywords: [
    "AI training Okara",
    "digital skills Depalpur",
    "freelancing course Okara",
    "automation training Pakistan",
    "computer institute Depalpur",
    "SkillsProMax",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Skills that pay. Taught properly.`,
    description:
      "AI, automation and digital skills training in Tehsil Depalpur, District Okara. Real client work, honest outcomes, separate halls for boys and girls.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">{children}</body>
    </html>
  );
}
