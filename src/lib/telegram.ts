export type LeadNotifyPayload = {
  intent?: string;
  car?: string;
  service?: string;
  name?: string;
  phone?: string;
  giftAmount?: number;
};

const intentLabels: Record<string, string> = {
  lead: "Заявка",
  booking: "Запись",
  gift: "Сертификат",
};

export function buildLeadTelegramMessage(payload: LeadNotifyPayload) {
  const title = intentLabels[payload.intent ?? ""] ?? "Заявка с сайта";
  const lines = [
    `MAXДЕТЕЙЛИНГ · ${title}`,
    `Время: ${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
  ];

  if (payload.phone) lines.push(`Телефон: ${payload.phone}`);
  if (payload.name) lines.push(`Имя: ${payload.name}`);
  if (payload.car) lines.push(`Авто: ${payload.car}`);
  if (payload.service) lines.push(`Услуга: ${payload.service}`);
  if (payload.giftAmount) {
    lines.push(
      `Номинал: ${new Intl.NumberFormat("ru-RU").format(payload.giftAmount)} ₽`,
    );
  }

  return lines.join("\n");
}

function chatIds() {
  const raw = process.env.TELEGRAM_CHAT_ID ?? process.env.TELEGRAM_CHAT_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export async function notifyTelegramLead(payload: LeadNotifyPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const ids = chatIds();
  const text = buildLeadTelegramMessage(payload);

  if (!token || ids.length === 0) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return { ok: false as const, error: "not_configured" as const };
  }

  try {
    const results = await Promise.all(
      ids.map(async (chat_id) => {
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id,
            text,
            disable_web_page_preview: true,
          }),
          signal: AbortSignal.timeout(5000),
        });
        const body = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          description?: string;
        };
        return { chat_id, ok: res.ok && body.ok !== false, body };
      }),
    );

    const ok = results.every((r) => r.ok);
    if (!ok) {
      console.error("[telegram] send failed", results);
    }
    return { ok, results };
  } catch (err) {
    const message = err instanceof Error ? err.message : "telegram_error";
    console.error("[telegram]", message);
    return { ok: false as const, error: message };
  }
}
