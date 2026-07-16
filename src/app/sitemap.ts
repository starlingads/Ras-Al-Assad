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

const FALLBACK_SITE_URL = "https://ras-al-assad.vercel.app";

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
