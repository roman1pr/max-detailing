import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

type Props = {
  href?: string | false;
  size?: number;
  withWordmark?: boolean;
  className?: string;
  priority?: boolean;
};

export function SiteLogo({
  href = "/",
  size = 40,
  withWordmark = false,
  className = "",
  priority = false,
}: Props) {
  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={size > 72 ? site.logo : site.logoMark}
        alt={site.legalName}
        width={size}
        height={size}
        priority={priority}
        className="shrink-0 rounded-full"
      />
      {withWordmark ? (
        <span className="font-display text-[15px] tracking-[0.14em] text-foam">
          {site.name}
        </span>
      ) : null}
    </span>
  );

  if (!href) return mark;
  return (
    <Link href={href} className="shrink-0" aria-label={site.legalName}>
      {mark}
    </Link>
  );
}
