/**
 * Set the site-wide social share image.
 *
 * og:image was absent entirely, so every link shared to LinkedIn, WhatsApp or
 * X rendered as a bare text stub — for a company whose work is visual, that is
 * a real loss. The layout already emits og:image from Site Settings → SEO
 * Defaults when one exists; there simply was not one.
 *
 * Picked the Jebel Ali solar PV complex: an owned photograph of flagship work,
 * 1600x1200, which crops cleanly to the 1200x630 the serializer requests. This
 * is a brand decision the client should confirm — it is editable in the Studio
 * under Site Settings → SEO Defaults → Social Share Image.
 *
 * Run: npx sanity exec scripts/seed/seo-og-image.mjs --with-user-token
 */
import { client } from "./lib.mjs";

const FILENAME = "hsbc-jebel-ali-solar-pv-complex.jpeg";

const asset = await client.fetch(
  `*[_type == "sanity.imageAsset" && originalFilename == $f][0]{
     _id, "w": metadata.dimensions.width, "h": metadata.dimensions.height
   }`,
  { f: FILENAME },
);

if (!asset) {
  console.error(`No asset named ${FILENAME}. Aborting rather than guessing.`);
  process.exit(1);
}
if (asset.w < 1200 || asset.h < 630) {
  console.error(`${FILENAME} is ${asset.w}x${asset.h} — too small to crop to 1200x630.`);
  process.exit(1);
}

await client
  .patch("siteSettings")
  .set({
    "defaultSeo.ogImage": {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
  })
  .commit();

console.log(`Site-wide og:image set -> ${FILENAME} (${asset.w}x${asset.h})`);
console.log("Serialized at 1200x630 fit=crop by src/sanity/lib/seo.ts.");
console.log("\nClient can change this at: Site Settings -> SEO Defaults -> Social Share Image");
