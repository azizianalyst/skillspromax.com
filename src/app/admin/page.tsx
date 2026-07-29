import Link from "next/link";
import { Inbox, MessageSquare, Banknote, Users, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { formatPkr } from "@/lib/utils";
import { programs } from "@/content/site";
import { StatusBadge } from "@/components/admin/status-badge";
import { statusLabel, type ApplicationStatus } from "@/lib/status";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  href,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}) {
  return (
    <Link href={href} className="card card-hover p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-faint">{label}</p>
        <Icon className="size-4 text-muted" aria-hidden />
      </div>
      <p className="mt-3 font-display text-3xl tnum text-ink">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted">{sub}</p>}
    </Link>
  );
}

export default async function AdminDashboard() {
  const [
    totalApps,
    statusGroups,
    unhandledInquiries,
    pendingFees,
    pendingFeesSum,
    activeBatches,
    outcomesCount,
    recent,
  ] = await Promise.all([
    db.application.count(),
    db.application.groupBy({ by: ["status"], _count: { _all: true } }),
    db.inquiry.count({ where: { isHandled: false } }),
    db.feePayment.count({ where: { status: "PENDING" } }),
    db.feePayment.aggregate({ where: { status: "PENDING" }, _sum: { amount: true } }),
    db.batch.count({ where: { status: { in: ["OPEN", "RUNNING"] } } }),
    db.cohortOutcome.count(),
    db.application.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { assignedTo: { select: { name: true } } },
    }),
  ]);

  const byStatus = Object.fromEntries(
    statusGroups.map((g) => [g.status, g._count._all]),
  ) as Partial<Record<ApplicationStatus, number>>;

  const programName = (slug: string) =>
    programs.find((p) => p.slug === slug)?.name ?? slug;

  return (
    <div className="space-y-10">
      <header>
        <h1 className="display-md">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Admissions pipeline and daily priorities.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="New applications"
          value={byStatus.NEW ?? 0}
          sub={`${totalApps} all-time`}
          icon={Inbox}
          href="/admin/applications?status=NEW"
        />
        <StatCard
          label="Awaiting reply"
          value={unhandledInquiries}
          sub="unhandled enquiries"
          icon={MessageSquare}
          href="/admin/inquiries"
        />
        <StatCard
          label="Pending fees"
          value={pendingFees}
          sub={pendingFeesSum._sum.amount ? `${formatPkr(pendingFeesSum._sum.amount)} to verify` : "none to verify"}
          icon={Banknote}
          href="/admin/fees"
        />
        <StatCard
          label="Active batches"
          value={activeBatches}
          sub={`${outcomesCount} outcomes published`}
          icon={Users}
          href="/admin/batches"
        />
      </div>

      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-sans text-sm font-semibold text-ink">Recent applications</h2>
            <Link href="/admin/applications" className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline">
              All applications <ArrowRight className="size-3" aria-hidden />
            </Link>
          </div>
          <div className="card divide-y divide-[color:var(--color-line)]">
            {recent.length === 0 && (
              <p className="p-6 text-sm text-muted">No applications yet.</p>
            )}
            {recent.map((a) => (
              <Link
                key={a.id}
                href={`/admin/applications/${a.id}`}
                className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-sand/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{a.fullName}</p>
                  <p className="mt-0.5 truncate text-xs text-muted">
                    {a.reference} · {programName(a.programSlug)} · {a.phone}
                  </p>
                </div>
                <StatusBadge status={a.status as ApplicationStatus} />
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 className="mb-4 font-sans text-sm font-semibold text-ink">Pipeline</h2>
          <div className="card p-5">
            <ul className="space-y-3">
              {(Object.keys(byStatus) as ApplicationStatus[]).length === 0 && (
                <li className="text-sm text-muted">No applications yet.</li>
              )}
              {(Object.keys(byStatus) as ApplicationStatus[])
                .sort()
                .map((s) => (
                  <li key={s} className="flex items-center justify-between">
                    <span className="text-sm text-ink-2">{statusLabel(s)}</span>
                    <span className="font-display text-lg tnum text-ink">{byStatus[s]}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
