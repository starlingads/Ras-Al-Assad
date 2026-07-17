/**
 * Bring every page title inside Google's ~60-character display budget.
 *
 * The template was "%s | Ras Al Assad Electromechanical Works" — a 39-char
 * suffix, which left ~21 chars for the page itself and pushed the homepage to
 * 82. It also repeated "Electromechanical" twice in that title. Shortening the
 * suffix to " | Ras Al Assad" buys 24 characters back on every page at once;
 * "Ras Al Assad" is the searchable brand, and the full legal name still lives
 * in siteName, the Organization JSON-LD and the footer.
 *
 * Run: npx sanity exec scripts/seed/seo-titles.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const TEMPLATE = "%s | Ras Al Assad";
const SUFFIX = TEMPLATE.replace("%s", "").length;

const TITLES = {
  homePage: "Solar PV EPC & MEP Contractor in Dubai",
  aboutPage: "About Us",
  servicesPage: "Engineering Services",
  projectsPage: "Project Portfolio",
  teamPage: "Leadership & Engineering Team",
  contactPage: "Contact Our Engineers",
  solarCalculatorPage: "Solar Savings Calculator",
  sustainabilityPage: "Sustainability",
  appreciationPage: "Appreciation & Recognition",
};

let bad = 0;
for (const [id, t] of Object.entries(TITLES)) {
  const total = t.length + SUFFIX;
  if (total > 60) {
    console.error(`  ${id}: ${total} chars — over 60`);
    bad++;
  }
}
if (bad) process.exit(1);

const tx = client.transaction();
tx.patch("siteSettings", (p) => p.set({ titleTemplate: TEMPLATE }));
for (const [id, t] of Object.entries(TITLES)) {
  tx.patch(id, (p) => p.set({ "seo.title": t }));
}
await tx.commit();

console.log(`titleTemplate -> "${TEMPLATE}"  (suffix ${SUFFIX} chars, was 39)\n`);
for (const [id, t] of Object.entries(TITLES)) {
  const total = t.length + SUFFIX;
  console.log(`  ${String(total).padStart(2)}ch  ${t}${TEMPLATE.replace("%s", "")}`);
}
console.log("\nEvery title now fits Google's ~60-char display budget.");
