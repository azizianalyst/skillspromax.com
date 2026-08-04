import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  let instructorUser = await prisma.user.findUnique({
    where: { email: "instructor@skillspromax.com" },
  });
  if (!instructorUser) {
    instructorUser = await prisma.user.create({
      data: {
        email: "instructor@skillspromax.com",
        passwordHash: await hash("skillspromax-dev-123", 10),
        name: "Ahmed Raza",
        role: "STAFF",
        phone: "+923291522376",
      },
    });
  }

  let staffProfile = await prisma.staffProfile.findUnique({
    where: { userId: instructorUser.id },
  });
  if (!staffProfile) {
    staffProfile = await prisma.staffProfile.create({
      data: {
        userId: instructorUser.id,
        title: "Lead instructor",
        bio: "Builds client automations for local businesses and teaches the same work in class.",
        isPublic: true,
      },
    });
  }

  const reSkill = await prisma.batch.findFirst({
    where: { name: { contains: "Re-skill" } },
  });
  if (reSkill) {
    await prisma.batch.update({
      where: { id: reSkill.id },
      data: {
        instructorId: staffProfile.id,
        endDate: reSkill.endDate ?? new Date("2026-10-03"),
        hall: reSkill.hall ?? "Hall 1 (Boys)",
        capacity: reSkill.capacity || 16,
      },
    });
  }

  const updated = await prisma.enrollment.updateMany({
    where: { status: "ACTIVE", deliverableStatus: "NOT_STARTED" },
    data: { deliverableStatus: "IN_PROGRESS" },
  });

  console.log("Instructor:", instructorUser.name);
  console.log("Batch updated:", reSkill?.name ?? "none");
  console.log("Enrolments set IN_PROGRESS:", updated.count);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
