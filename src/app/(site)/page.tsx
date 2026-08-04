import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Proof } from "@/components/home/proof";
import { Differentiators } from "@/components/home/differentiators";
import { ProgramCards } from "@/components/home/program-cards";
import { HowItWorks } from "@/components/home/how-it-works";
import { Comparison } from "@/components/home/comparison";
import { FeesSection } from "@/components/home/fees-section";
import { FaqSection } from "@/components/home/faq-section";
import { ApplySection } from "@/components/home/apply-section";
import { PromisesStrip } from "@/components/home/promises-strip";
import { FinalCta } from "@/components/home/final-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Automation & Digital Skills Course Pakistan",
  description:
    "Live online AI and automation training across Pakistan. Monthly fees, small batches, real client work. Apply free — WhatsApp +92 329 1522376.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <HowItWorks />
      <ProgramCards />
      <Differentiators />
      <Comparison />
      <FeesSection />
      <FaqSection />
      <ApplySection />
      <PromisesStrip />
      <FinalCta />
    </>
  );
}
