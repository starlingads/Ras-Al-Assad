import { defineQuery } from "next-sanity";

/**
 * All GROQ queries, one per routed page plus the shared layout query.
 * Projections only — no star-dumps. TypeGen derives result types from these
 * (npm run typegen), so components never hand-write query result shapes.
 */

// ── Shared fragments ───────────────────────────────────────────────────────

const FIGURE = /* groq */ `{
  image{asset, hotspot, crop},
  alt,
  caption
}`;

const LINK = /* groq */ `{
  linkType,
  page,
  anchor,
  url,
  email,
  phone,
  service->{title, "slug": slug.current},
  project->{name, "slug": slug.current}
}`;

const CTA = /* groq */ `{
  mode,
  label,
  link ${LINK},
  savedButton->{label, link ${LINK}}
}`;

const PAGE_HERO = /* groq */ `{
  chip,
  title,
  titleAccent,
  titleEnd,
  subtitle,
  backgroundImage ${FIGURE},
  overlay,
  cta ${CTA}
}`;

const SEO = /* groq */ `{
  title,
  description,
  ogImage{asset},
  keywords,
  canonicalUrl,
  noIndex
}`;

const STAT = /* groq */ `{
  prefix, value, suffix, label, description, icon
}`;

const NAV_ITEM = /* groq */ `{
  label,
  link ${LINK},
  enabled,
  dropdown
}`;

// ── Layout (Navbar + Footer + metadata defaults) ──────────────────────────

export const LAYOUT_QUERY = defineQuery(`{
  "settings": *[_type == "siteSettings"][0]{
    siteName,
    logo{asset},
    footerLogo{asset},
    favicon{asset},
    defaultHeroOverlay,
    mainMenu[] ${NAV_ITEM},
    headerCta ${CTA},
    footerBanner{chip, heading, headingAccent, headingEnd, cta ${CTA}},
    footerDescription,
    capabilityHeading,
    companyMenu[] ${NAV_ITEM},
    showAccreditations,
    copyrightText,
    footerTagline,
    address,
    phones[]{label, number},
    emails[]{label, email},
    officeHours[]{days, hours},
    socialLinks[]{platform, url},
    siteUrl,
    titleTemplate,
    defaultSeo ${SEO},
    ga4Id, gtmId, metaPixelId
  },
  "services": *[_type == "service" && visible == true] | order(orderRank) {
    title, "slug": slug.current, icon
  },
  "accreditations": *[_type == "accreditation"] | order(orderRank) {
    name, shortLabel, description, icon, licenseNumber
  }
}`);

// ── Homepage ───────────────────────────────────────────────────────────────

const PROJECT_CARD = /* groq */ `{
  name,
  "slug": slug.current,
  summary,
  thumbnail ${FIGURE},
  coverImage ${FIGURE},
  location,
  clientName,
  capacity,
  statusLabel,
  "year": string::split(coalesce(completionDate, ""), "-")[0],
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  "categoryIcon": category->icon
}`;

