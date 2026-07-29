/**
 * Seed: creates the first admin account and a small set of demo CRM records so
 * the admin panel is meaningful on first run. Idempotent — safe to re-run.
 *
 *   npm run db:seed
 *
 * The admin email/password come from .env (SEED_ADMIN_EMAIL / _PASSWORD).
 * If unset, dev defaults are used and printed. Change them immediately in
 * production by re-running with different env values.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "admin@skillspromax.com")
    .trim()
    .toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "skillspromax-dev-123";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      passwordHash,
      name: "Site Administrator",
      role: "ADMIN",
      phone: "+923000000000",
    },
  });

  console.log("────────────────────────────────────────────");
  console.log("✓ Admin account");
  console.log("  email:   ", admin.email);
  console.log("  password:", adminPassword);
  console.log("  (change SEED_ADMIN_PASSWORD and re-run before launch)");
  console.log("────────────────────────────────────────────");

  // Demo data — only if the CRM is empty.
  if ((await prisma.application.count()) > 0) {
    console.log("Demo data already present — skipping.");
    return;
  }

  const staff = await prisma.user.create({
    data: {
      email: "admissions@skillspromax.com",
      passwordHash: await bcrypt.hash("skillspromax-dev-123", 10),
      name: "Admissions Desk",
      role: "STAFF",
      phone: "+923001234567",
    },
  });

  type SeedApp = {
    ref: string;
    status:
      | "NEW"
      | "CONTACTED"
      | "ASSESSMENT_SCHEDULED"
      | "ASSESSED"
      | "OFFERED"
      | "ENROLLED";
    name: string;
    father?: string;
    gender: "MALE" | "FEMALE";
    phone: string;
    whatsapp?: string;
    city?: string;
    education?: string;
    program: string;
    slot?: "MORNING" | "MIDDAY" | "AFTERNOON" | "EVENING";
    motivation?: string;
    assigned?: boolean;
  };

  const apps: SeedApp[] = [
    {
      ref: "SPM-2026-0001",
      status: "NEW",
      name: "Bilal Ahmed",
      father: "Muhammad Ramzan",
      gender: "MALE",
      phone: "+923011234567",
      whatsapp: "+923011234567",
      city: "Hujra Shah Muqeem",
      education: "FSc (Pre-Engineering), 2025",
      program: "ai-automation-practitioner",
      slot: "EVENING",
      motivation:
        "I want to earn from freelancing while I study. I tried free YouTube courses but never finished anything.",
    },
    {
      ref: "SPM-2026-0002",
      status: "CONTACTED",
      name: "Ayesha Siddiqui",
      father: "Abdul Karim",
      gender: "FEMALE",
      phone: "+923212345678",
      city: "Allahabad, Depalpur",
      education: "BA (Private), 2nd year",
      program: "foundation",
      slot: "MIDDAY",
      motivation: "I want to learn skills I can use from home.",
      assigned: true,
    },
    {
      ref: "SPM-2026-0003",
      status: "ASSESSED",
      name: "Usman Tariq",
      gender: "MALE",
      phone: "+923331234567",
      city: "Depalpur city",
      education: "BS Computer Science (ongoing)",
      program: "re-skill",
      slot: "EVENING",
      motivation: "My writing income has dropped. I need to change what I sell.",
      assigned: true,
    },
    {
      ref: "SPM-2026-0004",
      status: "OFFERED",
      name: "Fatima Noor",
      father: "Ghulam Mustafa",
      gender: "FEMALE",
      phone: "+923451234567",
      city: "Pattoki",
      education: "MCom, 2024",
      program: "advance",
      slot: "EVENING",
      motivation: "I work in accounts and want to automate the repetitive parts of my job.",
      assigned: true,
    },
  ];

  for (const a of apps) {
    await prisma.application.create({
      data: {
        reference: a.ref,
        status: a.status,
        fullName: a.name,
        fatherName: a.father,
        gender: a.gender,
        phone: a.phone,
        whatsapp: a.whatsapp,
        city: a.city,
        education: a.education,
        programSlug: a.program,
        preferredSlot: a.slot,
        motivation: a.motivation,
        hasComputer: true,
        hasInternet: true,
        assignedToId: a.assigned ? staff.id : null,
      },
    });
  }

  // CRM notes on the contacted application.
  const contacted = await prisma.application.findUnique({
    where: { reference: "SPM-2026-0002" },
    select: { id: true },
  });
  if (contacted) {
    await prisma.applicationNote.create({
      data: {
        applicationId: contacted.id,
        authorId: staff.id,
        body: "Called — spoke to father. Interested in Foundation. Will visit campus Saturday.",
        statusFrom: "NEW",
        statusTo: "CONTACTED",
      },
    });
  }

  await prisma.inquiry.create({
    data: {
      name: "Imran Yousaf",
      phone: "+923001111222",
      email: "imran@example.com",
      subject: "Re-skill batch timings",
      message:
        "I am a translator and my work has almost stopped. Can I join the next Re-skill batch in the evenings?",
    },
  });

  /* ---------------------------------------------------------- */
  /* Catalogue + a live enrolled student with pending fees      */
  /* ---------------------------------------------------------- */

  type SeedCourse = {
    slug: string;
    name: string;
    audience: string;
    summary: string;
    outcome: string;
    honestNote: string;
    durationWks: number;
    feeMonthly: number;
    feeMonths: number;
  };

  const coursesData: SeedCourse[] = [
    {
      slug: "foundation",
      name: "Foundation",
      audience: "Students, fresh graduates, complete beginners",
      summary:
        "The groundwork: professional English, how the internet and APIs work, using AI properly, data literacy — and one working build.",
      outcome: "A working automation and an honest picture of what digital work pays.",
      honestNote: "This will not make you money on its own; it is the base for the next program.",
      durationWks: 8,
      feeMonthly: 7500,
      feeMonths: 2,
    },
    {
      slug: "ai-automation-practitioner",
      name: "AI Automation Practitioner",
      audience: "People ready to work with clients",
      summary: "Build the automation and AI systems businesses pay a monthly retainer for.",
      outcome: "A shipped system for a real business, a case study, and the skills to get paid internationally.",
      honestNote: "A strong graduate typically earns first paid work within 60–90 days. Some earn nothing.",
      durationWks: 16,
      feeMonthly: 11000,
      feeMonths: 4,
    },
    {
      slug: "re-skill",
      name: "Re-skill",
      audience: "Freelancers whose rates are falling",
      summary: "Change what you sell, keep your clients, raise your rate.",
      outcome: "A rebuilt offer and a plan to re-pitch existing clients.",
      honestNote: "Writing and translation postings have fallen sharply. Waiting is the expensive option.",
      durationWks: 8,
      feeMonthly: 13000,
      feeMonths: 2,
    },
    {
      slug: "advance",
      name: "Advance",
      audience: "People already in a job",
      summary: "Become the person at your workplace who makes AI actually work.",
      outcome: "A working automation deployed in your own workplace and the business case for it.",
      honestNote: "We cannot promise a promotion; that decision belongs to your employer.",
      durationWks: 8,
      feeMonthly: 17500,
      feeMonths: 2,
    },
  ];

  const courseBySlug: Record<string, { id: string }> = {};
  for (const c of coursesData) {
    const created = await prisma.course.create({
      data: { ...c, isPublished: true, sortOrder: 0 },
    });
    courseBySlug[c.slug] = { id: created.id };
  }

  const iso = (d: string) => new Date(d);

  const batches = await Promise.all([
    prisma.batch.create({
      data: {
        courseId: courseBySlug.foundation.id,
        name: "Foundation · Girls · Midday · 2026-09",
        gender: "FEMALE",
        timeSlot: "MIDDAY",
        hall: "Hall 2 (Girls)",
        startDate: iso("2026-09-07"),
        capacity: 25,
        status: "OPEN",
      },
    }),
    prisma.batch.create({
      data: {
        courseId: courseBySlug["re-skill"].id,
        name: "Re-skill · Cohort 1 · Evenings",
        gender: "MALE",
        timeSlot: "EVENING",
        hall: "Hall 1 (Boys)",
        startDate: iso("2026-08-03"),
        capacity: 16,
        status: "RUNNING",
      },
    }),
    prisma.batch.create({
      data: {
        courseId: courseBySlug["ai-automation-practitioner"].id,
        name: "Practitioner · Cohort 1 · Evenings",
        gender: "FEMALE",
        timeSlot: "EVENING",
        hall: "Hall 3 (Girls)",
        startDate: iso("2026-10-05"),
        capacity: 16,
        status: "OPEN",
      },
    }),
  ]);

  // One enrolled student on the running Re-skill batch, with pending fees.
  const studentUser = await prisma.user.create({
    data: {
      email: "usman.tariq@student.skillspromax.com",
      passwordHash: await bcrypt.hash("skillspromax-dev-123", 10),
      name: "Usman Tariq",
      role: "STUDENT",
      phone: "+923331234567",
      gender: "MALE",
    },
  });
  const profile = await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      rollNo: "SPM-2026-001",
      fatherName: "Tariq Mehmood",
      city: "Depalpur city",
      whatsapp: "+923331234567",
    },
  });

  const enrollment = await prisma.enrollment.create({
    data: {
      studentId: profile.id,
      batchId: batches[1].id,
      feeMonthly: 13000,
      feeMonths: 2,
      status: "ACTIVE",
    },
  });

  await prisma.feePayment.createMany({
    data: [
      {
        enrollmentId: enrollment.id,
        label: "Month 1",
        amount: 13000,
        method: "BANK_TRANSFER",
        status: "VERIFIED",
        paidAt: iso("2026-08-10"),
        verifiedById: admin.id,
      },
      {
        enrollmentId: enrollment.id,
        label: "Month 2",
        amount: 13000,
        method: "JAZZCASH",
        status: "PENDING",
        reference: "JC8841220",
      },
    ],
  });

  console.log(
    `✓ Seeded ${apps.length} applications, 4 courses, ${batches.length} batches, 1 enrolled student with 1 pending fee.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
