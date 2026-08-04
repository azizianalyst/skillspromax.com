"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signOut } from "@/auth";
import { db } from "@/lib/db";
import { getStudentForAction } from "@/lib/student";
import { sendMail, MAIL } from "@/lib/mail";
import { buildHostedCheckout, isJazzCashConfigured, makeTxnRef } from "@/lib/jazzcash";
import { paymentMethodLabel } from "@/lib/fees";

export type PortalActionState = {
  ok: boolean;
  error?: string;
  errors?: Record<string, string[]>;
};

const manualSchema = z.object({
  paymentId: z.string().min(1),
  method: z.enum(["JAZZCASH", "EASYPAISA", "BANK_TRANSFER", "CASH"]),
  reference: z
    .string()
    .trim()
    .min(3, "Enter the transaction ID or receipt number")
    .max(80),
});

/**
 * Student submits proof of an offline / wallet transfer. Stays PENDING until
 * staff verifies in /admin/fees.
 */
export async function submitManualPayment(
  _prev: PortalActionState,
  formData: FormData,
): Promise<PortalActionState> {
  const ctx = await getStudentForAction();
  if (!ctx) return { ok: false, error: "Please sign in again." };
  const { profile, user } = ctx;
  const parsed = manualSchema.safeParse({
    paymentId: formData.get("paymentId"),
    method: formData.get("method"),
    reference: formData.get("reference"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the fields below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { paymentId, method, reference } = parsed.data;

  const payment = await db.feePayment.findFirst({
    where: {
      id: paymentId,
      enrollment: { studentId: profile.id },
    },
    include: {
      enrollment: {
        include: {
          batch: { include: { course: true } },
          student: true,
        },
      },
    },
  });

  if (!payment) return { ok: false, error: "Payment not found." };
  if (payment.status === "VERIFIED") {
    return { ok: false, error: "This instalment is already verified." };
  }

  await db.feePayment.update({
    where: { id: payment.id },
    data: {
      method,
      reference,
      status: "PENDING",
    },
  });

  const courseName = payment.enrollment.batch.course.name;
  const mailBody = {
    subject: `Fee payment submitted · ${user.name} · ${payment.label}`,
    text: [
      `Student: ${user.name} (${profile.rollNo})`,
      `Programme: ${courseName}`,
      `Instalment: ${payment.label}`,
      `Amount: Rs. ${payment.amount.toLocaleString("en-PK")}`,
      `Method: ${paymentMethodLabel(method)}`,
      `Reference: ${reference}`,
      ``,
      `Verify in admin → Fees.`,
    ].join("\n"),
    html: `<p><strong>${escape(user.name)}</strong> (${escape(profile.rollNo)}) submitted a fee payment.</p>
      <ul>
        <li>Programme: ${escape(courseName)}</li>
        <li>Instalment: ${escape(payment.label)}</li>
        <li>Amount: Rs. ${payment.amount.toLocaleString("en-PK")}</li>
        <li>Method: ${escape(paymentMethodLabel(method))}</li>
        <li>Reference: ${escape(reference)}</li>
      </ul>
      <p>Verify in the admin Fees panel.</p>`,
  };

  await sendMail({
    to: MAIL.admissions,
    subject: mailBody.subject,
    html: mailBody.html,
    text: mailBody.text,
  });
  // Mail may be skipped when SMTP is unset — the PENDING row is the source of truth.

  revalidatePath("/portal");
  revalidatePath("/portal/fees");
  revalidatePath(`/portal/fees/${payment.id}`);
  revalidatePath("/admin/fees");
  revalidatePath("/admin");

  return { ok: true };
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const profileSchema = z.object({
  phone: z.string().trim().min(10, "Enter a valid phone").max(20).optional().or(z.literal("")),
  whatsapp: z.string().trim().min(10, "Enter a valid WhatsApp").max(20).optional().or(z.literal("")),
});

export async function updateStudentContact(
  _prev: PortalActionState,
  formData: FormData,
): Promise<PortalActionState> {
  const ctx = await getStudentForAction();
  if (!ctx) return { ok: false, error: "Please sign in again." };
  const { profile, user } = ctx;
  const parsed = profileSchema.safeParse({
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      error: "Check the fields below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const phone = parsed.data.phone || null;
  const whatsapp = parsed.data.whatsapp || null;

  await db.$transaction([
    db.user.update({
      where: { id: user.id },
      data: { phone },
    }),
    db.studentProfile.update({
      where: { id: profile.id },
      data: { whatsapp },
    }),
  ]);

  revalidatePath("/portal");
  revalidatePath("/portal/profile");
  return { ok: true };
}

/**
 * Prepare JazzCash hosted checkout: write gatewayRef, return form action + fields.
 * Called from a client component that then auto-submits the form.
 */
export async function prepareJazzCashCheckout(
  paymentId: string,
): Promise<
  | { ok: true; actionUrl: string; fields: Record<string, string> }
  | { ok: false; error: string }
> {
  const ctx = await getStudentForAction();
  if (!ctx) return { ok: false, error: "Please sign in again." };
  const { profile } = ctx;

  if (!isJazzCashConfigured()) {
    return { ok: false, error: "Online JazzCash is not available yet. Use the manual payment form." };
  }

  const payment = await db.feePayment.findFirst({
    where: {
      id: paymentId,
      enrollment: { studentId: profile.id },
    },
    include: {
      enrollment: {
        include: { batch: { include: { course: true } }, student: true },
      },
    },
  });

  if (!payment) return { ok: false, error: "Payment not found." };
  if (payment.status === "VERIFIED") {
    return { ok: false, error: "This instalment is already verified." };
  }
  // Already awaiting staff — don't start a new JazzCash session that could
  // clobber the submitted transaction ID.
  if (payment.status === "PENDING" && payment.reference?.trim()) {
    return {
      ok: false,
      error: "This instalment is awaiting staff verification. You do not need to pay again.",
    };
  }

  const txnRef = makeTxnRef(payment.id);
  const { actionUrl, fields } = buildHostedCheckout({
    txnRef,
    amountPkr: payment.amount,
    description: `${payment.enrollment.batch.course.name} · ${payment.label}`,
    billReference: payment.enrollment.student.rollNo,
  });

  await db.feePayment.update({
    where: { id: payment.id },
    data: {
      method: "JAZZCASH",
      gatewayRef: txnRef,
      status: "PENDING",
    },
  });

  return { ok: true, actionUrl, fields };
}

export async function portalSignOut() {
  await signOut({ redirectTo: "/login" });
}
