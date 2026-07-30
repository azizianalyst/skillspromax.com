"use client";

import { useActionState } from "react";
import { updateApplicationStatusAction, type StatusFormState } from "@/app/admin/actions";
import { PIPELINE, statusLabel, type ApplicationStatus } from "@/lib/status";

/**
 * Progressive-enhancement form (works without JS via a plain POST), so the
 * status move is reachable over plain HTTP as well as in the browser.
 */
export function StatusControls({
  applicationId,
  current,
}: {
  applicationId: string;
  current: ApplicationStatus;
}) {
  const initial: StatusFormState = { ok: false };
  const [state, action, pending] = useActionState(
    updateApplicationStatusAction,
    initial,
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="applicationId" value={applicationId} />

      <div>
        <label className="label" htmlFor="status">
          Move to
        </label>
        <select id="status" name="status" defaultValue={current} className="field">
          {PIPELINE.map((s) => (
            <option key={s} value={s}>
              {statusLabel(s)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label" htmlFor="note">
          Note <span className="text-muted">(optional — recorded in the timeline)</span>
        </label>
        <textarea id="note" name="note" rows={2} className="field" />
      </div>

      {state.error && (
        <p className="text-xs text-[color:var(--color-danger)]">{state.error}</p>
      )}
      {state.ok && (
        <p className="text-xs text-accent">Status updated.</p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
        {pending ? "Saving…" : "Update status"}
      </button>
    </form>
  );
}
