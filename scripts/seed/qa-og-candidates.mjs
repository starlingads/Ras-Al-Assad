/**
 * Read-only: find a landscape, owned image suitable as the site-wide social
 * share card. og:image is currently absent, so every link shared to LinkedIn,
 * WhatsApp or X renders as a bare text stub.
 *
 * Run: npx sanity exec scripts/seed/qa-og-candidates.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const assets = await client.fetch(`*[_type == "sanity.imageAsset"]{
  _id, originalFilename,
  "w": metadata.dimensions.width,
  "h": metadata.dimensions.height,
  "ratio": metadata.dimensions.aspectRatio
} | order(w desc)[0...14]`);

console.log("Widest owned images (og:image wants >=1200x630, ratio ~1.91):\n");
for (const a of assets) {
  const ok = a.w >= 1200 && a.h >= 630;
  console.log(
    `  ${ok ? "OK " : "   "} ${String(a.w).padStart(4)}x${String(a.h).toString().padEnd(4)} r=${(a.ratio ?? 0).toFixed(2)}  ${a.originalFilename}`,
  );
}

// Which one does the homepage hero use? That is the most on-brand default.
const hero = await client.fetch(`*[_id == "homePage"][0]{
  "heroImg": hero.image.asset->{_id, originalFilename, "w": metadata.dimensions.width, "h": metadata.dimensions.height}
}`);
console.log("\nHomepage hero image:", JSON.stringify(hero?.heroImg ?? null));
