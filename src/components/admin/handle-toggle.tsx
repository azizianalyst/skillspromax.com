"use client";

import { useTransition } from "react";
import { Check, RotateCcw } from "lucide-react";
import { setInquiryHandled } from "@/app/admin/actions";

export function HandleToggle({
  inquiryId,
  handled,
}: {
  inquiryId: string;
  handled: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(async () => { await setInquiryHandled(inquiryId, !handled); })}
      className={handled ? "btn btn-ghost btn-sm" : "btn btn-outline btn-sm"}
    >
      {handled ? (
        <>
          <RotateCcw className="size-3.5" aria-hidden /> Reopen
        </>
      ) : (
        <>
          <Check className="size-3.5" aria-hidden /> Mark handled
        </>
      )}
    </button>
  );
}
