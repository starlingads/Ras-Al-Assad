/**
 * QA probe: proves the full editorial pipeline works end to end —
 * create → edit → publish → image upload → reference → delete.
 *
 * This exercises the exact APIs the Studio uses, so a green run means the
 * Studio's create/edit/publish/delete and asset uploads work for a logged-in
 * editor. It is a test fixture, not part of the app.
 *
 * Run: npx sanity exec scripts/seed/qa-crud.mjs --with-user-token
 */
import zlib from "node:zlib";
import { client } from "./lib.mjs";

const log = (ok, msg) => console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`);
let failures = 0;
const check = (cond, msg) => { if (!cond) failures++; log(cond, msg); return cond; };

/** A minimal, content-unique PNG so the upload can't dedupe onto a real asset. */
function makeUniquePng() {
  const w = 2, h = 2;
  // One filter byte + RGB per row, seeded with random bytes for a unique hash.
  const raw = Buffer.concat(
    Array.from({ length: h }, () => Buffer.concat([Buffer.from([0]), Buffer.from(Array.from({ length: w * 3 }, () => Math.floor(Math.random() * 256)))])),
  );
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body) >>> 0);
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; // 8-bit, truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function crc32(buf) {
  let c, crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return crc ^ 0xffffffff;
}

async function main() {
  const marker = `__qa_probe_${Date.now()}`;

  // ── CREATE (as "Add Project" in the Studio does) ───────────────────────
  const created = await client.create({
    _type: "project",
    name: marker,
    slug: { _type: "slug", current: marker },
    summary: "QA probe — created by scripts/seed/qa-crud.mjs",
    statusLabel: "Completed & Operational",
    featured: false,
    hidden: false,
  });
  check(Boolean(created._id), `CREATE project → ${created._id}`);
  check(!created._id.startsWith("drafts."), "created as a published document (not a draft)");

  // ── IMAGE UPLOAD (as dragging a photo into a field does) ───────────────
  // Use a freshly generated image: Sanity deduplicates assets by content
  // hash, so re-uploading an existing file returns the *existing* asset —
  // which the cleanup step must not delete (it is in use elsewhere).
  const uniquePng = makeUniquePng();
  const asset = await client.assets.upload("image", uniquePng, { filename: `${marker}.png` });
  check(Boolean(asset._id) && asset.url.includes("cdn.sanity.io"), `IMAGE UPLOAD → ${asset.url.split("/").pop()}`);

  // ── EDIT + attach the asset (patch, as typing in a field does) ─────────
  const patched = await client
    .patch(created._id)
    .set({
      name: `${marker}_edited`,
      thumbnail: { _type: "figure", image: { _type: "image", asset: { _type: "reference", _ref: asset._id } }, alt: "QA probe" },
    })
    .commit();
  check(patched.name === `${marker}_edited`, "EDIT (patch) applied");
  check(Boolean(patched.thumbnail?.image?.asset?._ref), "IMAGE attached to the document");

  // ── DRAFT → PUBLISH round trip (the client's core workflow) ────────────
  await client.createOrReplace({ ...patched, _id: `drafts.${created._id}`, name: `${marker}_draft_edit` });

  // Drafts are only visible under a drafts-aware perspective. The default
  // `published` perspective hides them — which is exactly why the website
  // never leaks unpublished edits.
  const draftVisible = await client
    .withConfig({ perspective: "raw", useCdn: false })
    .fetch(`*[_id == $id][0].name`, { id: `drafts.${created._id}` });
  check(draftVisible === `${marker}_draft_edit`, "DRAFT saved separately from the published version");

  const draftHiddenFromSite = await client
    .withConfig({ perspective: "published", useCdn: false })
    .fetch(`count(*[_id == $id])`, { id: `drafts.${created._id}` });
  check(draftHiddenFromSite === 0, "draft is INVISIBLE under the published perspective (website never shows unpublished edits)");

  const publishedStillOld = await client.fetch(`*[_id == $id][0].name`, { id: created._id });
  check(publishedStillOld === `${marker}_edited`, "published version unchanged while the draft exists (draft isolation)");

  // Publish = replace published with draft, delete draft (what the button does)
  const draftDoc = await client.getDocument(`drafts.${created._id}`);
  const { _id, _rev, _createdAt, _updatedAt, ...body } = draftDoc;
  await client.createOrReplace({ ...body, _id: created._id });
  await client.delete(`drafts.${created._id}`);
  const afterPublish = await client.fetch(`*[_id == $id][0].name`, { id: created._id });
  check(afterPublish === `${marker}_draft_edit`, "PUBLISH promoted the draft to the live document");
  check((await client.fetch(`count(*[_id == $id])`, { id: `drafts.${created._id}` })) === 0, "draft cleared after publish");

  // ── PUBLIC READ (what the website sees — unauthenticated, published) ───
  const pub = await fetch(
    `https://${client.config().projectId}.api.sanity.io/v2026-07-01/data/query/${client.config().dataset}?query=${encodeURIComponent(`*[_type=="project" && slug.current=="${marker}"][0]{name,"img":thumbnail.image.asset->url}`)}`,
  ).then((r) => r.json());
  check(pub.result?.name === `${marker}_draft_edit`, "PUBLIC (unauthenticated) read sees the published doc — the website will render it");
  check(Boolean(pub.result?.img), "image resolves to a public CDN url");

  // ── SAFETY NET: an in-use image cannot be deleted ──────────────────────
  // The QA project still references the asset, so this delete must be refused.
  let refused = false;
  try {
    await client.delete(asset._id);
  } catch (err) {
    refused = /reference/i.test(err.message);
  }
  check(refused, "reference protection BLOCKS deleting an image that is still in use");

  // ── DELETE (as the Studio's delete action does) ────────────────────────
  await client.delete(created._id);
  const gone = await client.fetch(`count(*[_type=="project" && slug.current==$s])`, { s: marker });
  check(gone === 0, "DELETE removed the document");

  // Now unreferenced, the throwaway asset can be cleaned up.
  await client.delete(asset._id);
  check(
    (await client.withConfig({ perspective: "raw", useCdn: false }).fetch(`count(*[_id == $id])`, { id: asset._id })) === 0,
    "unreferenced asset deleted (no QA residue in the Media library)",
  );

  // ── Dataset must be back to its seeded state ───────────────────────────
  const final = await client.fetch(`count(*[_type=="project"])`);
  check(final === 42, `dataset restored — ${final} projects (expected 42, no QA residue)`);

  console.log(failures === 0 ? "\nALL EDITORIAL OPERATIONS PASSED" : `\n${failures} CHECK(S) FAILED`);
  if (failures) process.exit(1);
}

main().catch((e) => { console.error("QA probe error:", e.message); process.exit(1); });
