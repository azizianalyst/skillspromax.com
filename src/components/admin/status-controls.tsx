"use client";

import { useTransition } from "react";
import { updateApplicationStatus } from "@/app/admin/actions";
import { PIPELINE, statusLabel, type ApplicationStatus } from "@/lib/status";

export function StatusControls({
  applicationId,
  current,
}: {
  applicationId: string;
  current: ApplicationStatus;
}) {
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const status = String(data.get("status")) as ApplicationStatus;
    const note = String(data.get("note") ?? "").trim();
    start(async () => {
      await updateApplicationStatus(applicationId, status, note);
      form.reset();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
      <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
        {pending ? "Saving…" : "Update status"}
      </button>
    </form>
  );
}
