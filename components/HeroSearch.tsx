"use client";

import { useMemo, useRef, useState } from "react";
import { BedDouble, ChevronDown, MapPin, Search, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";

const CITIES = [
  "Austin, TX",
  "Boulder, CO",
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Miami, FL",
  "Seattle, WA",
  "Denver, CO",
];

const PRICE_OPTIONS = [
  "Dowolny",
  "do $500k",
  "$500k – $1M",
  "$1M – $1.5M",
  "$1.5M – $2M",
  "$2M+",
];

const BEDS_BATHS_OPTIONS = [
  "Dowolnie",
  "1+ syp. / 1+ łaz.",
  "2+ syp. / 1+ łaz.",
  "3+ syp. / 2+ łaz.",
  "4+ syp. / 3+ łaz.",
];

type Panel = "price" | "beds" | null;

function DropdownPanel({
  label,
  icon: Icon,
  value,
  open,
  onToggle,
  options,
  onSelect,
  containerRef,
}: {
  label: string;
  icon: typeof MapPin;
  value: string;
  open: boolean;
  onToggle: () => void;
  options: string[];
  onSelect: (v: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={containerRef} className="relative flex-1">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-xl bg-surface-low px-4 py-3 text-left transition hover:bg-surface-low/80"
      >
        <Icon className="h-5 w-5 shrink-0 text-outline" aria-hidden />
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-outline-variant">
            {label}
          </span>
          <span className="block truncate font-semibold text-on-surface">{value}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-outline transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-auto rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/5"
          role="listbox"
        >
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                role="option"
                aria-selected={opt === value}
                className="w-full px-4 py-2.5 text-left text-sm font-medium text-on-surface hover:bg-surface-low"
                onClick={() => {
                  onSelect(opt);
                  onToggle();
                }}
              >
                {opt}
              </button>
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export function HeroSearch() {
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(PRICE_OPTIONS[2]);
  const [bedsBaths, setBedsBaths] = useState(BEDS_BATHS_OPTIONS[0]);
  const [panel, setPanel] = useState<Panel>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const priceRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);
  const cityWrapRef = useRef<HTMLDivElement>(null);

  useClickOutside(priceRef, () => setPanel((p) => (p === "price" ? null : p)), panel === "price");
  useClickOutside(bedsRef, () => setPanel((p) => (p === "beds" ? null : p)), panel === "beds");
  useClickOutside(
    cityWrapRef,
    () => setShowSuggestions(false),
    showSuggestions,
  );

  const suggestions = useMemo(() => {
    const q = city.trim().toLowerCase();
    if (!q) return CITIES.slice(0, 5);
    return CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 6);
  }, [city]);

  return (
    <motion.div
      id="search"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="flex max-w-4xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-xl shadow-on-surface/5 md:flex-row md:items-stretch"
    >
      <div ref={cityWrapRef} className="relative flex-1">
        <div className="flex h-full items-center gap-3 rounded-xl bg-surface-low px-4 py-3">
          <MapPin className="h-5 w-5 shrink-0 text-outline" aria-hidden />
          <div className="min-w-0 flex-1">
            <label htmlFor="city-search" className="sr-only">
              Miasto
            </label>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-outline-variant">
              Miasto
            </span>
            <input
              id="city-search"
              autoComplete="off"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Gdzie szukasz?"
              className="w-full border-0 bg-transparent p-0 font-semibold text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-0 right-0 top-full z-20 mt-1 max-h-48 overflow-auto rounded-xl bg-white py-1 shadow-xl ring-1 ring-black/5"
            role="listbox"
          >
            {suggestions.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-surface-low"
                  onClick={() => {
                    setCity(c);
                    setShowSuggestions(false);
                  }}
                >
                  {c}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      <DropdownPanel
        label="Zakres ceny"
        icon={Wallet}
        value={price}
        open={panel === "price"}
        onToggle={() => setPanel((p) => (p === "price" ? null : "price"))}
        options={PRICE_OPTIONS}
        onSelect={setPrice}
        containerRef={priceRef}
      />

      <DropdownPanel
        label="Sypialnie / Łazienki"
        icon={BedDouble}
        value={bedsBaths}
        open={panel === "beds"}
        onToggle={() => setPanel((p) => (p === "beds" ? null : "beds"))}
        options={BEDS_BATHS_OPTIONS}
        onSelect={setBedsBaths}
        containerRef={bedsRef}
      />

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-2 rounded-xl bg-tertiary-fixed-dim px-8 py-4 font-headline font-bold text-on-tertiary-fixed transition hover:bg-tertiary-fixed md:min-w-[140px]"
      >
        <Search className="h-5 w-5" aria-hidden />
        Szukaj
      </motion.button>
    </motion.div>
  );
}
