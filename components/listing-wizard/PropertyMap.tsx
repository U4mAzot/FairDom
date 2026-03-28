"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createFairDomDivIcon } from "@/components/listing-wizard/fairdomMapMarker";

export type LatLng = [number, number];

function MapPickHandler({
  picking,
  onPick,
}: {
  picking: boolean;
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      if (picking) onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterOnPosition({ position }: { position: LatLng }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom(), { animate: true });
  }, [position, map]);
  return null;
}

type PropertyMapProps = {
  position: LatLng;
  picking: boolean;
  onPick: (lat: number, lng: number) => void;
  className?: string;
};

export function PropertyMap({ position, picking, onPick, className }: PropertyMapProps) {
  const icon = useMemo(() => createFairDomDivIcon(), []);

  return (
    <MapContainer
      center={position}
      zoom={16}
      className={className}
      style={{ height: "100%", width: "100%", minHeight: 280 }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <RecenterOnPosition position={position} />
      <MapPickHandler picking={picking} onPick={onPick} />
      <Marker position={position} icon={icon} />
    </MapContainer>
  );
}
