import { WrenchIcon } from "@sanity/icons/Wrench";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The Services page intro. The service sections themselves come from the
 * Services collection in drag order.
 */
export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  icon: WrenchIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "zeroCapital", title: "Zero-Capital Section" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "zeroCapital",
      type: "object",
      title: "Zero-Capital section",
      group: "zeroCapital",
      fields: [
        defineField({
          name: "chip",
          type: "string",
          title: "Small label",
          description: "e.g. “Zero-CAPEX Solar Leases”",
        }),
        defineField({
          name: "heading",
          type: "string",
          title: "Heading",
          initialValue: "Go Solar with Zero Capital Investment",
        }),
        defineField({ name: "text", type: "text", rows: 3, title: "Paragraph" }),
        defineField({
          name: "benefits",
          type: "array",
          title: "Benefit cards",
          of: [
            defineArrayMember({
              type: "object",
              name: "benefit",
              fields: [
                defineField({ name: "icon", type: "iconPicker", title: "Icon" }),
                defineField({
                  name: "title", type: "string", title: "Title",
                  validation: (r) => r.required().error("Every card needs a title"),
                }),
                defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
          validation: (r) => r.max(3).error("The design fits 3 cards"),
        }),
        defineField({ name: "cta", type: "cta", title: "Button" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
