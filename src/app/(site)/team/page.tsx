import type { Metadata } from "next";

import TeamClient, { type TeamPageData } from "./TeamClient";
import { sanityFetch } from "@/sanity/lib/live";
import { TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: TEAM_PAGE_QUERY,
    stega: false,
  });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Our Team",
    path: "/team",
  });
}

export default async function TeamPage() {
  const { data } = await sanityFetch({ query: TEAM_PAGE_QUERY });
  const hero = data.page?.hero;

  const viewData: TeamPageData = {
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
    quote: data.page?.mdQuote ?? null,
    members: (data.members ?? []).map((m) => ({
      name: m.name ?? "",
      role: m.designation,
      imageUrl: m.photo?.image?.asset ? urlFor(m.photo.image).width(800).url() : null,
      bio: m.bio,
      stats: m.stats,
      accreditation: m.accreditation,
    })),
  };

  return <TeamClient data={viewData} />;
}
