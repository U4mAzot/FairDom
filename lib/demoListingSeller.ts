/** Opcjonalny UUID sprzedawcy dla demonstracyjnych ofert (np. konto testowe). Ustaw NEXT_PUBLIC_DEMO_SELLER_USER_ID w .env.local. */
export function getDemoSellerUserId(): string | undefined {
  const v = process.env.NEXT_PUBLIC_DEMO_SELLER_USER_ID;
  if (!v || typeof v !== "string") return undefined;
  const t = v.trim();
  if (t.length < 32) return undefined;
  return t;
}
