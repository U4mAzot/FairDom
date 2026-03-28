import type { User } from "@supabase/supabase-js";
import type { FairdomSession } from "@/lib/clientSession";

export function fairdomSessionFromUser(user: User): FairdomSession {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const raw =
    meta?.account_type ?? meta?.accountType ?? meta?.account_kind ?? meta?.accountKind;
  const accountType = raw === "business" ? "business" : "private";
  return {
    email: user.email ?? "",
    accountType,
    userId: user.id,
  };
}
