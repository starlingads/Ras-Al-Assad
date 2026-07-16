import { defineField, defineType } from "sanity";

/**
 * The standard content image: asset + alt text + optional caption.
 * Hotspot lets editors set the focal point once; every rendered crop
 * derives from it via the image URL builder.
 */
export const figure = defineType({
  name: "figure",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Photo",
      options: { hotspot: true },
      validation: (r) => r.required().error("Pick or upload a photo"),
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Describe this image",
      description:
        "One line for Google & screen readers, e.g. “Rooftop solar panels at Sobha Hartland”.",
      validation: (r) =>
        r.required().warning("Describe the photo in one line — helps Google find you"),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption (optional)",
      description: "Shown under the photo in galleries.",
    }),
  ],
  preview: {
    select: { media: "image", title: "alt", subtitle: "caption" },
    prepare: ({ media, title, subtitle }) => ({
      media,
      title: title || "Image (no description yet)",
      subtitle,
    }),
  },
});
