import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ArrowLeft } from "lucide-react";
import { programs, campus } from "@/content/site";
import { formatPkr } from "@/lib/utils";

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return { title: "Program not found" };
  return {
    title: program.name,
    description: program.summary.slice(0, 155),
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const total = program.feeMonthly * program.feeMonths;

  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-12 md:py-16">
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
          >
            <ArrowLeft className="size-3.5" aria-hidden /> All programs
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{program.audience}</p>
              <h1 className="display-xl mt-5">{program.name}</h1>
              <p className="lede mt-6">{program.summary}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/apply?program=${program.slug}`} className="btn btn-primary btn-lg">
                  Apply for this program
                </Link>
                <Link href="/campus" className="btn btn-outline btn-lg">
                  Visit the campus
                </Link>
              </div>
            </div>

            {/* Facts panel */}
            <div className="lg:col-span-5">
              <div className="card">
                <dl className="divide-y divide-line">
                  {[
                    ["Duration", program.duration],
                    ["Commitment", program.commitment],
                    ["Entry requirement", program.entry],
                  ].map(([term, detail]) => (
                    <div key={term} className="px-6 py-4">
                      <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                        {term}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-ink-2">{detail}</dd>
                    </div>
                  ))}
                  <div className="bg-sand px-6 py-5">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                      Fee
                    </dt>
                    <dd className="mt-2">
                      <span className="font-display text-3xl tnum text-ink">
                        {formatPkr(program.feeMonthly)}
                      </span>
                      <span className="text-sm text-muted"> / month</span>
                      <span className="mt-1.5 block text-sm tnum text-muted">
                        {program.feeMonths} months · {formatPkr(total)} in total
                      </span>
                      <span className="mt-3 block text-xs leading-relaxed text-ink-2">
                        Billed monthly, never as one lump sum. Ask about instalments and
                        merit reductions for strong students.
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcome + honesty */}
      <section className="border-b border-line bg-sand">
        <div className="shell section grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">What you leave with</p>
            <h2 className="display-md mt-4">{program.outcome}</h2>
          </div>
          <div className="card p-6">
            <h3 className="font-sans text-sm font-semibold tracking-normal text-ink">
              And honestly
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
              {program.honestNote}
            </p>
            <p className="mt-5 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">
              We publish our real completion and earnings figures after every batch,
              including the students who earned nothing.{" "}
              <Link href="/outcomes" className="text-accent hover:underline">
                See our results →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="border-b border-line">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow">Curriculum</p>
            <h2 className="display-lg mt-5">What you will actually do.</h2>
          </div>

          <ol className="mt-12 space-y-8">
            {program.modules.map((m, i) => (
              <li key={m.title} className="grid gap-4 border-t border-line pt-6 md:grid-cols-12">
                <div className="md:col-span-1">
                  <span className="font-display text-2xl text-accent-line tnum">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-normal text-ink md:col-span-4">
                  {m.title}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:col-span-7">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fit */}
      <section className="border-b border-line bg-sand">
        <div className="shell section grid gap-10 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-xl">This is for you if</h2>
            <ul className="mt-5 space-y-3">
              {program.forYouIf.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-xl">This is not for you if</h2>
            <ul className="mt-5 space-y-3">
              {program.notForYouIf.map((item) => (
                <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2">
                  <X className="mt-0.5 size-4 shrink-0 text-muted" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-muted">
              We would rather turn you away now than take your fee for the wrong program.
              Call us and we will tell you straight.
            </p>
          </div>
        </div>
      </section>

      {/* Timings */}
      <section className="border-b border-line">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Timings</p>
              <h2 className="display-md mt-4">{campus.timings.heading}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
                {campus.timings.body}
              </p>
            </div>
            <div className="lg:col-span-8">
              <dl className="grid gap-6 sm:grid-cols-4">
                {campus.timings.slots.map((s) => (
                  <div key={s.label} className="border-t border-line pt-4">
                    <dt className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {s.label}
                    </dt>
                    <dd className="mt-2 text-sm tnum text-ink">{s.value}</dd>
                    <dd className="text-xs text-muted">{s.note}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 card p-5 text-[0.875rem] leading-relaxed text-ink-2">
                {campus.timings.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-white">
        <div className="shell py-14 md:py-20">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="display-md text-white">Ready, or still deciding?</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/70">
                Applying is free and commits you to nothing. Or come and see the halls
                first — walk in any day between 8 AM and 8 PM.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/apply?program=${program.slug}`}
                className="btn btn-lg bg-white text-ink hover:bg-white/90"
              >
                Apply now
              </Link>
              <Link
                href="/contact"
                className="btn btn-lg border border-white/25 text-white hover:bg-white/10"
              >
                Ask a question
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
