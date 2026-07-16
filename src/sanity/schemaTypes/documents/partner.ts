import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { UsersIcon } from "@sanity/icons/Users";
import { defineField, defineType } from "sanity";

/**
 * A partner organisation. `type` controls where it appears:
 *  - Supporting Partner       → ANERT spotlight sections
 *  - Authority & Regulatory   → the institutions grid
 *  - Industry Partner         → future partner listings
 */
export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: UsersIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Partner Name",
      validation: (r) => r.required().error("Every partner needs a name"),
    }),
    defineField({
      name: "logo",
      type: "figure",
      title: "Logo",
      description: "PNG or SVG with a transparent background looks best.",
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Partner Type",
      description: "Controls which sections of the website show this partner.",
      options: {
        layout: "radio",
        list: [
          { title: "Supporting Partner", value: "supporting" },
          { title: "Authority & Regulatory", value: "authority" },
          { title: "Industry Partner", value: "industry" },
        ],
      },
      initialValue: "industry",
      validation: (r) => r.required().error("Pick the partner type"),
    }),
    defineField({
      name: "role",
      type: "string",
      title: "Role line",
      description:
        "Short line shown under the name in grids, e.g. “Certified Solar PV Contractor”.",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "About this partner (optional)",
    }),
    defineField({
      name: "website",
      type: "url",
      title: "Website (optional)",
    }),
    orderRankField({ type: "partner" }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "logo.image", type: "type" },
    prepare: ({ title, subtitle, media, type }) => ({
      title,
      media,
      subtitle:
        subtitle ||
        { supporting: "Supporting Partner", authority: "Authority & Regulatory", industry: "Industry Partner" }[
          type as string
        ],
    }),
  },
});
