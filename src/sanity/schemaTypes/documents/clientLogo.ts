import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * One logo in the "Trusted by" marquee on the homepage.
 */
export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client Logo",
  type: "document",
  icon: ImagesIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Company Name",
      description: "Shows as the tooltip and helps Google read the logo.",
      validation: (r) => r.required().error("Whose logo is this?"),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      description: "PNG or SVG with a transparent background looks best.",
      options: { accept: "image/png, image/svg+xml, image/webp" },
      validation: (r) => r.required().error("Upload the logo image"),
    }),
    defineField({
      name: "website",
      type: "url",
      title: "Website (optional)",
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Type (optional)",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Client", value: "client" },
          { title: "Developer", value: "developer" },
          { title: "Government", value: "government" },
          { title: "Consultant", value: "consultant" },
        ],
      },
    }),
    defineField({
      name: "visible",
      type: "boolean",
      title: "Show on website",
      initialValue: true,
      description: "Switch off to hide this logo without deleting it.",
    }),
    defineField({
      name: "featured",
      type: "boolean",
      title: "⭐ Featured",
      initialValue: false,
      description:
        "Shown when the homepage is set to “Featured logos only” (Homepage → Sections).",
    }),
    orderRankField({ type: "clientLogo" }),
  ],
  preview: {
    select: { title: "name", media: "logo", visible: "visible", featured: "featured" },
    prepare: ({ title, media, visible, featured }) => ({
      title: title || "Client logo",
      media,
      subtitle: [visible === false ? "🚫 Hidden" : null, featured ? "⭐ Featured" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
