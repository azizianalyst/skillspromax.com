import { createHmac } from "crypto";

/**
 * JazzCash hosted checkout (page redirection).
 *
 * Hash scheme (merchant guide): HMAC-SHA256 over Integrity Salt + sorted
 * non-empty pp_* values joined with &, salt as HMAC key. Amount is paisa.
 *
 * When merchant env vars are missing, isJazzCashConfigured() is false and the
 * portal hides the hosted-pay button — manual txn-ID submission still works.
 */

export type JazzCashFields = Record<string, string>;

export function isJazzCashConfigured(): boolean {
  return Boolean(
    process.env.JAZZCASH_MERCHANT_ID?.trim() &&
      process.env.JAZZCASH_PASSWORD?.trim() &&
      process.env.JAZZCASH_INTEGRITY_SALT?.trim(),
  );
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export function jazzCashFormUrl(): string {
  const env = (process.env.JAZZCASH_ENV ?? "sandbox").toLowerCase();
  if (env === "production" || env === "live") {
    return "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/";
  }
  return "https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/";
}

function integritySalt() {
  return process.env.JAZZCASH_INTEGRITY_SALT!.trim();
}

/** Build HMAC-SHA256 secure hash for a set of pp_* fields. */
export function jazzCashSecureHash(fields: JazzCashFields): string {
  const salt = integritySalt();
  const sortedKeys = Object.keys(fields)
    .filter((k) => k !== "pp_SecureHash" && fields[k] !== undefined && fields[k] !== "")
    .sort();
  const hashString = [salt, ...sortedKeys.map((k) => fields[k])].join("&");
  return createHmac("sha256", salt).update(hashString, "utf8").digest("hex").toUpperCase();
}

/** Verify a JazzCash return/IPN payload. Returns false if hash missing or wrong. */
export function verifyJazzCashHash(payload: Record<string, string>): boolean {
  if (!isJazzCashConfigured()) return false;
  const received = payload.pp_SecureHash;
  if (!received) return false;
  const fields: JazzCashFields = {};
  for (const [k, v] of Object.entries(payload)) {
    if (k === "pp_SecureHash") continue;
    if (v === undefined || v === null) continue;
    fields[k] = String(v);
  }
  const expected = jazzCashSecureHash(fields);
  return expected === received.toUpperCase();
}

export function isJazzCashSuccess(payload: Record<string, string>): boolean {
  return payload.pp_ResponseCode === "000";
}

/**
 * Build hosted-checkout form fields for one FeePayment.
 * txnRef should be unique and stored on FeePayment.gatewayRef before redirect.
 */
export function buildHostedCheckout(args: {
  txnRef: string;
  amountPkr: number;
  description: string;
  billReference: string;
}): { actionUrl: string; fields: JazzCashFields } {
  if (!isJazzCashConfigured()) {
    throw new Error("JazzCash is not configured");
  }

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = now.getFullYear();
  const mm = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());
  const hh = pad(now.getHours());
  const mi = pad(now.getMinutes());
  const ss = pad(now.getSeconds());
  const txnDateTime = `${yyyy}${mm}${dd}${hh}${mi}${ss}`;

  // Expiry: +1 day
  const exp = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const expDateTime = `${exp.getFullYear()}${pad(exp.getMonth() + 1)}${pad(exp.getDate())}${pad(exp.getHours())}${pad(exp.getMinutes())}${pad(exp.getSeconds())}`;

  const amountPaisa = String(Math.round(args.amountPkr) * 100);
  const base = siteUrl();

  const fields: JazzCashFields = {
    pp_Version: "1.1",
    pp_TxnType: "MPAY",
    pp_Language: "EN",
    pp_MerchantID: process.env.JAZZCASH_MERCHANT_ID!.trim(),
    pp_Password: process.env.JAZZCASH_PASSWORD!.trim(),
    pp_TxnRefNo: args.txnRef,
    pp_Amount: amountPaisa,
    pp_TxnCurrency: "PKR",
    pp_TxnDateTime: txnDateTime,
    pp_BillReference: args.billReference.slice(0, 20),
    pp_Description: args.description.slice(0, 100),
    pp_TxnExpiryDateTime: expDateTime,
    pp_ReturnURL: `${base}/api/payments/jazzcash/return`,
    ppmpf_1: args.billReference.slice(0, 255),
  };

  fields.pp_SecureHash = jazzCashSecureHash(fields);

  return { actionUrl: jazzCashFormUrl(), fields };
}

/** Stable txn ref tied to a FeePayment id (unique per attempt via suffix). */
export function makeTxnRef(paymentId: string): string {
  const stamp = Date.now().toString(36).toUpperCase();
  const short = paymentId.replace(/[^a-zA-Z0-9]/g, "").slice(-10).toUpperCase();
  return `SPM${short}${stamp}`.slice(0, 20);
}
