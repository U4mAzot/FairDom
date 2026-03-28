/** Mock data for The Obsidian Penthouse — aligns with stitch/karta_nieruchomości_fairdom/code.html */

export const PROPERTY = {
  slug: "the-obsidian-penthouse",
  title: "The Obsidian Penthouse",
  priceDisplay: "$2,450,000",
  growthLabel: "+4.2% Growth Est.",
  address: "42 Architect Boulevard, Sky District, Metropolis",
  breadcrumbs: ["Properties", "Residential", "The Obsidian Penthouse"] as const,
  area: "342 m²",
  rooms: "4.5",
  floor: "28 / 32",
  year: "2023",
  walkScore: "88 Walk Score",
  transit: "A+ Transit",
  mapCenter: [41.881832, -87.623177] as [number, number],
  mapZoom: 14,
  visionParagraphs: [
    "Experience the pinnacle of urban luxury in this masterfully crafted Obsidian Penthouse. Every inch of this 342-square-meter residence has been designed with an uncompromising eye for detail, featuring custom basalt stone flooring and floor-to-ceiling high-performance glazing that frames the city like a living piece of art.",
    "The open-concept layout flows seamlessly from the professional-grade kitchen—outfitted with integrated Gaggenau appliances—into a double-height living salon. Designed for the connoisseur of modern living, the space offers both expansive areas for entertaining and intimate private suites for tranquility.",
  ],
  seller: {
    name: "Julian Thorne",
    title: "Sprzedający · konto zweryfikowane",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6EIlfi-rhcTEXl03nKiuPk-bdDSaEBW6VpH_ZO32rnAUNVlFbLXIfcP2S6vfnm4gIDvGwQD6f1nhT_WZrckGYjw5T4BtwSDkCACNcnpykLzFcr5JOvqUNHcdvfhMLxmhY7xL8gQgzqgIHjvULLTSFeKT4bUyIisZH6BFzE8FLDbjpDjq2GoL8dfWz-4qPcXHhKlR-eLhkVEHBahk7SMSvbL5CYvXsdZKud37QP01IaRBxyMsVnPNASpj35qigR9-5VnwnAAeEscA",
    phone: "+1 (555) 010-0199",
  },
  investment: {
    yield: "5.8% p.a.",
    tax: "$12k/yr",
  },
  messageDefault:
    "I am interested in scheduling a private viewing of The Obsidian Penthouse.",
} as const;

export const GALLERY_IMAGES = [
  {
    id: "main",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRx8N7O1le6aLz88rBkytp-YRbk5sXfLkqf74Jh9MeFJ3fWvFGcF5AvYMIQVn7pnceNIi5i9jRLmfsu9NJoVsGNz7nOCFj-fBUfO3D1k5uHafbdq_i3Wt-jgLKdZibo4Vxd20QKo2Aa6cqjmAcWsyq5aNC7h1xBFLxxsQmM4q5zBd89E5cpyHEHExVKRhhUboxd7ysgHbo20HouioSBRpnpDC5jVa_mq-EzYvFFVTi_4Ba7AdNRIcG-Xf0tSRQYeojimasX1e9MXg",
    alt: "Living room with city views",
  },
  {
    id: "kitchen",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH9KS8JL13s7C_JLODRRkTK0d9LeLJcwUSlMoKP4wDkbd1VUZ5TWKqNPN-iI3W20bcSYcmpB4WQry_T-U8ANkK7CPHrVCr8BPjWdM2Mrf26Gqt88EJYVISWFFnnIIsa72QF1SKMR23MzS8nL324g9jf_yaINwnd48d_ycycaOjDZD3t5hRL_txA8mOfwxI1T1r_fXO8YEKnHzgY-xahE54t82oYa9onAZkVtqvnq70x_jRvbK4rGnfpb8lsA33A_cIc6bfEQPkGNQ",
    alt: "Modern kitchen",
  },
  {
    id: "bedroom",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNfhcZcQwAEwFAgupk2Ml51iScBcvN1A1KlbnHNpCXN0Wu3hAae0OGxguOmf3IBlWcbc5sq8m0hU5bwQD7YvfvvRiu1nFw7Jio3Mxc1E9EeZ7ZVmW6ncB0f6TSPmN-_jt9nPeTS6Pr1qYDkqOCZRvoYhWNFt-HozsevpRzS43ngB_vDYuGjgf44s9fOs_xQFjPl-mBooG8YiTIQjgfIAdX5HLueWoe-e4Ma0SMKHfpKy3qJjMBL4KMheKyHzoynU88XWKrvtRNXQE",
    alt: "Master bedroom",
  },
  {
    id: "arch",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCizgrNUPx3C8TvCjJs0q-ZOeeL3on0mOp_yaz22jnMq3TW48RK0iSFiBFkfh6eg5nlkfAqcN4afCRnRJiat_pu7FlZFgoqVQ4v1ge5MgA_E7oROSzJfoBWT5IZ-qsDzc7tGQdP_61BC_TOj2XqwInzclofgkqocOo0iz2B7aZ__8ntE1fE0CKLEQedDCiklNu3IYpqpF7ocrBC9flqLQMsEElM-kQvUFYjg01wJBCvyTuMDSeUgDpaYag9p1ixDGZwh1U-5zLWKr0",
    alt: "Exterior architecture",
  },
] as const;

/** 24 slots for lightbox — cycles gallery assets with unique ids */
export const LIGHTBOX_IMAGES = Array.from({ length: 24 }, (_, i) => {
  const base = GALLERY_IMAGES[i % GALLERY_IMAGES.length]!;
  return { ...base, id: `photo-${i}`, alt: `${base.alt} (${i + 1})` };
});
