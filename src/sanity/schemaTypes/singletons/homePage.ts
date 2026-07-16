import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The homepage. The hero here is intentionally richer than the shared
 * pageHero (rotating words, floating images, dual CTAs).
 *
 * Featured content follows the auto + override pattern: sections pull
 * ⭐-featured documents automatically; the override arrays replace the
 * automatic pick only when non-empty.
 */
export const homePage = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "stats", title: "Stats & Process" },
    { name: "map", title: "Map" },
    { name: "offers", title: "Offers" },
    { name: "sustainability", title: "Sustainability" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────
    defineField({
      name: "rotatingWords",
      type: "array",
      title: "Badge — rotating specialities",
      group: "hero",
      description:
        "The words that cycle in the small badge above the heading (each is shown with the suffix below).",
      of: [{ type: "string" }],
      validation: (r) => [
        r.min(2).error("Add at least 2 rotating words"),
        r.max(6).warning("More than 6 words makes the rotation feel slow"),
      ],
    }),
    defineField({
      name: "rotatingSuffix",
      type: "string",
      title: "Badge — word after each speciality",
      group: "hero",
      initialValue: "Specialist",
      description: "e.g. “Specialist” → “Solar EPC Specialist”.",
    }),
    defineField({
      name: "headlineLine1",
      type: "string",
      title: "Heading — first line",
      group: "hero",
      description: "e.g. “Ready to engineer”",
      validation: (r) => r.required().error("This is the big heading"),
    }),
    defineField({
      name: "headlineLine2",
      type: "string",
      title: "Heading — highlighted second line",
      group: "hero",
      description: "Shown in gold, e.g. “your energy future”.",
    }),
    defineField({
      name: "subheadline",
      type: "text",
      rows: 3,
      title: "Supporting paragraph",
      group: "hero",
    }),
    defineField({
      name: "scrollHint",
      type: "string",
      title: "Scroll hint label",
      group: "hero",
      initialValue: "Explore Solutions",
      description: "The tiny label above the scroll-down arrow.",
    }),
    defineField({
      name: "primaryCta",
      type: "cta",
      title: "Main button",
      group: "hero",
    }),
    defineField({
      name: "secondaryCta",
      type: "cta",
      title: "Second button",
      group: "hero",
    }),
    defineField({
      name: "heroMedia",
      type: "object",
      title: "Hero artwork",
      group: "hero",
      fields: [
        defineField({
          name: "mediaType",
          type: "string",
          title: "Style",
          options: {
            layout: "radio",
            list: [
              { title: "Floating images (current design)", value: "floating" },
              { title: "Background image", value: "image" },
              { title: "Background video", value: "video" },
            ],
          },
          initialValue: "floating",
        }),
        defineField({
          name: "mainImage",
          type: "figure",
          title: "Main center photo",
          description: "The large card in the middle of the hero animation.",
          hidden: ({ parent }) => parent?.mediaType !== "floating",
        }),
        defineField({
          name: "floatingImages",
          type: "array",
          title: "Floating photos",
          of: [defineArrayMember({ type: "figure" })],
          hidden: ({ parent }) => parent?.mediaType !== "floating",
          validation: (r) =>
            r.custom((value, { parent }) => {
              if ((parent as { mediaType?: string })?.mediaType !== "floating") return true;
              if (!value || (value as unknown[]).length !== 5)
                return "The hero design needs exactly 5 photos";
              return true;
            }),
        }),
        defineField({
          name: "backgroundImage",
          type: "figure",
          title: "Background photo",
          description: "Recommended 1920×1080 or larger.",
          hidden: ({ parent }) => parent?.mediaType !== "image",
        }),
        defineField({
          name: "backgroundVideo",
          type: "file",
          title: "Background video",
          description: "Keep under 8 MB; plays silently.",
          options: { accept: "video/mp4" },
          hidden: ({ parent }) => parent?.mediaType !== "video",
        }),
      ],
    }),

    // ── Sections (visibility switches + section content) ────────────────
    defineField({
      name: "showExpertise", type: "boolean", title: "Show “Expertise” section",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showClientLogos", type: "boolean", title: "Show client logos",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showStats", type: "boolean", title: "Show stats & process",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showMap", type: "boolean", title: "Show UAE map",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showOffers", type: "boolean", title: "Show offers section",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showFeaturedProjects", type: "boolean", title: "Show featured projects",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showSustainability", type: "boolean", title: "Show sustainability preview",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showPartner", type: "boolean", title: "Show partner spotlight",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "showInstitutions", type: "boolean", title: "Show institutions grid",
      group: "sections", initialValue: true,
    }),
    defineField({
      name: "introChip",
      type: "string",
      title: "Intro — small chip",
      group: "sections",
      description: "e.g. “Who We Are”",
    }),
    defineField({
      name: "introHeading",
      type: "string",
      title: "Intro — heading (light part)",
      group: "sections",
      description: "e.g. “Building”",
    }),
    defineField({
      name: "introHeadingAccent",
      type: "string",
      title: "Intro — heading (bold gold part)",
      group: "sections",
      description: "e.g. “infrastructure that performs”",
    }),
    defineField({
      name: "introText",
      type: "text",
      rows: 4,
      title: "Intro — paragraph",
      group: "sections",
    }),
    defineField({
      name: "expertiseOverride",
      type: "array",
      title: "Expertise cards — manual override",
      group: "sections",
      description: "Leave empty to show your ⭐ featured services automatically.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      validation: (r) => r.max(4).error("The design fits up to 4 cards"),
    }),
    defineField({
      name: "logosMode",
      type: "string",
      title: "Which client logos to show",
      group: "sections",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "All visible logos", value: "all" },
          { title: "Featured logos only", value: "featured" },
        ],
      },
      initialValue: "all",
    }),
    defineField({
      name: "logosHeading",
      type: "string",
      title: "Client logos heading (optional)",
      group: "sections",
    }),
    defineField({
      name: "featuredProjectsHeading",
      type: "string",
      title: "Featured projects — heading",
      group: "sections",
    }),
    defineField({
      name: "featuredProjectsOverride",
      type: "array",
      title: "Featured projects — manual override",
      group: "sections",
      description: "Leave empty to show your ⭐ featured projects automatically.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
    }),
    defineField({
      name: "partner",
      type: "reference",
      title: "Partner spotlight — partner",
      group: "sections",
      to: [{ type: "partner" }],
    }),
    defineField({
      name: "partnerHeading",
      type: "string",
      title: "Partner spotlight — heading",
      group: "sections",
    }),
    defineField({
      name: "partnerText",
      type: "text",
      rows: 3,
      title: "Partner spotlight — text",
      group: "sections",
    }),
    defineField({
      name: "institutionsChip",
      type: "string",
      title: "Institutions grid — small label",
      group: "sections",
      description: "e.g. “Trusted Excellence”",
    }),
    defineField({
      name: "institutionsHeading",
      type: "string",
      title: "Institutions grid — heading (light part)",
      group: "sections",
      description: "The grid itself shows your Authority & Regulatory partners automatically.",
    }),
    defineField({
      name: "institutionsHeadingBold",
      type: "string",
      title: "Institutions grid — heading (bold part)",
      group: "sections",
      description: "e.g. “across the UAE”",
    }),
    defineField({
      name: "sloganBanner",
      type: "object",
      title: "Slogan banner",
      group: "sections",
      description: "The dark “Engineering Excellence” banner.",
      fields: [
        defineField({ name: "chip", type: "string", title: "Small label" }),
        defineField({ name: "line1", type: "string", title: "Heading — first line" }),
        defineField({ name: "line2", type: "string", title: "Heading — gold line" }),
        defineField({ name: "text", type: "text", rows: 2, title: "Paragraph" }),
        defineField({ name: "cta", type: "cta", title: "Button" }),
      ],
    }),
    defineField({
      name: "missionBlock",
      type: "object",
      title: "Mission statement block",
      group: "sections",
      fields: [
        defineField({ name: "label", type: "string", title: "Small label", description: "e.g. “Our Mission Statement”" }),
        defineField({ name: "quote", type: "text", rows: 5, title: "Mission statement" }),
        defineField({ name: "taglineStart", type: "string", title: "Tagline — light part", description: "e.g. “Engineering Performance.”" }),
        defineField({ name: "taglineBold", type: "string", title: "Tagline — bold part", description: "e.g. “Delivering Reliability.”" }),
        defineField({ name: "subline", type: "string", title: "Small bottom line" }),
      ],
    }),

    // ── Stats & Process ─────────────────────────────────────────────────
    defineField({
      name: "credentials",
      type: "array",
      title: "Credential statistics",
      group: "stats",
      of: [defineArrayMember({ type: "stat" })],
      validation: (r) => r.max(4).error("The design fits up to 4 statistics"),
    }),
    defineField({
      name: "pipelineHeading",
      type: "string",
      title: "Process — heading",
      group: "stats",
    }),
    defineField({
      name: "pipelineSteps",
      type: "array",
      title: "Process steps",
      group: "stats",
      description: "Step numbers (01, 02, …) appear automatically.",
      of: [
        defineArrayMember({
          type: "object",
          name: "pipelineStep",
          fields: [
            defineField({
              name: "title", type: "string", title: "Step title",
              validation: (r) => r.required().error("Every step needs a title"),
            }),
            defineField({ name: "description", type: "text", rows: 2, title: "Step description" }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      validation: (r) => r.max(5).warning("The design fits up to 5 steps"),
    }),

    // ── Map ─────────────────────────────────────────────────────────────
    defineField({
      name: "mapHeading",
      type: "string",
      title: "Map — heading",
      group: "map",
    }),
    defineField({
      name: "mapSubheading",
      type: "text",
      rows: 2,
      title: "Map — supporting line",
      group: "map",
    }),
    defineField({
      name: "pins",
      type: "array",
      title: "Map pins",
      group: "map",
      description: "Each pin shows a project on the UAE map.",
      of: [
        defineArrayMember({
          type: "object",
          name: "mapPin",
          fields: [
            defineField({
              name: "project",
              type: "reference",
              title: "Project",
              to: [{ type: "project" }],
              validation: (r) => r.required().error("Pick the project this pin shows"),
            }),
            defineField({
              name: "x",
              type: "number",
              title: "Position across (0–100)",
              description: "0 is the left edge of the map, 100 the right.",
              validation: (r) => r.min(0).max(100).error("Use a number from 0 to 100"),
            }),
            defineField({
              name: "y",
              type: "number",
              title: "Position down (0–100)",
              description: "0 is the top edge of the map, 100 the bottom.",
              validation: (r) => r.min(0).max(100).error("Use a number from 0 to 100"),
            }),
          ],
          preview: { select: { title: "project.name" } },
        }),
      ],
      validation: (r) => r.max(8).warning("More than 8 pins gets crowded"),
    }),

    // ── Offers ──────────────────────────────────────────────────────────
    defineField({
      name: "offersHeading",
      type: "string",
      title: "Offers — heading",
      group: "offers",
    }),
    defineField({
      name: "offers",
      type: "array",
      title: "Offer cards",
      group: "offers",
      of: [
        defineArrayMember({
          type: "object",
          name: "offer",
          fields: [
            defineField({
              name: "title", type: "string", title: "Title",
              validation: (r) => r.required().error("Every offer needs a title"),
            }),
            defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
            defineField({ name: "image", type: "figure", title: "Photo" }),
          ],
          preview: { select: { title: "title", media: "image.image" } },
        }),
      ],
      validation: (r) => r.max(5).error("The design fits up to 5 offers"),
    }),

    // ── Sustainability preview ──────────────────────────────────────────
    defineField({
      name: "sustainabilityChip",
      type: "string",
      title: "Small label",
      group: "sustainability",
      description: "e.g. “Sustainability”",
    }),
    defineField({
      name: "sustainabilityHeading",
      type: "string",
      title: "Heading — first part",
      group: "sustainability",
      description: "e.g. “Powering a”",
    }),
    defineField({
      name: "sustainabilityHeadingAccent",
      type: "string",
      title: "Heading — gold part",
      group: "sustainability",
      description: "e.g. “Sustainable”",
    }),
    defineField({
      name: "sustainabilityHeadingEnd",
      type: "string",
      title: "Heading — end",
      group: "sustainability",
      description: "e.g. “Future”",
    }),
    defineField({
      name: "sustainabilityText",
      type: "text",
      rows: 3,
      title: "Paragraph",
      group: "sustainability",
    }),
    defineField({
      name: "sustainabilityFeatures",
      type: "array",
      title: "Feature cards",
      group: "sustainability",
      of: [
        defineArrayMember({
          type: "object",
          name: "sustainabilityFeature",
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
      validation: (r) => r.max(4).error("The design fits up to 4 cards"),
    }),
    defineField({
      name: "sustainabilityCta",
      type: "cta",
      title: "Button",
      group: "sustainability",
    }),

    // ── SEO ─────────────────────────────────────────────────────────────
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
