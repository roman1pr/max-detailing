"use client";

import { useEffect } from "react";
import { X } from "@phosphor-icons/react";
import { LeadForm } from "@/components/lead-form";
import { useUI } from "@/components/ui-provider";

export function BookingModal() {
  const { bookingOpen, closeBooking } = useUI();

  useEffect(() => {
    if (!bookingOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [bookingOpen, closeBooking]);

  if (!bookingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center">
      <button
        type="button"
        aria-label="Закрыть"
        className="absolute inset-0 bg-ink/80"
        onClick={closeBooking}
      />
      <div className="relative z-[1] w-full max-w-lg rounded-[1.75rem] bg-surface p-6 ring-1 ring-white/10 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl text-foam">Записаться</h2>
            <p className="mt-1 max-w-[36ch] text-sm text-mist">
              Напишите марку и задачу. Ответим со слотом и суммой по классу авто.
            </p>
          </div>
          <button
            type="button"
            onClick={closeBooking}
            className="grid size-10 place-items-center rounded-full bg-white/5 text-foam"
            aria-label="Закрыть"
          >
            <X weight="light" className="size-5" />
          </button>
        </div>
        <LeadForm intent="booking" compact />
      </div>
    </div>
  );
}
