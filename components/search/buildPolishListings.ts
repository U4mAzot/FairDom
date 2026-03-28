import type { MarkerVariant, SearchListing } from "@/components/search/mockListings";
import { formatPricePln, formatPriceShortPln } from "@/lib/formatPln";

const IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARb3s4yavqzA218EAlpdktE6_wkLzkNLpLIFFkyE5KBsT1MOPa8xar235uSWszea2oL0m7JAgZ2mY2EQvykgNroKgY71wCTlVw8Bp0NQC2Y2KIEiigu1ihgCBlAzSjghbN8vunaT037bvOeI8YGlqi-jxr-N9Q3tHn2PeoFBmVwFxRkcF3h5QnMt3acUelmqQoReVXZcceEi0Qj6ecELjW_VScTsiiVbY5_D153npEHisN7vARWZv6rUIIAyiFuf7OLd30m-vgLHk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD8OVKGH11DJqLr4FGuQnBS0HRzYKOKVZ8LgdR8Z3hY2JqALRdV15rlO4KZhXvdTUB7bAWVMI86qjtmlsjrx5rVvov-T9uO5xyOSXFgexzryXUpofJ3MZSrOF9yRTuwqeLKP3rz3X05ReHpVPe66z2xaqCDwWy-R_2R6U7yIHRlKiDvw4wDjZfz5QfVpHJnVMNi3IaDJbUk88DUjEaWhIlhtyVN0eBzZ4qBbl8u-3ebcFxWdI1l-LN_WKg7tdWdr_JRQIGXmDnQBbw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDrgCcHY8FJ-8eoU6AlAGnQYCVwMhqnLg3LMqTtxHqqDNrqD6fPYAa9ZryLlk-SfV1oYXk60VLlB5bN2xZ8yv9TfNf0Llk2Pfdld-7s_NoU3W0iU3gaHm4_ttHyHVhDApKMZHpKtlsAGRUTDhc8qfA7AvengxHiKahW2AilnB7g99dFYvu2obXzprUhvcSc9GGa4uNu3uwZC3ZwkTb77OHHgj2OmyaQXScMJYedT5rTJ_7iwchPFdXpKzaGV-xK3QJO3es9VE8mXSs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAc94QvH5KO_HOfXQwmhRkDAgcr97EdU1yYfEXOeVNNP616xlQZsppWLVYS1O_Y5L6yd5nP53ONLIqhI-k2jfn2MTVffp5TxS6rmivaEaPR_Px0Ww82qw2sxtG4nGX_YkEQeHGjMHYF4VtvB03wjnznHx-b9nzKc8LhOxhou8olEwppTmWqr72a5FCGe3s58f-u-4vtp01F1TPm1VR4jFBuhw77OnTWX8AARrE1HUz6rsCl1Bva9ge3m7-4NrgPN8VvcYk97wtBM4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDvY2N3RwAcGllgUUXY_6DkWq0XKPvYCMZrMmO9Utvntq46lIz8UOkH8lombf4Q7JXuc9f47YJHrNkrkOkyDGRA1QxgdvFNdMFBorzUHzfv2Ob2E0hjEKFWmWfuFl_zPhdoio5Owqim7KHvO9MpxQ1nKHwMMroUjp2TXFkCC79_40j0_mMuQzNOlDjC9lmejkndoKgbvu65YWoB4nV-GV2oi0KWua_WuL3sT7CyAP3YdjIlRI-Lmtcrebj4lHxNDSVhRYj61Zrbyt0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBjTcG5Ctg1s2W5nnPRqgIg6ebeFPkxU4vcYVLYvwJB5Y0311QejGYRMvvoqy2jl0I0PvuulGKe4nFtr2DS6dbinodCO419CICrwLmB2-hv7WvjwnN-sNxyU7rlSsEm6Pn6ZqJlH7G1Hq3VOjm1wPSkd_NKXE8YLw1AgM0jG8Rnnxw5KRvaJnRBkCqdMWvvmy41FoB43YWn91BLUzv-daDC4WkoMzA8i5JZ3CSrj-9s0z-25nnK72F2UoXdQOP5sILEmUYe_GVqEeo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBRx8N7O1le6aLz88rBkytp-YRbk5sXfLkqf74Jh9MeFJ3fWvFGcF5AvYMIQVn7pnceNIi5i9jRLmfsu9NJoVsGNz7nOCFj-fBUfO3D1k5uHafbdq_i3Wt-jgLKdZibo4Vxd20QKo2Aa6cqjmAcWsyq5aNC7h1xBFLxxsQmM4q5zBd89E5cpyHEHExVKRhhUboxd7ysgHbo20HouioSBRpnpDC5jVa_mq-EzYvFFVTi_4Ba7AdNRIcG-Xf0tSRQYeojimasX1e9MXg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCH9KS8JL13s7C_JLODRRkTK0d9LeLJcwUSlMoKP4wDkbd1VUZ5TWKqNPN-iI3W20bcSYcmpB4WQry_T-U8ANkK7CPHrVCr8BPjWdM2Mrf26Gqt88EJYVISWFFnnIIsa72QF1SKMR23MzS8nL324g9jf_yaINwnd48d_ycycaOjDZD3t5hRL_txA8mOfwxI1T1r_fXO8YEKnHzgY-xahE54t82oYa9onAZkVtqvnq70x_jRvbK4rGnfpb8lsA33A_cIc6bfEQPkGNQ",
] as const;

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
    const district = ["Śródmieście", "Mokotów", "Żoliborz", "Wilanów", "Stare Miasto", "Oliwa", "Strzyża", "Krzyki"][i % 8]!;
    const address = `${street} ${no}, ${district}, ${city.name}`;
    const title = `${TITLE_PREFIXES[i % TITLE_PREFIXES.length]} ${district}, ${city.name}`;
    const areaSqm = 160 + (i * 37) % 520;
    const beds = 3 + (i % 4);
    const baths = Math.min(beds, 2 + (i % 3));
    const variant = VARIANTS[i % 3]!;
    const image = IMAGES[i % IMAGES.length]!;

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
