import type { Icon } from "@phosphor-icons/react";
import {
  CarProfile,
  Car,
  Drop,
  Engine,
  Headlights,
  Seat,
  ShieldCheck,
  Sparkle,
  SprayBottle,
  Tire,
  Van,
  Wind,
  Wrench,
  DropHalf,
} from "@phosphor-icons/react/dist/ssr";
import type { IconKey } from "@/data/price";

const map: Record<IconKey, Icon> = {
  drop: Drop,
  sparkle: Sparkle,
  shield: ShieldCheck,
  spray: SprayBottle,
  wrench: Wrench,
  wind: Wind,
  tire: Tire,
  car: Car,
  sedan: CarProfile,
  suv: Car,
  van: Van,
  engine: Engine,
  seat: Seat,
  headlight: Headlights,
  wax: DropHalf,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  const Glyph = map[name] ?? Car;
  return <Glyph className={className} weight="light" />;
}
