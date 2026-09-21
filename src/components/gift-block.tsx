"use client";

import { useState } from "react";
import { LeadForm } from "@/components/lead-form";
import { formatRub } from "@/lib/format";

const MIN = 5000;
const MAX = 100000;
const STEP = 1000;

export function GiftBlock() {
  const [amount, setAmount] = useState(25000);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
      <div>
        <h2 className="font-display text-4xl tracking-tight text-foam md:text-5xl">
          Сертификат
        </h2>
        <p className="mt-4 max-w-[48ch] text-mist">
          Любая услуга из прайса. Номинал выбираете сами, остаток не сгорает.
        </p>
        <label className="mt-8 block">
          <span className="text-sm text-mist">Номинал</span>
          <p className="mt-2 font-display text-4xl text-teal">{formatRub(amount)}</p>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-4 w-full accent-teal"
            aria-label="Номинал сертификата"
          />
          <div className="mt-1 flex justify-between text-xs text-mist/80">
            <span>{formatRub(MIN)}</span>
            <span>{formatRub(MAX)}</span>
          </div>
        </label>
      </div>
      <div className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-white/8 sm:p-8">
        <LeadForm intent="gift" giftAmount={amount} />
      </div>
    </div>
  );
}
