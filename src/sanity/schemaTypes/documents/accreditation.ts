import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * An official accreditation / registration (DEWA Shams Dubai, Etihad ESCO…).
 * Shown on: About certification cards, Appreciation "Accreditations &
 * Affiliations", Contact legal lines, and the footer badge list.
 */
export const accreditation = defineType({
  name: "accreditation",
  title: "Accreditation",
  type: "document",
  icon: StarIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "e.g. “DEWA Shams Dubai”",
      validation: (r) => r.required().error("Every accreditation needs a name"),
    }),
    defineField({
      name: "shortLabel",
      type: "string",
      title: "Short footer label (optional)",
      description: "A shorter version for tight spaces like the footer.",
    }),
    defineField({
      name: "description",
      type: "string",
      title: "One-line description",
      description: "e.g. “Registered Solar PV Contractor”",
    }),
    defineField({
      name: "icon",
      type: "iconPicker",
      title: "Icon",
    }),
    defineField({
      name: "licenseNumber",
      type: "string",
      title: "License / registration number (optional)",
      description: "Shown on the Contact page legal lines when filled.",
    }),
    orderRankField({ type: "accreditation" }),
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
  },
});
