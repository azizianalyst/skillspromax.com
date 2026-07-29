import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * Edge middleware. Only runs on /admin and /login so it never interferes with
 * public pages or server actions elsewhere. Role is NOT checked here (the
 * token's role is available but we keep the gate simple); the admin layout
 * enforces ADMIN/STAFF on the Node side.
 */
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
