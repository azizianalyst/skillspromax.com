import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs, workshops } from "@/content/site";
import { formatPkr } from "@/lib/utils";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI & Digital Skills Programs Depalpur",
  description:
    "Foundation, AI Automation Practitioner, Re-skill, and Advance — one ladder in Depalpur, Okara. Monthly fees, separate boys and girls batches, real client work.",
  path: "/programs",
});

const statusLabel: Record<string, string> = {
  open: "Admissions open",
  waitlist: "Waitlist",
  planned: "Coming soon",
};

export default function ProgramsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">Programs</p>
          <h1 className="display-lg mt-5 max-w-2xl">
            One ladder, four rungs. Start where you actually are.
          </h1>
          <p className="lede mt-6 max-w-2xl">
            We deliberately do not run a catalogue of twenty unrelated courses. We teach
            one subject properly, at four levels, so you can enter at your level and climb.
            Free government programs are wide and shallow. We would rather go deep.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <h2 className="display-md">Compare at a glance</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-line-strong">
                  {["Program", "Who it is for", "Length", "Commitment", "Fee", ""].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programs.map((p) => (
                  <tr key={p.slug} className="border-b border-line align-top">
                    <th scope="row" className="py-5 pr-6 font-display text-lg font-normal text-ink">
                      {p.name}
                      <span
                        className={`mt-2 block w-fit ${p.status === "open" ? "chip chip-accent" : "chip chip-amber"}`}
                      >
                        {statusLabel[p.status]}
                      </span>
                    </th>
                    <td className="py-5 pr-6 text-muted">{p.audience}</td>
                    <td className="py-5 pr-6 text-ink-2">{p.duration}</td>
                    <td className="py-5 pr-6 text-muted">{p.commitment}</td>
                    <td className="py-5 pr-6 tnum text-ink">
                      {formatPkr(p.feeMonthly)}<span className="text-muted">/mo</span>
                      <span className="block text-xs text-muted">
                        {formatPkr(p.feeMonthly * p.feeMonths)} total
                      </span>
                    </td>
                    <td className="py-5">
                      <Link
                        href={`/programs/${p.slug}`}
                        className="inline-flex items-center gap-1 whitespace-nowrap font-medium text-accent hover:underline"
                      >
                        Details <ArrowRight className="size-3.5" aria-hidden />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-muted">
            All fees are billed monthly. Ask about instalments and merit reductions.
          </p>
        </div>
      </section>

      {/* Detail cards */}
      <section className="border-b border-line">
        <div className="shell section space-y-16">
          {programs.map((p, i) => (
            <article key={p.slug} className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="font-display text-2xl text-accent-line tnum">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display-md mt-2">{p.name}</h2>
                <p className="mt-2 text-sm text-muted">{p.audience}</p>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{p.summary}</p>
                <Link
                  href={`/apply?program=${p.slug}`}
                  className="btn btn-primary mt-6"
                >
                  Apply for {p.name}
                </Link>
              </div>

              <div className="lg:col-span-8">
                <div className="card p-6">
                  <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
                    What you leave with
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{p.outcome}</p>
                  <p className="mt-5 border-t border-line pt-5 text-[0.875rem] leading-relaxed text-muted">
                    <strong className="text-ink">Honestly: </strong>
                    {p.honestNote}
                  </p>
                </div>

                <ul className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                  {p.modules.map((m) => (
                    <li key={m.title} className="border-t border-line pt-4">
                      <h4 className="text-sm font-semibold text-ink">{m.title}</h4>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{m.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Workshops */}
      <section id="workshops" className="bg-sand">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Try us first</p>
              <h2 className="display-md mt-4">{workshops.heading}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{workshops.body}</p>
              <p className="mt-5 font-display text-3xl text-accent tnum">
                {formatPkr(workshops.fee)}
              </p>
              <p className="text-xs text-muted">per workshop · two days</p>
              <Link href="/contact" className="btn btn-outline mt-6">
                Ask about the next date
              </Link>
            </div>
            <ul className="grid gap-5 lg:col-span-8 sm:grid-cols-2">
              {workshops.items.map((w) => (
                <li key={w.title} className="card p-5">
                  <h3 className="text-sm font-semibold text-ink">{w.title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{w.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
