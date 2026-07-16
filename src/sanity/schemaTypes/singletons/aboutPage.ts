import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/** The About page. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "missionVision", title: "Mission & Vision" },
    { name: "story", title: "Our Story" },
    { name: "principles", title: "Principles" },
    { name: "partners", title: "Partner & Badges" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),

    defineField({
      name: "missionVisionSection",
      type: "object",
      title: "Section heading",
      group: "missionVision",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label", description: "e.g. “What Drives Us”" }),
        defineField({ name: "heading", type: "string", title: "Heading" }),
      ],
    }),
    defineField({
      name: "mission",
      type: "text",
      rows: 4,
      title: "Mission",
      group: "missionVision",
      description: "Shown in the “Our Mission” card.",
    }),
    defineField({
      name: "vision",
      type: "text",
      rows: 4,
      title: "Vision",
      group: "missionVision",
      description: "Shown in the “Our Vision” card.",
    }),

    defineField({
      name: "storyChip",
      type: "string",
      title: "Story — small label",
      group: "story",
      description: "e.g. “Our Journey”",
    }),
    defineField({
      name: "storyHeading",
      type: "string",
      title: "Story — heading",
      group: "story",
    }),
    defineField({
      name: "storyBody",
      type: "array",
      title: "Story — text",
      group: "story",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "storyBadges",
      type: "array",
      title: "Story — credential badges",
      group: "story",
      description: "The small badges under the story, e.g. “DEWA Certified”.",
      of: [
        defineArrayMember({
          type: "object",
          name: "storyBadge",
          fields: [
            defineField({ name: "icon", type: "iconPicker", title: "Icon" }),
            defineField({
              name: "title", type: "string", title: "Title",
              validation: (r) => r.required().error("Every badge needs a title"),
            }),
            defineField({ name: "description", type: "string", title: "Small line" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (r) => r.max(4).error("The design fits up to 4 badges"),
    }),

    defineField({
      name: "principlesChip",
      type: "string",
      title: "Principles — small label",
      group: "principles",
      description: "e.g. “Corporate Pillars”",
    }),
    defineField({
      name: "principlesHeading",
      type: "string",
      title: "Principles — heading",
      group: "principles",
    }),
    defineField({
      name: "principles",
      type: "array",
      title: "Principle cards",
      group: "principles",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          fields: [
            defineField({ name: "icon", type: "iconPicker", title: "Icon" }),
            defineField({
              name: "title", type: "string", title: "Title",
              validation: (r) => r.required().error("Every card needs a title"),
            }),
            defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        }),
      ],
      validation: (r) => r.max(3).error("The design fits 3 cards"),
    }),

    defineField({
      name: "partnerChip",
      type: "string",
      title: "Partner section — small label",
      group: "partners",
      description: "e.g. “Supporting Partner”",
    }),
    defineField({
      name: "partnerHeading",
      type: "string",
      title: "Partner section — heading",
      group: "partners",
    }),
    defineField({
      name: "partnerText",
      type: "text",
      rows: 3,
      title: "Partner section — text",
      group: "partners",
    }),
    defineField({
      name: "partner",
      type: "reference",
      title: "Partner",
      group: "partners",
      description: "Provides the logo shown in the partner section.",
      to: [{ type: "partner" }],
    }),
    defineField({
      name: "accreditationStrip",
      type: "array",
      title: "Bottom accreditation strip",
      group: "partners",
      description: "The grey text badges at the very bottom of the page.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stripItem",
          fields: [
            defineField({
              name: "title", type: "string", title: "Name",
              validation: (r) => r.required().error("Every entry needs a name"),
            }),
            defineField({ name: "subtitle", type: "string", title: "Small line" }),
          ],
          preview: { select: { title: "title", subtitle: "subtitle" } },
        }),
      ],
      validation: (r) => r.max(4).error("The design fits 4 entries"),
    }),

    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
