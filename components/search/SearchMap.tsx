"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, type RefObject } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Minus, Plus } from "lucide-react";
import { POLAND_MAP_CENTER, type SearchListing } from "@/components/search/mockListings";
import { createPricePillIcon } from "@/components/search/pricePillIcon";

type SearchMapProps = {
  listings: SearchListing[];
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
};

function MapChrome({ mapRef }: { mapRef: RefObject<LeafletMap | null> }) {
  const geolocate = () => {
    const m = mapRef.current;
    if (!m || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => m.setView([pos.coords.latitude, pos.coords.longitude], 14),
      () => {},
    );
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-[500]">
      <div className="pointer-events-auto absolute bottom-10 right-6 flex flex-col gap-2 md:right-8">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => mapRef.current?.zoomIn()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur-md transition hover:bg-white"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => mapRef.current?.zoomOut()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur-md transition hover:bg-white"
        >
          <Minus className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="My location"
          onClick={geolocate}
          className="mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition hover:opacity-90"
        >
          <Crosshair className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export function SearchMap({ listings, hoveredId, setHoveredId }: SearchMapProps) {
  const router = useRouter();
  const mapRef = useRef<LeafletMap | null>(null);

  const icons = useMemo(() => {
    const map = new Map<string, ReturnType<typeof createPricePillIcon>>();
    for (const p of listings) {
      map.set(
        p.id,
        createPricePillIcon(p.priceShort, p.markerVariant, hoveredId === p.id),
      );
    }
    return map;
  }, [listings, hoveredId]);

  return (
    <div className="relative h-full min-h-[320px] w-full bg-slate-900">
      <MapContainer
        ref={mapRef}
        center={POLAND_MAP_CENTER}
        zoom={6}
        className="absolute inset-0 z-0 h-full w-full rounded-none"
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {listings.map((p) => (
          <Marker
            key={p.id}
            position={[p.lat, p.lng]}
            icon={icons.get(p.id)!}
            zIndexOffset={hoveredId === p.id ? 1000 : 0}
            eventHandlers={{
              mouseover: () => setHoveredId(p.id),
              mouseout: () => setHoveredId(null),
              click: () => router.push(`/properties/${p.id}`),
            }}
          />
        ))}
      </MapContainer>
      <MapChrome mapRef={mapRef} />
    </div>
  );
}
