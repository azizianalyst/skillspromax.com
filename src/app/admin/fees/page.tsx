import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
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
          Verify each payment manually before marking it confirmed. {`(JazzCash / Easypaisa
          callback verification comes with payment integration — Phase 4.)`}
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
                {["Student", "Programme", "Instalment", "Amount", "Method", "Status", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-faint"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-line)]">
              {payments.map((p) => (
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
                  <td className="px-4 py-3 capitalize text-muted">
                    {p.method.toLowerCase().replace("_", " ")}
                  </td>
                  <td className="px-4 py-3">
                    {p.status === "VERIFIED" ? (
                      <span className="chip chip-accent">Verified</span>
                    ) : p.status === "PENDING" ? (
                      <span className="chip chip-amber">Pending</span>
                    ) : (
                      <span className="chip">{p.status.toLowerCase()}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {p.status === "PENDING" && <VerifyButton paymentId={p.id} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
