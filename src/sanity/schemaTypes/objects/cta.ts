import { defineField, defineType } from "sanity";

/**
 * A button. Dual mode:
 *  - "Custom button"      → label + link entered in place
 *  - "Use a saved button" → picks a reusable ctaButton document, so editing
 *    the saved button once updates it everywhere it is used.
 */
export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "mode",
      type: "string",
      title: "Button type",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Custom button", value: "custom" },
          { title: "Use a saved button", value: "saved" },
        ],
      },
      initialValue: "custom",
    }),
    defineField({
      name: "savedButton",
      type: "reference",
      title: "Saved button",
      to: [{ type: "ctaButton" }],
      description:
        "Edit the saved button once (under Buttons) and it updates everywhere it is used.",
      hidden: ({ parent }) => parent?.mode !== "saved",
      validation: (r) =>
        r.custom((value, { parent }) => {
          if ((parent as { mode?: string })?.mode === "saved" && !value)
            return "Pick one of your saved buttons";
          return true;
        }),
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Button text",
      hidden: ({ parent }) => parent?.mode === "saved",
      validation: (r) =>
        r.custom((value, { parent }) => {
          if ((parent as { mode?: string })?.mode !== "saved" && !value)
            return "Every button needs text";
          return true;
        }),
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Where it goes",
      hidden: ({ parent }) => parent?.mode === "saved",
    }),
  ],
  preview: {
    select: { mode: "mode", label: "label", savedLabel: "savedButton.label" },
    prepare: ({ mode, label, savedLabel }) => ({
      title: mode === "saved" ? savedLabel || "Saved button" : label || "Button",
      subtitle: mode === "saved" ? "Saved button" : "Custom button",
    }),
  },
});
