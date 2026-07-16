import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";

import AboutClient, { type AboutPageData } from "../en/about/AboutClient";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY, stega: false });
  return pageMetadata(data?.seo ?? null, {
    fallbackTitle: "About",
    path: "/about",
  });
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  const hero = data?.hero;

  const viewData: AboutPageData = {
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
    missionVisionSection: data?.missionVisionSection ?? null,
    mission: data?.mission,
    vision: data?.vision,
    storyChip: data?.storyChip,
    storyHeading: data?.storyHeading,
    storyBody: (data?.storyBody as PortableTextBlock[] | null) ?? null,
    storyBadges: (data?.storyBadges ?? []).filter((b) => b.title) as AboutPageData["storyBadges"],
    principlesChip: data?.principlesChip,
    principlesHeading: data?.principlesHeading,
    principles: (data?.principles ?? []).filter((p) => p.title) as AboutPageData["principles"],
    partnerChip: data?.partnerChip,
    partnerHeading: data?.partnerHeading,
    partnerText: data?.partnerText,
    partnerLogoUrl: data?.partner?.logo?.image?.asset
      ? urlFor(data.partner.logo.image).width(360).url()
      : null,
    partnerLogoAlt: data?.partner?.logo?.alt ?? data?.partner?.name,
    accreditationStrip: (data?.accreditationStrip ?? []).filter((i) => i.title) as AboutPageData["accreditationStrip"],
  };

  return <AboutClient data={viewData} />;
}
