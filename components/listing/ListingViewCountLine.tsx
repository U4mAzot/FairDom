import { formatViewCountPl } from "@/lib/formatViewCountPl";

type Props = {
  count: number;
  className?: string;
};

/** Mała stopka: liczba wyświetleń ogłoszenia (dane mock / później z API). */
export function ListingViewCountLine({ count, className = "" }: Props) {
  const safe = typeof count === "number" && !Number.isNaN(count) ? count : 0;
  return (
    <p
      className={`text-[11px] leading-snug text-outline md:text-xs ${className}`.trim()}
      role="status"
    >
      {formatViewCountPl(safe)}
    </p>
  );
}
