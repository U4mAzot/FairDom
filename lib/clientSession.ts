export const FAIRDOM_SESSION_KEY = "fairdom-session";

export type FairdomSession = {
  email: string;
  accountType: "private" | "business";
};

function dispatchSessionChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("fairdom-session-change"));
  }
}

export function readSession(): FairdomSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(FAIRDOM_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FairdomSession;
    if (!parsed.email || typeof parsed.email !== "string") return null;
    if (parsed.accountType !== "private" && parsed.accountType !== "business") {
      return { ...parsed, accountType: "private" };
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeSession(session: FairdomSession): void {
  localStorage.setItem(FAIRDOM_SESSION_KEY, JSON.stringify(session));
  dispatchSessionChange();
}

export function clearSession(): void {
  localStorage.removeItem(FAIRDOM_SESSION_KEY);
  dispatchSessionChange();
}
