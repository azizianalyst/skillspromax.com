import { db } from "@/lib/db";

/**
 * Human-readable application reference: SPM-2026-0134
 * Sequential per calendar year so staff can say it on the phone.
 */
export async function nextApplicationReference(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `SPM-${year}-`;

  const last = await db.application.findFirst({
    where: { reference: { startsWith: prefix } },
    orderBy: { reference: "desc" },
    select: { reference: true },
  });

  const lastNo = last ? Number.parseInt(last.reference.slice(prefix.length), 10) : 0;
  const next = Number.isFinite(lastNo) ? lastNo + 1 : 1;

  return `${prefix}${String(next).padStart(4, "0")}`;
}
