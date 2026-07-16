/**
 * QA probe: proves a Studio publish reaches the rendered website.
 *
 * Edits a real, visible field (the Team page heading), waits out the ISR
 * window, confirms the served HTML changes, then restores the original.
 * This is the "does publishing actually update the site?" test.
 *
 * Requires the site running locally (npx next start -p 3000).
 * Run: npx sanity exec scripts/seed/qa-publish-to-site.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const SITE = "http://localhost:3000";
const REVALIDATE_MS = 60_000; // matches `export const revalidate = 60`

const fetchHtml = (path) => fetch(SITE + path, { cache: "no-store" }).then((r) => r.text());
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const original = await client.fetch(`*[_id=="teamPage"][0].hero.title`);
  const probe = `QA_PUBLISH_${Date.now()}`;
  console.log(`original Team hero heading: ${JSON.stringify(original)}`);

  const before = await fetchHtml("/team");
  console.log(`site currently shows the original heading: ${before.includes(original)}`);

  // 1. Publish a change, exactly as the Studio's Publish button does.
  await client.patch("teamPage").set({ "hero.title": probe }).commit();
  console.log(`\npublished new heading: ${probe}`);

  // 2. The API reflects it immediately.
  const apiNow = await client.withConfig({ useCdn: false }).fetch(`*[_id=="teamPage"][0].hero.title`);
  console.log(`API returns the new value immediately: ${apiNow === probe}`);

  // 3. The page is cached for up to `revalidate` seconds, then regenerates.
  //    Poll past the window: a stale hit is expected first (that IS the cache
  //    working), then the fresh value must appear without any redeploy.
  let sawFresh = false;
  const started = Date.now();
  for (let i = 0; i < 10; i++) {
    await sleep(12_000);
    await fetchHtml("/team");           // request 1 triggers regeneration
    await sleep(1_500);
    const html = await fetchHtml("/team"); // request 2 should get the new page
    const elapsed = Math.round((Date.now() - started) / 1000);
    if (html.includes(probe)) {
      console.log(`\nSITE UPDATED after ~${elapsed}s without a redeploy — ISR works`);
      sawFresh = true;
      break;
    }
    console.log(`  t+${elapsed}s: still serving the cached page (expected within the ${REVALIDATE_MS / 1000}s window)`);
  }

  // 4. Always restore, even if the assertion failed.
  await client.patch("teamPage").set({ "hero.title": original }).commit();
  const restored = await client.withConfig({ useCdn: false }).fetch(`*[_id=="teamPage"][0].hero.title`);
  console.log(`\nrestored original heading: ${restored === original}`);

  if (!sawFresh) {
    console.error("FAIL: the published change never reached the served page");
    process.exit(1);
  }
  console.log("PASS: publish → live site verified");
}

main().catch((e) => { console.error("probe error:", e.message); process.exit(1); });
