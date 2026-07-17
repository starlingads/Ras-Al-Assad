import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";

/** The shape every page's `seo` projection returns (see SEO fragment). */
export type PageSeo = {
  title?: string | null;
  description?: string | null;
  ogImage?: { asset?: unknown } | null;
  keywords?: string[] | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
} | null;

/**
 * Merge a document's SEO settings into Next.js metadata.
 *
 * `path` builds the self-referencing canonical (resolved against
 * metadataBase); an explicit seo.canonicalUrl wins.
 */
export async function pageMetadata(
  seo: PageSeo,
  { fallbackTitle, path }: { fallbackTitle: string; path: string },
): Promise<Metadata> {
  // Next merges metadata per segment, but `openGraph` is REPLACED wholesale by
  // a child, not deep-merged. So the moment a page sets any openGraph field it
  // silently drops the layout's og:site_name, og:type and default share image.
  // Relying on inheritance here is what broke all nine pages once every page
  // gained its own description. The only safe shape is for each page to emit a
  // complete openGraph, which means resolving the site defaults here.
  //
  // LAYOUT_QUERY is reused on purpose: the layout runs the identical query in
  // the same render, so Next's fetch cache dedupes it and this costs nothing.
  const { data } = await sanityFetch({ query: LAYOUT_QUERY, stega: false });
  const settings = data?.settings;
  const siteDefaults = settings?.defaultSeo;

  const title = seo?.title || fallbackTitle;
  const description = seo?.description || siteDefaults?.description || undefined;
  // A page's own share image wins; otherwise the site-wide default.
  const ogImage = seo?.ogImage?.asset ? seo.ogImage : siteDefaults?.ogImage;
  const ogImageUrl = ogImage
    ? urlFor(ogImage as never)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : null;

  return {
    title,
    // A key present with `undefined` still overrides the parent, so omit it
    // entirely rather than passing undefined.
    ...(description ? { description } : {}),
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    alternates: { canonical: seo?.canonicalUrl || path },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      ...(settings?.siteName ? { siteName: settings.siteName } : {}),
      title,
      ...(description ? { description } : {}),
      ...(ogImageUrl
        ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }
        : {}),
    },
    twitter: { card: ogImageUrl ? "summary_large_image" : "summary" },
  };
}
