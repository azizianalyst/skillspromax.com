import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.feePayment.updateMany({
    where: { label: "Month 2" },
    data: {
      status: "PENDING",
      reference: null,
      gatewayRef: null,
      paidAt: null,
      verifiedById: null,
      method: "JAZZCASH",
      dueDate: new Date("2026-07-15"),
    },
  });
  console.log(result);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
