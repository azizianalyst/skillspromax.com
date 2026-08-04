import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth config.
 *
 * Imported by BOTH `src/auth.ts` (full instance, Node runtime — can call
 * Prisma + bcrypt inside the Credentials provider) and `src/middleware.ts`
 * (Edge runtime — must NOT touch the database). That is why the providers
 * array is empty here: the real provider is added in `auth.ts`.
 *
 * The cookie written on sign-in is JWT-based, so middleware can read the
 * session on the edge without a DB round-trip.
 */
export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [], // filled in by src/auth.ts

  callbacks: {
    /** Route gating. Runs on the edge via middleware. */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string } | undefined)?.role;
      const isAdminArea = nextUrl.pathname.startsWith("/admin");
      const isPortalArea = nextUrl.pathname.startsWith("/portal");
      const isLoginPage = nextUrl.pathname.startsWith("/login");

      // Allow the login page when explaining a broken account (after signOut).
      const accountError = nextUrl.searchParams.get("error") === "account";

      if (isLoginPage) {
        if (isLoggedIn && !accountError) {
          const dest = role === "STUDENT" ? "/portal" : "/admin";
          return Response.redirect(new URL(dest, nextUrl));
        }
        return true;
      }

      if (isAdminArea) {
        if (!isLoggedIn) return false;
        if (role === "STUDENT") {
          return Response.redirect(new URL("/portal", nextUrl));
        }
        return true;
      }

      if (isPortalArea) {
        if (!isLoggedIn) return false;
        if (role === "ADMIN" || role === "STAFF") {
          return Response.redirect(new URL("/admin", nextUrl));
        }
        return true;
      }

      return true;
    },

    /** Attach role + id to the token at sign-in. */
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },

    /** Surface role + id on the session object. */
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
