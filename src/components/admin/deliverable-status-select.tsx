"use client";

import { useTransition } from "react";
import { setDeliverableStatus } from "@/app/admin/actions";

const OPTIONS = [
  { value: "NOT_STARTED", label: "Not started" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "SHIPPED", label: "Shipped" },
] as const;

export function DeliverableStatusSelect({
  enrollmentId,
  value,
}: {
  enrollmentId: string;
  value: string;
}) {
  const [pending, start] = useTransition();

  return (
    <select
      className="field py-1.5 text-xs"
      disabled={pending}
      defaultValue={value}
      aria-label="Client deliverable status"
      onChange={(e) => {
        const next = e.target.value;
        start(async () => {
          await setDeliverableStatus(enrollmentId, next);
        });
      }}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
