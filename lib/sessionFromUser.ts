import type { User } from "@supabase/supabase-js";
import type { FairdomSession } from "@/lib/clientSession";

function metaString(meta: Record<string, unknown> | undefined, key: string): string {
  const value = meta?.[key];
  if (typeof value !== "string") return "";
  return value.trim();
}

export function fairdomSessionFromUser(user: User): FairdomSession {
  const meta = user.user_metadata as Record<string, unknown> | undefined;
  const raw =
    meta?.account_type ?? meta?.accountType ?? meta?.account_kind ?? meta?.accountKind;
  const accountType = raw === "business" ? "business" : "private";
  const fullName =
    metaString(meta, "full_name") ||
    metaString(meta, "name") ||
    metaString(meta, "display_name") ||
    metaString(meta, "company_legal_name");
  return {
    email: user.email ?? "",
    fullName,
    accountType,
    userId: user.id,
  };
}
