/**
 * The homepage title must carry the brand itself.
 *
 * Next applies `title.template` to *nested* route segments only. Every other
 * page lives in its own folder under (site)/, so "About Us" becomes
 * "About Us | Ras Al Assad" automatically — but the homepage is
 * (site)/page.tsx, the same segment that defines the template, so the suffix
 * is never appended and it was shipping with no brand at all.
 *
 * Verified by rendering: /about got the suffix, / did not.
 *
 * Run: npx sanity exec scripts/seed/seo-home-title.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const TITLE = "Solar PV EPC & MEP Contractor in Dubai | Ras Al Assad";

if (TITLE.length > 60) {
  console.error(`${TITLE.length} chars — over Google's ~60 display budget.`);
  process.exit(1);
}

await client.patch("homePage").set({ "seo.title": TITLE }).commit();
console.log(`homePage seo.title -> "${TITLE}" (${TITLE.length} chars)`);
console.log("The brand is inlined here because the template does not reach this segment.");
