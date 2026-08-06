import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Proof } from "@/components/home/proof";
import { HowItWorks } from "@/components/home/how-it-works";
import { ProgramCards } from "@/components/home/program-cards";
import { SkillsModules } from "@/components/home/skills-modules";
import { Differentiators } from "@/components/home/differentiators";
import { Comparison } from "@/components/home/comparison";
import { FeesSection } from "@/components/home/fees-section";
import { FaqSection } from "@/components/home/faq-section";
import { PromisesStrip } from "@/components/home/promises-strip";
import { ApplySection } from "@/components/home/apply-section";
import { FinalCta } from "@/components/home/final-cta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI Automation & Digital Skills Course Dubai",
  description:
    "Live online AI and automation training from Dubai for students worldwide. Monthly fees in USD, small batches, real client work. Apply free — WhatsApp +92 329 1522376.",
  path: "/",
});

/**
 * Complete one-pager flow:
 * Trust → process → offer → curriculum depth → proof → price → FAQ → apply.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <HowItWorks />
      <ProgramCards />
      <SkillsModules />
      <Differentiators />
      <Comparison />
      <FeesSection />
      <FaqSection />
      <PromisesStrip />
      <ApplySection />
      <FinalCta />
    </>
  );
}
