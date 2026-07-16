import type { Metadata } from "next";

import ProjectsClient, { type ProjectsPageData } from "./ProjectsClient";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECTS_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: PROJECTS_PAGE_QUERY, stega: false });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Projects",
    path: "/projects",
  });
}

export default async function ProjectsPage() {
  const { data } = await sanityFetch({ query: PROJECTS_PAGE_QUERY });
  const hero = data.page?.hero;

  const categories = (data.categories ?? [])
    .filter((c) => c.slug)
    .map((c) => ({ slug: c.slug!, name: c.title ?? "", icon: c.icon }));
  const categoryIconBySlug = new Map(categories.map((c) => [c.slug, c.icon]));

  const viewData: ProjectsPageData = {
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
    emptyStateText: data.page?.emptyStateText,
    categories,
    filterGroups: (data.filterGroups ?? [])
      .filter((g) => g.slug)
      .map((g) => ({
        slug: g.slug!,
        allLabel: g.allLabel || "All",
        appliesTo: (g.appliesTo ?? []).filter((s): s is string => Boolean(s)),
        filters: (g.filters ?? [])
          .filter((f) => f.slug)
          .map((f) => ({ slug: f.slug!, name: f.title ?? "" })),
      })),
    projects: (data.projects ?? [])
      .filter((p) => p.slug && p.name)
      .map((p) => ({
        slug: p.slug!,
        name: p.name!,
        categorySlug: p.categorySlug,
        categoryTitle: p.categoryTitle,
        categoryIcon: p.categorySlug ? categoryIconBySlug.get(p.categorySlug) : null,
        filterSlugs: (p.filterSlugs ?? []).filter((s): s is string => Boolean(s)),
        imageUrl: p.thumbnail?.image?.asset ? urlFor(p.thumbnail.image).width(800).url() : null,
        coverUrl: p.coverImage?.image?.asset ? urlFor(p.coverImage.image).width(1200).url() : null,
        imageAlt: p.thumbnail?.alt,
        location: p.location,
        client: p.clientName,
        capacity: p.capacity,
        year: p.year,
        status: p.statusLabel,
        highlights: p.highlights ?? [],
      })),
  };

  return <ProjectsClient data={viewData} />;
}
