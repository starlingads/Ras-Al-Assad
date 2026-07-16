import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";

import ServicesClient, { type ServicesPageData } from "../en/services/ServicesClient";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";
import { resolveCta } from "@/lib/links";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SERVICES_PAGE_QUERY, stega: false });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Services",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const { data } = await sanityFetch({ query: SERVICES_PAGE_QUERY });
  const page = data.page;
  const hero = page?.hero;

  const viewData: ServicesPageData = {
    hero: {
      chip: hero?.chip,
      title: hero?.title,
      titleAccent: hero?.titleAccent,
      titleEnd: hero?.titleEnd,
      subtitle: hero?.subtitle,
      backgroundUrl: hero?.backgroundImage?.image?.asset
        ? urlFor(hero.backgroundImage.image).width(1920).url()
        : null,
      backgroundAlt: hero?.backgroundImage?.alt,
    },
    services: (data.services ?? []).map((s) => ({
      slug: s.slug ?? "",
      icon: s.icon,
      title: s.title,
      subtitle: s.subtitle,
      tagline: s.tagline,
      description: (s.description as PortableTextBlock[] | null) ?? null,
      highlights: s.highlights ?? [],
      imageUrl: s.heroImage?.image?.asset ? urlFor(s.heroImage.image).width(1200).url() : null,
      imageAlt: s.heroImage?.alt,
      cta: resolveCta(s.cta ?? null),
    })),
    zeroCapital: page?.zeroCapital
      ? {
          chip: page.zeroCapital.chip,
          heading: page.zeroCapital.heading,
          text: page.zeroCapital.text,
          benefits: (page.zeroCapital.benefits ?? []).filter(
            (b) => b.title,
          ) as NonNullable<ServicesPageData["zeroCapital"]>["benefits"],
          cta: resolveCta(page.zeroCapital.cta ?? null),
        }
      : null,
  };

  return <ServicesClient data={viewData} />;
}
