import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStudent } from "@/lib/student";
import { db } from "@/lib/db";
import { formatDate, formatPkr } from "@/lib/utils";
import { paymentMethodLabel } from "@/lib/fees";
import { site } from "@/content/site";
import { PrintReceiptButton } from "@/components/portal/print-receipt-button";

export default async function FeeReceiptPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const { user, profile } = await requireStudent();

  const payment = await db.feePayment.findFirst({
    where: {
      id: paymentId,
      enrollment: { studentId: profile.id },
      status: "VERIFIED",
    },
    include: {
      enrollment: {
        include: {
          batch: { include: { course: true } },
        },
      },
      verifiedBy: { select: { name: true } },
    },
  });

  if (!payment) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href={`/portal/fees/${payment.id}`} className="text-sm text-accent hover:underline">
          ← Back to instalment
        </Link>
        <PrintReceiptButton />
      </div>

      <article className="card mx-auto max-w-2xl overflow-hidden print:border print:shadow-none">
        <header className="border-b border-line bg-sand/50 px-6 py-5">
          <p className="font-display text-xl text-ink">
            Skills<span className="text-accent">Pro</span>Max
          </p>
          <p className="mt-1 text-sm text-muted">Fee receipt</p>
          <p className="mt-3 text-xs text-faint">{site.location.label}</p>
          <p className="mt-1 text-xs text-faint">
            {site.phone.display} · {site.whatsapp.display}
          </p>
        </header>

        <div className="px-6 py-6">
          <dl className="grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Student
              </dt>
              <dd className="mt-1 text-ink">{user.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Roll number
              </dt>
              <dd className="mt-1 tnum text-ink">{profile.rollNo}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Program
              </dt>
              <dd className="mt-1 text-ink">{payment.enrollment.batch.course.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Batch</dt>
              <dd className="mt-1 text-ink">{payment.enrollment.batch.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Instalment
              </dt>
              <dd className="mt-1 text-ink">{payment.label}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Amount</dt>
              <dd className="mt-1 tnum text-lg font-semibold text-ink">
                {formatPkr(payment.amount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Method
              </dt>
              <dd className="mt-1 text-ink">{paymentMethodLabel(payment.method)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Reference
              </dt>
              <dd className="mt-1 tnum text-ink">{payment.reference ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Paid / verified
              </dt>
              <dd className="mt-1 tnum text-ink">{formatDate(payment.paidAt)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                Verified by
              </dt>
              <dd className="mt-1 text-ink">{payment.verifiedBy?.name ?? "Campus staff"}</dd>
            </div>
          </dl>

          <p className="mt-8 border-t border-line pt-4 text-xs text-muted">
            This receipt confirms that the instalment above has been verified by SkillsProMax.
            Keep a copy for your records. For questions call {site.phone.display}.
          </p>
        </div>
      </article>
    </div>
  );
}
