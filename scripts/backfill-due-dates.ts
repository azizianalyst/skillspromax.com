import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const payments = await prisma.feePayment.findMany({ orderBy: { createdAt: "asc" } });
  for (const p of payments) {
    if (p.label.includes("1")) {
      await prisma.feePayment.update({
        where: { id: p.id },
        data: {
          dueDate: new Date("2026-06-05"),
          ...(p.status === "VERIFIED" && !p.reference ? { reference: "BANK-0608" } : {}),
        },
      });
    } else if (p.label.includes("2")) {
      await prisma.feePayment.update({
        where: { id: p.id },
        data: {
          dueDate: new Date("2026-07-15"),
          ...(p.status === "PENDING"
            ? { reference: null, gatewayRef: null, status: "PENDING" }
            : {}),
        },
      });
    } else if (!p.dueDate) {
      await prisma.feePayment.update({
        where: { id: p.id },
        data: { dueDate: p.createdAt },
      });
    }
  }
  console.log("Backfilled", payments.length, "payments");
  console.log(
    await prisma.feePayment.findMany({
      select: { label: true, status: true, dueDate: true, reference: true },
    }),
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
