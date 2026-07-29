import Link from "next/link";
import { db } from "@/lib/db";
import { HandleToggle } from "@/components/admin/handle-toggle";
import { cn } from "@/lib/utils";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const unhandledOnly = filter === "unhandled";
  const inquiries = await db.inquiry.findMany({
    where: unhandledOnly ? { isHandled: false } : {},
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const tabClass = (active: boolean) =>
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
          <h1 className="display-md">Inquiries</h1>
          <p className="mt-1 text-sm text-muted">Messages from the contact form.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/inquiries" className={tabClass(!unhandledOnly)}>
            All
          </Link>
          <Link href="/admin/inquiries?filter=unhandled" className={tabClass(unhandledOnly)}>
            Unhandled only
          </Link>
        </div>
      </header>

      <div className="space-y-3">
        {inquiries.length === 0 && (
          <p className="card p-8 text-center text-sm text-muted">No enquiries.</p>
        )}
        {inquiries.map((i) => (
          <div key={i.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink">
                  {i.name}
                  {i.subject && (
                    <>
                      <span className="text-muted"> · </span>
                      <span className="text-ink-2">{i.subject}</span>
                    </>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  <span className="tnum">{i.phone}</span>
                  {i.email && <> · {i.email}</>}
                  {" · "}
                  {i.createdAt.toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <HandleToggle inquiryId={i.id} handled={i.isHandled} />
            </div>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
