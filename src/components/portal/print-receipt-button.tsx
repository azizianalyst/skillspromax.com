"use client";

import { Printer } from "lucide-react";

export function PrintReceiptButton() {
  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={() => window.print()}>
      <Printer className="size-3.5" aria-hidden />
      Print receipt
    </button>
  );
}
