export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function formatPkr(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
