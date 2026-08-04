import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { db } from "@/lib/db";

type StudentContext = {
  user: NonNullable<Awaited<ReturnType<typeof loadStudent>>>["user"];
  profile: NonNullable<Awaited<ReturnType<typeof loadStudent>>>["profile"];
};

async function loadStudent() {
  const session = await auth();
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!userId || role !== "STUDENT") return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { studentProfile: true },
  });

  if (!user || !user.isActive || !user.studentProfile) return null;

  return { user, profile: user.studentProfile };
}

/**
 * For RSC pages/layouts: redirect or sign out on failure.
 */
export async function requireStudent(): Promise<StudentContext> {
  const session = await auth();
  const userId = session?.user?.id;
  const role = session?.user?.role;

  if (!userId) redirect("/login?callbackUrl=/portal");

  if (role !== "STUDENT") {
    if (role === "ADMIN" || role === "STAFF") redirect("/admin");
    redirect("/login?callbackUrl=/portal");
  }

  const loaded = await loadStudent();
  if (!loaded) {
    // Sign out broken accounts so middleware does not bounce login ↔ portal.
    await signOut({ redirectTo: "/login?error=account" });
    redirect("/login?error=account");
  }

  return loaded;
}

/**
 * For server actions: return null instead of redirecting (redirect/signOut
 * inside actions can escape the request scope).
 */
export async function getStudentForAction(): Promise<StudentContext | null> {
  return loadStudent();
}
