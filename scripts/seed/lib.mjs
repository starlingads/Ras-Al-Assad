/**
 * Shared helpers for the seed scripts.
 *
 * Every script here runs via `npx sanity exec <script> --with-user-token`,
 * which injects the logged-in CLI user's token — no token files, nothing
 * committed. Requires `npx sanity login` once on the machine running it.
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { getCliClient } from "sanity/cli";
import { LexoRank } from "lexorank";

export const root = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "../..",
);

export const client = getCliClient({ apiVersion: "2026-07-01" });

/** Ordered LexoRank generator so seeded lists match the current site order. */
export function rankGenerator() {
  let rank = LexoRank.middle();
  return () => {
    const current = rank.toString();
    rank = rank.genNext();
    return current;
  };
}

// ── Asset uploads (cached, tagged, alt-texted) ────────────────────────────

const CACHE_FILE = path.join(root, "scripts/seed/.asset-cache.json");
const assetCache = fs.existsSync(CACHE_FILE)
  ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"))
  : {};

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(assetCache, null, 2));
}

/** Media-library tag set (sanity-plugin-media reads media.tag documents). */
export const MEDIA_TAGS = [
  "Projects",
  "Services",
  "Team",
  "Client Logos",
  "Certificates",
  "Sustainability",
  "General",
];

/** public/assets subfolder → media tag, mirroring §6.8 of the plan. */
export function tagForPath(publicPath) {
  if (publicPath.includes("/Projects/")) return "Projects";
  if (publicPath.includes("/Team/")) return "Team";
  if (publicPath.includes("/Trusted Clients/")) return "Client Logos";
  if (publicPath.includes("/Certificates/")) return "Certificates";
  if (publicPath.includes("/Logos/")) return "General";
  return "General";
}

const tagIds = {};

/** Create (or find) the media.tag documents once per run. */
export async function ensureMediaTags() {
  for (const tag of MEDIA_TAGS) {
    const slug = tag.toLowerCase().replace(/\s+/g, "-");
    const existing = await client.fetch(
      `*[_type == "media.tag" && name.current == $slug][0]._id`,
      { slug },
    );
    if (existing) {
      tagIds[tag] = existing;
    } else {
      const created = await client.create({
        _type: "media.tag",
        name: { _type: "slug", current: slug },
      });
      tagIds[tag] = created._id;
    }
  }
  return tagIds;
}

/**
 * Upload an image from /public (path like "/assets/Projects/x.jpg").
 * Idempotent: the path → assetId map is cached to disk, so reruns reuse
 * already-uploaded assets. Sets altText + the folder-derived media tag.
 */
export async function uploadImage(publicPath, alt) {
  if (assetCache[publicPath]) return assetCache[publicPath];

  const filePath = path.join(root, "public", publicPath);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Asset not found on disk: ${publicPath}`);
  }
  // Normalize awkward filenames (double spaces etc.) for the media library.
  const filename = path
    .basename(publicPath)
    .replace(/\s+/g, " ")
    .trim();

  const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
    filename,
  });

  const tag = tagForPath(publicPath);
  await client
    .patch(asset._id)
    .set({
      altText: alt || filename.replace(/\.[a-z]+$/i, ""),
      opt: { media: { tags: [{ _type: "reference", _ref: tagIds[tag], _weak: true }] } },
    })
    .commit();

  assetCache[publicPath] = asset._id;
  saveCache();
  console.log(`  ↑ uploaded ${publicPath} (${tag})`);
  return asset._id;
}

/** Build a `figure` object value around an uploaded asset. */
export async function figureFor(publicPath, alt, caption) {
  const assetId = await uploadImage(publicPath, alt);
  return {
    _type: "figure",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
    },
    alt: alt || undefined,
    caption: caption || undefined,
  };
}

// ── Idempotent document creation ──────────────────────────────────────────

/**
 * Find a document by type + slug (or another field); create it when missing.
 * Ordinary documents keep Sanity-generated IDs (no deterministic IDs) —
 * reruns are idempotent via lookup, per the plan's §9.3.
 * Returns the document _id either way.
 */
export async function ensureDoc(type, matchField, matchValue, doc) {
  const query =
    matchField === "slug"
      ? `*[_type == $type && slug.current == $value][0]._id`
      : `*[_type == $type && ${matchField} == $value][0]._id`;
  const existing = await client.fetch(query, { type, value: matchValue });
  if (existing) return existing;
  const created = await client.create({ _type: type, ...doc });
  console.log(`  + ${type}: ${matchValue}`);
  return created._id;
}

/** Singletons: fixed ID === type name, createOrReplace (allowed for singletons). */
export async function upsertSingleton(type, fields) {
  await client.createOrReplace({ _id: type, _type: type, ...fields });
  console.log(`  ⟳ singleton ${type}`);
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

export const slugValue = (text) => ({ _type: "slug", current: slugify(text) });

/** Stable-ish array keys for seeded array items. */
let keyCounter = 0;
export const withKey = (obj) => ({ _key: `seed${(keyCounter++).toString(36)}${Date.now().toString(36)}`, ...obj });

export const loadExtracted = () =>
  JSON.parse(fs.readFileSync(path.join(root, "scripts/seed/.extracted.json"), "utf8"));
