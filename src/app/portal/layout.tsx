import { redirect } from "next/navigation";
import { requireStudent } from "@/lib/student";
import { PortalNav } from "@/components/portal/portal-nav";
import { PortalCampusStrip } from "@/components/portal/portal-campus-strip";

export const metadata = {
  title: "Student portal",
  robots: { index: false, follow: false },
};

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await requireStudent();

  if (user.role !== "STUDENT") redirect("/admin");

  return (
    <div className="min-h-dvh bg-[color:var(--color-sand-deep)]/30">
      <PortalNav userName={user.name} rollNo={profile.rollNo} />
      <div className="shell py-8 md:py-10">
        <div className="mx-auto max-w-3xl">
          {children}
          <PortalCampusStrip />
        </div>
      </div>
    </div>
  );
}
