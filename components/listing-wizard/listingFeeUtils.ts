/** Pure helpers for listing fee UI — tested independently of React. */

export const DEFAULT_COMPETITOR_AVG_EUR = 49.99;

export function feeBarWidthPercent(
  fairdomListingFeeEuro: number,
  competitorAvgEuro: number,
): number {
  if (competitorAvgEuro <= 0) return 8.33;
  if (fairdomListingFeeEuro <= 0) return 100 / 12;
  return Math.min(100, (fairdomListingFeeEuro / competitorAvgEuro) * 100);
}
