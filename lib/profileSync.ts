import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export type ProfileUpsertRow = {
  id: string;
  account_type: "private" | "business";
  company_legal_name?: string | null;
  nip?: string | null;
  regon?: string | null;
  registered_street?: string | null;
  registered_building_no?: string | null;
  registered_apartment?: string | null;
  registered_postal_code?: string | null;
  registered_city?: string | null;
  registered_voivodeship?: string | null;
  registered_country?: string | null;
};

function metaString(meta: Record<string, unknown> | undefined, key: string): string | null {
  const v = meta?.[key];
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

/** Wiersz profilu z user_metadata (po rejestracji / pierwszym logowaniu). */
export function profileRowFromUserMetadata(user: User): ProfileUpsertRow {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const accountType = metaString(meta, "account_type") === "business" ? "business" : "private";
  if (accountType === "private") {
    return { id: user.id, account_type: "private" };
  }
  return {
    id: user.id,
    account_type: "business",
    company_legal_name: metaString(meta, "company_legal_name"),
    nip: metaString(meta, "nip")?.replace(/\D/g, "") ?? null,
    regon: metaString(meta, "regon")?.replace(/\D/g, "") || null,
    registered_street: metaString(meta, "registered_street"),
    registered_building_no: metaString(meta, "registered_building_no"),
    registered_apartment: metaString(meta, "registered_apartment"),
    registered_postal_code: metaString(meta, "registered_postal_code"),
    registered_city: metaString(meta, "registered_city"),
    registered_voivodeship: metaString(meta, "registered_voivodeship"),
    registered_country: metaString(meta, "registered_country") ?? "Polska",
  };
}

/** Zapisuje profil w bazie (idempotentny upsert). Wywołaj po rejestracji z sesją lub po logowaniu. */
export async function upsertProfileFromUser(user: User) {
  const supabase = createClient();
  const row = profileRowFromUserMetadata(user);
  return supabase.from("profiles").upsert(row, { onConflict: "id" });
}

/** Jeśli brak wiersza profilu (np. rejestracja z potwierdzeniem e-maila), tworzy go z metadanych. */
export async function ensureProfileRow(user: User | null) {
  if (!user) return { error: null as Error | null };
  const supabase = createClient();
  const { data, error: qErr } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
  if (qErr) return { error: qErr };
  if (data) return { error: null };
  const { error } = await upsertProfileFromUser(user);
  return { error: error ?? null };
}
