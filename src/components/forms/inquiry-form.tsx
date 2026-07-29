"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiry, type FormState } from "@/app/actions/apply";

const initial: FormState = { ok: false };

export function InquiryForm({ subjectHint }: { subjectHint?: string }) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="card p-7">
        <CheckCircle2 className="size-8 text-accent" aria-hidden />
        <h2 className="display-md mt-4">Message sent</h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          {state.message ?? "Thank you — we will get back to you shortly."} If it is
          urgent, please call or WhatsApp us instead.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card p-6 md:p-7" noValidate>
      {state.message && !state.ok && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-4 text-sm text-[color:var(--color-danger)]"
        >
          <AlertCircle className="mt-px size-4 shrink-0" aria-hidden />
          {state.message}
        </div>
      )}

      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">
            Your name <span className="text-[color:var(--color-danger)]">*</span>
          </label>
          <input id="c-name" name="name" className="field" required aria-invalid={!!e.name} />
          {e.name && <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">{e.name[0]}</p>}
        </div>
        <div>
          <label className="label" htmlFor="c-phone">
            Phone <span className="text-[color:var(--color-danger)]">*</span>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            className="field"
            placeholder="0300 1234567"
            required
            aria-invalid={!!e.phone}
          />
          {e.phone && <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">{e.phone[0]}</p>}
        </div>
        <div>
          <label className="label" htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" className="field" aria-invalid={!!e.email} />
        </div>
        <div>
          <label className="label" htmlFor="c-subject">Subject</label>
          <input
            id="c-subject"
            name="subject"
            className="field"
            defaultValue={subjectHint}
            placeholder="Fees, timings, a program…"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-message">
            Message <span className="text-[color:var(--color-danger)]">*</span>
          </label>
          <textarea
            id="c-message"
            name="message"
            rows={5}
            className="field"
            required
            aria-invalid={!!e.message}
          />
          {e.message && (
            <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">{e.message[0]}</p>
          )}
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary mt-6 w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
