"use client";

import { useActionState } from "react";
import { updateStudentContact, type PortalActionState } from "@/app/portal/actions";

const initial: PortalActionState = { ok: false };

export function ProfileContactForm({
  phone,
  whatsapp,
}: {
  phone: string;
  whatsapp: string;
}) {
  const [state, action, pending] = useActionState(updateStudentContact, initial);

  return (
    <form action={action} className="space-y-5">
      {state.ok && (
        <p className="text-sm text-accent" role="status">
          Contact details updated.
        </p>
      )}
      {state.error && !state.ok && (
        <p role="alert" className="text-sm text-[color:var(--color-danger)]">
          {state.error}
        </p>
      )}

      <div>
        <label className="label" htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className="field"
          defaultValue={phone}
          autoComplete="tel"
        />
        {state.errors?.phone?.[0] && (
          <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">
            {state.errors.phone[0]}
          </p>
        )}
      </div>

      <div>
        <label className="label" htmlFor="whatsapp">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          className="field"
          defaultValue={whatsapp}
          autoComplete="tel"
        />
        {state.errors?.whatsapp?.[0] && (
          <p className="mt-1.5 text-xs text-[color:var(--color-danger)]">
            {state.errors.whatsapp[0]}
          </p>
        )}
      </div>

      <button type="submit" disabled={pending} className="btn btn-primary">
        {pending ? "Saving…" : "Save contact details"}
      </button>
    </form>
  );
}
