import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

/**
 * Edge middleware. Gates /admin, /portal and /login. Role is enforced again
 * in the respective layouts on the Node side.
 */
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ["/admin/:path*", "/portal/:path*", "/login"],
};
