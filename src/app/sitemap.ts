import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";

/** Page singleton `_type` → the route it renders at. */
const ROUTE_BY_TYPE: Record<string, string> = {
  homePage: "/",
  aboutPage: "/about",
  servicesPage: "/services",
  projectsPage: "/projects",
  sustainabilityPage: "/sustainability",
  appreciationPage: "/appreciation",
  teamPage: "/team",
  contactPage: "/contact",
  solarCalculatorPage: "/solar-calculator",
};

/**
 * Only used if Site Settings has no siteUrl at all. It is the live domain, not
 * a hosting-provider URL — a provider-specific fallback silently publishes the
 * wrong canonical domain if the CMS field is ever cleared.
 */
const FALLBACK_SITE_URL = "https://rasalassad.ae";

/**
 * Regenerate hourly.
 *
 * Without this the sitemap is generated once at build time and then frozen:
 * every later CMS change — a page renamed, a page marked "Hide from search
 * engines", the site URL corrected — would never reach search engines until
 * the next deploy. That is invisible until someone checks the live file, which
 * is exactly how the wrong domain survived the migration here.
 */
export const revalidate = 3600;

/**
 * Pages marked "Hide from search engines" in their SEO tab are excluded by
 * the query. Projects and services render as sections/modals rather than
 * their own routes today, so they are not listed; when detail pages land
 * they get their own entries here.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch(SITEMAP_QUERY);
  const base = (data?.siteUrl || FALLBACK_SITE_URL).replace(/\/$/, "");

  return (data?.pages ?? [])
    .filter((page) => ROUTE_BY_TYPE[page._type])
    .map((page) => ({
      url: `${base}${ROUTE_BY_TYPE[page._type]}`,
      lastModified: page._updatedAt ? new Date(page._updatedAt) : undefined,
      changeFrequency: "monthly" as const,
      priority: page._type === "homePage" ? 1 : 0.8,
    }));
}
