import Link from "next/link";
import { requireStudent } from "@/lib/student";
import { db } from "@/lib/db";
import { formatDate, formatPkr } from "@/lib/utils";
import {
  formatDueDate,
  isOverdue,
  monthlyDue,
  nextAwaitingPayment,
  nextDuePayment,
  outstandingTotal,
  paymentStatusLabel,
} from "@/lib/fees";
import {
  deliverableStatusHint,
  deliverableStatusLabel,
  normalizeDeliverableStatus,
} from "@/lib/deliverable";
import { site } from "@/content/site";

function slotLabel(slot: string) {
  return slot.charAt(0) + slot.slice(1).toLowerCase();
}

function deliverableChipClass(status: string) {
  switch (normalizeDeliverableStatus(status)) {
    case "SHIPPED":
      return "chip chip-accent";
    case "IN_PROGRESS":
      return "chip chip-amber";
    default:
      return "chip";
  }
}

export default async function PortalDashboardPage() {
  const { user, profile } = await requireStudent();

  const enrollments = await db.enrollment.findMany({
    where: { studentId: profile.id },
    orderBy: { enrolledAt: "desc" },
    include: {
      payments: { orderBy: [{ dueDate: "asc" }, { createdAt: "asc" }] },
      batch: {
        include: {
          course: true,
          instructor: { include: { user: { select: { name: true } } } },
        },
      },
    },
  });

  const active = enrollments.filter((e) => e.status === "ACTIVE");

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">Student portal</p>
        <h1 className="display-md mt-2">Assalam-o-Alaikum, {user.name.split(" ")[0]}</h1>
        <p className="mt-2 text-sm text-muted">
          Roll no. <span className="tnum font-medium text-ink-2">{profile.rollNo}</span>
        </p>
      </header>

      {enrollments.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-sm text-muted">
            No enrolments yet. If you have been offered a seat, ask admissions to activate
            your account on a batch.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <a href={site.whatsapp.href} className="btn btn-primary">
              WhatsApp admissions
            </a>
            <a href={`mailto:${site.emails.admissions}`} className="btn btn-outline">
              Email admissions
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {(active.length ? active : enrollments).map((enrollment) => {
            const outstanding = outstandingTotal(enrollment);
            const batch = enrollment.batch;
            const instructorName = batch.instructor?.user.name;
            const instructorTitle = batch.instructor?.title;
            const seatsNote =
              batch.capacity <= 16
                ? `Batch of ${batch.capacity}`
                : `Up to ${batch.capacity} seats`;

            return (
              <article key={enrollment.id} className="card overflow-hidden">
                <div className="border-b border-line bg-sand/50 px-5 py-4 md:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                        {enrollment.status === "ACTIVE" ? "Active enrolment" : enrollment.status}
                      </p>
                      <h2 className="mt-1 font-display text-xl text-ink">
                        {batch.course.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted">{batch.name}</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted">Outstanding</p>
                      <p className="tnum text-lg font-semibold text-ink">
                        {formatPkr(outstanding)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 px-5 py-5 sm:grid-cols-2 md:px-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                      Your batch
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm text-ink-2">
                      <li>
                        Timing:{" "}
                        <span className="font-medium text-ink">{slotLabel(batch.timeSlot)}</span>
                      </li>
                      {batch.hall && (
                        <li>
                          Hall: <span className="font-medium text-ink">{batch.hall}</span>
                        </li>
                      )}
                      <li>
                        Gender batch:{" "}
                        <span className="font-medium text-ink capitalize">
                          {batch.gender.toLowerCase()}
                        </span>
                      </li>
                      <li>
                        Starts:{" "}
                        <span className="tnum font-medium text-ink">
                          {formatDate(batch.startDate)}
                        </span>
                        {batch.endDate ? (
                          <>
                            {" · Ends: "}
                            <span className="tnum font-medium text-ink">
                              {formatDate(batch.endDate)}
                            </span>
                          </>
                        ) : null}
                      </li>
                      {(instructorName || instructorTitle) && (
                        <li>
                          Instructor:{" "}
                          <span className="font-medium text-ink">
                            {instructorName ?? instructorTitle}
                            {instructorName && instructorTitle ? (
                              <span className="font-normal text-muted"> · {instructorTitle}</span>
                            ) : null}
                          </span>
                        </li>
                      )}
                      <li>
                        Size: <span className="font-medium text-ink">{seatsNote}</span>
                        <span className="text-muted"> — your work gets reviewed</span>
                      </li>
                      <li>
                        Monthly fee:{" "}
                        <span className="tnum font-medium text-ink">
                          {formatPkr(monthlyDue(enrollment))}
                        </span>
                        {enrollment.discount > 0 && (
                          <span className="text-muted">
                            {" "}
                            (after Rs. {enrollment.discount.toLocaleString("en-PK")} discount)
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Client deliverable
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className={deliverableChipClass(enrollment.deliverableStatus)}>
                          {deliverableStatusLabel(enrollment.deliverableStatus)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted">
                        {deliverableStatusHint(enrollment.deliverableStatus)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                        Next payment
                      </p>
                      {(() => {
                        const due = nextDuePayment(enrollment);
                        const awaiting = nextAwaitingPayment(enrollment);
                        if (due) {
                          const overdue = isOverdue(due);
                          const dueLabel = formatDueDate(due.dueDate);
                          return (
                            <div className="mt-2">
                              <p className="text-sm text-ink">
                                <span className="font-medium">{due.label}</span>
                                {" · "}
                                <span className="tnum">{formatPkr(due.amount)}</span>
                              </p>
                              <p
                                className={
                                  overdue
                                    ? "mt-1 text-xs font-medium text-[color:var(--color-danger)]"
                                    : "mt-1 text-xs text-muted"
                                }
                              >
                                {overdue
                                  ? `Overdue${dueLabel ? ` · was due ${dueLabel}` : ""}`
                                  : dueLabel
                                    ? `Due ${dueLabel}`
                                    : `Status: ${paymentStatusLabel(due.status)}`}
                              </p>
                              <Link
                                href={`/portal/fees/${due.id}`}
                                className="btn btn-primary btn-sm mt-4"
                              >
                                Pay this instalment
                              </Link>
                            </div>
                          );
                        }
                        if (awaiting) {
                          return (
                            <div className="mt-2">
                              <p className="text-sm text-ink">
                                <span className="font-medium">{awaiting.label}</span>
                                {" · "}
                                <span className="tnum">{formatPkr(awaiting.amount)}</span>
                              </p>
                              <p className="mt-1 text-xs text-muted">
                                Submitted — awaiting staff verification
                              </p>
                              <Link
                                href={`/portal/fees/${awaiting.id}`}
                                className="btn btn-outline btn-sm mt-4"
                              >
                                View status
                              </Link>
                            </div>
                          );
                        }
                        return (
                          <p className="mt-2 text-sm text-muted">
                            No open instalments. All recorded fees are verified.
                          </p>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <p className="text-center text-sm">
            <Link href="/portal/fees" className="text-accent hover:underline">
              View full fee schedule →
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
