"use client";

import { useTransition } from "react";
import { addApplicationNote } from "@/app/admin/actions";

export function NoteForm({ applicationId }: { applicationId: string }) {
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const note = String(new FormData(form).get("note") ?? "").trim();
    if (!note) return;
    start(async () => {
      const res = await addApplicationNote(applicationId, note);
      if (res.ok) form.reset();
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="label" htmlFor="note">
        Add a note
      </label>
      <textarea
        id="note"
        name="note"
        rows={3}
        required
        className="field"
        placeholder="Called the applicant, visited campus, decision…"
      />
      <button type="submit" disabled={pending} className="btn btn-outline btn-sm">
        {pending ? "Adding…" : "Add note"}
      </button>
    </form>
  );
}
