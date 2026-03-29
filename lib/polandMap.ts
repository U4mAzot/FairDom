/** Granice przybliżone (PL + margines) — Leaflet: SW i NE jako [lat, lng]. */
export const POLAND_MAP_BOUNDS: [[number, number], [number, number]] = [
  [48.95, 14.05],
  [55.05, 24.35],
];

/** Czy współrzędne leżą w obrębie Polski (dla geolokalizacji / walidacji). */
export function isLatLngInPoland(lat: number, lng: number): boolean {
  return (
    lat >= POLAND_MAP_BOUNDS[0][0] &&
    lat <= POLAND_MAP_BOUNDS[1][0] &&
    lng >= POLAND_MAP_BOUNDS[0][1] &&
    lng <= POLAND_MAP_BOUNDS[1][1]
  );
}
