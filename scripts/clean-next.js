/**
 * Usuwa artefakty buildu Next.js (np. przy uszkodzonym .next).
 * Zatrzymaj `next dev` / `next start` przed uruchomieniem.
 */
const fs = require("fs");
const path = require("path");

function rmDir(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log("[clean-next] usunięto:", dir);
  } catch (e) {
    const err = /** @type {NodeJS.ErrnoException} */ (e);
    if (err.code !== "ENOENT") console.error("[clean-next]", err.message);
  }
}

const root = process.cwd();
rmDir(path.join(root, ".next"));
rmDir(path.join(root, "node_modules", ".cache"));
