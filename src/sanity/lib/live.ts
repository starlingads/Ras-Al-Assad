import type { ClientReturn, QueryParams } from "@sanity/client";

import { client } from "./client";

/**
 * How long a rendered page may serve cached CMS data before Next.js fetches
 * again in the background. The client sees a publish within this window.
 */
export const REVALIDATE_SECONDS = 60;

/**
 * The single read path for CMS content.
 *
 * Why this exists instead of `defineLive` from next-sanity:
 * `defineLive`'s `sanityFetch` hardcodes `next: {revalidate: false}` and
 * relies on `<SanityLive />` calling `revalidateTag()` from a *browser* to
 * ever free the cache. With nobody viewing the site, a publish would never
 * reach new visitors — verified: a published change did not appear after two
 * minutes, because the route re-rendered from a permanently cached fetch.
 *
 * A plain time-revalidated fetch is deterministic: no webhook, no open tab,
 * no token. Content is at most REVALIDATE_SECONDS stale, always.
 *
 * The `ClientReturn<QueryString>` return type keeps TypeGen's per-query result
 * types working exactly as before, so call sites are unchanged.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = REVALIDATE_SECONDS,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  /**
   * Accepted for call-site parity with next-sanity. Stega encoding is only
   * meaningful with a Presentation/preview token, which this build does not
   * use, so it is intentionally ignored.
   */
  stega?: boolean;
}): Promise<{ data: ClientReturn<QueryString> }> {
  const data = await client.fetch<ClientReturn<QueryString>>(query, params, {
    // Tag-based invalidation and time-based revalidation are mutually
    // exclusive in Next's Data Cache; tags win when explicitly supplied.
    next: tags.length ? { tags } : { revalidate },
  });

  return { data };
}
