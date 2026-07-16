import { defineField, defineType } from "sanity";

/**
 * A single statistic, e.g. “13+ Years — Engineering Experience”.
 * Used by homepage credentials, sustainability impact numbers, and any
 * future counters.
 */
export const stat = defineType({
  name: "stat",
  title: "Statistic",
  type: "object",
  fields: [
    defineField({
      name: "prefix",
      type: "string",
      title: "Before the number (optional)",
      description: "e.g. “AED”",
    }),
    defineField({
      name: "value",
      type: "string",
      title: "Number",
      description: "e.g. “13”, “50”, “2.4”",
      validation: (r) => r.required().error("Every statistic needs a number"),
    }),
    defineField({
      name: "suffix",
      type: "string",
      title: "After the number (optional)",
      description: "e.g. “+”, “MWp”, “%”",
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "e.g. “Years Experience”",
      validation: (r) => r.required().error("Every statistic needs a label"),
    }),
    defineField({
      name: "description",
      type: "string",
      title: "Small line under the label (optional)",
      description: "e.g. “in Renewable Energy”",
    }),
    defineField({
      name: "icon",
      type: "iconPicker",
      title: "Icon (optional)",
    }),
  ],
  preview: {
    select: { value: "value", prefix: "prefix", suffix: "suffix", label: "label" },
    prepare: ({ value, prefix, suffix, label }) => ({
      title: `${prefix ?? ""}${value ?? ""}${suffix ?? ""}`,
      subtitle: label,
    }),
  },
});
