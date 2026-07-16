import type { Metadata } from "next";

import Hero from "@/components/Hero";
import ExpertiseSlider from "@/components/ExpertiseSlider";
import StatsSection from "@/components/StatsSection";
import InteractiveMap from "@/components/InteractiveMap";
import HighlighterServices from "@/components/HighlighterServices";
import ProjectsSlider from "@/components/ProjectsSlider";
import LatestNews from "@/components/LatestNews";
import ClientLogos from "@/components/ClientLogos";
import SustainabilityPreview from "@/components/SustainabilityPreview";
import AnertPartner from "@/components/AnertPartner";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { pageMetadata } from "@/sanity/lib/seo";
import { resolveCta } from "@/lib/links";

/** figure → CDN url, or null when the client hasn't set a photo. */
type Figure = { image?: { asset?: unknown } | null; alt?: string | null } | null | undefined;
const figureUrl = (figure: Figure, width: number) =>
  figure?.image?.asset ? urlFor(figure.image as never).width(width).url() : null;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY, stega: false });
  return pageMetadata(data.page?.seo ?? null, {
    fallbackTitle: "Ras Al Assad Electromechanical Works L.L.C",
    path: "/",
  });
}

export default async function Home() {
  const { data } = await sanityFetch({ query: HOME_PAGE_QUERY });
  const page = data.page;

  // Client logos honour the "all visible" vs "featured only" switch.
  const logos = (data.clientLogos ?? [])
    .filter((l) => (page?.logosMode === "featured" ? l.featured : true))
    .filter((l) => l.logo?.asset)
    .map((l) => ({
      src: urlFor(l.logo as never).width(300).url(),
      alt: l.name ?? "Client logo",
    }));

  return (
    <div className="flex flex-col w-full">
      {/* Organization / LocalBusiness structured data for search engines */}
      <OrganizationJsonLd />

      {/* Hero Section with Parallax Background */}
      <Hero
        rotatingWords={(page?.rotatingWords ?? []).filter(Boolean)}
        rotatingSuffix={page?.rotatingSuffix}
        headlineLine1={page?.headlineLine1}
        headlineLine2={page?.headlineLine2}
        subheadline={page?.subheadline}
        scrollHint={page?.scrollHint}
        primaryCta={resolveCta(page?.primaryCta ?? null)}
        secondaryCta={resolveCta(page?.secondaryCta ?? null)}
        mainImage={
          page?.heroMedia?.mainImage
            ? {
                url: figureUrl(page.heroMedia.mainImage, 1200) ?? "",
                alt: page.heroMedia.mainImage.alt ?? "",
              }
            : null
        }
        floatingImages={(page?.heroMedia?.floatingImages ?? [])
          .map((f) => ({ url: figureUrl(f, 600) ?? "", alt: f.alt ?? "" }))
          .filter((f) => f.url)}
        introChip={page?.introChip}
        introHeading={page?.introHeading}
        introHeadingAccent={page?.introHeadingAccent}
        introText={page?.introText}
      />

      {/* Expertise Slider Carousel */}
      {page?.showExpertise !== false && (
        <ExpertiseSlider
          chip={page?.expertiseChip}
          heading={page?.expertiseHeading}
          cta={resolveCta(page?.expertiseCta ?? null)}
          cards={(page?.expertise ?? [])
            .filter((s) => s.title)
            .map((s) => ({
              title: s.title!,
              description: s.summary,
              icon: s.icon,
              imageUrl: figureUrl(s.heroImage, 800),
              imageAlt: s.heroImage?.alt,
              href: `/services#${s.slug ?? ""}`,
            }))}
        />
      )}

      {/* Trusted Client Logo Carousel */}
      {page?.showClientLogos !== false && (
        <ClientLogos heading={page?.logosHeading} logos={logos} />
      )}

      {/* Stats and Figure Analytics Card */}
      {page?.showStats !== false && (
        <StatsSection
          chip={page?.statsChip}
          heading={page?.statsHeading}
          headingBold={page?.statsHeadingBold}
          text={page?.statsText}
          pipelineHeading={page?.pipelineHeading}
          pipelineSteps={(page?.pipelineSteps ?? [])
            .filter((s) => s.title)
            .map((s) => ({ title: s.title!, description: s.description }))}
          credentials={(page?.credentials ?? []).map((c) => ({
            icon: c.icon,
            value: c.value,
            label: c.label,
            description: c.description,
          }))}
          quote={page?.statsQuote ?? null}
        />
      )}

      {/* Geolocational Project Reach Vector Map */}
      {page?.showMap !== false && (
        <InteractiveMap
          chip={page?.mapChip}
          headingTop={page?.mapHeading}
          headingBottom={page?.mapHeadingBottom}
          text={page?.mapSubheading}
          cta={resolveCta(page?.mapCta ?? null)}
          pins={(page?.pins ?? [])
            .filter((p) => p.project?.name)
            .map((p) => ({
              name: p.project!.name!,
              categorySlug: p.project!.categorySlug,
              categoryTitle: p.project!.categoryTitle,
              categoryIcon: p.project!.categoryIcon,
              location: p.project!.location,
              capacity: p.project!.capacity,
              x: `${p.x ?? 50}%`,
              y: `${p.y ?? 50}%`,
            }))}
        />
      )}

      {/* Highlighter Accordion Services Section */}
      {page?.showOffers !== false && (
        <HighlighterServices
          chip={page?.offersChip}
          heading={page?.offersHeading}
          offers={(page?.offers ?? [])
            .filter((o) => o.title)
            .map((o) => ({
              title: o.title!,
              description: o.description,
              imageUrl: figureUrl(o.image, 800),
              imageAlt: o.image?.alt,
            }))}
        />
      )}

      {/* Featured Operational Projects Slider */}
      {page?.showFeaturedProjects !== false && (
        <ProjectsSlider
          chip={page?.featuredProjectsChip}
          heading={page?.featuredProjectsHeading}
          cta={resolveCta(page?.featuredProjectsCta ?? null)}
          projects={(page?.featuredProjects ?? [])
            .filter((p) => p.name)
            .map((p) => ({
              name: p.name!,
              scope: p.capacity,
              location: p.location,
              imageUrl: figureUrl(p.thumbnail, 800),
              imageAlt: p.thumbnail?.alt,
              categoryTitle: p.categoryTitle,
              categoryIcon: p.categoryIcon,
            }))}
        />
      )}

      {/* Sustainability Preview Section */}
      {page?.showSustainability !== false && (
        <SustainabilityPreview
          chip={page?.sustainabilityChip}
          heading={page?.sustainabilityHeading}
          headingAccent={page?.sustainabilityHeadingAccent}
          headingEnd={page?.sustainabilityHeadingEnd}
          text={page?.sustainabilityText}
          features={(page?.sustainabilityFeatures ?? [])
            .filter((f) => f.title)
            .map((f) => ({ icon: f.icon, title: f.title!, description: f.description }))}
          cta={resolveCta(page?.sustainabilityCta ?? null)}
        />
      )}

      {/* ANERT Supporting Partner */}
      {page?.showPartner !== false && page?.partner && (
        <AnertPartner
          variant="light"
          chip="Supporting Partner"
          heading={page.partnerHeading}
          text={page.partnerText}
          logoSrc={figureUrl(page.partner.logo, 320)}
          logoAlt={page.partner.logo?.alt ?? page.partner.name}
        />
      )}

      {/* Latest Publications and News Grid */}
      {page?.showInstitutions !== false && (
        <LatestNews
          institutionsChip={page?.institutionsChip}
          institutionsHeading={page?.institutionsHeading}
          institutionsHeadingBold={page?.institutionsHeadingBold}
          institutions={(data.institutions ?? [])
            .filter((i) => i.name)
            .map((i) => ({ name: i.name!, role: i.role, description: i.description }))}
          banner={
            page?.sloganBanner
              ? { ...page.sloganBanner, cta: resolveCta(page.sloganBanner.cta ?? null) }
              : null
          }
          mission={page?.missionBlock ?? null}
        />
      )}
    </div>
  );
}
