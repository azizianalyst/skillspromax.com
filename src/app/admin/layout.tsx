import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Middleware already gates /admin behind login, but double-guard here.
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");

  const role = session.user.role;
  if (role !== "ADMIN" && role !== "STAFF") {
    return (
      <div className="shell py-24 text-center">
        <h1 className="display-md">Not allowed</h1>
        <p className="mt-3 text-muted">
          Your account does not have access to the admin area.
        </p>
        <a href="/" className="btn btn-primary mt-6">
          Back to the site
        </a>
      </div>
    );
  }

  const [newApplications, unhandledInquiries] = await Promise.all([
    db.application.count({ where: { status: "NEW" } }),
    db.inquiry.count({ where: { isHandled: false } }),
  ]);

  return (
    <div className="flex min-h-dvh bg-[color:var(--color-sand-deep)]/30">
      <AdminNav
        userName={session.user.name ?? "User"}
        role={role ?? ""}
        counts={{ newApplications, unhandledInquiries }}
      />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">{children}</div>
      </div>
    </div>
  );
}
