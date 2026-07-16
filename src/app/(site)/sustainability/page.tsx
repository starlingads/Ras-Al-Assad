import type { Metadata } from "next";
import type { PortableTextBlock } from "next-sanity";

import SustainabilityClient, {
  type SustainabilityPageData,
} from "./SustainabilityClient";
import { sanityFetch } from "@/sanity/lib/live";
import { SUSTAINABILITY_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SUSTAINABILITY_PAGE_QUERY, stega: false });
  return pageMetadata(data?.seo ?? null, {
    fallbackTitle: "Sustainability",
    path: "/sustainability",
  });
}

export default async function SustainabilityPage() {
  const { data } = await sanityFetch({ query: SUSTAINABILITY_PAGE_QUERY });
  const hero = data?.hero;

  const viewData: SustainabilityPageData = {
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
    commitment: data?.commitment
      ? {
          chip: data.commitment.chip,
          heading: data.commitment.heading,
          text: data.commitment.text,
          points: (data.commitment.points ?? []).filter((p) => p.title) as NonNullable<
            SustainabilityPageData["commitment"]
          >["points"],
        }
      : null,
    impact: data?.impact
      ? {
          chip: data.impact.chip,
          heading: data.impact.heading,
          text: data.impact.text,
          stats: data.impact.stats ?? [],
        }
      : null,
    windEnergy: data?.windEnergy
      ? {
          imageTag: data.windEnergy.imageTag,
          chip: data.windEnergy.chip,
          heading: data.windEnergy.heading,
          body: (data.windEnergy.body as PortableTextBlock[] | null) ?? null,
          bullets: data.windEnergy.bullets ?? [],
          imageUrl: data.windEnergy.image?.image?.asset
            ? urlFor(data.windEnergy.image.image).width(1200).url()
            : null,
          imageAlt: data.windEnergy.image?.alt,
        }
      : null,
    greenHydrogen: data?.greenHydrogen
      ? {
          chip: data.greenHydrogen.chip,
          heading: data.greenHydrogen.heading,
          body: (data.greenHydrogen.body as PortableTextBlock[] | null) ?? null,
          cards: (data.greenHydrogen.cards ?? []).filter((c) => c.title) as NonNullable<
            SustainabilityPageData["greenHydrogen"]
          >["cards"],
        }
      : null,
    uaeStrategy: data?.uaeStrategy
      ? {
          chip: data.uaeStrategy.chip,
          heading: data.uaeStrategy.heading,
          body: (data.uaeStrategy.body as PortableTextBlock[] | null) ?? null,
          cards: (data.uaeStrategy.cards ?? []).filter((c) => c.title) as NonNullable<
            SustainabilityPageData["uaeStrategy"]
          >["cards"],
        }
      : null,
    partnerSection: data?.partnerSection
      ? {
          logoLabel: data.partnerSection.logoLabel,
          chip: data.partnerSection.chip,
          heading: data.partnerSection.heading,
          body: (data.partnerSection.body as PortableTextBlock[] | null) ?? null,
          bullets: data.partnerSection.bullets ?? [],
          logoUrl: data.partnerSection.partner?.logo?.image?.asset
            ? urlFor(data.partnerSection.partner.logo.image).width(480).url()
            : null,
          logoAlt: data.partnerSection.partner?.logo?.alt ?? data.partnerSection.partner?.name,
        }
      : null,
  };

  return <SustainabilityClient data={viewData} />;
}
