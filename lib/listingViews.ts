import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function zeroMap(slugs: string[]): Record<string, number> {
  return Object.fromEntries(slugs.map((s) => [s, 0]));
}

/** Odczyt liczników dla wielu slugów (karty wyszukiwania, strona główna). */
export async function getListingViewCounts(slugs: string[]): Promise<Record<string, number>> {
  const base = zeroMap(slugs);
  if (!isSupabaseConfigured() || slugs.length === 0) return base;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("listing_view_counts")
    .select("slug, view_count")
    .in("slug", slugs);

  if (error) {
    console.error("[listingViews] getListingViewCounts", error.message);
    return base;
  }

  for (const row of data ?? []) {
    base[row.slug] = Number(row.view_count);
  }
  return base;
}
