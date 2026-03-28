/** Total steps in the add-listing flow (used for progress bar). */
export const ADD_LISTING_TOTAL_STEPS = 5;

export function addListingProgressPercent(step: number): number {
  const s = Math.min(Math.max(step, 1), ADD_LISTING_TOTAL_STEPS);
  return Math.round((s / ADD_LISTING_TOTAL_STEPS) * 100);
}
