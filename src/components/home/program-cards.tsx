import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programs, workshops } from "@/content/site";
import { formatPkr } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  open: "Admissions open",
  waitlist: "Waitlist",
  planned: "Coming soon",
};

export function ProgramCards() {
  return (
    <section id="programs" className="border-b border-line bg-sand">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Programs</p>
            <h2 className="display-lg mt-5">Start where you actually are.</h2>
            <p className="lede mt-5">
              Four programs on one ladder — not a catalogue of unrelated courses. Complete
              beginners start at Foundation. People already freelancing start at Re-skill.
              People in jobs take Advance in the evenings.
            </p>
          </div>
          <Link href="/programs" className="btn btn-outline">
            Compare all programs
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {programs.map((p) => (
            <article key={p.slug} className="card card-hover flex flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="display-md">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-muted">{p.audience}</p>
                </div>
                <span className={p.status === "open" ? "chip chip-accent" : "chip chip-amber"}>
                  {statusLabel[p.status]}
                </span>
              </div>

              <p className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                {p.summary}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-faint">Duration</dt>
                  <dd className="mt-1 text-ink">{p.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-faint">Fee</dt>
                  <dd className="mt-1 text-ink tnum">
                    {formatPkr(p.feeMonthly)}<span className="text-muted">/month</span>
                    <span className="block text-xs text-muted">
                      {p.feeMonths} months · {formatPkr(p.feeMonthly * p.feeMonths)} total
                    </span>
                  </dd>
                </div>
              </dl>

              <Link
                href={`/programs/${p.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
              >
                Full curriculum and honest outcomes
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </article>
          ))}
        </div>

        {/* Workshops */}
        <div id="workshops" className="card mt-5 p-7">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h3 className="display-md">{workshops.heading}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{workshops.body}</p>
              <p className="mt-4 font-display text-2xl text-accent tnum">
                {formatPkr(workshops.fee)}
              </p>
              <p className="text-xs text-muted">per workshop · two days</p>
            </div>
            <ul className="grid gap-4 lg:col-span-8 sm:grid-cols-2">
              {workshops.items.map((w) => (
                <li key={w.title} className="border-t border-line pt-4">
                  <h4 className="text-sm font-semibold text-ink">{w.title}</h4>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{w.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
