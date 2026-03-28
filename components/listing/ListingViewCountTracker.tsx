"use client";

import { useEffect, useState } from "react";
import { ListingViewCountLine } from "@/components/listing/ListingViewCountLine";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { isTrackedListingSlug } from "@/lib/listingSlugs";

type Props = {
  slug: string;
  initialCount: number;
  className?: string;
};

/**
 * Odczyt z SSR (`initialCount`) + jeden POST po wejściu na stronę (bez podwójnego liczenia przy prefetch linków).
 * W dev (Strict Mode) drugi mount może wysłać drugi POST — akceptowalne; można później dodać deduplikację.
 */
export function ListingViewCountTracker({ slug, initialCount, className }: Props) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount, slug]);

  useEffect(() => {
    if (!isSupabaseConfigured() || !isTrackedListingSlug(slug)) return;

    let cancelled = false;
    const run = async () => {
      try {
        const res = await fetch(`/api/listings/${encodeURIComponent(slug)}/view`, {
          method: "POST",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { viewCount?: number };
        if (!cancelled && typeof data.viewCount === "number") {
          setCount(data.viewCount);
        }
      } catch {
        /* sieć / serwer */
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return <ListingViewCountLine count={count} className={className} />;
}
