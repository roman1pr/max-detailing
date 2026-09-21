"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type UIState = {
  bookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
};

const Ctx = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const value = useMemo(
    () => ({
      bookingOpen,
      openBooking: () => setBookingOpen(true),
      closeBooking: () => setBookingOpen(false),
    }),
    [bookingOpen],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUI outside provider");
  return ctx;
}
