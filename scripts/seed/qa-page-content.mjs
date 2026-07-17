/**
 * Read-only: what is each page actually about? Used to write SEO copy that
 * describes the real page rather than generic boilerplate.
 *
 * Run: npx sanity exec scripts/seed/qa-page-content.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const rows = await client.fetch(`*[_type match "*Page"]{
  _id,
  "chip": coalesce(hero.chip, pageHero.chip),
  "title": coalesce(hero.title, pageHero.title) + coalesce(hero.titleAccent, pageHero.titleAccent, "") + coalesce(hero.titleEnd, pageHero.titleEnd, ""),
  "subtitle": coalesce(hero.subtitle, pageHero.subtitle)
} | order(_id asc)`);

for (const r of rows) {
  console.log(`\n### ${r._id}`);
  console.log(`  chip     : ${r.chip ?? "—"}`);
  console.log(`  title    : ${r.title ?? "—"}`);
  console.log(`  subtitle : ${(r.subtitle ?? "—").slice(0, 165)}`);
}

const s = await client.fetch(`*[_id == "siteSettings"][0]{ titleTemplate, siteName, siteUrl }`);
console.log("\n### siteSettings");
console.log("  titleTemplate:", s?.titleTemplate);
console.log("  siteName     :", s?.siteName);
console.log("  siteUrl      :", s?.siteUrl);

const counts = await client.fetch(`{
  "projects": count(*[_type=="project"]),
  "services": count(*[_type=="service"]),
  "team": count(*[_type=="teamMember"]),
  "certs": count(*[_type=="certificate"])
}`);
console.log("\n### real counts (usable in descriptions):", JSON.stringify(counts));
