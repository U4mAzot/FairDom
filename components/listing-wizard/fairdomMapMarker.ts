import L from "leaflet";

const PIN_HTML = `
<div style="position:relative;width:56px;height:72px;pointer-events:none;">
  <svg width="56" height="72" viewBox="0 0 56 72" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 4px 8px rgba(0,0,0,0.18));">
    <path d="M28 0C12.5 0 0 12.1 0 27c0 14.9 28 45 28 45s28-30.1 28-45C56 12.1 43.5 0 28 0z" fill="#9CA3AF"/>
  </svg>
  <div style="position:absolute;left:50%;top:14px;transform:translateX(-50%);width:28px;height:28px;background:#6BFE9C;border-radius:8px;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 4px rgba(0,0,0,0.2);">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#001A08" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>
</div>
`.trim();

export function createFairDomDivIcon(): L.DivIcon {
  return L.divIcon({
    className: "fairdom-map-marker",
    html: PIN_HTML,
    iconSize: [56, 72],
    iconAnchor: [28, 72],
  });
}
