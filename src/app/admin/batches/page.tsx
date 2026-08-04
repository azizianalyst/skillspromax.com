import { db } from "@/lib/db";
import { formatDate, formatPkr } from "@/lib/utils";
import { DeliverableStatusSelect } from "@/components/admin/deliverable-status-select";

export default async function BatchesPage() {
  const batches = await db.batch.findMany({
    orderBy: { startDate: "desc" },
    include: {
      course: { select: { name: true, feeMonthly: true } },
      instructor: { select: { title: true, user: { select: { name: true } } } },
      enrollments: {
        orderBy: { enrolledAt: "asc" },
        include: {
          student: { select: { rollNo: true, user: { select: { name: true } } } },
        },
      },
      _count: { select: { enrollments: true } },
    },
  });

  return (
    <div className="space-y-7">
      <header>
        <h1 className="display-md">Batches</h1>
        <p className="mt-1 text-sm text-muted">
          Boys and girls are taught in separate batches, always. Update each student&apos;s
          client deliverable status here — it shows on their portal.
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
        <div className="space-y-5">
          {batches.map((b) => (
            <section key={b.id} className="card overflow-hidden">
              <div className="border-b border-line px-5 py-4 md:px-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg text-ink">{b.name}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {b.course?.name ?? "—"} ·{" "}
                      <span className="capitalize">{b.gender.toLowerCase()}</span> ·{" "}
                      <span className="capitalize">{b.timeSlot.toLowerCase()}</span>
                      {b.hall ? ` · ${b.hall}` : ""}
                    </p>
                    <p className="mt-1 text-xs text-faint">
                      {formatDate(b.startDate)}
                      {b.endDate ? ` – ${formatDate(b.endDate)}` : ""}
                      {" · "}
                      {b._count.enrollments}/{b.capacity} enrolled
                      {b.course?.feeMonthly ? ` · ${formatPkr(b.course.feeMonthly)}/mo` : ""}
                      {b.instructor?.user.name
                        ? ` · ${b.instructor.user.name}`
                        : b.instructor?.title
                          ? ` · ${b.instructor.title}`
                          : ""}
                    </p>
                  </div>
                  <span className="chip">{b.status.toLowerCase()}</span>
                </div>
              </div>

              {b.enrollments.length === 0 ? (
                <p className="px-5 py-5 text-sm text-muted md:px-6">No students enrolled yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line text-left">
                        {["Student", "Roll", "Deliverable"].map((h) => (
                          <th
                            key={h}
                            className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-faint md:px-6"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[color:var(--color-line)]">
                      {b.enrollments.map((e) => (
                        <tr key={e.id}>
                          <td className="px-5 py-3 font-medium text-ink md:px-6">
                            {e.student.user.name}
                          </td>
                          <td className="px-5 py-3 tnum text-muted md:px-6">{e.student.rollNo}</td>
                          <td className="px-5 py-3 md:px-6">
                            <div className="max-w-[11rem]">
                              <DeliverableStatusSelect
                                enrollmentId={e.id}
                                value={e.deliverableStatus}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
