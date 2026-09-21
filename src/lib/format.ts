export function formatRub(amount: number, isFrom = false): string {
  const n = new Intl.NumberFormat("ru-RU").format(amount);
  return isFrom ? `от ${n} ₽` : `${n} ₽`;
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} мин`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return h === 1 ? "1 ч" : `${h} ч`;
  return `${h} ч ${m} мин`;
}

export function formatPhoneInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  const d = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
  const rest = d.startsWith("7") ? d.slice(1) : d;
  let out = "+7";
  if (rest.length > 0) out += ` ${rest.slice(0, 3)}`;
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}
