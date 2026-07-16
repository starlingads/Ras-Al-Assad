import { LeaveIcon } from "@sanity/icons/Leave";
import { defineArrayMember, defineField, defineType } from "sanity";

/** The Sustainability page — one tab per section. */

const iconTitleDescription = (name: string, descriptionTitle = "Description") =>
  defineArrayMember({
    type: "object",
    name,
    fields: [
      defineField({ name: "icon", type: "iconPicker", title: "Icon" }),
      defineField({
        name: "title", type: "string", title: "Title",
        validation: (r) => r.required().error("Every card needs a title"),
      }),
      defineField({ name: "description", type: "text", rows: 2, title: descriptionTitle }),
    ],
    preview: { select: { title: "title", subtitle: "description" } },
  });

export const sustainabilityPage = defineType({
  name: "sustainabilityPage",
  title: "Sustainability Page",
  type: "document",
  icon: LeaveIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "commitment", title: "Commitment" },
    { name: "impact", title: "Impact" },
    { name: "wind", title: "Wind Energy" },
    { name: "hydrogen", title: "Green Hydrogen" },
    { name: "uae", title: "UAE Strategy 2050" },
    { name: "partner", title: "Partner" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),

    defineField({
      name: "commitment",
      type: "object",
      title: "Our Commitment",
      group: "commitment",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Our Promise”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "text", type: "text", rows: 3, title: "Paragraph" }),
        defineField({
          name: "points",
          type: "array",
          title: "Commitment cards",
          of: [iconTitleDescription("commitmentPoint")],
          validation: (r) => r.max(4).error("The design fits up to 4 cards"),
        }),
      ],
    }),

    defineField({
      name: "impact",
      type: "object",
      title: "Impact numbers",
      group: "impact",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Measurable Results”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({ name: "text", type: "text", rows: 3, title: "Paragraph" }),
        defineField({
          name: "stats",
          type: "array",
          title: "Statistics",
          of: [defineArrayMember({ type: "stat" })],
          validation: (r) => r.max(4).error("The design fits up to 4 statistics"),
        }),
      ],
    }),

    defineField({
      name: "windEnergy",
      type: "object",
      title: "Wind Energy",
      group: "wind",
      fields: [
        defineField({ name: "imageTag", type: "string", title: "Photo tag", description: "The small label on the photo, e.g. “Emerging Energy”." }),
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Diversified Renewables”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({
          name: "body",
          type: "array",
          title: "Text",
          of: [defineArrayMember({ type: "block" })],
        }),
        defineField({
          name: "bullets",
          type: "array",
          title: "Bullet points",
          of: [{ type: "string" }],
          validation: (r) => r.max(4).error("The design fits 4 bullet points"),
        }),
        defineField({ name: "image", type: "figure", title: "Photo" }),
      ],
    }),

    defineField({
      name: "greenHydrogen",
      type: "object",
      title: "Green Hydrogen",
      group: "hydrogen",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Future Technology”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({
          name: "body",
          type: "array",
          title: "Text",
          of: [defineArrayMember({ type: "block" })],
        }),
        defineField({
          name: "cards",
          type: "array",
          title: "Mini cards",
          of: [iconTitleDescription("hydrogenCard", "Small line")],
          validation: (r) => r.max(3).error("The design fits 3 cards"),
        }),
      ],
    }),

    defineField({
      name: "uaeStrategy",
      type: "object",
      title: "UAE Energy Strategy 2050",
      group: "uae",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “National Alignment”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({
          name: "body",
          type: "array",
          title: "Paragraph",
          description: "Use bold for the highlighted target figures.",
          of: [defineArrayMember({ type: "block" })],
        }),
        defineField({
          name: "cards",
          type: "array",
          title: "Strategy cards",
          of: [
            defineArrayMember({
              type: "object",
              name: "strategyCard",
              fields: [
                defineField({ name: "icon", type: "iconPicker", title: "Icon" }),
                defineField({
                  name: "title", type: "string", title: "Title",
                  validation: (r) => r.required().error("Every card needs a title"),
                }),
                defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
                defineField({
                  name: "highlight",
                  type: "string",
                  title: "Big background figure",
                  description: "The faint number behind the card, e.g. “44%”.",
                }),
              ],
              preview: { select: { title: "title", subtitle: "highlight" } },
            }),
          ],
          validation: (r) => r.max(3).error("The design fits 3 cards"),
        }),
      ],
    }),

    defineField({
      name: "partnerSection",
      type: "object",
      title: "Partner section",
      group: "partner",
      fields: [
        defineField({ name: "logoLabel", type: "string", title: "Label under the logo", description: "e.g. “Official Partner”" }),
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “Recognised Partnership”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
        defineField({
          name: "body",
          type: "array",
          title: "Text",
          description: "Use bold for the gold-highlighted partner name.",
          of: [defineArrayMember({ type: "block" })],
        }),
        defineField({
          name: "bullets",
          type: "array",
          title: "Bullet points",
          of: [{ type: "string" }],
          validation: (r) => r.max(4).error("The design fits 4 bullet points"),
        }),
        defineField({
          name: "partner",
          type: "reference",
          title: "Partner",
          description: "Provides the logo.",
          to: [{ type: "partner" }],
        }),
      ],
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Sustainability Page" }) },
});
