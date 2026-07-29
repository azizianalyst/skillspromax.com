import type { Metadata } from "next";
import Link from "next/link";
import { promises, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Our promises",
  description:
    "The specific commitments SkillsProMax holds itself to — no guaranteed jobs, no false accreditation claims, published outcomes including the bad numbers.",
};

const detail: Record<string, string> = {
  "We will never guarantee you a job or an income.":
    "We do not control the job market and neither does any institute. What we can control is whether you finish with real, demonstrable ability and a portfolio of shipped work. Anyone offering you a guaranteed salary is selling you a feeling, not a skill.",
  "We will never claim an accreditation we do not hold.":
    "Private training institutes in Punjab are not legally required to hold NAVTTC or PSDA accreditation to operate. Some institutes imply government affiliation they do not have — students have received certificates with no verification behind them. If we hold a registration we will show you the certificate. If we do not, we will say so.",
  "We publish our real completion and earnings numbers after every batch, including the bad ones.":
    "After each batch we publish six figures: how many enrolled, how many completed, how many dropped, how many earned money within 90 days, the median first invoice, and how many earned nothing. Completion means the client deliverable shipped, not that attendance was adequate.",
  "Nobody passes by attendance alone. Assessment is on work produced.":
    "Some students will not pass. That is the point of an assessment. If everyone passes, the certificate means nothing and neither does the institute behind it.",
  "Our refund policy is written down, public, and honoured.":
    "Refund stonewalling is the single most common complaint against paid training providers in Pakistan. Ours is published, and we honour it without argument.",
  "If a program is not right for you, we will tell you before you pay.":
    "Including telling you to take a free government course instead, when that genuinely fits your situation better. We would rather lose a fee than take one we should not have.",
  "We will not teach a skill whose market is collapsing just because it is easy to sell.":
    "Basic content writing, translation and basic graphic design are easy to fill classes with and their rates have fallen sharply since generative AI arrived. Selling those courses now would be taking money for a skill we know is losing value.",
};

export default function PromisesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">Accountability</p>
          <h1 className="display-xl mt-5 max-w-3xl">Our promises, in full.</h1>
          <p className="lede mt-6 max-w-2xl">
            Written here so you can hold us to them. If we ever break one of these, email{" "}
            <a href={`mailto:${site.emails.support}`} className="text-accent hover:underline">
              {site.emails.support}
            </a>{" "}
            and say so plainly.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell section">
          <ol className="space-y-12">
            {promises.map((p, i) => (
              <li key={p} className="grid gap-5 border-t border-line pt-7 md:grid-cols-12">
                <span className="font-display text-3xl text-accent-line tnum md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl leading-snug text-ink md:col-span-5">{p}</h2>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:col-span-6">
                  {detail[p]}
                </p>
              </li>
            ))}
          </ol>

          <div className="card mt-16 max-w-2xl p-7">
            <h2 className="font-display text-xl">A note on the free alternatives</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              DigiSkills, NAVTTC and the e-Rozgaar centre at Govt. Graduate College Okara
              are free, and NAVTTC pays a monthly stipend. If your budget is the binding
              constraint, start there and finish it. We mean that. Our fee only makes sense
              if the structure, the supervision and the real client work are worth it to you.
            </p>
            <Link href="/why-us" className="btn btn-ghost mt-4 -ml-2">
              See the honest comparison →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
