import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/env";
import { isTrackedListingSlug } from "@/lib/listingSlugs";

export async function POST(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug: raw } = await context.params;
  let slug = raw;
  try {
    slug = decodeURIComponent(raw);
  } catch {
    /* raw już OK */
  }

  if (!isTrackedListingSlug(slug)) {
    return NextResponse.json({ error: "unknown listing" }, { status: 404 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ viewCount: 0 });
  }

  const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  const { data, error } = await supabase.rpc("increment_listing_view_count", { p_slug: slug });

  if (error) {
    console.error("[api/listings/view]", error.message);
    return NextResponse.json({ error: "increment failed" }, { status: 500 });
  }

  return NextResponse.json({ viewCount: Number(data ?? 0) });
}
