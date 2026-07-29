import type { Metadata } from "next";
import Link from "next/link";
import { programs, site } from "@/content/site";
import { formatPkr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admissions & fees",
  description:
    "How admission works at SkillsProMax: apply free, a phone call, an entry assessment, then enrolment. Fees are billed monthly with instalments and merit reductions available.",
};

const steps = [
  {
    title: "Apply online, or walk in",
    body: "There is no application fee and applying commits you to nothing. If you would rather not use the form, call us or come to the campus and we will fill it in with you.",
  },
  {
    title: "A phone call within two working days",
    body: "We explain the program, the fees and the timings, and answer your questions. We will also tell you honestly if a different program suits you better — or if a free government course is the more sensible choice for your situation right now.",
  },
  {
    title: "Entry assessment",
    body: "A short assessment at the campus: basic reasoning, written English, and how you approach a problem. No coding. It is not designed to fail you — it is designed to place you at the right level, and to make sure you are not paying for something you are not ready for.",
  },
  {
    title: "Offer and batch placement",
    body: "If you pass, we offer you a seat in a specific batch — boys and girls in separate halls, at a timing that fits your college or work. Not everyone is offered a seat.",
  },
  {
    title: "First month's fee, and you start",
    body: "You pay the first month only. No large upfront amount, ever.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="shell py-14 md:py-20">
          <p className="eyebrow">Admissions</p>
          <h1 className="display-xl mt-5 max-w-3xl">How admission works.</h1>
          <p className="lede mt-6 max-w-2xl">
            Five steps, no hidden charges, and a real assessment in the middle. We tell you
            where you stand before you spend anything.
          </p>
          <Link href="/apply" className="btn btn-primary btn-lg mt-9">
            Start an application
          </Link>
        </div>
      </section>

      <section className="border-b border-line bg-sand">
        <div className="shell section">
          <ol className="space-y-10">
            {steps.map((s, i) => (
              <li key={s.title} className="grid gap-5 border-t border-line pt-7 md:grid-cols-12">
                <span className="font-display text-3xl text-accent-line tnum md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display text-xl leading-snug text-ink md:col-span-4">
                  {s.title}
                </h2>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:col-span-7">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fees */}
      <section className="border-b border-line">
        <div className="shell section">
          <div className="max-w-2xl">
            <p className="eyebrow">Fees</p>
            <h2 className="display-lg mt-5">Every fee, in one place.</h2>
            <p className="lede mt-5">
              Charged monthly. No admission fee, no registration fee, no examination fee,
              no certificate fee. If a cost is not on this page, we do not charge it.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-y border-line-strong">
                  {["Program", "Monthly fee", "Months", "Total"].map((h) => (
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
                  <tr key={p.slug} className="border-b border-line">
                    <th scope="row" className="py-5 pr-6 text-left">
                      <Link href={`/programs/${p.slug}`} className="font-medium text-ink hover:text-accent">
                        {p.name}
                      </Link>
                      <span className="mt-0.5 block text-xs font-normal text-muted">
                        {p.duration}
                      </span>
                    </th>
                    <td className="py-5 pr-6 tnum text-ink">{formatPkr(p.feeMonthly)}</td>
                    <td className="py-5 pr-6 tnum text-muted">{p.feeMonths}</td>
                    <td className="py-5 tnum font-medium text-ink">
                      {formatPkr(p.feeMonthly * p.feeMonths)}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-line">
                  <th scope="row" className="py-5 pr-6 text-left font-medium text-ink">
                    Weekend workshop
                    <span className="mt-0.5 block text-xs font-normal text-muted">Two days</span>
                  </th>
                  <td className="py-5 pr-6 tnum text-ink">{formatPkr(3500)}</td>
                  <td className="py-5 pr-6 text-muted">—</td>
                  <td className="py-5 tnum font-medium text-ink">{formatPkr(3500)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <h3 className="font-display text-lg">Instalments</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-2">
                Fees are already monthly. If a particular month is difficult, talk to us
                before the due date rather than after — we can usually arrange something.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg">Merit reductions</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-2">
                Students who perform strongly in Foundation receive a reduction of 20–30%
                on the next program. Earned, not negotiated.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="font-display text-lg">Harvest season</h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-2">
                If income is seasonal, tell us at enrolment and we will plan your fee
                calendar around it rather than lose you halfway.
              </p>
            </div>
          </div>

          <p className="mt-10 text-sm leading-relaxed text-muted">
            Fees may be subject to Punjab sales tax on services depending on how the
            program is classified. Any applicable tax is included in the figures above —
            we will not add a charge later.
          </p>
        </div>
      </section>

      <section className="bg-sand">
        <div className="shell section">
          <div className="card max-w-2xl p-8">
            <h2 className="display-md">Not sure which program?</h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-2">
              Call us and describe your situation — what you have studied, what you can
              commit to, and what you need to be earning. We will tell you which rung of the
              ladder you belong on, even if the answer is &ldquo;not with us, not yet&rdquo;.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={site.phone.href} className="btn btn-primary">{site.phone.display}</a>
              <Link href="/apply" className="btn btn-outline">Apply anyway — it is free</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
