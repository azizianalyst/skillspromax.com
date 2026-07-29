"use client";

import { useTransition } from "react";
import { assignApplication } from "@/app/admin/actions";

export function AssignControl({
  applicationId,
  staff,
  current,
}: {
  applicationId: string;
  staff: { id: string; name: string }[];
  current: string | null;
}) {
  const [pending, start] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const staffId = String(new FormData(e.currentTarget).get("staffId") ?? "") || null;
    start(async () => {
      await assignApplication(applicationId, staffId);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <select
        name="staffId"
        defaultValue={current ?? ""}
        className="field"
        aria-label="Assign to staff member"
      >
        <option value="">Unassigned</option>
        {staff.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={pending} className="btn btn-outline btn-sm">
        {pending ? "…" : "Save"}
      </button>
    </form>
  );
}
