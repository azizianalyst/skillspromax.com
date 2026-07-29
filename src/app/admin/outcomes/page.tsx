import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
import { OutcomeForm } from "@/components/admin/outcome-form";

export default async function OutcomesPage() {
  const outcomes = await db.cohortOutcome.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="space-y-9">
      <header>
        <h1 className="display-md">Outcomes</h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">
          This page is the brand. Publish every cohort&apos;s real numbers — enrolled, completed,
          dropped, earned within 90 days, and{" "}
          <span className="font-medium text-ink-2">how many earned nothing</span>. Including the
          bad batches is what separates us from everyone else in this district.
        </p>
      </header>

      <div className="grid gap-9 lg:grid-cols-12">
        <section className="lg:col-span-5">
          <h2 className="mb-4 font-sans text-sm font-semibold text-ink">Publish a cohort</h2>
          <OutcomeForm />
        </section>

        <section className="lg:col-span-7">
          <h2 className="mb-4 font-sans text-sm font-semibold text-ink">
            Published ({outcomes.length})
          </h2>
          {outcomes.length === 0 ? (
            <div className="card p-10 text-center">
              <p className="text-sm text-muted">
                No outcomes published yet. The first cohort&apos;s numbers go here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {outcomes.map((o) => {
                const rate = o.enrolled > 0 ? Math.round((o.completed / o.enrolled) * 100) : 0;
                return (
                  <article key={o.id} className="card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{o.batchLabel}</p>
                        <p className="text-xs text-muted">{o.courseName}</p>
                      </div>
                      <p className="text-xs text-faint">
                        {o.publishedAt.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:grid-cols-6">
                      {[
                        ["Enrolled", o.enrolled],
                        ["Completed", o.completed],
                        ["Dropped", o.dropped],
                        ["Earned 90d", o.earnedWithin90Days],
                        ["Earned nil", o.earnedNothing],
                        ["Hired by us", o.hiredByUs],
                      ].map(([label, val]) => (
                        <div key={label as string} className="rounded-[var(--radius-sm)] bg-sand/70 p-2.5">
                          <p className="font-display text-xl tnum text-ink">{val}</p>
                          <p className="mt-0.5 text-[0.625rem] uppercase tracking-wider text-faint">
                            {label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted">
                      Completion {rate}% · median first invoice{" "}
                      {o.medianFirstInvoice ? formatPkr(o.medianFirstInvoice) : "—"}
                    </p>
                    {o.notes && (
                      <p className="mt-2 border-t border-line pt-2 text-[0.8125rem] leading-relaxed text-ink-2">
                        {o.notes}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
