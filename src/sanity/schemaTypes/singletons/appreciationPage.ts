import { StarFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * The Appreciation page intro/copy. Certificates and accreditations render
 * from their collections; the ANERT card pulls its logo from the Partners
 * collection.
 */
export const appreciationPage = defineType({
  name: "appreciationPage",
  title: "Appreciation Page",
  type: "document",
  icon: StarFilledIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "cta", title: "Closing CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "overview",
      type: "object",
      title: "Overview section",
      group: "sections",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Our Commitment”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "text", type: "text", rows: 4, title: "Paragraph" }),
      ],
    }),
    defineField({
      name: "certificatesSection",
      type: "object",
      title: "Certificates section heading",
      group: "sections",
      description: "The certificates themselves live under Certificates & Awards.",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Credentials”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
      ],
    }),
    defineField({
      name: "accreditationsSection",
      type: "object",
      title: "Accreditations section heading",
      group: "sections",
      description: "The badges themselves live under Accreditations.",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Trusted Partnerships”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
      ],
    }),
    defineField({
      name: "anertCard",
      type: "object",
      title: "Partner recognition card",
      group: "sections",
      description: "The highlighted card under the accreditation badges. The logo comes from the linked partner.",
      fields: [
        defineField({ name: "heading", type: "string", title: "Heading", description: "e.g. “ANERT Recognised”" }),
        defineField({ name: "text", type: "text", rows: 3, title: "Text" }),
        defineField({
          name: "partner",
          type: "reference",
          title: "Partner",
          to: [{ type: "partner" }],
        }),
      ],
    }),
    defineField({
      name: "moreToCome",
      type: "object",
      title: "“More to come” section",
      group: "sections",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Growing Portfolio”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "text", type: "text", rows: 2, title: "Text" }),
      ],
    }),
    defineField({
      name: "pageCta",
      type: "object",
      title: "Closing call-to-action",
      group: "cta",
      fields: [
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "text", type: "text", rows: 2, title: "Paragraph" }),
        defineField({ name: "primaryCta", type: "cta", title: "Main button" }),
        defineField({ name: "secondaryCta", type: "cta", title: "Second button" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Appreciation Page" }) },
});
