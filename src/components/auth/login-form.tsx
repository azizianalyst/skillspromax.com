"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";
import { safeCallbackUrl } from "@/lib/fees";

/**
 * Client login form. Uses next-auth/react's signIn with redirect:false so we
 * can show an inline error instead of bouncing to the error page.
 * After a successful sign-in, route by role unless a safe callbackUrl was given.
 */
export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const explicitCallback = params.get("callbackUrl");
  const accountError = params.get("error") === "account";

  const [error, setError] = useState<string | null>(
    accountError
      ? "This account is inactive or not fully set up. Ask admissions to activate your student profile."
      : null,
  );
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const form = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
      redirect: false,
    });

    if (!res || res.error) {
      setPending(false);
      setError("Incorrect email or password. If you have forgotten it, ask an administrator.");
      return;
    }

    // Retry briefly — session cookie can lag one tick after signIn.
    let role: string | undefined;
    for (let i = 0; i < 5; i++) {
      const session = await getSession();
      role = session?.user?.role;
      if (role) break;
      await new Promise((r) => setTimeout(r, 50));
    }

    const home = role === "STUDENT" ? "/portal" : "/admin";
    const dest = safeCallbackUrl(explicitCallback, home);

    // Students must not land in admin via a crafted callbackUrl
    const finalDest =
      role === "STUDENT" && dest.startsWith("/admin")
        ? "/portal"
        : role !== "STUDENT" && dest.startsWith("/portal")
          ? "/admin"
          : dest;

    router.push(finalDest);
    router.refresh();
  }

  return (
    <form action="#" method="post" onSubmit={onSubmit} className="card p-6 md:p-7" noValidate>
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-4 text-sm text-[color:var(--color-danger)]"
        >
          <AlertCircle className="mt-px size-4 shrink-0" aria-hidden />
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="field"
          />
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full">
        {pending ? "Signing in…" : "Sign in"}
      </button>

      <p className="mt-5 text-center text-xs text-muted">
        Staff and student accounts only. There is no public sign-up.
      </p>
    </form>
  );
}
