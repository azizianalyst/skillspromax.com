import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

/** Deferred from phase-1 sitemap until real cohort numbers exist. */
export const metadata: Metadata = pageMeta({
  title: "Our Results — Published Outcomes",
  description:
    "SkillsProMax will publish enrolled, completed, earned, and earned-nothing numbers after every batch — including bad batches.",
  path: "/outcomes",
  index: false,
});

const metrics = [
  ["Enrolled", "How many students started the batch."],
  ["Completed", "How many shipped their client deliverable. Attendance alone does not count as completion."],
  ["Dropped out", "How many left before finishing, for any reason."],
  ["Earned within 90 days", "How many earned any money from the skill within three months of finishing."],
  ["Median first invoice", "The middle value of graduates' first paid invoice — not the best one."],
  ["Earned nothing", "How many had earned nothing at the 90-day mark. We publish this number deliberately."],
];

export default function OutcomesPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">Accountability</p>
          <h1 className="display-xl mt-5 max-w-3xl">
            We publish our real numbers. Including the bad ones.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            Almost every institute in Pakistan advertises a placement percentage. Very few
            will tell you how it was calculated. We are going to do this differently, and
            we are writing down the method before we have any results — so we cannot
            quietly change the definition later to make ourselves look better.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <div className="max-w-2xl">
            <h2 className="display-lg">The six figures, defined in advance.</h2>
            <p className="lede mt-5">
              After every batch, these six numbers get published on this page.
            </p>
          </div>
          <dl className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {metrics.map(([term, definition], i) => (
              <div key={term} className="border-t border-line pt-5">
                <dt className="flex items-baseline gap-3">
                  <span className="font-display text-xl text-accent-line tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-[0.9375rem] font-semibold tracking-normal text-ink">
                    {term}
                  </span>
                </dt>
                <dd className="mt-2 pl-9 text-[0.875rem] leading-relaxed text-muted">
                  {definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="shell section">
          <div className="card max-w-2xl p-8">
            <span className="chip chip-amber">No results yet</span>
            <h2 className="display-md mt-5">Our first batch has not finished.</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              We are a new institute. There is nothing to publish here yet, and we are not
              going to fill this page with borrowed statistics or stock testimonials while
              we wait.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              The first figures will appear here roughly 90 days after our first batch
              completes. If you are considering enrolling before then, you are taking a
              chance on us — and you should factor that into your decision. Ask us hard
              questions on the phone or at the campus. Ask who is teaching you and what they
              have actually built.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/promises" className="btn btn-outline">Read our promises</Link>
              <a href={`mailto:${site.emails.info}`} className="btn btn-ghost">
                Ask us anything →
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
