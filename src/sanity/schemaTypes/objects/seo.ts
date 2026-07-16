import { defineField, defineType } from "sanity";

/**
 * Shared SEO settings, attached to every page singleton, service and project.
 * Rendered collapsed so editors are never overwhelmed; every routed surface
 * merges these over the site-wide defaults (Site Settings → SEO Defaults).
 */
export const seo = defineType({
  name: "seo",
  title: "Search Engine Settings (SEO)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Search Result Title",
      description:
        "Shown as the blue link on Google. Leave empty to use the page/item name. Best under 60 characters.",
      validation: (r) =>
        r.max(70).warning("Google cuts titles off after ~60 characters"),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "Search Result Description",
      description:
        "The grey text under the title on Google. Best 120–160 characters.",
      validation: (r) =>
        r.max(170).warning("Google cuts descriptions off after ~160 characters"),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Social Share Image",
      description:
        "Shown when this page is shared on WhatsApp / LinkedIn / X. Ideal size 1200×630. Leave empty to use the site default.",
      options: { hotspot: true },
    }),
    defineField({
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Focus Keywords",
      description: "Optional. A few phrases this page should rank for.",
      options: { layout: "tags" },
    }),
    defineField({
      name: "canonicalUrl",
      type: "url",
      title: "Canonical URL (advanced)",
      description:
        "Only fill this if this page duplicates content that lives at another address. Usually leave empty.",
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      title: "Hide from search engines",
      initialValue: false,
      description: "Turn on to ask Google not to list this page.",
    }),
  ],
});
