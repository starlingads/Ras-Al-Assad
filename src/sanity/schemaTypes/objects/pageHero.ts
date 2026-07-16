import { defineField, defineType } from "sanity";

/**
 * The shared hero used at the top of every internal page (About, Services,
 * Projects, Sustainability, Appreciation, Team, Contact, Solar Calculator).
 * The homepage hero is its own richer schema on the Homepage document.
 */
export const pageHero = defineType({
  name: "pageHero",
  title: "Page Top (Hero)",
  type: "object",
  fields: [
    defineField({
      name: "chip",
      type: "string",
      title: "Small label above the heading",
      description: "The little tag line, e.g. “What We Do”. Optional.",
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Heading",
      description: "The big heading at the top of the page (first, white part).",
      validation: (r) => [
        r.required().error("This is the big heading at the top of the page"),
        r.max(70).warning("Keep headings short — they wrap on phones"),
      ],
    }),
    defineField({
      name: "titleAccent",
      type: "string",
      title: "Heading — gold part",
      description:
        "Continues the heading in gold, exactly as typed (spaces included). Optional.",
    }),
    defineField({
      name: "titleEnd",
      type: "string",
      title: "Heading — after the gold part",
      description: "The rest of the heading after the gold part. Optional.",
    }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      title: "Supporting line",
      description: "Shown under the heading. Optional.",
    }),
    defineField({
      name: "backgroundImage",
      type: "figure",
      title: "Background photo (optional)",
      description:
        "Recommended 1920×900 or larger. Leave empty to keep the page's built-in artwork.",
    }),
    defineField({
      name: "overlay",
      type: "string",
      title: "Overlay style",
      description:
        "Dark keeps white text readable on photos. “Site default” follows Site Settings → Branding.",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Site default", value: "default" },
          { title: "Dark", value: "dark" },
          { title: "Light", value: "light" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "cta",
      type: "cta",
      title: "Button (optional)",
      description: "e.g. “Get a Quote”. Leave the text empty to show no button.",
    }),
  ],
});
