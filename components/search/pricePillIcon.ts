import L from "leaflet";

const VARIANT_STYLES = {
  navy: {
    bg: "#041627",
    color: "#ffffff",
    stem: "#041627",
    border: "2px solid #ffffff",
  },
  white: {
    bg: "#ffffff",
    color: "#041627",
    stem: "#e2e8f0",
    border: "1px solid #C4C6CD",
  },
  mint: {
    bg: "#6BFE9C",
    color: "#00210C",
    stem: "#6BFE9C",
    border: "2px solid #ffffff",
  },
} as const;

export function createPricePillIcon(
  label: string,
  variant: keyof typeof VARIANT_STYLES,
  emphasized: boolean,
): L.DivIcon {
  const v = VARIANT_STYLES[variant];
  const scale = emphasized ? 1.1 : 1;
  const shadow = emphasized
    ? "0 10px 28px rgba(0,0,0,0.45)"
    : "0 4px 14px rgba(0,0,0,0.35)";

  const html = `
<div style="display:flex;flex-direction:column;align-items:center;pointer-events:auto;">
  <div style="transform:scale(${scale});transition:transform 0.2s ease;box-shadow:${shadow};background:${v.bg};color:${v.color};border:${v.border};font-weight:700;font-size:13px;padding:7px 14px;border-radius:9999px;font-family:var(--font-manrope,system-ui),sans-serif;white-space:nowrap;line-height:1;">${label}</div>
  <div style="width:2px;height:11px;background:${v.stem};margin-top:3px;border-radius:1px;"></div>
</div>`.trim();

  const w = emphasized ? 96 : 88;
  const h = emphasized ? 56 : 52;

  return L.divIcon({
    className: "search-price-marker",
    html,
    iconSize: [w, h],
    iconAnchor: [w / 2, h],
  });
}
