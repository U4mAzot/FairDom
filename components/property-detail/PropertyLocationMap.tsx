"use client";

import { useMemo, useRef, type RefObject } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Minus, Plus } from "lucide-react";
import { createPropertyLocationIcon } from "@/components/property-detail/propertyMapMarker";

type Props = {
  center: [number, number];
  zoom?: number;
};

function ZoomRail({ mapRef }: { mapRef: RefObject<LeafletMap | null> }) {
  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-[500] flex flex-col gap-2">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => mapRef.current?.zoomIn()}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/90 text-primary shadow-lg backdrop-blur-md transition hover:bg-white"
      >
        <Plus className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => mapRef.current?.zoomOut()}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/90 text-primary shadow-lg backdrop-blur-md transition hover:bg-white"
      >
        <Minus className="h-5 w-5" />
      </button>
    </div>
  );
}

export function PropertyLocationMap({ center, zoom = 14 }: Props) {
  const mapRef = useRef<LeafletMap | null>(null);
  const icon = useMemo(() => createPropertyLocationIcon(), []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-inner">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        className="absolute inset-0 z-0 h-full w-full"
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={center} icon={icon} />
      </MapContainer>
      <ZoomRail mapRef={mapRef} />
    </div>
  );
}
