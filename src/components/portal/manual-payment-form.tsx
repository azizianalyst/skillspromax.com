"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { submitManualPayment, type PortalActionState } from "@/app/portal/actions";

const initial: PortalActionState = { ok: false };

export function ManualPaymentForm({ paymentId }: { paymentId: string }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(submitManualPayment, initial);
  const [method, setMethod] = useState("JAZZCASH");

  useEffect(() => {
    if (state.ok) {
      router.push("/portal/fees?submitted=1");
      router.refresh();
    }
  }, [state.ok, router]);

  const isCash = method === "CASH";

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="paymentId" value={paymentId} />

      {state.error && !state.ok && (
        <p role="alert" className="text-sm text-[color:var(--color-danger)]">
          {state.error}
        </p>
      )}

      <div>
        <label className="label" htmlFor="method">
          Payment method
        </label>
        <select
          id="method"
          name="method"
          required
          className="field"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="JAZZCASH">JazzCash</option>
          <option value="EASYPAISA">Easypaisa</option>
          <option value="BANK_TRANSFER">Bank transfer</option>
          <option value="CASH">Cash at campus</option>
        </select>
      </div>

      <div>
        <label className="label" htmlFor="reference">
          {isCash ? "Receipt number or note" : "Transaction ID / receipt number"}
        </label>
        <input
          id="reference"
          name="reference"
          required
          className="field"
          placeholder={isCash ? "e.g. CASH-15AUG or receipt number" : "e.g. JC8841220"}
          autoComplete="off"
        />
        {state.errors?.reference?.[0] && (
          <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">
            {state.errors.reference[0]}
          </p>
        )}
        <p className="mt-1.5 text-xs text-muted">
          {isCash
            ? "Pay at the admissions desk, then enter the receipt number or the date you paid."
            : "Send the fee to the institute JazzCash / Easypaisa / bank account, then enter the transaction ID here. Staff will verify it before it shows as paid."}
        </p>
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? "Submitting…" : "Submit for verification"}
      </button>
    </form>
  );
}
