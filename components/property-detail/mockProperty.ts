import { getDemoSellerUserId } from "@/lib/demoListingSeller";

/** Szczegóły flagowej — Penthouse Obsydian (pl-001), zgodne z pierwszym wpisem w `MOCK_LISTINGS`. */

export const PROPERTY = {
  slug: "pl-001",
  title: "Penthouse Obsydian — Złota 44",
  priceDisplay: "28 500 000 zł",
  growthLabel: "+4,2% szac. wzrostu wartości",
  address: "ul. Złota 44, Śródmieście, 00-120 Warszawa",
  breadcrumbs: ["Nieruchomości", "Mieszkalne", "Penthouse Obsydian"] as const,
  area: "342 m²",
  rooms: "4,5",
  floor: "28 / 32",
  year: "2023",
  walkScore: "94/100 – użyteczność piesza",
  transit: "Komunikacja A+",
  mapCenter: [52.2302, 21.0116] as [number, number],
  mapZoom: 14,
  visionParagraphs: [
    "Szczyt miejskiego luksusu w sercu Warszawy: penthouse o powierzchni 342 m² z podwójną wysokością salonu, panoramicznym przeszkleniem i podłogą z kamienia bazaltowego.",
    "Otwarty układ łączy kuchnię z wyspą i sprzętem premium z strefą dzienną i prywatnymi apartamentami. Do dyspozycji taras, garderoby oraz strefa wellness — wszystko w jednej z najbardziej prestiżowych lokalizacji w Polsce.",
  ],
  seller: {
    name: "Julian Kowalski",
    title: "Sprzedający · konto zweryfikowane",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6EIlfi-rhcTEXl03nKiuPk-bdDSaEBW6VpH_ZO32rnAUNVlFbLXIfcP2S6vfnm4gIDvGwQD6f1nhT_WZrckGYjw5T4BtwSDkCACNcnpykLzFcr5JOvqUNHcdvfhMLxmhY7xL8gQgzqgIHjvULLTSFeKT4bUyIisZH6BFzE8FLDbjpDjq2GoL8dfWz-4qPcXHhKlR-eLhkVEHBahk7SMSvbL5CYvXsdZKud37QP01IaRBxyMsVnPNASpj35qigR9-5VnwnAAeEscA",
    phone: "+48 22 555 01 99",
  },
  investment: {
    yield: "5,8% w skali roku (szac.)",
    tax: "ok. 48 000 zł / rok",
  },
  messageDefault:
    "Chętnie umówię się na prywatną prezentację Penthouse Obsydian przy ul. Złotej 44 w Warszawie.",
  /** UUID sprzedawcy w Supabase — opcjonalnie przez NEXT_PUBLIC_DEMO_SELLER_USER_ID */
  sellerUserId: getDemoSellerUserId() ?? null,
} as const;

export const GALLERY_IMAGES = [
  {
    id: "main",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRx8N7O1le6aLz88rBkytp-YRbk5sXfLkqf74Jh9MeFJ3fWvFGcF5AvYMIQVn7pnceNIi5i9jRLmfsu9NJoVsGNz7nOCFj-fBUfO3D1k5uHafbdq_i3Wt-jgLKdZibo4Vxd20QKo2Aa6cqjmAcWsyq5aNC7h1xBFLxxsQmM4q5zBd89E5cpyHEHExVKRhhUboxd7ysgHbo20HouioSBRpnpDC5jVa_mq-EzYvFFVTi_4Ba7AdNRIcG-Xf0tSRQYeojimasX1e9MXg",
    alt: "Salon z widokiem na miasto",
  },
  {
    id: "kitchen",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH9KS8JL13s7C_JLODRRkTK0d9LeLJcwUSlMoKP4wDkbd1VUZ5TWKqNPN-iI3W20bcSYcmpB4WQry_T-U8ANkK7CPHrVCr8BPjWdM2Mrf26Gqt88EJYVISWFFnnIIsa72QF1SKMR23MzS8nL324g9jf_yaINwnd48d_ycycaOjDZD3t5hRL_txA8mOfwxI1T1r_fXO8YEKnHzgY-xahE54t82oYa9onAZkVtqvnq70x_jRvbK4rGnfpb8lsA33A_cIc6bfEQPkGNQ",
    alt: "Kuchnia z wyspą",
  },
  {
    id: "bedroom",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNfhcZcQwAEwFAgupk2Ml51iScBcvN1A1KlbnHNpCXN0Wu3hAae0OGxguOmf3IBlWcbc5sq8m0hU5bwQD7YvfvvRiu1nFw7Jio3Mxc1E9EeZ7ZVmW6ncB0f6TSPmN-_jt9nPeTS6Pr1qYDkqOCZRvoYhWNFt-HozsevpRzS43ngB_vDYuGjgf44s9fOs_xQFjPl-mBooG8YiTIQjgfIAdX5HLueWoe-e4Ma0SMKHfpKy3qJjMBL4KMheKyHzoynU88XWKrvtRNXQE",
    alt: "Sypialnia główna",
  },
  {
    id: "arch",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCizgrNUPx3C8TvCjJs0q-ZOeeL3on0mOp_yaz22jnMq3TW48RK0iSFiBFkfh6eg5nlkfAqcN4afCRnRJiat_pu7FlZFgoqVQ4v1ge5MgA_E7oROSzJfoBWT5IZ-qsDzc7tGQdP_61BC_TOj2XqwInzclofgkqocOo0iz2B7aZ__8ntE1fE0CKLEQedDCiklNu3IYpqpF7ocrBC9flqLQMsEElM-kQvUFYjg01wJBCvyTuMDSeUgDpaYag9p1ixDGZwh1U-5zLWKr0",
    alt: "Elewacja budynku",
  },
] as const;

/** 24 sloty w lightboxie — cykluje zasoby galerii. */
export const LIGHTBOX_IMAGES = Array.from({ length: 24 }, (_, i) => {
  const base = GALLERY_IMAGES[i % GALLERY_IMAGES.length]!;
  return { ...base, id: `photo-${i}`, alt: `${base.alt} (${i + 1})` };
});
