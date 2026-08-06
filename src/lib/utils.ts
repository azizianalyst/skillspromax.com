export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Public site currency (Dubai launch). */
export function formatAed(amount: number) {
  return `AED ${amount.toLocaleString("en-AE")}`;
}

/** Alias used across marketing pages. */
export function formatMoney(amount: number) {
  return formatAed(amount);
}

/** Admin/portal legacy helper — still PKR for existing student records. */
export function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function formatDate(date: Date | null | undefined) {
  if (!date) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
