/**
 * Weryfikacja odczytu/zapisu (anon) + podstawowych założeń bezpieczeństwa RLS.
 * Uruchom: npm run verify:supabase
 * Tylko odczyt + RLS (bez +1 w bazie): npm run verify:supabase -- --read-only
 * Wymaga .env.local z NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY (lub PUBLISHABLE).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const p = path.join(root, ".env.local");
  if (!fs.existsSync(p)) return {};
  const raw = fs.readFileSync(p, "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i <= 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

const env = { ...process.env, ...loadEnvLocal() };
const url = (env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
const key = (
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  ""
).trim();

const TRACKED = ["pl-001", "pl-002", "pl-003", "pl-004"];
const RPC_TEST_SLUG = "pl-002";

function fail(msg) {
  console.error(`\x1b[31mFAIL\x1b[0m ${msg}`);
  process.exitCode = 1;
}

function ok(msg) {
  console.log(`\x1b[32mOK\x1b[0m   ${msg}`);
}

function info(msg) {
  console.log(`\x1b[90m     ${msg}\x1b[0m`);
}

async function main() {
  const readOnly = process.argv.includes("--read-only");
  console.log("Supabase — weryfikacja bazy i RLS (rola anon)");
  if (readOnly) console.log("(tryb --read-only: bez testowego inkrementu RPC)\n");
  else console.log();

  if (!url || !key) {
    fail("Brak NEXT_PUBLIC_SUPABASE_URL lub klucza anon/publishable (.env.local).");
    return;
  }

  const supabase = createClient(url, key);

  // 1) Odczyt liczników
  const { data: rows, error: selErr } = await supabase
    .from("listing_view_counts")
    .select("slug, view_count")
    .in("slug", TRACKED);

  if (selErr) {
    fail(`listing_view_counts SELECT: ${selErr.message}`);
    return;
  }
  ok(`listing_view_counts: odczyt (${(rows ?? []).length} wierszy dla znanych slugów)`);
  const map = Object.fromEntries((rows ?? []).map((r) => [r.slug, Number(r.view_count)]));
  TRACKED.forEach((s) => info(`${s}: ${map[s] ?? "— (brak wiersza = 0 wyświetleń)"}`));

  // 2) RPC inkrement (opcjonalnie — potwierdza zapis)
  if (!readOnly) {
    const before = map[RPC_TEST_SLUG] ?? 0;
    const { data: afterRpc, error: rpcErr } = await supabase.rpc("increment_listing_view_count", {
      p_slug: RPC_TEST_SLUG,
    });

    if (rpcErr) {
      fail(`increment_listing_view_count RPC: ${rpcErr.message}`);
      return;
    }
    const after = Number(afterRpc ?? 0);
    if (after !== before + 1) {
      fail(`Oczekiwano view_count = ${before + 1} po RPC, jest ${after}`);
    } else {
      ok(`RPC increment (${RPC_TEST_SLUG}): zapis ${before} → ${after}`);
    }

    const { data: rowAfter } = await supabase
      .from("listing_view_counts")
      .select("view_count")
      .eq("slug", RPC_TEST_SLUG)
      .maybeSingle();
    if (Number(rowAfter?.view_count) !== after) {
      fail("Odczyt po RPC: view_count w tabeli nie zgadza się z wartością RPC.");
      return;
    }
    ok("listing_view_counts: odczyt po zapisie zgadza się z RPC");
  } else {
    info("(pominięto RPC — użyj bez --read-only aby przetestować zapis)");
  }

  // 3) Profil: anon nie powinien czytać cudzych danych
  const { data: profRows, error: profErr } = await supabase.from("profiles").select("id").limit(5);

  if (profErr) {
    if (profErr.code === "42P01" || /relation .* does not exist/i.test(profErr.message)) {
      fail(`profiles: ${profErr.message}`);
      return;
    }
    ok(`profiles SELECT (anon): odrzucone zgodnie z RLS (${profErr.code ?? profErr.message})`);
  } else if ((profRows ?? []).length === 0) {
    ok("profiles SELECT (anon): 0 wierszy (RLS — brak wglądu bez logowania)");
  } else {
    fail("profiles: anon nie powinien widzieć żadnych wierszy (sprawdź polityki RLS).");
  }

  // 4) Profil: anon nie może wstawiać
  const fakeId = "00000000-0000-4000-8000-000000000001";
  const { error: insErr } = await supabase.from("profiles").insert({
    id: fakeId,
    account_type: "private",
  });

  if (!insErr) {
    fail("profiles INSERT (anon): powinno być zabronione — usuń testowy wiersz ręcznie!");
    return;
  }
  ok(`profiles INSERT (anon): zablokowane (${insErr.code ?? insErr.message})`);

  // 5) Uwaga o RPC (slug bez whitelisty w SQL)
  info("\nUwaga bezpieczeństwa: funkcja increment_listing_view_count przyjmuje dowolny slug tekstowy.");
  info("Aplikacja ogranicza slugi w API; bezpośrednie wywołanie RPC może dodać śmieciowe klucze.");
  info("Opcjonalne twardo: CHECK w SQL lub tabela dozwolonych slugów.\n");

  if (!process.exitCode) {
    console.log("\n\x1b[32mWszystkie kontrole zakończone powodzeniem.\x1b[0m\n");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
