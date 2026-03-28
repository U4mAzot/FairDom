"use client";

import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Headphones, Pin } from "lucide-react";
import { useMemo, useState } from "react";
import type { LatLng } from "@/components/listing-wizard/PropertyMap";
import {
  DEFAULT_COMPETITOR_AVG_EUR,
  feeBarWidthPercent,
} from "@/components/listing-wizard/listingFeeUtils";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";

const POTSDAMER_DEFAULT: LatLng = [52.509669, 13.376294];

const FLOOR_OPTIONS = [
  "Ground Floor",
  "1st Floor",
  "2nd Floor",
  "3rd Floor",
  "Top Floor / Penthouse",
] as const;

const ROOM_OPTIONS = ["1", "2", "3", "4+"] as const;

const PropertyMap = dynamic(
  () => import("@/components/listing-wizard/PropertyMap").then((m) => m.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] w-full items-center justify-center rounded-xl bg-slate-200/80 text-sm text-slate-500">
        Loading map…
      </div>
    ),
  },
);

export function PropertyDetailsStep() {
  const [totalArea, setTotalArea] = useState("0.00");
  const [rooms, setRooms] = useState<(typeof ROOM_OPTIONS)[number]>("1");
  const [floorLevel, setFloorLevel] = useState<string>("Ground Floor");
  const [yearBuilt, setYearBuilt] = useState("");
  const [mapPosition, setMapPosition] = useState<LatLng>(POTSDAMER_DEFAULT);
  const [locationPicking, setLocationPicking] = useState(false);
  const [addressPrimary, setAddressPrimary] = useState("Potsdamer Platz 1");
  const [addressSecondary, setAddressSecondary] = useState("10117 Berlin, Germany");

  const fairdomListingFee = useMemo(() => {
    const area = parseFloat(totalArea.replace(",", ".")) || 0;
    if (area > 0 || yearBuilt || rooms || floorLevel) {
      /* Placeholder for API: fetchListingFee({ area, rooms, floorLevel, yearBuilt }) */
    }
    return 0;
  }, [totalArea, yearBuilt, rooms, floorLevel]);

  const feeBarPercent = useMemo(
    () => feeBarWidthPercent(fairdomListingFee, DEFAULT_COMPETITOR_AVG_EUR),
    [fairdomListingFee],
  );

  const handleMapPick = (lat: number, lng: number) => {
    setMapPosition([lat, lng]);
    setAddressPrimary("Selected pin location");
    setAddressSecondary(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    setLocationPicking(false);
  };

  const toggleEditLocation = () => {
    setLocationPicking((p) => !p);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-on-surface">
      <WizardHeader />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24 md:px-6 lg:max-w-6xl">
        <div className="mb-12">
          <div className="mb-4 flex justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
              Step 3 of 5: Property Details
            </span>
            <span className="text-xs font-bold text-on-tertiary-container md:text-sm">60% Complete</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-low">
            <div
              className="h-full bg-gradient-to-r from-primary to-tertiary-fixed-dim transition-all duration-500"
              style={{ width: "60%" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                Enter property details
              </h1>
              <p className="text-lg text-on-surface-variant">
                Provide precise information to help potential buyers find your listing through
                filters.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant">
                  Total Area
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={totalArea}
                    onChange={(e) => setTotalArea(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-md border-0 bg-surface-low py-3 pl-4 pr-14 text-lg font-bold text-primary focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-medium text-on-surface-variant">
                    sqm
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant">
                  Number of Rooms
                </label>
                <div className="flex gap-2">
                  {ROOM_OPTIONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRooms(r)}
                      className={`flex-1 rounded-md py-3 text-sm font-bold transition-colors ${
                        rooms === r
                          ? "bg-primary text-white"
                          : "bg-surface-low text-primary hover:bg-secondary-fixed"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label
                  htmlFor="floor-level"
                  className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant"
                >
                  Floor Level
                </label>
                <div className="relative">
                  <select
                    id="floor-level"
                    value={floorLevel}
                    onChange={(e) => setFloorLevel(e.target.value)}
                    className="w-full appearance-none rounded-md border-0 bg-surface-low py-3 pl-4 pr-10 font-medium text-primary focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  >
                    {FLOOR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    ▼
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label
                  htmlFor="year-built"
                  className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant"
                >
                  Year Built
                </label>
                <input
                  id="year-built"
                  type="text"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full rounded-md border-0 bg-surface-low px-4 py-3 font-medium text-primary focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
              </div>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-xl bg-surface-low">
              <div
                className={`relative aspect-video w-full min-h-[280px] overflow-hidden rounded-xl ${locationPicking ? "ring-2 ring-tertiary-fixed ring-offset-2" : ""}`}
              >
                <PropertyMap
                  position={mapPosition}
                  picking={locationPicking}
                  onPick={handleMapPick}
                  className={`z-0 h-full min-h-[280px] w-full rounded-xl ${locationPicking ? "cursor-crosshair" : ""}`}
                />
              </div>
              <div className="pointer-events-auto absolute bottom-4 left-4 right-4 z-[1000] flex items-center justify-between rounded-lg bg-white/95 p-4 shadow-md backdrop-blur-md">
                <div className="flex min-w-0 items-center gap-3">
                  <Pin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold leading-none text-primary">
                      {addressPrimary}
                    </p>
                    <p className="mt-1 truncate text-xs text-on-surface-variant">{addressSecondary}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleEditLocation}
                  className={`shrink-0 border-b border-primary text-xs font-bold uppercase tracking-widest text-primary transition hover:opacity-80 ${locationPicking ? "text-on-tertiary-container border-on-tertiary-container" : ""}`}
                >
                  {locationPicking ? "Click map…" : "Edit Location"}
                </button>
              </div>
              {locationPicking && (
                <p className="mt-2 text-center text-xs font-medium text-on-tertiary-container">
                  Click anywhere on the map to place the pin, or press Edit again to cancel.
                </p>
              )}
            </div>

            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-outline-variant/20 pt-8 sm:flex-row sm:items-center">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md px-6 py-3 font-bold text-primary transition hover:bg-surface-low sm:justify-start"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
                Back
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-md bg-gradient-to-br from-primary to-primary-container px-10 py-4 font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99]"
              >
                Continue to Media
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="relative overflow-hidden rounded-xl bg-primary p-8 text-white">
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-tertiary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-widest text-tertiary">
                  Pro Tip
                </span>
                <h3 className="mb-4 font-headline text-xl font-bold">Why choose FairDom?</h3>
                <p className="mb-6 text-sm leading-relaxed text-primary-fixed-dim">
                  Our algorithm estimates that accurate details increase listing visibility by 45%.
                </p>
                <div className="space-y-4 border-t border-primary-container pt-6">
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-xs uppercase tracking-tighter opacity-70">Listing Fee</span>
                    <div className="text-right">
                      <span className="font-headline text-2xl font-black text-tertiary-fixed">
                        €{fairdomListingFee.toFixed(2)}
                      </span>
                      <p className="text-[10px] opacity-60">Competitor avg: €{DEFAULT_COMPETITOR_AVG_EUR.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-primary-container">
                    <div
                      className="h-full rounded-full bg-tertiary-fixed transition-all duration-300"
                      style={{ width: `${feeBarPercent}%` }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-tertiary-fixed/10 blur-3xl"
                aria-hidden
              />
            </div>

            <div className="rounded-xl bg-surface-low p-6">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-primary">
                <Headphones className="h-4 w-4" aria-hidden />
                Need assistance?
              </h4>
              <p className="mb-4 text-sm text-on-surface-variant">
                W razie pytań pomoże zespół wsparcia portalu — każdy użytkownik może wystawić
                ogłoszenie za opłatą; promocje są opcjonalne.
              </p>
              <button
                type="button"
                className="w-full rounded-md border border-outline-variant/40 py-3 text-sm font-bold text-primary transition hover:bg-white"
              >
                Open Live Chat
              </button>
            </div>
          </aside>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
}
