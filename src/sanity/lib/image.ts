import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN URL for an image asset.
 * Usage: urlFor(figure.image).width(800).url()
 * `auto('format')` serves AVIF/WebP to browsers that support them.
 */
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto("format");
};
