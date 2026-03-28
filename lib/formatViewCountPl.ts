/** Tekst typu „1 234 wyświetlenia” (poprawna liczba mnoga po polsku). */
export function formatViewCountPl(count: number): string {
  const n = typeof count === "number" && !Number.isNaN(count) ? Math.max(0, Math.floor(count)) : 0;
  const s = n.toLocaleString("pl-PL");
  if (n === 1) return `${s} wyświetlenie`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 > 20)) return `${s} wyświetlenia`;
  return `${s} wyświetleń`;
}
