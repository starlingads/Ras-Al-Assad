import type { MetadataRoute } from "next";

import { client } from "@/sanity/lib/client";

const FALLBACK_SITE_URL = "https://ras-al-assad.vercel.app";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = await client.fetch<string | null>(
    `*[_type == "siteSettings"][0].siteUrl`,
  );
  const base = (siteUrl || FALLBACK_SITE_URL).replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Studio and the login screen are admin surfaces, not content.
      disallow: ["/studio", "/login"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
