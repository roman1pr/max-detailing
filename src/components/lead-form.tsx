"use client";

import { useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { formatPhoneInput, phoneDigits } from "@/lib/format";

type Props = {
  intent?: "lead" | "booking" | "gift";
  defaultService?: string;
  giftAmount?: number;
  compact?: boolean;
  onDone?: () => void;
};

export function LeadForm({
  intent = "lead",
  defaultService = "",
  giftAmount,
  compact = false,
  onDone,
}: Props) {
  const [car, setCar] = useState("");
  const [service, setService] = useState(defaultService);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Нужно согласие на обработку данных.");
      return;
    }
    if (phoneDigits(phone).length < 11) {
      setStatus("error");
      setMessage("Проверьте номер телефона.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent,
          car,
          service,
          name,
          phone,
          giftAmount,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      onDone?.();
    } catch {
      setStatus("error");
      setMessage("Не отправилось. Напишите в Telegram или позвоните.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-[1.4rem] bg-surface px-6 py-8 ring-1 ring-white/8">
        <p className="font-display text-2xl text-foam">Заявка ушла</p>
        <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-mist">
          Перезвоним или напишем в мессенджер. Обычно в рабочее время это занимает до 15 минут.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      {intent === "gift" ? (
        <label className="grid gap-2">
          <span className="text-sm text-mist">Ваше имя</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field"
            autoComplete="name"
          />
        </label>
      ) : (
        <>
          <label className="grid gap-2">
            <span className="text-sm text-mist">Марка и модель</span>
            <input
              required
              value={car}
              onChange={(e) => setCar(e.target.value)}
              placeholder="Camry, Tiguan, Transit"
              className="field"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm text-mist">Что нужно сделать</span>
            <input
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Полировка, керамика, химчистка"
              className="field"
            />
          </label>
        </>
      )}
      <label className="grid gap-2">
        <span className="text-sm text-mist">Телефон</span>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00"
          className="field"
        />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-mist">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 size-4 accent-teal"
        />
        <span>
          Согласен на обработку персональных данных по{" "}
          <a href="/privacy" className="text-foam underline decoration-white/20 underline-offset-4">
            политике
          </a>{" "}
          и{" "}
          <a href="/consent" className="text-foam underline decoration-white/20 underline-offset-4">
            согласию
          </a>
          .
        </span>
      </label>
      {status === "error" ? <p className="text-sm text-rose-300">{message}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full sm:w-auto"
      >
        {status === "loading" ? "Отправляем" : "Оставить заявку"}
        <span className="btn-orb">
          <ArrowUpRight weight="bold" />
        </span>
      </button>
      {!compact ? (
        <p className="text-xs text-mist/80">Не навязываем лишнее. Скажем, если хватит меньшего объёма.</p>
      ) : null}
    </form>
  );
}
