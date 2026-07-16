import type { Metadata } from "next";

import ContactClient, { type ContactPageData } from "../en/contact/ContactClient";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";
import { pageMetadata } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY, stega: false });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Contact",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: CONTACT_PAGE_QUERY });
  const page = data.page;
  const settings = data.settings;

  const viewData: ContactPageData = {
    hero: {
      chip: page?.hero?.chip,
      title: page?.hero?.title,
      titleAccent: page?.hero?.titleAccent,
      titleEnd: page?.hero?.titleEnd,
      subtitle: page?.hero?.subtitle,
    },
    address: settings?.address ?? null,
    phones: (settings?.phones ?? []).filter((p) => p.number) as ContactPageData["phones"],
    emails: (settings?.emails ?? []).filter((m) => m.email) as ContactPageData["emails"],
    hours: settings?.officeHours ?? [],
    departments: (page?.departments ?? []).filter((d) => d.name) as ContactPageData["departments"],
    legalLines: page?.legalLines ?? [],
    form: {
      heading: page?.formHeading,
      serviceOptions: page?.formServiceOptions ?? [],
      successHeading: page?.formSuccessHeading,
      successText: page?.formSuccessText,
      successNote: page?.formSuccessNote,
    },
    mapEmbedUrl: page?.mapEmbed?.embedUrl,
  };

  return <ContactClient data={viewData} />;
}
