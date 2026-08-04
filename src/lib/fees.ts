export type FeePaymentLike = {
  id: string;
  label: string;
  amount: number;
  method: string;
  status: string;
  dueDate: Date | null;
  reference: string | null;
  gatewayRef: string | null;
  paidAt: Date | null;
  createdAt: Date;
};

export type EnrollmentLike = {
  id: string;
  feeMonthly: number;
  feeMonths: number;
  discount: number;
  status: string;
  payments: FeePaymentLike[];
};

/** Amount due each month after discount. */
export function monthlyDue(enrollment: Pick<EnrollmentLike, "feeMonthly" | "discount">) {
  return Math.max(0, enrollment.feeMonthly - enrollment.discount);
}

export function totalProgrammeFee(enrollment: EnrollmentLike) {
  return monthlyDue(enrollment) * enrollment.feeMonths;
}

export function totalPaid(enrollment: EnrollmentLike) {
  return enrollment.payments
    .filter((p) => p.status === "VERIFIED")
    .reduce((sum, p) => sum + p.amount, 0);
}

export function outstandingTotal(enrollment: EnrollmentLike) {
  return Math.max(0, totalProgrammeFee(enrollment) - totalPaid(enrollment));
}

/**
 * Student has submitted a txn ID / receipt and is waiting for staff.
 * Not "unpaid" — pay UI should be read-only.
 */
export function isAwaitingVerification(payment: FeePaymentLike): boolean {
  return payment.status === "PENDING" && Boolean(payment.reference?.trim());
}

/** Instalment still needs a student payment action (not yet submitted / failed). */
export function needsStudentPayment(payment: FeePaymentLike): boolean {
  if (payment.status === "VERIFIED") return false;
  if (payment.status === "FAILED" || payment.status === "EXPIRED") return true;
  if (payment.status === "PENDING") {
    // Manual proof already submitted → waiting on staff, not another pay.
    if (payment.reference?.trim()) return false;
    return true;
  }
  return false;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

/** Unpaid instalment past its due date (not awaiting staff, not verified). */
export function isOverdue(payment: FeePaymentLike, now = new Date()): boolean {
  if (!payment.dueDate) return false;
  if (payment.status === "VERIFIED") return false;
  if (isAwaitingVerification(payment)) return false;
  return startOfDay(payment.dueDate) < startOfDay(now);
}

export function formatDueDate(date: Date | null | undefined) {
  if (!date) return null;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Add calendar months, clamping day overflow (31 Jan → 28/29 Feb). */
export function addMonths(date: Date, months: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDate();
  d.setMonth(d.getMonth() + months);
  if (d.getDate() < day) d.setDate(0);
  return d;
}

/**
 * Due date for instalment index (0-based), from batch/enrolment start.
 * Defaults to the 5th of the relevant month so parents get a clear calendar day.
 */
export function instalmentDueDate(start: Date, monthIndex: number): Date {
  const base = addMonths(start, monthIndex);
  return new Date(base.getFullYear(), base.getMonth(), 5);
}

/** Next instalment that still needs the student to pay or retry. */
export function nextDuePayment(enrollment: EnrollmentLike): FeePaymentLike | null {
  const open = enrollment.payments
    .filter(needsStudentPayment)
    .sort((a, b) => {
      const aDue = a.dueDate?.getTime() ?? a.createdAt.getTime();
      const bDue = b.dueDate?.getTime() ?? b.createdAt.getTime();
      return aDue - bDue;
    });
  return open[0] ?? null;
}

/** Next instalment waiting on staff verification (show status CTA). */
export function nextAwaitingPayment(enrollment: EnrollmentLike): FeePaymentLike | null {
  const waiting = enrollment.payments
    .filter((p) => isAwaitingVerification(p))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  return waiting[0] ?? null;
}

export function paymentStatusLabel(status: string) {
  switch (status) {
    case "VERIFIED":
      return "Verified";
    case "PENDING":
      return "Pending";
    case "FAILED":
      return "Failed";
    case "EXPIRED":
      return "Expired";
    default:
      return status;
  }
}

export function paymentMethodLabel(method: string) {
  switch (method) {
    case "JAZZCASH":
      return "JazzCash";
    case "EASYPAISA":
      return "Easypaisa";
    case "BANK_TRANSFER":
      return "Bank transfer";
    case "CASH":
      return "Cash";
    default:
      return method.replace(/_/g, " ").toLowerCase();
  }
}

/** Pre-filled WhatsApp link for fee help on a specific instalment. */
export function feeHelpWhatsAppHref(opts: {
  baseHref: string;
  rollNo: string;
  courseName: string;
  label: string;
  amount: number;
}) {
  const text = [
    "Assalam-o-Alaikum,",
    `I need help with a fee payment.`,
    `Roll: ${opts.rollNo}`,
    `Program: ${opts.courseName}`,
    `Instalment: ${opts.label}`,
    `Amount: Rs. ${opts.amount.toLocaleString("en-PK")}`,
  ].join("\n");

  const base = opts.baseHref.split("?")[0];
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Safe post-login redirect: relative path only, no protocol-relative URLs. */
export function safeCallbackUrl(raw: string | null | undefined, fallback: string): string {
  if (!raw) return fallback;
  const url = raw.trim();
  if (!url.startsWith("/")) return fallback;
  if (url.startsWith("//")) return fallback;
  if (url.includes("://")) return fallback;
  // Block auth loops
  if (url.startsWith("/login")) return fallback;
  return url;
}
