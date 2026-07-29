import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { db } from "@/lib/db";
import { programs } from "@/content/site";
import { StatusBadge } from "@/components/admin/status-badge";
import { StatusControls } from "@/components/admin/status-controls";
import type { ApplicationStatus } from "@/lib/status";
import { NoteForm } from "@/components/admin/note-form";
import { AssignControl } from "@/components/admin/assign-control";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const app = await db.application.findUnique({
    where: { id },
    include: {
      notes: {
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      },
      assignedTo: { select: { name: true } },
      batch: { select: { name: true } },
    },
  });

  if (!app) notFound();

  const staff = await db.user.findMany({
    where: { role: { in: ["ADMIN", "STAFF"] }, isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const program = programs.find((p) => p.slug === app.programSlug);
  const digits = (s: string) => s.replace(/[^\d]/g, "");
  const waDigits = digits(app.whatsapp || app.phone);

  const rows: { label: string; value?: string | null }[] = [
    { label: "Father's name", value: app.fatherName },
    { label: "Gender", value: app.gender === "FEMALE" ? "Female" : "Male" },
    { label: "CNIC", value: app.cnic },
    { label: "City / village", value: app.city },
    { label: "Education", value: app.education },
    { label: "Preferred timing", value: app.preferredSlot?.replace("_", " ").toLowerCase() },
    { label: "Has computer", value: app.hasComputer ? "Yes" : "No" },
    { label: "Has internet", value: app.hasInternet ? "Yes" : "No" },
    { label: "How they heard", value: app.howHeard },
    { label: "Batch", value: app.batch?.name },
  ];

  return (
    <div className="space-y-7">
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-accent"
      >
        <ArrowLeft className="size-3.5" aria-hidden /> All applications
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="display-md">{app.fullName}</h1>
            <StatusBadge status={app.status as ApplicationStatus} />
          </div>
          <p className="mt-1 text-sm text-muted">
            {app.reference} · {program?.name ?? app.programSlug}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`tel:${digits(app.phone)}`} className="btn btn-outline btn-sm">
            <Phone className="size-3.5" aria-hidden /> Call
          </a>
          <a
            href={`https://wa.me/${waDigits}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
          >
            <MessageCircle className="size-3.5" aria-hidden /> WhatsApp
          </a>
          {app.email && (
            <a href={`mailto:${app.email}`} className="btn btn-outline btn-sm">
              <Mail className="size-3.5" aria-hidden /> Email
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-7 lg:grid-cols-12">
        {/* Left — applicant details */}
        <div className="space-y-7 lg:col-span-7">
          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-ink">Applicant</h2>
            <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {rows
                .filter((r) => r.value)
                .map((r) => (
                  <div key={r.label} className="flex flex-col">
                    <dt className="text-xs uppercase tracking-wider text-faint">{r.label}</dt>
                    <dd className="mt-0.5 text-sm capitalize text-ink-2">{r.value}</dd>
                  </div>
                ))}
            </dl>
            {app.motivation && (
              <div className="mt-5 border-t border-line pt-5">
                <p className="text-xs uppercase tracking-wider text-faint">Why they applied</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-2">{app.motivation}</p>
              </div>
            )}
          </section>

          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-ink">Timeline</h2>
            {app.notes.length === 0 ? (
              <p className="mt-4 text-sm text-muted">No activity recorded yet.</p>
            ) : (
              <ol className="mt-5 space-y-5">
                {app.notes.map((n) => (
                  <li key={n.id} className="relative border-l border-line pl-5">
                    <span className="absolute -left-[3px] top-1.5 size-1.5 rounded-full bg-accent" />
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-ink-2">
                        {n.author.name}
                      </span>
                      {n.statusFrom && n.statusTo && (
                        <span className="chip text-[0.6875rem]">
                          {n.statusFrom.replace("_", " ").toLowerCase()} →{" "}
                          {n.statusTo.replace("_", " ").toLowerCase()}
                        </span>
                      )}
                      <span className="ml-auto text-xs text-faint">
                        {n.createdAt.toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{n.body}</p>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        {/* Right — actions */}
        <div className="space-y-5 lg:col-span-5">
          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-ink">Move through pipeline</h2>
            <div className="mt-4">
              <StatusControls applicationId={app.id} current={app.status as ApplicationStatus} />
            </div>
          </section>

          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-ink">Assigned to</h2>
            <p className="mt-1 text-xs text-muted">
              Currently: {app.assignedTo?.name ?? "Unassigned"}
            </p>
            <div className="mt-3">
              <AssignControl applicationId={app.id} staff={staff} current={app.assignedToId} />
            </div>
          </section>

          <section className="card p-6">
            <h2 className="font-sans text-sm font-semibold text-ink">Quick note</h2>
            <div className="mt-4">
              <NoteForm applicationId={app.id} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
