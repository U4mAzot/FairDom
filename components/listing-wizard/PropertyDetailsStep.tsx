"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Headphones, Pin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useClientSession } from "@/hooks/useClientSession";
import { loadPropertyDetailsDraft, savePropertyDetailsDraft } from "@/lib/localListingDrafts";
import type { LatLng } from "@/components/listing-wizard/PropertyMap";
import {
  DEFAULT_COMPETITOR_AVG_EUR,
  feeBarWidthPercent,
} from "@/components/listing-wizard/listingFeeUtils";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";
import { WizardProgress } from "@/components/listing-wizard/WizardProgress";

const POTSDAMER_DEFAULT: LatLng = [52.509669, 13.376294];

const FLOOR_OPTIONS = [
  "Parter",
  "1. piętro",
  "2. piętro",
  "3. piętro",
  "Ostatnie piętro / Penthouse",
] as const;

const ROOM_OPTIONS = ["1", "2", "3", "4+"] as const;

const PropertyMap = dynamic(
  () => import("@/components/listing-wizard/PropertyMap").then((m) => m.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[280px] w-full items-center justify-center rounded-xl bg-slate-200/80 text-sm text-slate-500">
        Ładowanie mapy…
      </div>
    ),
  },
);

export function PropertyDetailsStep() {
  const { session, ready } = useClientSession();
  const [draftHydrated, setDraftHydrated] = useState(false);
  const [totalArea, setTotalArea] = useState("0.00");
  const [rooms, setRooms] = useState<(typeof ROOM_OPTIONS)[number]>("1");
  const [floorLevel, setFloorLevel] = useState<string>("Parter");
  const [yearBuilt, setYearBuilt] = useState("");
  const [mapPosition, setMapPosition] = useState<LatLng>(POTSDAMER_DEFAULT);
  const [locationPicking, setLocationPicking] = useState(false);
  const [addressPrimary, setAddressPrimary] = useState("Potsdamer Platz 1");
  const [addressSecondary, setAddressSecondary] = useState("10117 Berlin, Niemcy");

  useEffect(() => {
    if (!ready || !session?.userId) {
      setDraftHydrated(true);
      return;
    }
    const d = loadPropertyDetailsDraft(session.userId);
    if (d) {
      setTotalArea(d.totalArea);
      const r = d.rooms as (typeof ROOM_OPTIONS)[number];
      if (ROOM_OPTIONS.includes(r)) setRooms(r);
      setFloorLevel(d.floorLevel);
      setYearBuilt(d.yearBuilt);
      setMapPosition([d.mapLat, d.mapLng]);
      setAddressPrimary(d.addressPrimary);
      setAddressSecondary(d.addressSecondary);
    }
    setDraftHydrated(true);
  }, [ready, session?.userId]);

  useEffect(() => {
    if (!draftHydrated || !session?.userId) return;
    const id = window.setTimeout(() => {
      savePropertyDetailsDraft(session.userId, {
        totalArea,
        rooms,
        floorLevel,
        yearBuilt,
        mapLat: mapPosition[0],
        mapLng: mapPosition[1],
        addressPrimary,
        addressSecondary,
      });
    }, 500);
    return () => window.clearTimeout(id);
  }, [
    draftHydrated,
    session?.userId,
    totalArea,
    rooms,
    floorLevel,
    yearBuilt,
    mapPosition,
    addressPrimary,
    addressSecondary,
  ]);

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
    setAddressPrimary("Wybrana lokalizacja pinezki");
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
        <WizardProgress step={3} title="Szczegóły nieruchomości" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                Uzupełnij szczegóły nieruchomości
              </h1>
              <p className="text-lg text-on-surface-variant">
                Podaj precyzyjne dane, aby kupujący łatwiej znaleźli Twoje ogłoszenie przez filtry.
              </p>
              <p className="text-sm text-on-tertiary-container">
                Szkic tego kroku jest zapisywany tylko w Twojej przeglądarce (localStorage), nie w
                chmurze.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant">
                  Powierzchnia całkowita
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
                    m²
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5">
                <label className="mb-2 block text-sm font-semibold uppercase tracking-tight text-on-surface-variant">
                  Liczba pokoi
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
                  Piętro
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
                  Rok budowy
                </label>
                <input
                  id="year-built"
                  type="text"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  placeholder="np. 2024"
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
                  {locationPicking ? "Kliknij mapę…" : "Edytuj lokalizację"}
                </button>
              </div>
              {locationPicking && (
                <p className="mt-2 text-center text-xs font-medium text-on-tertiary-container">
                  Kliknij dowolne miejsce na mapie, aby ustawić pinezkę, albo ponownie kliknij
                  „Edytuj”, aby anulować.
                </p>
              )}
            </div>

            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-outline-variant/20 pt-8 sm:flex-row sm:items-center">
              <Link
                href="/add-listing/step-2"
                className="flex items-center justify-center gap-2 rounded-md px-6 py-3 font-bold text-primary transition hover:bg-surface-low sm:justify-start"
              >
                <ArrowLeft className="h-5 w-5" aria-hidden />
                Wstecz
              </Link>
              <Link
                href="/add-listing/step-4"
                className="flex items-center justify-center gap-3 rounded-md bg-gradient-to-br from-primary to-primary-container px-10 py-4 font-bold text-white shadow-sm transition hover:opacity-90 active:scale-[0.99]"
              >
                Przejdź do multimediów
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="relative overflow-hidden rounded-xl bg-primary p-8 text-white">
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full bg-tertiary-fixed px-3 py-1 text-[10px] font-black uppercase tracking-widest text-tertiary">
                  Wskazówka
                </span>
                <h3 className="mb-4 font-headline text-xl font-bold">Dlaczego FairDom?</h3>
                <p className="mb-6 text-sm leading-relaxed text-primary-fixed-dim">
                  Nasz algorytm szacuje, że dokładne dane zwiększają widoczność ogłoszenia o 45%.
                </p>
                <div className="space-y-4 border-t border-primary-container pt-6">
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-xs uppercase tracking-tighter opacity-70">Opłata za ogłoszenie</span>
                    <div className="text-right">
                      <span className="font-headline text-2xl font-black text-tertiary-fixed">
                        €{fairdomListingFee.toFixed(2)}
                      </span>
                      <p className="text-[10px] opacity-60">
                        Średnia konkurencji: €{DEFAULT_COMPETITOR_AVG_EUR.toFixed(2)}
                      </p>
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
                Potrzebujesz pomocy?
              </h4>
              <p className="mb-4 text-sm text-on-surface-variant">
                W razie pytań pomoże zespół wsparcia portalu — każdy użytkownik może wystawić
                ogłoszenie za opłatą; promocje są opcjonalne.
              </p>
              <button
                type="button"
                className="w-full rounded-md border border-outline-variant/40 py-3 text-sm font-bold text-primary transition hover:bg-white"
              >
                Otwórz czat na żywo
              </button>
            </div>
          </aside>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
}
