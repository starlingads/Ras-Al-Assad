/**
 * Seed per-page SEO into the page singletons.
 *
 * Every page previously inherited one 154-char site-wide description, so all
 * nine shipped identical metadata — which reads to a search engine as nine
 * near-duplicate pages. This gives each page its own title, description and
 * focus keywords.
 *
 * The copy is written against what each page actually contains (its hero
 * subtitle, and the real collection counts) rather than generic boilerplate,
 * and every field is client-editable in the Studio afterwards. Nothing here
 * is hardcoded in the frontend — this only writes to the Content Lake.
 *
 * The title template is "%s | Ras Al Assad Electromechanical Works", so the
 * value below is only the page-specific half; the brand is appended by Next.
 *
 * Run: npx sanity exec scripts/seed/seo.mjs --with-user-token
 */
import { client } from "./lib.mjs";

/** name = the page-specific title half; description targets 140-158 chars. */
const SEO = {
  homePage: {
    title: "Solar PV EPC & Electromechanical Contractor",
    description:
      "DEWA-certified solar PV EPC and electromechanical contractor in Dubai. 42 delivered projects across solar, HVAC, substations and UAE infrastructure.",
    keywords: [
      "solar EPC Dubai",
      "DEWA certified solar contractor",
      "electromechanical contractor UAE",
      "MEP contractor Dubai",
      "solar PV installation UAE",
    ],
  },
  aboutPage: {
    title: "About Us",
    description:
      "Founded in Dubai in 2013, Ras Al Assad is a DEWA-certified solar PV and electromechanical engineering firm with over 15 years of grid-integration work.",
    keywords: [
      "about Ras Al Assad",
      "DEWA certified contractor Dubai",
      "electromechanical engineering firm UAE",
      "solar EPC company Dubai",
    ],
  },
  servicesPage: {
    title: "Engineering Services",
    description:
      "Six engineering disciplines: solar PV EPC, HVAC and district cooling, electrical substations, wind energy, MEP works and energy audits across the UAE.",
    keywords: [
      "solar EPC services UAE",
      "HVAC contractor Dubai",
      "substation engineering UAE",
      "MEP services Dubai",
      "energy audit UAE",
    ],
  },
  projectsPage: {
    title: "Project Portfolio",
    description:
      "Explore 42 delivered UAE projects: DEWA-synchronised industrial solar plants, central district cooling, and high-voltage transmission substation works.",
    keywords: [
      "solar projects UAE",
      "DEWA solar plant Dubai",
      "district cooling projects UAE",
      "substation projects Dubai",
    ],
  },
  teamPage: {
    title: "Leadership & Engineering Team",
    description:
      "Meet the leadership and engineering specialists behind Ras Al Assad, bringing over a decade of UAE grid-compliant MEP and renewable energy delivery.",
    keywords: [
      "Ras Al Assad leadership",
      "engineering team Dubai",
      "MEP engineers UAE",
    ],
  },
  contactPage: {
    title: "Contact Our Engineers",
    description:
      "Contact Ras Al Assad in Dubai for solar grid integration and electromechanical projects. Request custom pricing or schedule a site survey with our team.",
    keywords: [
      "contact solar contractor Dubai",
      "MEP contractor enquiry UAE",
      "solar site survey Dubai",
    ],
  },
  solarCalculatorPage: {
    title: "Solar Savings Calculator",
    description:
      "Estimate your Dubai property's solar potential. Enter your monthly DEWA bill for instant system size, capital cost, payback period and CO2 offset figures.",
    keywords: [
      "solar calculator Dubai",
      "DEWA bill solar savings",
      "solar ROI UAE",
      "solar payback calculator Dubai",
    ],
  },
  sustainabilityPage: {
    title: "Sustainability",
    description:
      "How Ras Al Assad supports the UAE Net Zero 2050 vision through renewable engineering, measured carbon offset and grid-connected solar infrastructure.",
    keywords: [
      "UAE net zero 2050",
      "sustainable engineering UAE",
      "renewable energy Dubai",
      "carbon offset solar UAE",
    ],
  },
  appreciationPage: {
    title: "Appreciation & Recognition",
    description:
      "Certifications, accreditations and client recognition earned by Ras Al Assad across UAE solar, electromechanical and infrastructure engineering work.",
    keywords: [
      "Ras Al Assad certifications",
      "DEWA accreditation",
      "engineering recognition UAE",
    ],
  },
};

// Guard rails: Google truncates descriptions near 160 chars and titles near
// 60 including the appended brand. Fail loudly rather than seed bad SEO.
const SUFFIX = " | Ras Al Assad Electromechanical Works".length;
let bad = 0;
for (const [id, v] of Object.entries(SEO)) {
  const d = v.description.length;
  if (d < 120 || d > 160) {
    console.error(`  ${id}: description ${d} chars — outside 120-160`);
    bad++;
  }
  if (new Set(Object.values(SEO).map((x) => x.description)).size !== Object.keys(SEO).length) {
    console.error("  duplicate description detected");
    bad++;
  }
}
if (bad) {
  console.error("\nAborting: fix the copy above first.");
  process.exit(1);
}

const tx = client.transaction();
for (const [id, v] of Object.entries(SEO)) {
  tx.patch(id, (p) =>
    p.set({
      "seo.title": v.title,
      "seo.description": v.description,
      "seo.keywords": v.keywords,
    }),
  );
}
await tx.commit();

console.log("Seeded per-page SEO:\n");
for (const [id, v] of Object.entries(SEO)) {
  console.log(
    `  ${id.padEnd(21)} title ${String(v.title.length + SUFFIX).padStart(2)}ch  desc ${v.description.length}ch  ${v.keywords.length} keywords`,
  );
}
console.log(
  `\n${Object.keys(SEO).length} pages now carry their own metadata. All fields remain editable in the Studio.`,
);
