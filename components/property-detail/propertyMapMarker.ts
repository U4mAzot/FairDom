import L from "leaflet";

const HTML = `
<div style="display:flex;flex-direction:column;align-items:center;">
  <div style="width:44px;height:44px;background:#ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(0,0,0,0.45);border:3px solid #041627;">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#041627" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  </div>
  <div style="width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid #041627;margin-top:-2px;"></div>
</div>`.trim();

export function createPropertyLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: "property-loc-marker",
    html: HTML,
    iconSize: [44, 56],
    iconAnchor: [22, 56],
  });
}
