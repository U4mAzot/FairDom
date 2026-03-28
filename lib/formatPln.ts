const pln = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

/** Np. 28 500 000 zł */
export function formatPricePln(amount: number): string {
  return pln.format(amount);
}

/** Krótki zapis na mapę / karty, np. 12,4 mln zł */
export function formatPriceShortPln(amount: number): string {
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    const rounded = Math.round(m * 10) / 10;
    return `${String(rounded).replace(".", ",")} mln zł`;
  }
  return formatPricePln(amount);
}
