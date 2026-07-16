import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";

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
 * Site-wide defaults (title template, default description/OG image) come from
 * the (site) layout's generateMetadata, so pages only add their overrides.
 *
 * `path` builds the self-referencing canonical (resolved against
 * metadataBase); an explicit seo.canonicalUrl wins.
 */
export function pageMetadata(
  seo: PageSeo,
  { fallbackTitle, path }: { fallbackTitle: string; path: string },
): Metadata {
  const title = seo?.title || fallbackTitle;
  return {
    title,
    // Only emit these when the page actually sets them. Next.js merges
    // metadata per segment, and a key present with an `undefined` value still
    // overrides the parent — which would blank out the site-wide description
    // from Site Settings → SEO Defaults. Omitting the key lets it inherit.
    ...(seo?.description ? { description: seo.description } : {}),
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    alternates: { canonical: seo?.canonicalUrl || path },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    // Only emit `openGraph` when this page has OG-specific content of its own.
    // A child's openGraph *replaces* the parent's wholesale — setting it
    // unconditionally would silently drop the site-wide og:site_name, og:type
    // and default share image from Site Settings. When omitted, Next fills
    // og:title/og:description from the resolved title/description anyway.
    ...(seo?.description || seo?.ogImage?.asset
      ? {
          openGraph: {
            title,
            ...(seo.description ? { description: seo.description } : {}),
            ...(seo.ogImage?.asset
              ? {
                  images: [
                    {
                      url: urlFor(seo.ogImage as never).width(1200).height(630).fit("crop").url(),
                      width: 1200,
                      height: 630,
                    },
                  ],
                }
              : {}),
          },
        }
      : {}),
  };
}
