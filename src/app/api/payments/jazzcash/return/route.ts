import { NextRequest, NextResponse } from "next/server";
import { applyJazzCashPayload } from "@/lib/jazzcash-process";

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

function formToRecord(form: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

/** Browser return URL after JazzCash hosted checkout. */
export async function POST(req: NextRequest) {
  let payload: Record<string, string> = {};
  try {
    const form = await req.formData();
    payload = formToRecord(form);
  } catch {
    return NextResponse.redirect(`${siteUrl()}/portal/fees?failed=1`, 303);
  }

  const result = await applyJazzCashPayload(payload);
  if (result === "paid") {
    return NextResponse.redirect(`${siteUrl()}/portal/fees?paid=1`, 303);
  }
  return NextResponse.redirect(`${siteUrl()}/portal/fees?failed=1`, 303);
}

export async function GET() {
  return NextResponse.redirect(`${siteUrl()}/portal/fees`, 303);
}
