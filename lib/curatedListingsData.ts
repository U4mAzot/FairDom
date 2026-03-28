/** Karta „Wybrane oferty” na stronie głównej — dane budowane z `MOCK_LISTINGS` w `app/page.tsx`. */
export type CuratedListingItem = {
  title: string;
  price: string;
  address: string;
  beds: string;
  baths: string;
  areaLabel: string;
  badge: string;
  badgeClass: string;
  image: string;
  slug: string;
};
