import type { Metadata } from "next";
import Link from "next/link";
import { differentiators, honestComparison, promises } from "@/content/site";
import { Comparison } from "@/components/home/comparison";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Why SkillsProMax — Not Another Free Course",
  description:
    "How SkillsProMax differs from DigiSkills and private institutes in Okara: small batches, real client work, published outcomes, separate halls, honest fees.",
  path: "/why-us",
});

export default function WhyUsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">Why us</p>
          <h1 className="display-xl mt-5 max-w-3xl">
            The training sector in Pakistan has a trust problem. It was earned.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Inflated placement statistics. Guaranteed-income marketing. Certificates with
            accreditation stamps that were never granted. We are starting in a market where
            people have good reason to be suspicious, so the only sensible strategy is to
            be verifiable.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <div className="max-w-2xl">
            <h2 className="display-lg">Six decisions that cost us money.</h2>
            <p className="lede mt-5">
              Anyone can claim to be different. These are the specific choices behind it —
              each one loses us students or margin, and we make it anyway.
            </p>
          </div>
          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {differentiators.map((item, i) => (
              <li key={item.title} className="border-t border-line pt-6">
                <span className="font-display text-2xl text-accent-line tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-sans text-[1.0625rem] font-semibold leading-snug tracking-normal text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Comparison />

      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow">Our promises</p>
            <h2 className="display-lg mt-5">Hold us to these.</h2>
            <p className="lede mt-5">
              A commitment you can check is worth more than a value you can only read.
            </p>
          </div>
          <ul className="mt-12 max-w-3xl">
            {promises.map((p, i) => (
              <li key={p} className="flex gap-5 border-b border-line py-5 first:border-t">
                <span className="font-display text-xl text-accent-line tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.0625rem] leading-relaxed text-ink">{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/apply" className="btn btn-primary mt-12">
            Apply for a seat
          </Link>
        </div>
      </section>
    </>
  );
}
