import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A service (Solar EPC, MEP, HVAC, Substations, O&M, Wind Energy…).
 * Wind Energy is just another service document — no special casing.
 * Drag order controls the services page sections AND the navbar dropdown.
 */
export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: WrenchIcon,
  orderings: [orderRankOrdering],
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photos" },
    { name: "extras", title: "Extras" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Service Name",
      group: "content",
      validation: (r) => [
        r.required().error("Every service needs a name"),
        r.max(90).warning("Keep names short — they appear in the menu"),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web Address",
      group: "content",
      description:
        "Used for links to this service (e.g. /services#solar-epc). Click “Generate”.",
      options: { source: "title" },
      validation: (r) => r.required().error("Click “Generate” to create the web address"),
    }),
    defineField({
      name: "icon",
      type: "iconPicker",
      title: "Icon",
      group: "content",
      description: "Shown in the menu dropdown and on cards.",
    }),
    defineField({
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      group: "content",
      description: "e.g. “Turnkey Solar Engineering & Construction”",
    }),
    defineField({
      name: "tagline",
      type: "string",
      title: "Badge line (optional)",
      group: "content",
      description: "Short highlight, e.g. “DEWA Shams certified grid-tied setups”.",
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 2,
      title: "Short Description",
      group: "content",
      description: "Shown on homepage cards and previews.",
      validation: (r) =>
        r.max(200).warning("Keep it to ~2 sentences — it gets cut off on cards"),
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Full Description",
      group: "content",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Key Points",
      group: "content",
      description: "Short bullet points shown next to the description.",
      of: [{ type: "string" }],
      validation: (r) => r.max(6).warning("More than 6 points gets crowded"),
    }),
    defineField({
      name: "heroImage",
      type: "figure",
      title: "Main Photo",
      group: "media",
      description: "Recommended 1200px+ wide.",
      validation: (r) => r.required().error("Every service needs a main photo"),
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Photo Gallery (optional)",
      group: "media",
      of: [defineArrayMember({ type: "figure" })],
    }),
    defineField({
      name: "cta",
      type: "cta",
      title: "Button",
      group: "extras",
      description: "Shown at the end of the service section.",
    }),
    defineField({
      name: "showcaseProjects",
      type: "array",
      title: "Showcase Projects (optional)",
      group: "extras",
      description: "Hand-picked projects that show this service in action.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "⭐ Feature on Homepage",
      group: "extras",
      initialValue: false,
      description: "The homepage Expertise section shows featured services automatically.",
    }),
    defineField({
      name: "visible",
      type: "boolean",
      title: "Show on website",
      group: "extras",
      initialValue: true,
      description: "Switch off to hide this service (and its menu entry) without deleting it.",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
    orderRankField({ type: "service" }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage.image",
      visible: "visible",
      featured: "featured",
    },
    prepare: ({ title, subtitle, media, visible, featured }) => ({
      title,
      media,
      subtitle: [
        visible === false ? "🚫 Hidden" : null,
        featured ? "⭐ Featured" : null,
        subtitle,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
