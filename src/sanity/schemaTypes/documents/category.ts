import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * Project category — drives the main filter tabs on the Projects page.
 * Fully client-managed; the "All Projects" tab is frontend furniture,
 * not a document.
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Category Name",
      description: "e.g. Solar, Wind, Infrastructure, Electromechanical, EPC",
      validation: (r) => r.required().error("Every category needs a name"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web Address",
      description:
        "Used in links and filters. Click “Generate” — you never need to type this.",
      options: { source: "title" },
      validation: (r) => r.required().error("Click “Generate” to create the web address"),
    }),
    defineField({
      name: "icon",
      type: "iconPicker",
      title: "Icon",
      description: "Shown on project cards in this category.",
    }),
    orderRankField({ type: "category" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
