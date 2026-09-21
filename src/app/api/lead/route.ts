import { NextResponse } from "next/server";
import { notifyTelegramLead } from "@/lib/telegram";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = body as {
    intent?: string;
    car?: string;
    service?: string;
    name?: string;
    phone?: string;
    giftAmount?: number;
  };

  const phone = String(payload.phone ?? "").replace(/\D/g, "");
  if (phone.length < 11) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 400 });
  }

  const lead = {
    intent: payload.intent ?? "lead",
    car: payload.car?.trim() || undefined,
    service: payload.service?.trim() || undefined,
    name: payload.name?.trim() || undefined,
    phone: payload.phone,
    giftAmount: payload.giftAmount,
  };

  console.info("[lead]", lead);

  const telegram = await notifyTelegramLead(lead);

  if (!telegram.ok && telegram.error === "not_configured") {
    // Dev without secrets: still accept the form so UX works locally.
    return NextResponse.json({ ok: true, telegram: "skipped" });
  }

  if (!telegram.ok) {
    return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, telegram: "sent" });
}
