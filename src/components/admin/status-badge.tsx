import type { ApplicationStatus } from "@/lib/status";
import { statusChipClass, statusLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <span className={statusChipClass(status)}>{statusLabel(status)}</span>;
}
