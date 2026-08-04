import { z } from "zod";
import { programs } from "@/content/site";

const slugs = programs.map((p) => p.slug) as [string, ...string[]];

/** Pakistani mobile numbers, tolerant of the ways people actually type them. */
const phone = z
  .string()
  .trim()
  .min(10, "Please enter a valid phone number")
  .max(20, "That number looks too long")
  .regex(/^[0-9+\-\s()]+$/, "Digits only, please")
  .transform((v) => v.replace(/[\s()\-]/g, ""));

const optionalText = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === "" ? undefined : v));

export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Please enter your full name").max(120),
  fatherName: optionalText(120),
  gender: z.enum(["MALE", "FEMALE"], {
    errorMap: () => ({ message: "Please select so we can place you in the right batch" }),
  }),
  cnic: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{7}-?\d$/, "Format: 35202-1234567-1")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone,
  whatsapp: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  email: z
    .string()
    .trim()
    .email("That email does not look right")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  city: z.string().trim().min(2, "Please enter your city").max(120),
  education: optionalText(160),
  programSlug: z.enum(slugs, {
    errorMap: () => ({ message: "Please choose a program" }),
  }),
  preferredSlot: z
    .enum(["MORNING", "MIDDAY", "AFTERNOON", "EVENING"])
    .optional()
    .or(z.literal("").transform(() => undefined)),
  hasComputer: z.coerce.boolean().default(false),
  hasInternet: z.coerce.boolean().default(false),
  howHeard: optionalText(160),
  motivation: optionalText(1200),
  /** Honeypot — bots fill it, humans never see it. */
  website: z.string().max(0).optional(),
  /** Explicit consent to be contacted. */
  consent: z.literal("on", {
    errorMap: () => ({ message: "Please confirm we may contact you" }),
  }),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone,
  email: z
    .string()
    .trim()
    .email("That email does not look right")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  subject: optionalText(160),
  message: z.string().trim().min(10, "Please tell us a little more").max(2000),
  website: z.string().max(0).optional(),
});
