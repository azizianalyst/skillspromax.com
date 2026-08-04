import { NextRequest, NextResponse } from "next/server";
import { applyJazzCashPayload } from "@/lib/jazzcash-process";

function formToRecord(form: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

/**
 * JazzCash Instant Payment Notification (server-to-server).
 * Authoritative when the browser never hits the return URL.
 */
export async function POST(req: NextRequest) {
  let payload: Record<string, string> = {};
  try {
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const json = (await req.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(json)) {
        if (v !== undefined && v !== null) payload[k] = String(v);
      }
    } else {
      const form = await req.formData();
      payload = formToRecord(form);
    }
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = await applyJazzCashPayload(payload);
  if (result === "invalid") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  return NextResponse.json({ ok: true, status: result });
}
