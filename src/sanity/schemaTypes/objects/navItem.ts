import { defineField, defineType } from "sanity";

/**
 * One menu entry (header or footer). Drag to reorder in the list;
 * switch off with `enabled` instead of deleting.
 */
export const navItem = defineType({
  name: "navItem",
  title: "Menu item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      title: "Menu text",
      validation: (r) => r.required().error("Every menu item needs text"),
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Where it goes",
    }),
    defineField({
      name: "enabled",
      type: "boolean",
      title: "Show in menu",
      initialValue: true,
      description: "Switch off to hide this item without deleting it.",
    }),
    defineField({
      name: "dropdown",
      type: "boolean",
      title: "Show services dropdown",
      initialValue: false,
      description:
        "Shows a dropdown of all visible services under this item — kept up to date automatically.",
    }),
  ],
  preview: {
    select: { title: "label", enabled: "enabled", dropdown: "dropdown" },
    prepare: ({ title, enabled, dropdown }) => ({
      title: title || "Menu item",
      subtitle: [enabled === false ? "⏸ Hidden" : null, dropdown ? "▾ services dropdown" : null]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});
