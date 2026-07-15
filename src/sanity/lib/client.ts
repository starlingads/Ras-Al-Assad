import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * The base Sanity client, used for reading published content.
 *
 * `useCdn: true` serves reads from Sanity's edge cache — the right default for
 * public, published content, which is all this client is used for.
 *
 * Phase 3 layers the Live Content API (`defineLive`) on top of this client for
 * draft previews and tag-based revalidation. Draft-aware reads need a token and
 * an uncached client, so they will be configured there rather than here — see
 * Part 8 of the implementation plan.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
