import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { StarFilledIcon } from "@sanity/icons/StarFilled";
import { defineField, defineType } from "sanity";

/**
 * A certificate, award or recognition shown on the Appreciation page.
 */
export const certificate = defineType({
  name: "certificate",
  title: "Certificate / Award",
  type: "document",
  icon: StarFilledIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (r) => r.required().error("Every certificate needs a title"),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Certificate", value: "certificate" },
          { title: "Award", value: "award" },
          { title: "Recognition", value: "recognition" },
        ],
      },
      initialValue: "certificate",
    }),
    defineField({
      name: "image",
      type: "figure",
      title: "Scan / Photo",
      description: "Scan or photograph at high resolution — at least 1000px on the long edge.",
      validation: (r) => r.required().error("Upload a scan or photo of it"),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "Description (optional)",
      description: "What it was awarded for; shown under the title.",
    }),
    defineField({
      name: "issuer",
      type: "string",
      title: "Issued by (optional)",
      description: "e.g. “ANERT”, “Dubai Municipality”",
    }),
    defineField({
      name: "date",
      type: "date",
      title: "Date (optional)",
      options: { dateFormat: "MMMM YYYY" },
    }),
    defineField({
      name: "visible",
      type: "boolean",
      title: "Show on website",
      initialValue: true,
    }),
    orderRankField({ type: "certificate" }),
  ],
  preview: {
    select: { title: "title", media: "image.image", subtitle: "issuer", visible: "visible" },
    prepare: ({ title, media, subtitle, visible }) => ({
      title,
      media,
      subtitle: [visible === false ? "🚫 Hidden" : null, subtitle].filter(Boolean).join(" · "),
    }),
  },
});
