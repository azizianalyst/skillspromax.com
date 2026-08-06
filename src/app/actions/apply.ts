"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { applicationSchema, inquirySchema } from "@/lib/validation";
import { nextApplicationReference } from "@/lib/reference";
import {
  MAIL,
  sendMail,
  applicationEmail,
  applicantAcknowledgement,
  inquiryEmail,
} from "@/lib/mail";
import { programs } from "@/content/site";

export type FormState = {
  ok: boolean;
  reference?: string;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function submitApplication(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Checkboxes only appear in FormData when checked.
  // Country is collected for worldwide applicants and stored with city.
  const cityWithCountry = [raw.city?.trim(), raw.country?.trim()]
    .filter(Boolean)
    .join(", ");

  const parsed = applicationSchema.safeParse({
    ...raw,
    city: cityWithCountry || raw.city,
    hasComputer: raw.hasComputer === "on",
    hasInternet: raw.hasInternet === "on",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  // Silently accept-and-drop bot submissions.
  if (parsed.data.website) return { ok: true, reference: "—" };

  const d = parsed.data;
  const program = programs.find((p) => p.slug === d.programSlug);
  const programName = program?.name ?? d.programSlug;

  let reference: string;
  try {
    reference = await nextApplicationReference();
    await db.application.create({
      data: {
        reference,
        fullName: d.fullName,
        fatherName: d.fatherName,
        gender: d.gender,
        cnic: d.cnic,
        phone: d.phone,
        whatsapp: d.whatsapp,
        email: d.email,
        city: d.city,
        education: d.education,
        programSlug: d.programSlug,
        preferredSlot: d.preferredSlot,
        hasComputer: d.hasComputer,
        hasInternet: d.hasInternet,
        howHeard: d.howHeard,
        motivation: d.motivation,
      },
    });
  } catch (error) {
    console.error("[apply] database write failed:", error);
    return {
      ok: false,
      message:
        "Something went wrong saving your application. Please call or WhatsApp us instead — we do not want to lose you.",
    };
  }

  // Mail is best-effort. The record is already safe.
  const staffMail = applicationEmail({ ...d, reference, programName });
  await sendMail({
    to: MAIL.admissions,
    replyTo: d.email,
    ...staffMail,
  });

  if (d.email) {
    const ack = applicantAcknowledgement({
      reference,
      fullName: d.fullName,
      programName,
    });
    await sendMail({ to: d.email, ...ack });
  }

  revalidatePath("/admin/applications");
  return { ok: true, reference };
}

export async function submitInquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (parsed.data.website) return { ok: true };

  const d = parsed.data;

  try {
    await db.inquiry.create({
      data: {
        name: d.name,
        phone: d.phone,
        email: d.email,
        subject: d.subject,
        message: d.message,
      },
    });
  } catch (error) {
    console.error("[inquiry] database write failed:", error);
    return {
      ok: false,
      message: "Could not send that. Please call or WhatsApp us instead.",
    };
  }

  // All form enquiries route to admission@ as requested.
  await sendMail({ to: MAIL.admissions, replyTo: d.email, ...inquiryEmail(d) });

  revalidatePath("/admin/inquiries");
  return { ok: true, message: "Thank you — we will get back to you shortly." };
}
