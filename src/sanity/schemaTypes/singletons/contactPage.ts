import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The Contact page. Address, phone numbers, emails and office hours live
 * in Site Settings → Contact Details (single source of truth) — this
 * document holds only page-specific content.
 */
export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "departments", title: "Departments" },
    { name: "form", title: "Form" },
    { name: "map", title: "Map" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "contactDetailsNote",
      type: "string",
      title: "ℹ️ Looking for address / phones / emails / hours?",
      group: "hero",
      description:
        "Those are edited once in Site Settings → Contact Details and appear here automatically.",
      readOnly: true,
      initialValue: "Edit them in Site Settings → Contact Details",
    }),
    defineField({
      name: "departments",
      type: "array",
      title: "Departments",
      group: "departments",
      description: "e.g. Estimation, Solar Division, O&M Support.",
      of: [
        defineArrayMember({
          type: "object",
          name: "department",
          fields: [
            defineField({
              name: "name", type: "string", title: "Department name",
              validation: (r) => r.required().error("Name the department"),
            }),
            defineField({
              name: "email", type: "string", title: "Email",
              validation: (r) =>
                r
                  .regex(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
                  .error("This doesn't look like an email address"),
            }),
            defineField({ name: "phone", type: "string", title: "Phone (optional)" }),
            defineField({ name: "note", type: "string", title: "Note (optional)" }),
          ],
          preview: { select: { title: "name", subtitle: "email" } },
        }),
      ],
    }),
    defineField({
      name: "legalLines",
      type: "array",
      title: "Legal accreditation lines",
      group: "departments",
      description:
        "The small legal/registration lines in the “Legal Accreditations” box, e.g. “Commercial Registry Number: 1118671”.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "formHeading",
      type: "string",
      title: "Form heading",
      group: "form",
      initialValue: "Request Project Cost Feasibility",
    }),
    defineField({
      name: "formServiceOptions",
      type: "array",
      title: "Engineering discipline options",
      group: "form",
      description: "The choices in the form's discipline dropdown.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "formSuccessHeading",
      type: "string",
      title: "After-submit heading",
      group: "form",
    }),
    defineField({
      name: "formSuccessText",
      type: "text",
      rows: 2,
      title: "After-submit message",
      group: "form",
    }),
    defineField({
      name: "formSuccessNote",
      type: "text",
      rows: 2,
      title: "After-submit note (boxed)",
      group: "form",
      description: "The highlighted note under the message.",
    }),
    defineField({
      name: "mapEmbed",
      type: "object",
      title: "Map",
      group: "map",
      fields: [
        defineField({
          name: "embedUrl",
          type: "url",
          title: "Google Maps link",
          description: "Paste a Google Maps share/embed link.",
        }),
        defineField({ name: "lat", type: "number", title: "Latitude (advanced)" }),
        defineField({ name: "lng", type: "number", title: "Longitude (advanced)" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Contact Page" }) },
});
