/**
 * Read-only probe: what SEO does each page singleton actually carry?
 *
 * Run: npx sanity exec scripts/seed/qa-seo-state.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const docs = await client.fetch(`*[_type match "*Page" || _type == "siteSettings"]{
  _id, _type, "title": seo.title, "desc": seo.description,
  "kw": count(seo.keywords), "og": defined(seo.ogImage.asset),
  "defaultDesc": defaultSeo.description
} | order(_type asc)`);

console.log("doc".padEnd(26), "seo.title".padEnd(34), "desc", "kw", "og");
console.log("-".repeat(84));
for (const d of docs) {
  console.log(
    String(d._id).padEnd(26),
    String(d.title ?? "—").slice(0, 32).padEnd(34),
    String(d.desc ? `${d.desc.length}ch` : "—").padEnd(5),
    String(d.kw ?? 0).padEnd(3),
    d.og ? "yes" : "no",
  );
}
const settings = docs.find((d) => d._type === "siteSettings");
console.log("\nSite-wide default description:", settings?.defaultDesc?.length ?? 0, "chars");
console.log(settings?.defaultDesc ? `  "${settings.defaultDesc}"` : "  (none)");
const withOwn = docs.filter((d) => d._type !== "siteSettings" && d.desc).length;
const total = docs.filter((d) => d._type !== "siteSettings").length;
console.log(`\n${withOwn}/${total} pages have their own description; the rest inherit the default above.`);
