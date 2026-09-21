"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem("max-cookie") !== "1");
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs rounded-2xl bg-surface p-4 text-sm text-mist ring-1 ring-white/10">
      <p>
        Сайт использует cookie, чтобы формы и запись работали. Подробности в{" "}
        <a href="/privacy" className="text-foam underline underline-offset-2">
          политике
        </a>
        .
      </p>
      <button
        type="button"
        className="mt-3 rounded-full bg-foam px-4 py-1.5 text-ink"
        onClick={() => {
          localStorage.setItem("max-cookie", "1");
          setShow(false);
        }}
      >
        Окей
      </button>
    </div>
  );
}