export const HOME_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "homePage"][0]{
    rotatingWords,
    rotatingSuffix,
    headlineLine1,
    headlineLine2,
    subheadline,
    scrollHint,
    primaryCta ${CTA},
    secondaryCta ${CTA},
    heroMedia{
      mediaType,
      mainImage ${FIGURE},
      floatingImages[] ${FIGURE},
      backgroundImage ${FIGURE},
      "backgroundVideoUrl": backgroundVideo.asset->url
    },
    showExpertise, showClientLogos, showStats, showMap, showOffers,
    showFeaturedProjects, showSustainability, showPartner, showInstitutions,
    introChip, introHeading, introHeadingAccent, introText,
    expertiseChip,
    expertiseHeading,
    expertiseCta ${CTA},
    "expertise": select(
      count(expertiseOverride) > 0 => expertiseOverride[]->{
        title, "slug": slug.current, icon, summary, heroImage ${FIGURE}
      },
      *[_type == "service" && visible == true && featured == true] | order(orderRank) {
        title, "slug": slug.current, icon, summary, heroImage ${FIGURE}
      }
    ),
    logosMode,
    logosHeading,
    statsChip,
    statsHeading,
    statsHeadingBold,
    statsText,
    credentials[] ${STAT},
    statsQuote{text, author},
    pipelineHeading,
    pipelineSteps[]{title, description},
    mapChip,
    mapHeading,
    mapHeadingBottom,
    mapSubheading,
    mapCta ${CTA},
    pins[]{
      x,
      y,
      project->{
        name,
        location,
        capacity,
        "categorySlug": category->slug.current,
        "categoryTitle": category->title,
        "categoryIcon": category->icon
      }
    },
    offersChip,
    offersHeading,
    offers[]{title, description, image ${FIGURE}},
    featuredProjectsChip,
    featuredProjectsHeading,
    featuredProjectsCta ${CTA},
    "featuredProjects": select(
      count(featuredProjectsOverride) > 0 => featuredProjectsOverride[]-> ${PROJECT_CARD},
      *[_type == "project" && featured == true && hidden != true] | order(orderRank) ${PROJECT_CARD}
    ),
    sustainabilityChip,
    sustainabilityHeading,
    sustainabilityHeadingAccent,
    sustainabilityHeadingEnd,
    sustainabilityText,
    sustainabilityFeatures[]{icon, title, description},
    sustainabilityCta ${CTA},
    partner->{name, role, description, logo ${FIGURE}},
    partnerHeading,
    partnerText,
    institutionsChip,
    institutionsHeading,
    institutionsHeadingBold,
    sloganBanner{chip, line1, line2, text, cta ${CTA}},
    missionBlock{label, quote, taglineStart, taglineBold, subline},
    seo ${SEO}
  },
  "clientLogos": *[_type == "clientLogo" && visible == true] | order(orderRank) {
    name, logo{asset}, website, featured
  },
  "institutions": *[_type == "partner" && type == "authority"] | order(orderRank) {
    name, role, description, logo ${FIGURE}
  }
}`);

// ── Internal pages ─────────────────────────────────────────────────────────

export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  hero ${PAGE_HERO},
  missionVisionSection{chip, heading},
  mission,
  vision,
  storyChip,
  storyHeading,
  storyBody,
  storyBadges[]{icon, title, description},
  principlesChip,
  principlesHeading,
  principles[]{icon, title, description},
  partnerChip,
  partnerHeading,
  partnerText,
  partner->{name, logo ${FIGURE}},
  accreditationStrip[]{title, subtitle},
  seo ${SEO}
}`);

export const SERVICES_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "servicesPage"][0]{
    hero ${PAGE_HERO},
    zeroCapital{
      chip,
      heading,
      text,
      benefits[]{icon, title, description},
      cta ${CTA}
    },
    seo ${SEO}
  },
  "services": *[_type == "service" && visible == true] | order(orderRank) {
    title,
    "slug": slug.current,
    icon,
    subtitle,
    tagline,
    summary,
    description,
    highlights,
    heroImage ${FIGURE},
    gallery[] ${FIGURE},
    cta ${CTA}
  }
}`);

export const PROJECTS_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "projectsPage"][0]{
    hero ${PAGE_HERO},
    emptyStateText,
    seo ${SEO}
  },
  "projects": *[_type == "project" && hidden != true] | order(orderRank) {
    name,
    "slug": slug.current,
    summary,
    thumbnail ${FIGURE},
    coverImage ${FIGURE},
    gallery[] ${FIGURE},
    highlights,
    location,
    clientName,
    capacity,
    statusLabel,
    "year": string::split(coalesce(completionDate, ""), "-")[0],
    "categorySlug": category->slug.current,
    "categoryTitle": category->title,
    "filterSlugs": filters[]->slug.current,
    featured
  },
  "categories": *[_type == "category"] | order(orderRank) {
    title, "slug": slug.current, icon
  },
  "filterGroups": *[_type == "filterGroup"] | order(orderRank) {
    title,
    "slug": slug.current,
    allLabel,
    "appliesTo": appliesTo[]->slug.current,
    "filters": *[_type == "projectFilter" && group._ref == ^._id] | order(orderRank) {
      title, "slug": slug.current
    }
  }
}`);

