// Defined here (not imported from @prisma/client) so the code is identical
// whether the DB is Postgres (native enum) or SQLite (String) — see
// prisma/schema.prisma vs prisma/schema.postgres.prisma.
export type ApplicationStatus =
  | "NEW"
  | "CONTACTED"
  | "ASSESSMENT_SCHEDULED"
  | "ASSESSED"
  | "OFFERED"
  | "ENROLLED"
  | "REJECTED"
  | "WITHDRAWN";

/** Human-readable label for an application pipeline status. */
export function statusLabel(s: ApplicationStatus): string {
  const map: Record<ApplicationStatus, string> = {
    NEW: "New",
    CONTACTED: "Contacted",
    ASSESSMENT_SCHEDULED: "Assessment scheduled",
    ASSESSED: "Assessed",
    OFFERED: "Offered",
    ENROLLED: "Enrolled",
    REJECTED: "Not offered",
    WITHDRAWN: "Withdrawn",
  };
  return map[s];
}

/** Chip classes for an application status, using the design-system chips. */
export function statusChipClass(s: ApplicationStatus): string {
  switch (s) {
    case "NEW":
    case "OFFERED":
    case "ENROLLED":
      return "chip chip-accent";
    case "ASSESSMENT_SCHEDULED":
    case "ASSESSED":
      return "chip chip-amber";
    case "REJECTED":
    case "WITHDRAWN":
      return "chip";
    default:
      return "chip";
  }
}

/** The full ordered pipeline, for dropdowns and timelines. */
export const PIPELINE: ApplicationStatus[] = [
  "NEW",
  "CONTACTED",
  "ASSESSMENT_SCHEDULED",
  "ASSESSED",
  "OFFERED",
  "ENROLLED",
  "REJECTED",
  "WITHDRAWN",
];
