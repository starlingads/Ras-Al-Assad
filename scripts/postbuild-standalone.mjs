/**
 * After `next build` (output: "standalone"), Next emits a self-contained
 * server at `.next/standalone/` but deliberately leaves out the static assets
 * and `public/` — you're expected to copy them in. Forgetting that step is the
 * classic "standalone server runs but every image/CSS/JS 404s" gotcha.
 *
 * This runs automatically as `postbuild` so the standalone bundle is always
 * complete and runnable straight away, on any OS. It no-ops when there is no
 * standalone output (e.g. a managed host using its own adapter), so it is safe
 * everywhere.
 */
import { existsSync, cpSync } from "node:fs";

const standalone = ".next/standalone";

if (!existsSync(standalone)) {
  console.log("[postbuild] no standalone output — nothing to assemble.");
  process.exit(0);
}

if (existsSync(".next/static")) {
  cpSync(".next/static", `${standalone}/.next/static`, { recursive: true });
}
if (existsSync("public")) {
  cpSync("public", `${standalone}/public`, { recursive: true });
}

console.log(
  "[postbuild] standalone bundle assembled — static assets and public/ copied in.",
);
console.log("[postbuild] start it with:  node .next/standalone/server.js");
