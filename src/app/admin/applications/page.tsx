import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { programs } from "@/content/site";
import { StatusBadge } from "@/components/admin/status-badge";
import { PIPELINE, statusLabel, type ApplicationStatus } from "@/lib/status";
import { cn } from "@/lib/utils";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { status, q } = await searchParams;
  const statusFilter = (PIPELINE as readonly string[]).includes(status ?? "")
    ? (status as ApplicationStatus)
    : undefined;
  const query = q?.trim();

  const where = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(query
      ? {
          OR: [
            { reference: { contains: query } },
            { fullName: { contains: query } },
            { phone: { contains: query } },
            { whatsapp: { contains: query } },
          ],
        }
      : {}),
  };

  const [apps, groups] = await Promise.all([
    db.application.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { assignedTo: { select: { name: true } } },
    }),
    db.application.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countByStatus = Object.fromEntries(
    groups.map((g) => [g.status, g._count._all]),
  ) as Partial<Record<ApplicationStatus, number>>;
  const total = groups.reduce((n, g) => n + g._count._all, 0);

  const programName = (slug: string) =>
    programs.find((p) => p.slug === slug)?.name ?? slug;

  const chipClass = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-xs transition-colors",
      active
        ? "border-accent bg-accent text-white"
        : "border-[color:var(--color-line-strong)] bg-canvas text-ink-2 hover:border-ink",
    );

  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-md">Applications</h1>
          <p className="mt-1 text-sm text-muted">The admissions pipeline. {total} in total.</p>
        </div>
        <form method="get" className="relative">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" aria-hidden />
          <input
            name="q"
            defaultValue={query}
            placeholder="Search name, ref, phone…"
            className="field w-64 pl-9"
          />
        </form>
      </header>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/applications" className={chipClass(!statusFilter)}>
          All <span className="opacity-70">{total}</span>
        </Link>
        {PIPELINE.map((s) => (
          <Link
            key={s}
            href={`/admin/applications?status=${s}`}
            className={chipClass(statusFilter === s)}
          >
            {statusLabel(s)} <span className="opacity-70">{countByStatus[s] ?? 0}</span>
          </Link>
        ))}
      </div>

      <div className="card overflow-hidden">
        {apps.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted">No applications match.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                {["Reference", "Applicant", "Contact", "Assigned", "Applied", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--color-line)]">
              {apps.map((a) => (
                <tr key={a.id} className="group">
                  <td className="px-4 py-3 tnum text-ink-2">{a.reference}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{a.fullName}</p>
                    <p className="text-xs text-muted">{programName(a.programSlug)}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-2 tnum">{a.phone}</td>
                  <td className="px-4 py-3 text-muted">{a.assignedTo?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">
                    {a.createdAt.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/applications/${a.id}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                    >
                      Open <ArrowRight className="size-3" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
