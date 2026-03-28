/**
 * Listing wizard data stays in the browser (localStorage), not in Supabase.
 * Keys are scoped per logged-in user (`userId` from Supabase Auth).
 */

const STORAGE_PREFIX = "fairdom-listing-draft";

export type PropertyDetailsDraft = {
  totalArea: string;
  rooms: string;
  floorLevel: string;
  yearBuilt: string;
  mapLat: number;
  mapLng: number;
  addressPrimary: string;
  addressSecondary: string;
  updatedAt: string;
};

function keyFor(userId: string): string {
  return `${STORAGE_PREFIX}:${userId}:property-details`;
}

export function loadPropertyDetailsDraft(userId: string): PropertyDetailsDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(keyFor(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PropertyDetailsDraft;
    if (typeof parsed.mapLat !== "number" || typeof parsed.mapLng !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function savePropertyDetailsDraft(userId: string, draft: Omit<PropertyDetailsDraft, "updatedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PropertyDetailsDraft = {
      ...draft,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(keyFor(userId), JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}
