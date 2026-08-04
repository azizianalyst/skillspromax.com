export type DeliverableStatus = "NOT_STARTED" | "IN_PROGRESS" | "SHIPPED";

export function normalizeDeliverableStatus(raw: string | null | undefined): DeliverableStatus {
  if (raw === "IN_PROGRESS" || raw === "SHIPPED") return raw;
  return "NOT_STARTED";
}

export function deliverableStatusLabel(status: string) {
  switch (normalizeDeliverableStatus(status)) {
    case "SHIPPED":
      return "Shipped";
    case "IN_PROGRESS":
      return "In progress";
    default:
      return "Not started";
  }
}

export function deliverableStatusHint(status: string) {
  switch (normalizeDeliverableStatus(status)) {
    case "SHIPPED":
      return "Your client deliverable has been marked complete. That is what counts as finishing — not attendance alone.";
    case "IN_PROGRESS":
      return "You are working on a real client brief under supervision. Keep going until it ships.";
    default:
      return "Client work starts in the middle of the program. Staff will update this when your brief is assigned.";
  }
}
