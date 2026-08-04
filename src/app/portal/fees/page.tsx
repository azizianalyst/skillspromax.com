import Link from "next/link";
import { requireStudent } from "@/lib/student";
import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
import {
  formatDueDate,
  isAwaitingVerification,
  isOverdue,
  needsStudentPayment,
  outstandingTotal,
  paymentMethodLabel,
  paymentStatusLabel,
} from "@/lib/fees";

export default async function PortalFeesPage({
  searchParams,
}: {
  searchParams: Promise<{ submitted?: string; paid?: string; failed?: string }>;
}) {
  const params = await searchParams;
  const { profile } = await requireStudent();

  const enrollments = await db.enrollment.findMany({
    where: { studentId: profile.id },
    orderBy: { enrolledAt: "desc" },
    include: {
      payments: { orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }] },
      batch: { include: { course: true } },
    },
  });

  return (
    <div className="space-y-7">
      <header>
        <h1 className="display-md">Fees</h1>
        <p className="mt-2 text-sm text-muted">
          Pay online with JazzCash when available, or submit a transaction ID for staff
          verification.
        </p>
      </header>

      {params.submitted === "1" && (
        <div
          role="status"
          className="rounded-[var(--radius-sm)] border border-line bg-sand px-4 py-3 text-sm text-ink-2"
        >
          Payment submitted. Staff will verify it shortly — usually within one working day.
        </div>
      )}
      {params.paid === "1" && (
        <div
          role="status"
          className="rounded-[var(--radius-sm)] border border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent-soft)] px-4 py-3 text-sm text-ink"
        >
          JazzCash payment received and verified. Thank you.
        </div>
      )}
      {params.failed === "1" && (
        <div
          role="alert"
          className="rounded-[var(--radius-sm)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] px-4 py-3 text-sm text-[color:var(--color-danger)]"
        >
          JazzCash payment was not completed. You can try again or submit a transaction ID
          manually.
        </div>
      )}

      {enrollments.length === 0 ? (
        <div className="card p-8 text-center text-sm text-muted">No fee records yet.</div>
      ) : (
        enrollments.map((enrollment) => (
          <section key={enrollment.id} className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-6">
              <div>
                <h2 className="font-display text-lg text-ink">
                  {enrollment.batch.course.name}
                </h2>
                <p className="text-sm text-muted">{enrollment.batch.name}</p>
              </div>
              <p className="text-sm text-muted">
                Outstanding{" "}
                <span className="tnum font-semibold text-ink">
                  {formatPkr(outstandingTotal(enrollment))}
                </span>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <caption className="sr-only">
                  Fee instalments for {enrollment.batch.course.name}
                </caption>
                <thead>
                  <tr className="border-b border-line text-left">
                    {["Instalment", "Amount", "Due", "Method", "Status", ""].map((h) => (
                      <th
                        key={h || "action"}
                        className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-faint md:px-6"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--color-line)]">
                  {enrollment.payments.map((p) => {
                    const awaiting = isAwaitingVerification(p);
                    const canPay = needsStudentPayment(p);
                    const overdue = isOverdue(p);
                    const dueLabel = formatDueDate(p.dueDate);
                    return (
                      <tr key={p.id}>
                        <td className="px-5 py-3 font-medium text-ink md:px-6">{p.label}</td>
                        <td className="px-5 py-3 tnum text-ink-2 md:px-6">
                          {formatPkr(p.amount)}
                        </td>
                        <td className="px-5 py-3 md:px-6">
                          {dueLabel ? (
                            <span
                              className={
                                overdue
                                  ? "tnum font-medium text-[color:var(--color-danger)]"
                                  : "tnum text-ink-2"
                              }
                            >
                              {dueLabel}
                              {overdue ? (
                                <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide">
                                  Overdue
                                </span>
                              ) : null}
                            </span>
                          ) : (
                            <span className="text-muted">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-muted md:px-6">
                          {paymentMethodLabel(p.method)}
                          {p.reference ? (
                            <span className="mt-0.5 block text-xs tnum">{p.reference}</span>
                          ) : null}
                        </td>
                        <td className="px-5 py-3 md:px-6">
                          {p.status === "VERIFIED" ? (
                            <span className="chip chip-accent">Verified</span>
                          ) : awaiting ? (
                            <span className="chip chip-amber">Awaiting verification</span>
                          ) : overdue ? (
                            <span className="chip">Overdue</span>
                          ) : p.status === "PENDING" ? (
                            <span className="chip chip-amber">Pending</span>
                          ) : p.status === "FAILED" ? (
                            <span className="chip">Failed</span>
                          ) : (
                            <span className="chip">{paymentStatusLabel(p.status)}</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right md:px-6">
                          {p.status === "VERIFIED" ? (
                            <Link
                              href={`/portal/fees/${p.id}/receipt`}
                              className="text-sm font-medium text-accent hover:underline"
                            >
                              Receipt
                            </Link>
                          ) : canPay ? (
                            <Link
                              href={`/portal/fees/${p.id}`}
                              className="text-sm font-medium text-accent hover:underline"
                            >
                              Pay
                            </Link>
                          ) : (
                            <Link
                              href={`/portal/fees/${p.id}`}
                              className="text-sm font-medium text-accent hover:underline"
                            >
                              Status
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </div>
  );
}
