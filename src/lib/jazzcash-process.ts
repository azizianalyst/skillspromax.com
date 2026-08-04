import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import {
  isJazzCashConfigured,
  isJazzCashSuccess,
  verifyJazzCashHash,
} from "@/lib/jazzcash";

function revalidatePaymentPaths(paymentId: string) {
  revalidatePath("/portal");
  revalidatePath("/portal/fees");
  revalidatePath(`/portal/fees/${paymentId}`);
  revalidatePath("/admin/fees");
  revalidatePath("/admin");
}

/**
 * Apply a JazzCash return/IPN payload to the matching FeePayment.
 * Idempotent: VERIFIED stays VERIFIED.
 * On gateway failure, preserves an existing manual `reference` (staff can still verify).
 */
export async function applyJazzCashPayload(
  payload: Record<string, string>,
): Promise<"paid" | "failed" | "invalid"> {
  if (!isJazzCashConfigured()) return "invalid";
  if (!verifyJazzCashHash(payload)) {
    console.warn("[jazzcash] invalid secure hash", payload.pp_TxnRefNo);
    return "invalid";
  }

  const txnRef = payload.pp_TxnRefNo;
  if (!txnRef) return "invalid";

  const payment = await db.feePayment.findFirst({
    where: { gatewayRef: txnRef },
  });

  if (!payment) {
    console.warn("[jazzcash] no payment for txn", txnRef);
    return "invalid";
  }

  if (payment.status === "VERIFIED") return "paid";

  // Amount check — JazzCash sends paisa
  const expectedPaisa = String(Math.round(payment.amount) * 100);
  const paidPaisa = payload.pp_Amount?.trim();
  if (paidPaisa && paidPaisa !== expectedPaisa) {
    console.warn("[jazzcash] amount mismatch", {
      txnRef,
      expectedPaisa,
      paidPaisa,
    });
    return "invalid";
  }

  if (isJazzCashSuccess(payload)) {
    await db.feePayment.update({
      where: { id: payment.id },
      data: {
        status: "VERIFIED",
        method: "JAZZCASH",
        paidAt: new Date(),
        reference: payload.pp_RetrievalReferenceNo || payload.pp_TxnRefNo || payment.reference,
      },
    });
    revalidatePaymentPaths(payment.id);
    return "paid";
  }

  // Preserve manual proof if the student already submitted a txn ID.
  const hadManualProof = Boolean(payment.reference?.trim());
  await db.feePayment.update({
    where: { id: payment.id },
    data: hadManualProof
      ? {
          // Keep PENDING so staff can still verify the wallet transfer.
          status: "PENDING",
          method: payment.method,
          // Clear the failed checkout attempt marker; keep manual reference.
          gatewayRef: null,
        }
      : {
          status: "FAILED",
          method: "JAZZCASH",
          // Do not overwrite a null reference with a long gateway message —
          // store a short failure marker only when there was no manual proof.
          reference: (payload.pp_ResponseCode || "FAILED").slice(0, 40),
        },
  });
  revalidatePaymentPaths(payment.id);
  return "failed";
}
