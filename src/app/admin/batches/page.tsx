import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";

export default async function BatchesPage() {
  const batches = await db.batch.findMany({
    orderBy: { startDate: "desc" },
    include: {
      course: { select: { name: true, feeMonthly: true } },
      instructor: { select: { title: true, user: { select: { name: true } } } },
      _count: { select: { enrollments: true } },
    },
  });

  return (
    <div className="space-y-7">
      <header>
        <h1 className="display-md">Batches</h1>
        <p className="mt-1 text-sm text-muted">
          Boys and girls are taught in separate batches, always.
        </p>
      </header>

      {batches.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-sm text-muted">
            No batches yet. Batches are created against a published course and scheduled by
            gender and time slot.
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                {["Batch", "Programme", "Gender", "Slot", "Status", "Enrolled", "Fee/mo"].map(
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
              {batches.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 font-medium text-ink">{b.name}</td>
                  <td className="px-4 py-3 text-ink-2">{b.course?.name ?? "—"}</td>
                  <td className="px-4 py-3 capitalize text-ink-2">
                    {b.gender.toLowerCase()}
                  </td>
                  <td className="px-4 py-3 capitalize text-muted">
                    {b.timeSlot.toLowerCase()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="chip">{b.status.toLowerCase()}</span>
                  </td>
                  <td className="px-4 py-3 tnum text-ink-2">
                    {b._count.enrollments}
                    <span className="text-muted"> / {b.capacity}</span>
                  </td>
                  <td className="px-4 py-3 tnum text-ink-2">
                    {b.course?.feeMonthly ? formatPkr(b.course.feeMonthly) : "—"}
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
