import type { DefaultSession } from "next-auth";

/**
 * Extend the NextAuth types with the fields we carry on the user: the Prisma
 * `role` and the user `id`. Without this, session.user.role is unknown to TS.
 */
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: DefaultSession["user"] & {
      id?: string;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
