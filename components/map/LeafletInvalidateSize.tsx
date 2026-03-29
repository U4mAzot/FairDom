"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

/** Po montażu i przy zmianie rozmiaru kontenera (flex, sidebar) Leaflet musi przeliczyć layout. */
export function LeafletInvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const run = () => {
      map.invalidateSize({ animate: false });
    };
    run();
    const rafId = requestAnimationFrame(run);
    const t = window.setTimeout(run, 120);
    window.addEventListener("resize", run);
    const el = map.getContainer();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t);
      window.removeEventListener("resize", run);
      ro.disconnect();
    };
  }, [map]);
  return null;
}
