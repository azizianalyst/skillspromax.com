import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="shell flex flex-col items-center py-16 md:py-24">
      <div className="w-full max-w-md">
        <p className="eyebrow">SkillsProMax</p>
        <h1 className="display-md mt-4">Sign in</h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          Admissions, student and staff portal.
        </p>
        <div className="mt-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
