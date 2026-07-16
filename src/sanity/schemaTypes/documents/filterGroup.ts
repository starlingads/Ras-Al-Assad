import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { FilterIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A row of filter chips on the Projects page, e.g. "Panel Brand (OEM)"
 * or "Sector". The chips themselves are projectFilter documents that
 * point at their group.
 */
export const filterGroup = defineType({
  name: "filterGroup",
  title: "Filter Group",
  type: "document",
  icon: FilterIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Group Name",
      description: "e.g. “Panel Brand (OEM)”, “Sector” — the label above a row of filters",
      validation: (r) => r.required().error("Every filter group needs a name"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Web Address",
      description: "Click “Generate” — you never need to type this.",
      options: { source: "title" },
      validation: (r) => r.required().error("Click “Generate” to create the web address"),
    }),
    defineField({
      name: "allLabel",
      type: "string",
      title: "“Show everything” chip label",
      description: "The first chip that clears this filter row, e.g. “All Brands”.",
      initialValue: "All",
    }),
    defineField({
      name: "appliesTo",
      type: "array",
      title: "Show under these categories",
      description:
        "Which main tabs show this filter row. Leave empty to show it under every category.",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    orderRankField({ type: "filterGroup" }),
  ],
  preview: {
    select: { title: "title" },
  },
});
