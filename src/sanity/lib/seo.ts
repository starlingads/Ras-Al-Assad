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
    description: seo?.description ?? undefined,
    keywords: seo?.keywords ?? undefined,
    alternates: { canonical: seo?.canonicalUrl || path },
    ...(seo?.noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      ...(seo?.description ? { description: seo.description } : {}),
      ...(seo?.ogImage?.asset
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
  };
}
