"use client";

import { useActionState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { createOutcome, type OutcomeState } from "@/app/admin/actions";

const initial: OutcomeState = { ok: false };

function Field({
  name,
  label,
  type = "text",
  hint,
  errors,
}: {
  name: string;
  label: string;
  type?: string;
  hint?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} inputMode={type === "number" ? "numeric" : undefined} className="field" aria-invalid={!!errors} />
      {hint && <p className="hint">{hint}</p>}
      {errors && <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">{errors[0]}</p>}
    </div>
  );
}

export function OutcomeForm() {
  const [state, action, pending] = useActionState(createOutcome, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className="card p-6">
        <CheckCircle2 className="size-7 text-accent" aria-hidden />
        <h3 className="mt-3 font-sans text-sm font-semibold text-ink">Outcome published</h3>
        <p className="mt-1 text-sm text-muted">
          It is now on the public results page. Publish the next one, including the bad numbers.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="card p-6">
      {state.error && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-[var(--radius-sm)] border border-[color:var(--color-danger)] bg-[color:var(--color-danger-soft)] p-3 text-sm text-[color:var(--color-danger)]"
        >
          <AlertCircle className="mt-px size-4 shrink-0" aria-hidden />
          {state.error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="batchLabel" label="Batch label" hint="e.g. Re-skill · Cohort 1 · 2026" errors={e.batchLabel} />
        <Field name="courseName" label="Programme name" errors={e.courseName} />
        <Field name="enrolled" label="Enrolled" type="number" errors={e.enrolled} />
        <Field name="completed" label="Completed" type="number" errors={e.completed} />
        <Field name="dropped" label="Dropped" type="number" errors={e.dropped} />
        <Field name="earnedWithin90Days" label="Earned within 90 days" type="number" errors={e.earnedWithin90Days} />
        <Field name="earnedNothing" label="Earned nothing" type="number" hint="Publish this honestly." errors={e.earnedNothing} />
        <Field name="medianFirstInvoice" label="Median first invoice (Rs.)" type="number" errors={e.medianFirstInvoice} />
        <Field name="hiredByUs" label="Hired by us" type="number" errors={e.hiredByUs} />
        <div className="sm:col-span-2">
          <label className="label" htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" rows={3} className="field" />
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary mt-6">
        {pending ? "Publishing…" : "Publish outcome"}
      </button>
    </form>
  );
}
