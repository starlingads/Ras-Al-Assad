import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ProjectsIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A project — the highest-priority collection.
 *
 * Client actions: Add/Edit/Delete (standard Studio) · Hide (`hidden`) ·
 * Feature (`featured`) · Duplicate (built-in document action) · Reorder
 * (orderable list). List previews show ⭐/🚫 state.
 *
 * Image fallback chain (only the thumbnail is required):
 * heroImage → coverImage → thumbnail.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: ProjectsIcon,
  orderings: [orderRankOrdering],
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "story", title: "Story" },
    { name: "media", title: "Photos & Media" },
    { name: "classification", title: "Category & Filters" },
    { name: "extras", title: "Extras" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Basics ──────────────────────────────────────────────────────────
    defineField({
      name: "name",
      type: "string",
      title: "Project Name",
      group: "basics",
      validation: (r) => [
        r.required().error("Every project needs a name"),
        r.max(90).warning("Keep names under 90 characters"),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web Address",
      group: "basics",
      description:
        "Only matters for links and Google. Click “Generate” — you never need to type this.",
      options: { source: "name" },
      validation: (r) => r.required().error("Click “Generate” to create the web address"),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      title: "One-Paragraph Summary",
      group: "basics",
      description: "Shown on project cards and on Google.",
      validation: (r) => [
        r.required().error("Add a short summary — it appears on the project card"),
        r.max(220).warning("Keep it to ~2 sentences — it gets cut off on cards"),
      ],
    }),
    defineField({
      name: "completionDate",
      type: "date",
      title: "Completion Date",
      group: "basics",
      options: { dateFormat: "MMMM YYYY" },
      description: "The website shows the year.",
    }),
    defineField({
      name: "location",
      type: "string",
      title: "Location",
      group: "basics",
      description: "e.g. “Sobha Hartland, Dubai, UAE”",
    }),
    defineField({
      name: "clientName",
      type: "string",
      title: "Client / Developer",
      group: "basics",
    }),
    defineField({
      name: "capacity",
      type: "string",
      title: "Capacity / Scope",
      group: "basics",
      description: "e.g. “376.2 kWp Rooftop Solar PV”",
    }),
    defineField({
      name: "statusLabel",
      type: "string",
      title: "Status Badge",
      group: "basics",
      initialValue: "Completed & Operational",
      description:
        "Shown as the project badge, e.g. “Completed & Commissioned”, “Under Commissioning”.",
    }),

    // ── Story ───────────────────────────────────────────────────────────
    defineField({
      name: "highlights",
      type: "array",
      title: "Key Achievements",
      group: "story",
      description: "Bullet points shown in the project spotlight.",
      of: [{ type: "string" }],
      validation: (r) => r.max(6).warning("More than 6 points gets crowded"),
    }),
    defineField({
      name: "description",
      type: "array",
      title: "Full Description (optional)",
      group: "story",
      description: "Longer write-up for the future project detail page.",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),

    // ── Photos & Media ──────────────────────────────────────────────────
    defineField({
      name: "thumbnail",
      type: "figure",
      title: "Thumbnail",
      group: "media",
      description:
        "The card image on the Projects grid and sliders. Recommended 1200px+ wide.",
      validation: (r) => r.required().error("Every project needs a thumbnail photo"),
    }),
    defineField({
      name: "coverImage",
      type: "figure",
      title: "Cover Image (optional)",
      group: "media",
      description:
        "The wide image in the project spotlight. Leave empty to reuse the Thumbnail.",
    }),
    defineField({
      name: "heroImage",
      type: "figure",
      title: "Hero Image (optional)",
      group: "media",
      description:
        "Reserved for the future project detail page header. Falls back to Cover → Thumbnail.",
    }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Photo Gallery",
      group: "media",
      description: "Drag photos to reorder.",
      of: [defineArrayMember({ type: "figure" })],
    }),
    defineField({
      name: "videos",
      type: "array",
      title: "Videos (optional)",
      group: "media",
      of: [
        defineArrayMember({
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({
              name: "url",
              type: "url",
              title: "YouTube / Vimeo link",
              validation: (r) => r.required().error("Paste the video link"),
            }),
          ],
          preview: { select: { title: "title", subtitle: "url" } },
        }),
      ],
    }),

    // ── Category & Filters ──────────────────────────────────────────────
    defineField({
      name: "category",
      type: "reference",
      title: "Category",
      group: "classification",
      description: "Which main tab this project appears under.",
      to: [{ type: "category" }],
      validation: (r) => r.required().error("Pick a category — it drives the filter tabs"),
    }),
    defineField({
      name: "filters",
      type: "array",
      title: "Filters (brand, sector, …)",
      group: "classification",
      description: "Tick everything that applies — powers the filter chips.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "projectFilter" }] })],
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "⭐ Feature on Homepage",
      group: "classification",
      initialValue: false,
      description: "Featured projects appear in the homepage slider automatically.",
    }),
    defineField({
      name: "hidden",
      type: "boolean",
      title: "Hide from website",
      group: "classification",
      initialValue: false,
      description: "Keeps the project here but removes it from the website.",
    }),

    // ── Extras ──────────────────────────────────────────────────────────
    defineField({
      name: "relatedProjects",
      type: "array",
      title: "Related Projects (optional)",
      group: "extras",
      description:
        "Hand-pick up to 4. Leave empty to show recent projects from the same category automatically.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (r) => r.max(4).error("Up to 4 related projects"),
    }),
    defineField({
      name: "downloads",
      type: "array",
      title: "Downloads & Documents (optional)",
      group: "extras",
      description:
        "Datasheets, brochures, PDFs. ⚠ Files uploaded here are publicly accessible.",
      of: [
        defineArrayMember({
          type: "object",
          name: "download",
          title: "File",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (r) => r.required().error("Name this file"),
            }),
            defineField({
              name: "file",
              type: "file",
              title: "File",
              validation: (r) => r.required().error("Attach the file"),
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),

    // ── SEO & ordering ──────────────────────────────────────────────────
    defineField({ name: "seo", type: "seo", group: "seo" }),
    orderRankField({ type: "project" }),
  ],
  preview: {
    select: {
      title: "name",
      media: "thumbnail.image",
      categoryTitle: "category.title",
      completionDate: "completionDate",
      location: "location",
      featured: "featured",
      hidden: "hidden",
    },
    prepare: ({ title, media, categoryTitle, completionDate, location, featured, hidden }) => ({
      title,
      media,
      subtitle: [
        hidden ? "🚫 Hidden" : null,
        featured ? "⭐" : null,
        categoryTitle,
        completionDate ? new Date(completionDate).getFullYear() : null,
        location,
      ]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
