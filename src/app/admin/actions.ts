"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { ApplicationStatus } from "@/lib/status";
import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";
import { statusLabel } from "@/lib/status";

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Every admin mutation requires a signed-in ADMIN or STAFF user. */
async function requireStaff(): Promise<{ id: string; role: "ADMIN" | "STAFF" }> {
  const session = await auth();
  const role = session?.user?.role;
  const id = session?.user?.id;
  if (!id || (role !== "ADMIN" && role !== "STAFF")) {
    redirect("/login");
  }
  return { id, role: role as "ADMIN" | "STAFF" };
}

/* -------------------------------------------------------------- */
/* Applications CRM                                                */
/* -------------------------------------------------------------- */

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
  noteBody?: string,
): Promise<ActionResult> {
  const { id: userId } = await requireStaff();
  return applyStatusChange(userId, applicationId, status, noteBody);
}

/**
 * Progressive-enhancement form action. Works without JavaScript (plain POST)
 * and is therefore testable over plain HTTP. Shares the same core as the
 * programmatic variant above.
 */
export type StatusFormState = { ok: boolean; error?: string };

export async function updateApplicationStatusAction(
  _prev: StatusFormState,
  formData: FormData,
): Promise<StatusFormState> {
  console.log("[action] updateApplicationStatusAction CALLED");
  const { id: userId } = await requireStaff();
  const applicationId = String(formData.get("applicationId") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  const note = String(formData.get("note") ?? "").trim();

  if (!applicationId || !status) {
    return { ok: false, error: "Missing application or status." };
  }
  return applyStatusChange(userId, applicationId, status, note);
}

async function applyStatusChange(
  userId: string,
  applicationId: string,
  status: ApplicationStatus,
  noteBody?: string,
): Promise<ActionResult> {
  const app = await db.application.findUnique({
    where: { id: applicationId },
    select: { id: true, status: true },
  });
  if (!app) return { ok: false, error: "Application not found." };

  const from = app.status;
  await db.application.update({ where: { id: applicationId }, data: { status } });

  // Every status change is recorded as an audit note, with or without a comment.
  const body =
    noteBody && noteBody.trim()
      ? noteBody.trim()
      : `Status changed to ${statusLabel(status)}.`;

  await db.applicationNote.create({
    data: {
      applicationId,
      authorId: userId,
      body,
      statusFrom: from === status ? null : from,
      statusTo: from === status ? null : status,
    },
  });

  revalidatePath("/admin/applications");
  revalidatePath(`/admin/applications/${applicationId}`);
  revalidatePath("/admin");
  return { ok: true };
}

export async function addApplicationNote(
  applicationId: string,
  body: string,
): Promise<ActionResult> {
  const { id: userId } = await requireStaff();
  const trimmed = body.trim();
  if (!trimmed) return { ok: false, error: "Note is empty." };

  await db.applicationNote.create({
    data: { applicationId, authorId: userId, body: trimmed },
  });
  revalidatePath(`/admin/applications/${applicationId}`);
  return { ok: true };
}

export async function assignApplication(
  applicationId: string,
  staffId: string | null,
): Promise<ActionResult> {
  await requireStaff();
  await db.application.update({
    where: { id: applicationId },
    data: { assignedToId: staffId },
  });
  revalidatePath(`/admin/applications/${applicationId}`);
  revalidatePath("/admin/applications");
  return { ok: true };
}

/* -------------------------------------------------------------- */
/* Inquiries                                                       */
/* -------------------------------------------------------------- */

export async function setInquiryHandled(
  inquiryId: string,
  handled: boolean,
): Promise<ActionResult> {
  await requireStaff();
  await db.inquiry.update({
    where: { id: inquiryId },
    data: { isHandled: handled },
  });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

/* -------------------------------------------------------------- */
/* Fees                                                            */
/* -------------------------------------------------------------- */

export async function verifyFeePayment(paymentId: string): Promise<ActionResult> {
  const { id: userId } = await requireStaff();
  const existing = await db.feePayment.findUnique({ where: { id: paymentId } });
  if (!existing) return { ok: false, error: "Payment not found." };
  if (existing.status === "VERIFIED") return { ok: true };

  await db.feePayment.update({
    where: { id: paymentId },
    data: { status: "VERIFIED", verifiedById: userId, paidAt: new Date() },
  });
  revalidatePath("/admin/fees");
  revalidatePath("/admin");
  revalidatePath("/portal");
  revalidatePath("/portal/fees");
  revalidatePath(`/portal/fees/${paymentId}`);
  revalidatePath(`/portal/fees/${paymentId}/receipt`);
  return { ok: true };
}

/* -------------------------------------------------------------- */
/* Enrolment deliverable status                                    */
/* -------------------------------------------------------------- */

const deliverableSchema = z.enum(["NOT_STARTED", "IN_PROGRESS", "SHIPPED"]);

export async function setDeliverableStatus(
  enrollmentId: string,
  status: string,
): Promise<ActionResult> {
  await requireStaff();
  const parsed = deliverableSchema.safeParse(status);
  if (!parsed.success) return { ok: false, error: "Invalid deliverable status." };

  await db.enrollment.update({
    where: { id: enrollmentId },
    data: {
      deliverableStatus: parsed.data,
      deliverableShipped: parsed.data === "SHIPPED",
      completedAt: parsed.data === "SHIPPED" ? new Date() : null,
    },
  });
  revalidatePath("/admin/batches");
  revalidatePath("/admin");
  revalidatePath("/portal");
  return { ok: true };
}

/* -------------------------------------------------------------- */
/* Published cohort outcomes — the trust moat                     */
/* -------------------------------------------------------------- */

const outcomeSchema = z.object({
  batchLabel: z.string().trim().min(2, "Required").max(120),
  courseName: z.string().trim().min(2, "Required").max(160),
  enrolled: z.coerce.number().int().min(0),
  completed: z.coerce.number().int().min(0),
  dropped: z.coerce.number().int().min(0),
  earnedWithin90Days: z.coerce.number().int().min(0),
  earnedNothing: z.coerce.number().int().min(0),
  medianFirstInvoice: z.coerce.number().int().min(0).optional(),
  hiredByUs: z.coerce.number().int().min(0).optional(),
  notes: z.string().trim().max(1000).optional(),
});

export type OutcomeState = {
  ok: boolean;
  error?: string;
  errors?: Record<string, string[]>;
};

export async function createOutcome(
  _prev: OutcomeState,
  formData: FormData,
): Promise<OutcomeState> {
  await requireStaff();
  const parsed = outcomeSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await db.cohortOutcome.create({ data: parsed.data });
  revalidatePath("/admin/outcomes");
  revalidatePath("/outcomes");
  return { ok: true };
}

/* -------------------------------------------------------------- */
/* Session                                                         */
/* -------------------------------------------------------------- */

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/login" });
}

/* -------------------------------------------------------------- */
/* Label helper (shared with UI) — see src/lib/status.ts          */
/* -------------------------------------------------------------- */

