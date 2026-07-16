import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { FilterIcon } from "@sanity/icons/Filter";
import { defineField, defineType } from "sanity";

/**
 * A single filter chip, e.g. "LONGi" or "Government". Belongs to a
 * filter group; projects reference any number of chips.
 */
export const projectFilter = defineType({
  name: "projectFilter",
  title: "Filter",
  type: "document",
  icon: FilterIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Filter Name",
      description: "e.g. “LONGi”, “Jinko”, “Government”, “Industrial”",
      validation: (r) => r.required().error("Every filter needs a name"),
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
      name: "group",
      type: "reference",
      title: "Filter Group",
      description: "Which row of filters this chip belongs to.",
      to: [{ type: "filterGroup" }],
      validation: (r) => r.required().error("Pick which group this filter belongs to"),
    }),
    orderRankField({ type: "projectFilter" }),
  ],
  preview: {
    select: { title: "title", subtitle: "group.title" },
  },
});
