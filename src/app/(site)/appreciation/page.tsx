import type { Metadata } from "next";

import AppreciationClient, {
  type AppreciationPageData,
} from "../en/appreciation/AppreciationClient";
import { sanityFetch } from "@/sanity/lib/live";
import { APPRECIATION_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";
import { resolveCta } from "@/lib/links";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: APPRECIATION_PAGE_QUERY, stega: false });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Appreciation & Recognition",
    path: "/appreciation",
  });
}

export default async function AppreciationPage() {
  const { data } = await sanityFetch({ query: APPRECIATION_PAGE_QUERY });
  const page = data.page;
  const hero = page?.hero;

  const viewData: AppreciationPageData = {
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
    overview: page?.overview ?? null,
    certificatesSection: page?.certificatesSection ?? null,
    certificates: (data.certificates ?? [])
      .filter((c) => c.image?.image?.asset)
      .map((c) => ({
        url: urlFor(c.image!.image!).width(1200).url(),
        alt: c.image?.alt || c.title || "Certificate",
        title: c.title ?? "",
      })),
    accreditationsSection: page?.accreditationsSection ?? null,
    accreditations: (data.accreditations ?? []).map((a) => ({
      icon: a.icon,
      label: a.name ?? "",
      desc: a.description,
    })),
    anertCard: page?.anertCard
      ? {
          heading: page.anertCard.heading,
          text: page.anertCard.text,
          logoUrl: page.anertCard.partner?.logo?.image?.asset
            ? urlFor(page.anertCard.partner.logo.image).width(240).url()
            : null,
          logoAlt: page.anertCard.partner?.logo?.alt ?? page.anertCard.partner?.name,
        }
      : null,
    moreToCome: page?.moreToCome ?? null,
    pageCta: page?.pageCta
      ? {
          heading: page.pageCta.heading,
          text: page.pageCta.text,
          primary: resolveCta(page.pageCta.primaryCta ?? null),
          secondary: resolveCta(page.pageCta.secondaryCta ?? null),
        }
      : null,
  };

  return <AppreciationClient data={viewData} />;
}
