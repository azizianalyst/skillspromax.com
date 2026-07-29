import { Hero } from "@/components/home/hero";
import { Proof } from "@/components/home/proof";
import { Differentiators } from "@/components/home/differentiators";
import { ProgramCards } from "@/components/home/program-cards";
import { Comparison } from "@/components/home/comparison";
import { CampusPreview } from "@/components/home/campus-preview";
import { BusinessTeaser } from "@/components/home/business-teaser";
import { PromisesStrip } from "@/components/home/promises-strip";
import { FinalCta } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <Differentiators />
      <ProgramCards />
      <Comparison />
      <CampusPreview />
      <BusinessTeaser />
      <PromisesStrip />
      <FinalCta />
    </>
  );
}
