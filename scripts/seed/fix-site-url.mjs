/**
 * Point the canonical site URL at the live Hostinger domain.
 *
 * Site Settings → siteUrl still held the old Vercel preview domain after the
 * migration. That single field feeds `metadataBase` in the (site) layout, so
 * every canonical, og:url, the sitemap and the robots.txt Sitemap line on the
 * LIVE site were advertising ras-al-assad.vercel.app. With the Vercel
 * deployment still publicly serving the same pages, that tells search engines
 * the Vercel copy is the original and the client's real domain is the
 * duplicate — the opposite of what is wanted.
 *
 * It is CMS content (rule 1: business content lives in Sanity), so the fix
 * belongs here rather than in code. ISR picks it up within ~60s; no redeploy.
 *
 * Run: npx sanity exec scripts/seed/fix-site-url.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const LIVE_URL = "https://rasalassad.ae";

const before = await client.fetch(`*[_id == "siteSettings"][0]{siteUrl}`);
console.log("current siteUrl:", before?.siteUrl ?? "(unset)");

if (before?.siteUrl === LIVE_URL) {
  console.log("already correct — nothing to do.");
} else {
  await client.patch("siteSettings").set({ siteUrl: LIVE_URL }).commit();
  const after = await client.fetch(`*[_id == "siteSettings"][0]{siteUrl}`);
  console.log("updated siteUrl:", after?.siteUrl);
  console.log(
    "\nCanonicals, og:url, sitemap.xml and robots.txt will follow within ~60s (ISR).",
  );
}
