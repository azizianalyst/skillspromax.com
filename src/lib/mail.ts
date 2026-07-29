import nodemailer from "nodemailer";

/**
 * Mail goes out through the Hostinger mailboxes you already own.
 * Every form on the site notifies admission@ — set via MAIL_ADMISSIONS.
 */

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT ?? 465);
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!host || !user || !pass) return null;
  transporter ??= nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE !== "false",
    auth: { user, pass },
  });
  return transporter;
}

export const MAIL = {
  from: process.env.MAIL_FROM ?? "SkillsProMax <admission@skillspromax.com>",
  admissions: process.env.MAIL_ADMISSIONS ?? "admission@skillspromax.com",
  info: process.env.MAIL_INFO ?? "info@skillspromax.com",
  support: process.env.MAIL_SUPPORT ?? "support@skillspromax.com",
};

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/**
 * Never throws. A mail failure must not lose the applicant —
 * the record is already saved in the database by the time this runs.
 */
export async function sendMail({ to, subject, html, text, replyTo }: SendArgs) {
  const t = getTransporter();
  if (!t) {
    console.warn("[mail] SMTP not configured; skipping send:", subject);
    return { ok: false as const, reason: "smtp-not-configured" };
  }
  try {
    await t.sendMail({ from: MAIL.from, to, subject, html, text, replyTo });
    return { ok: true as const };
  } catch (error) {
    console.error("[mail] send failed:", error);
    return { ok: false as const, reason: "send-failed" };
  }
}

/* -------------------------------------------------------------- */
/* Templates — plain, legible, no marketing decoration            */
/* -------------------------------------------------------------- */

const wrap = (title: string, rows: string) => `
<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;color:#0f1115">
  <h2 style="font-size:17px;margin:0 0 16px;font-weight:600">${title}</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
  <p style="margin-top:20px;font-size:12px;color:#6c727c">
    Sent from skillspromax.com
  </p>
</div>`;

const row = (label: string, value?: string | null) =>
  value
    ? `<tr>
         <td style="padding:7px 12px 7px 0;color:#6c727c;vertical-align:top;white-space:nowrap">${label}</td>
         <td style="padding:7px 0;border-bottom:1px solid #e7e4df">${escapeHtml(value)}</td>
       </tr>`
    : "";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function applicationEmail(data: {
  reference: string;
  fullName: string;
  fatherName?: string | null;
  gender: string;
  phone: string;
  whatsapp?: string | null;
  email?: string | null;
  cnic?: string | null;
  city?: string | null;
  education?: string | null;
  programName: string;
  preferredSlot?: string | null;
  hasComputer: boolean;
  hasInternet: boolean;
  howHeard?: string | null;
  motivation?: string | null;
}) {
  const rows = [
    row("Reference", data.reference),
    row("Program", data.programName),
    row("Preferred timing", data.preferredSlot),
    row("Name", data.fullName),
    row("Father's name", data.fatherName),
    row("Gender", data.gender === "FEMALE" ? "Female" : "Male"),
    row("Phone", data.phone),
    row("WhatsApp", data.whatsapp),
    row("Email", data.email),
    row("CNIC", data.cnic),
    row("City / village", data.city),
    row("Education", data.education),
    row("Has computer", data.hasComputer ? "Yes" : "No"),
    row("Has internet", data.hasInternet ? "Yes" : "No"),
    row("How they heard", data.howHeard),
    row("Why they applied", data.motivation),
  ].join("");

  const text = [
    `New application — ${data.reference}`,
    `Program: ${data.programName}`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    data.whatsapp ? `WhatsApp: ${data.whatsapp}` : "",
    data.email ? `Email: ${data.email}` : "",
    `Gender: ${data.gender}`,
    data.city ? `City: ${data.city}` : "",
    data.education ? `Education: ${data.education}` : "",
    `Computer: ${data.hasComputer ? "yes" : "no"} · Internet: ${data.hasInternet ? "yes" : "no"}`,
    data.motivation ? `\nMotivation:\n${data.motivation}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `New application · ${data.programName} · ${data.fullName} (${data.reference})`,
    html: wrap(`New application — ${data.reference}`, rows),
    text,
  };
}

export function applicantAcknowledgement(data: {
  reference: string;
  fullName: string;
  programName: string;
}) {
  const text = `Assalam-o-Alaikum ${data.fullName},

We have received your application for ${data.programName}.
Your reference number is ${data.reference}. Please keep it.

What happens next:
1. Someone from our admissions team will call you within two working days.
2. We will explain the program, the fees and the timings, and answer your questions.
3. If the program suits you, we will arrange your entry assessment.

If a different program would suit you better, we will tell you honestly — including
if a free government course is the better choice for your situation right now.

You are welcome to visit the campus before deciding. No appointment needed.
Near Govt. Associate College for Women, Allahabad, Depalpur–Kasur Road.

SkillsProMax Admissions
${MAIL.admissions}`;

  return {
    subject: `Your application to SkillsProMax — ${data.reference}`,
    html: `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:600px;color:#0f1115;font-size:14px;line-height:1.65">
      <p>Assalam-o-Alaikum ${escapeHtml(data.fullName)},</p>
      <p>We have received your application for <strong>${escapeHtml(data.programName)}</strong>.
      Your reference number is <strong>${data.reference}</strong> — please keep it.</p>
      <p><strong>What happens next</strong></p>
      <ol style="padding-left:18px">
        <li>Someone from our admissions team will call you within two working days.</li>
        <li>We will explain the program, the fees and the timings, and answer your questions.</li>
        <li>If the program suits you, we will arrange your entry assessment.</li>
      </ol>
      <p>If a different program would suit you better, we will tell you honestly — including
      if a free government course is the better choice for your situation right now.</p>
      <p>You are welcome to visit the campus before deciding. No appointment needed.<br>
      Near Govt. Associate College for Women, Allahabad, Depalpur–Kasur Road.</p>
      <p style="color:#6c727c">SkillsProMax Admissions<br>${MAIL.admissions}</p>
    </div>`,
    text,
  };
}

export function inquiryEmail(data: {
  name: string;
  phone: string;
  email?: string | null;
  subject?: string | null;
  message: string;
}) {
  const rows = [
    row("Name", data.name),
    row("Phone", data.phone),
    row("Email", data.email),
    row("Subject", data.subject),
    row("Message", data.message),
  ].join("");

  return {
    subject: `Website enquiry · ${data.subject || data.name}`,
    html: wrap("New website enquiry", rows),
    text: `New enquiry\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email ?? "-"}\nSubject: ${data.subject ?? "-"}\n\n${data.message}`,
  };
}
