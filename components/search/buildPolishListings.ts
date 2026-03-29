import type { MarkerVariant, SearchListing } from "@/components/search/mockListings";
import { formatPricePln, formatPriceShortPln } from "@/lib/formatPln";
import { cardImageForGeneratedListing } from "@/lib/listingCardImages";

const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: "Warszawa", lat: 52.2297, lng: 21.0122 },
  { name: "Kraków", lat: 50.0647, lng: 19.945 },
  { name: "Gdańsk", lat: 54.352, lng: 18.6466 },
  { name: "Wrocław", lat: 51.1079, lng: 17.0385 },
  { name: "Poznań", lat: 52.4064, lng: 16.9252 },
  { name: "Sopot", lat: 54.4418, lng: 18.5601 },
  { name: "Zakopane", lat: 49.2992, lng: 19.9496 },
  { name: "Konstancin-Jeziorna", lat: 52.0833, lng: 21.1333 },
  { name: "Gdynia", lat: 54.5189, lng: 18.5305 },
  { name: "Łódź", lat: 51.7592, lng: 19.456 },
  { name: "Katowice", lat: 50.2649, lng: 19.0238 },
  { name: "Rzeszów", lat: 50.0412, lng: 21.9991 },
  { name: "Szczecin", lat: 53.4285, lng: 14.5528 },
  { name: "Lublin", lat: 51.2465, lng: 22.5684 },
  { name: "Białystok", lat: 53.1325, lng: 23.1688 },
];

const STREETS = [
  "ul. Złota",
  "ul. Mokotowska",
  "ul. Krupówki",
  "ul. Na Pięknej",
  "ul. Nadwiślańska",
  "ul. Polna",
  "ul. Słoneczna",
  "ul. Parkowa",
  "ul. Lipowa",
  "ul. Orłowska",
  "ul. Spacerowa",
  "ul. Leśna",
];

const TITLE_PREFIXES = [
  "Penthouse z tarasem —",
  "Rezydencja premium —",
  "Willa z widokiem —",
  "Apartament sky —",
  "Dom jednorodzinny —",
  "Apartament z ogrodem —",
  "Apartament nadmorski —",
  "Rezydencja z basenem —",
  "Loft designerski —",
  "Willa z winnicą —",
  "Apartament z garderobą —",
  "Rezydencja parkowa —",
];

/** Dzielnice przypisane do konkretnego miasta (bez mieszania np. Mokotowa z Łodzią). */
const DISTRICTS_BY_CITY: Record<string, readonly string[]> = {
  Warszawa: ["Śródmieście", "Mokotów", "Żoliborz", "Wilanów", "Praga-Południe", "Ursynów"],
  Kraków: ["Stare Miasto", "Kazimierz", "Podgórze", "Krowodrza", "Zwierzyniec", "Dębniki"],
  Gdańsk: ["Śródmieście", "Oliwa", "Wrzeszcz", "Zaspa", "Orunia"],
  Wrocław: ["Stare Miasto", "Krzyki", "Psie Pole", "Fabryczna", "Karłowice"],
  Poznań: ["Śródmieście", "Jeżyce", "Wilda", "Grunwald", "Rataje"],
  Sopot: ["Dolny Sopot", "Górny Sopot", "Kamienny Potok", "Karlikowo"],
  Zakopane: ["Centrum", "Gubałówka", "Kościelisko", "Jaszczurówka", "Nosal"],
  "Konstancin-Jeziorna": ["Śródmieście", "Skolimów", "Chylice", "Obory"],
  Gdynia: ["Śródmieście", "Orłowo", "Redłowo", "Oksywie", "Chwarzno"],
  Łódź: ["Śródmieście", "Polesie", "Widzew", "Bałuty", "Górna"],
  Katowice: ["Śródmieście", "Ligota", "Brynów", "Zawodzie", "Dąb"],
  Rzeszów: ["Śródmieście", "Pobitno", "Staromieście", "Budziwój", "Zalesie"],
  Szczecin: ["Śródmieście", "Pomorzany", "Gumieńce", "Pogodno", "Zachód"],
  Lublin: ["Śródmieście", "Czuby", "Tatary", "Wieniawa", "Węglin"],
  Białystok: ["Śródmieście", "Skorupy", "Pieczaki", "Zielone Wzgórza", "Leśna Dolina"],
};

const VARIANTS: MarkerVariant[] = ["navy", "white", "mint"];

function deterministicPrice(i: number): number {
  const base = 2_850_000 + ((i * 823_541) % 38_000_000);
  return Math.min(Math.max(base, 2_600_000), 48_500_000);
}

/** 49 pozycji (pl-002 … pl-050); pl-001 ustawiane osobno jako „Penthouse Obsydian”. */
export function buildPolishLuxuryListings(): SearchListing[] {
  const out: SearchListing[] = [];

  for (let i = 0; i < 49; i++) {
    const id = `pl-${String(i + 2).padStart(3, "0")}`;
    const city = CITIES[i % CITIES.length]!;
    const jitterLat = ((i * 13) % 80) / 2000 - 0.02;
    const jitterLng = ((i * 19) % 80) / 2000 - 0.02;
    const price = deterministicPrice(i);
    const street = STREETS[i % STREETS.length]!;
    const no = 8 + (i % 90);
    const districtList = DISTRICTS_BY_CITY[city.name] ?? ["centrum"];
    const district = districtList[i % districtList.length]!;
    const address = `${street} ${no}, ${district}, ${city.name}`;
    const title = `${TITLE_PREFIXES[i % TITLE_PREFIXES.length]} ${district}, ${city.name}`;
    const areaSqm = 160 + (i * 37) % 520;
    const beds = 3 + (i % 4);
    const baths = Math.min(beds, 2 + (i % 3));
    const variant = VARIANTS[i % 3]!;
    const image = cardImageForGeneratedListing(i);

    let badge: SearchListing["badge"];
    let oldPriceDisplay: string | undefined;
    let priceChangePct: number | undefined;
    if (i % 9 === 0) badge = "new";
    else if (i % 13 === 0) {
      badge = "reduced";
      oldPriceDisplay = formatPricePln(Math.round(price * 1.08));
      priceChangePct = 3.2 + (i % 5);
    }

    out.push({
      id,
      title,
      price,
      priceDisplay: formatPricePln(price),
      priceShort: formatPriceShortPln(price),
      lat: city.lat + jitterLat,
      lng: city.lng + jitterLng,
      markerVariant: variant,
      badge,
      oldPriceDisplay,
      priceChangePct,
      address,
      image,
      beds,
      baths,
      areaSqm,
      viewCount: 0,
    });
  }

  return out;
}
