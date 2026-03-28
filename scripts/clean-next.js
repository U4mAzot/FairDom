/**
 * Usuwa artefakty buildu Next.js (np. przy ENOENT w plikach manifestu pod .next).
 *
 * ZAWSZE zatrzymaj `next dev` / `next start` (Ctrl+C) przed uruchomieniem.
 * Jeśli `EBUSY` / folder nie znika: zamknij drugi terminal z Nextem, ewentualnie
 * zabij procesy `node.exe` w Menedżerze zadań, wyłącz synchronizację OneDrive
 * dla folderu projektu (Pulpit).
 */
const fs = require("fs");
const path = require("path");

function sleepSync(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    /* oczekiwanie na zwolnienie blokady plików (Windows) */
  }
}

function rmDir(dir, label) {
  const max = 4;
  for (let attempt = 1; attempt <= max; attempt++) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log("[clean-next] usunięto:", label);
      return;
    } catch (e) {
      const err = /** @type {NodeJS.ErrnoException} */ (e);
      if (err.code === "ENOENT") return;
      if (attempt === max) {
        console.error("[clean-next] nie udało się usunąć po", max, "próbach:", label);
        console.error("[clean-next]", err.message);
        process.exitCode = 1;
        return;
      }
      sleepSync(350 * attempt);
    }
  }
}

const root = process.cwd();
rmDir(path.join(root, ".next"), ".next");
rmDir(path.join(root, "node_modules", ".cache"), "node_modules/.cache");
