import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStudent } from "@/lib/student";
import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
import { isJazzCashConfigured } from "@/lib/jazzcash";
import {
  feeHelpWhatsAppHref,
  formatDueDate,
  isAwaitingVerification,
  isOverdue,
  needsStudentPayment,
  paymentMethodLabel,
  paymentStatusLabel,
} from "@/lib/fees";
import { site } from "@/content/site";
import { ManualPaymentForm } from "@/components/portal/manual-payment-form";
import { JazzCashPayButton } from "@/components/portal/jazzcash-pay-button";

export default async function PortalFeeDetailPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  const { paymentId } = await params;
  const { profile } = await requireStudent();

  const payment = await db.feePayment.findFirst({
    where: {
      id: paymentId,
      enrollment: { studentId: profile.id },
    },
    include: {
      enrollment: {
        include: {
          batch: { include: { course: true } },
        },
      },
    },
  });

  if (!payment) notFound();

  const jazzReady = isJazzCashConfigured();
  const alreadyPaid = payment.status === "VERIFIED";
  const awaiting = isAwaitingVerification(payment);
  const canPay = needsStudentPayment(payment);
  const overdue = isOverdue(payment);
  const dueLabel = formatDueDate(payment.dueDate);
  const waHref = feeHelpWhatsAppHref({
    baseHref: site.whatsapp.href,
    rollNo: profile.rollNo,
    courseName: payment.enrollment.batch.course.name,
    label: payment.label,
    amount: payment.amount,
  });

  return (
    <div className="space-y-7">
      <div>
        <Link href="/portal/fees" className="text-sm text-accent hover:underline">
          ← All fees
        </Link>
        <h1 className="display-md mt-3">{payment.label}</h1>
        <p className="mt-2 text-sm text-muted">
          {payment.enrollment.batch.course.name} · {payment.enrollment.batch.name}
        </p>
      </div>

      <div className="card p-5 md:p-6">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Amount</dt>
            <dd className="mt-1 tnum text-lg font-semibold text-ink">
              {formatPkr(payment.amount)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Due</dt>
            <dd
              className={
                overdue
                  ? "mt-1 tnum font-semibold text-[color:var(--color-danger)]"
                  : "mt-1 tnum text-ink"
              }
            >
              {dueLabel ?? "—"}
              {overdue ? (
                <span className="mt-0.5 block text-xs font-semibold uppercase tracking-wide">
                  Overdue
                </span>
              ) : null}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Status</dt>
            <dd className="mt-1 text-ink">
              {awaiting
                ? "Awaiting verification"
                : overdue
                  ? "Overdue"
                  : paymentStatusLabel(payment.status)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-faint">Method</dt>
            <dd className="mt-1 text-ink">{paymentMethodLabel(payment.method)}</dd>
          </div>
        </dl>
        {payment.reference && (
          <p className="mt-4 text-sm text-muted">
            Reference: <span className="tnum text-ink-2">{payment.reference}</span>
          </p>
        )}
      </div>

      {alreadyPaid ? (
        <div className="card p-6">
          <p className="text-sm text-muted">
            This instalment is verified. No further payment is needed.
          </p>
          <Link href={`/portal/fees/${payment.id}/receipt`} className="btn btn-primary mt-5">
            View / print receipt
          </Link>
        </div>
      ) : awaiting ? (
        <div className="card p-6">
          <h2 className="font-display text-lg text-ink">Awaiting staff verification</h2>
          <p className="mt-2 text-sm text-muted">
            You submitted reference{" "}
            <span className="tnum font-medium text-ink">{payment.reference}</span>. Our
            admissions team will confirm it — usually within one working day. You do not need
            to pay again.
          </p>
          <p className="mt-4 text-sm text-muted">
            Paid the wrong amount or need to correct the reference?{" "}
            <a href={waHref} className="text-accent hover:underline">
              WhatsApp
            </a>{" "}
            or{" "}
            <a href={site.phone.href} className="text-accent hover:underline">
              call the campus
            </a>{" "}
            and we will update it.
          </p>
        </div>
      ) : canPay ? (
        <div className="space-y-6">
          {overdue && (
            <div
              role="status"
              className="rounded-[var(--radius-sm)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] px-4 py-3 text-sm text-[color:var(--color-danger)]"
            >
              This instalment was due{dueLabel ? ` on ${dueLabel}` : ""}. Please pay as soon as
              you can, or WhatsApp us if you need an arrangement.
            </div>
          )}
          {payment.status === "FAILED" && (
            <div className="rounded-[var(--radius-sm)] border border-[color:var(--color-danger)]/30 bg-[color:var(--color-danger-soft)] px-4 py-3 text-sm text-[color:var(--color-danger)]">
              The previous online payment did not complete. You can try JazzCash again or submit
              a transaction ID below.
            </div>
          )}

          {jazzReady && (
            <section className="card p-5 md:p-6">
              <h2 className="font-display text-lg text-ink">Pay online with JazzCash</h2>
              <p className="mt-2 text-sm text-muted">
                You will be redirected to JazzCash to complete the payment securely.
              </p>
              <div className="mt-5">
                <JazzCashPayButton paymentId={payment.id} />
              </div>
            </section>
          )}

          <section className="card p-5 md:p-6">
            <h2 className="font-display text-lg text-ink">
              {jazzReady ? "Or submit a transaction ID" : "Submit payment for verification"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              Transfer the fee via JazzCash, Easypaisa, bank, or pay cash at campus, then enter
              the transaction ID or receipt number below.
            </p>
            <div className="mt-5">
              <ManualPaymentForm paymentId={payment.id} />
            </div>
          </section>

          <p className="text-center text-sm text-muted">
            Stuck?{" "}
            <a href={waHref} className="font-medium text-accent hover:underline">
              WhatsApp campus
            </a>{" "}
            ({site.whatsapp.display}) — your roll number and instalment are pre-filled.
          </p>
        </div>
      ) : (
        <div className="card p-6 text-sm text-muted">
          No payment action is available for this instalment right now.
        </div>
      )}
    </div>
  );
}
