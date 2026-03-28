/** Legacy key — removed after Supabase migration; kept for one-time cleanup. */
export const FAIRDOM_SESSION_KEY = "fairdom-session";

/** App session derived from Supabase Auth + user_metadata (account type). */
export type FairdomSession = {
  email: string;
  accountType: "private" | "business";
  /** Supabase `auth.users.id` — used for local listing storage keys. */
  userId: string;
};
