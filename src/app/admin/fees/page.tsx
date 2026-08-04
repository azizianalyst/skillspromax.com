import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
import { formatDueDate, isOverdue, paymentMethodLabel } from "@/lib/fees";
import { VerifyButton } from "@/components/admin/verify-button";

export default async function FeesPage() {
  const payments = await db.feePayment.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    take: 100,
    include: {
      enrollment: {
        include: {
          student: { select: { rollNo: true, user: { select: { name: true } } } },
          batch: { select: { name: true, course: { select: { name: true } } } },
        },
      },
    },
  });

  return (
    <div className="space-y-7">
      <header>
        <h1 className="display-md">Fees</h1>
        <p className="mt-1 text-sm text-muted">
          Students submit JazzCash / Easypaisa / bank transaction IDs from the portal, or pay
          via JazzCash hosted checkout when merchant credentials are configured. Verify
          pending rows before treating them as paid.
        </p>
      </header>

      {payments.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-muted">No fee records yet.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                {["Student", "Programme", "Instalment", "Amount", "Due", "Method", "Reference", "Status", ""].map(
                  (h) => (
                    <th
                      key={h || "action"}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-faint"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-line)]">
              {payments.map((p) => {
                const overdue = isOverdue(p);
                const dueLabel = formatDueDate(p.dueDate);
                return (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">
                      {p.enrollment?.student.user.name ?? "—"}
                    </p>
                    <p className="text-xs text-muted">{p.enrollment?.student.rollNo}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-2">
                    {p.enrollment?.batch.course.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-ink-2">{p.label}</td>
                  <td className="px-4 py-3 tnum font-medium text-ink">{formatPkr(p.amount)}</td>
                  <td className="px-4 py-3">
                    {dueLabel ? (
                      <span
                        className={
                          overdue
                            ? "tnum text-xs font-medium text-[color:var(--color-danger)]"
                            : "tnum text-xs text-ink-2"
                        }
                      >
                        {dueLabel}
                        {overdue ? (
                          <span className="mt-0.5 block uppercase tracking-wide">Overdue</span>
                        ) : null}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {paymentMethodLabel(p.method)}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">
                    {p.reference ? (
                      <span className="tnum block text-ink-2">{p.reference}</span>
                    ) : (
                      "—"
                    )}
                    {p.gatewayRef ? (
                      <span className="tnum mt-0.5 block text-[0.65rem] text-faint">
                        gw: {p.gatewayRef}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3">
                    {p.status === "VERIFIED" ? (
                      <span className="chip chip-accent">Verified</span>
                    ) : overdue ? (
                      <span className="chip">Overdue</span>
                    ) : p.status === "PENDING" ? (
                      <span className="chip chip-amber">Pending</span>
                    ) : p.status === "FAILED" ? (
                      <span className="chip">Failed</span>
                    ) : (
                      <span className="chip">{p.status.toLowerCase()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {(p.status === "PENDING" ||
                      (p.status === "FAILED" && Boolean(p.reference?.trim()))) && (
                      <VerifyButton paymentId={p.id} />
                    )}
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
