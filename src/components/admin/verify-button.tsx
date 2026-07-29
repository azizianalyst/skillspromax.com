"use client";

import { useTransition } from "react";
import { verifyFeePayment } from "@/app/admin/actions";

export function VerifyButton({ paymentId }: { paymentId: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(async () => { await verifyFeePayment(paymentId); })}
      className="btn btn-primary btn-sm"
    >
      {pending ? "Verifying…" : "Verify"}
    </button>
  );
}
