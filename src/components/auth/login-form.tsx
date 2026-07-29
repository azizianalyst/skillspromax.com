"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { AlertCircle } from "lucide-react";

/**
 * Client login form. Uses next-auth/react's signIn with redirect:false so we
 * can show an inline error instead of bouncing to the error page.
 */
export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/admin";

  const [error, setError] = useState<string | null>(null);
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

    setPending(false);

    if (!res || res.error) {
      setError("Incorrect email or password. If you have forgotten it, ask an administrator.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-7" noValidate>
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
            defaultValue="admin@skillspromax.com"
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