export const TEAM_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "teamPage"][0]{
    hero ${PAGE_HERO},
    mdQuote{text, authorName, authorRole},
    seo ${SEO}
  },
  "members": *[_type == "teamMember" && visible == true] | order(orderRank) {
    name,
    designation,
    photo ${FIGURE},
    bio,
    stats,
    accreditation,
    linkedin,
    email,
    phone
  }
}`);

export const APPRECIATION_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "appreciationPage"][0]{
    hero ${PAGE_HERO},
    overview{chip, heading, text},
    certificatesSection{chip, heading},
    accreditationsSection{chip, heading},
    anertCard{heading, text, partner->{name, logo ${FIGURE}}},
    moreToCome{chip, heading, text},
    pageCta{heading, text, primaryCta ${CTA}, secondaryCta ${CTA}},
    seo ${SEO}
  },
  "certificates": *[_type == "certificate" && visible == true] | order(orderRank) {
    title, type, image ${FIGURE}, description, issuer, date
  },
  "accreditations": *[_type == "accreditation"] | order(orderRank) {
    name, shortLabel, description, icon
  }
}`);

export const SUSTAINABILITY_PAGE_QUERY = defineQuery(`*[_type == "sustainabilityPage"][0]{
  hero ${PAGE_HERO},
  commitment{chip, heading, text, points[]{icon, title, description}},
  impact{chip, heading, text, stats[] ${STAT}},
  windEnergy{imageTag, chip, heading, body, bullets, image ${FIGURE}},
  greenHydrogen{chip, heading, body, cards[]{icon, title, description}},
  uaeStrategy{chip, heading, body, cards[]{icon, title, description, highlight}},
  partnerSection{logoLabel, chip, heading, body, bullets, partner->{name, logo ${FIGURE}}},
  seo ${SEO}
}`);

export const CONTACT_PAGE_QUERY = defineQuery(`{
  "page": *[_type == "contactPage"][0]{
    hero ${PAGE_HERO},
    departments[]{name, email, phone, note},
    legalLines,
    formHeading,
    formServiceOptions,
    formSuccessHeading,
    formSuccessText,
    formSuccessNote,
    mapEmbed{embedUrl, lat, lng},
    seo ${SEO}
  },
  "settings": *[_type == "siteSettings"][0]{
    address,
    phones[]{label, number},
    emails[]{label, email},
    officeHours[]{days, hours}
  },
  "accreditations": *[_type == "accreditation"] | order(orderRank) {
    name, shortLabel, licenseNumber
  }
}`);

export const SOLAR_CALCULATOR_PAGE_QUERY = defineQuery(`*[_type == "solarCalculatorPage"][0]{
  hero ${PAGE_HERO},
  assumptions,
  leadGateEnabled,
  disclaimer,
  seo ${SEO}
}`);

// ── SEO / platform ─────────────────────────────────────────────────────────

export const SITEMAP_QUERY = defineQuery(`{
  "pages": *[_type in ["homePage","aboutPage","servicesPage","projectsPage","sustainabilityPage","appreciationPage","teamPage","contactPage","solarCalculatorPage"] && seo.noIndex != true]{
    _type, _updatedAt
  },
  "siteUrl": *[_type == "siteSettings"][0].siteUrl
}`);

/** Organization / LocalBusiness JSON-LD source (homepage). */
export const ORGANIZATION_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  siteName,
  siteUrl,
  logo{asset},
  defaultSeo{description},
  address,
  phones[]{label, number},
  emails[]{label, email},
  officeHours[]{days, hours},
  socialLinks[]{url}
}`);
