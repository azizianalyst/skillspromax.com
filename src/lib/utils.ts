export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Public site currency (USD). */
export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

/** @deprecated Use formatUsd — kept for any old imports. */
export function formatAed(amount: number) {
  return formatUsd(amount);
}

/** Alias used across marketing pages. */
export function formatMoney(amount: number) {
  return formatUsd(amount);
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
