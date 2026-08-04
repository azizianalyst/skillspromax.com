"use client";

import { useState } from "react";
import { prepareJazzCashCheckout } from "@/app/portal/actions";

/**
 * Starts JazzCash hosted checkout: asks the server for signed form fields,
 * then POSTs them to JazzCash (browser redirect).
 */
export function JazzCashPayButton({ paymentId }: { paymentId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onPay() {
    setError(null);
    setPending(true);
    const res = await prepareJazzCashCheckout(paymentId);
    if (!res.ok) {
      setPending(false);
      setError(res.error);
      return;
    }

    const form = document.createElement("form");
    form.method = "POST";
    form.action = res.actionUrl;
    form.style.display = "none";

    for (const [key, value] of Object.entries(res.fields)) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  }

  return (
    <div>
      <button type="button" onClick={onPay} disabled={pending} className="btn btn-primary">
        {pending ? "Redirecting to JazzCash…" : "Pay with JazzCash"}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-[color:var(--color-danger)]">
          {error}
        </p>
      )}
    </div>
  );
}
