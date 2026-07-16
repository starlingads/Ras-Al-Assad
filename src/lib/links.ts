/**
 * Resolve the CMS `link` and `cta` objects to plain hrefs/labels.
 *
 * These run on both server and client components, so they stay
 * dependency-free. Shapes mirror the LINK/CTA fragments in
 * src/sanity/lib/queries.ts (loosely typed here because several queries
 * project the same objects; TypeGen types remain the source of truth at
 * the call sites).
 */

export type ResolvableLink = {
  linkType?: string | null;
  page?: string | null;
  anchor?: string | null;
  url?: string | null;
  email?: string | null;
  phone?: string | null;
  service?: { slug?: string | null } | null;
  project?: { slug?: string | null } | null;
} | null;

export type ResolvableCta = {
  mode?: string | null;
  label?: string | null;
  link?: ResolvableLink;
  savedButton?: { label?: string | null; link?: ResolvableLink } | null;
} | null;

/** link object → href ("#" when unresolvable so markup stays valid). */
export function resolveLink(link: ResolvableLink): string {
  if (!link) return "#";
  const anchor = link.anchor ? `#${link.anchor.replace(/^#/, "")}` : "";
  switch (link.linkType) {
    case "page":
      return `${link.page || "/"}${anchor}`;
    case "service":
      // Services render as sections on /services today; slug === anchor.
      return link.service?.slug ? `/services#${link.service.slug}` : "/services";
    case "project":
      return "/projects";
    case "external":
      return link.url || "#";
    case "email":
      return link.email ? `mailto:${link.email}` : "#";
    case "phone":
      return link.phone ? `tel:${link.phone.replace(/[^+\d]/g, "")}` : "#";
    default:
      return "#";
  }
}

/** cta object → {label, href}, or null when the button is unconfigured. */
export function resolveCta(cta: ResolvableCta): { label: string; href: string } | null {
  if (!cta) return null;
  if (cta.mode === "saved" && cta.savedButton?.label) {
    return {
      label: cta.savedButton.label,
      href: resolveLink(cta.savedButton.link ?? null),
    };
  }
  if (cta.label) {
    return { label: cta.label, href: resolveLink(cta.link ?? null) };
  }
  return null;
}
