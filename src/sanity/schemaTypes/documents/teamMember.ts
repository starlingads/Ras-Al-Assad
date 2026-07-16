import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A person on the Team page. Drag the list to change display order.
 */
export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (r) => r.required().error("Every team member needs a name"),
    }),
    defineField({
      name: "designation",
      type: "string",
      title: "Job Title",
      description: "e.g. “Managing Director”",
      validation: (r) => r.required().error("Add their job title"),
    }),
    defineField({
      name: "photo",
      type: "figure",
      title: "Photo",
      description: "Portrait crop, at least 800px tall.",
      validation: (r) => r.required().error("Upload their photo"),
    }),
    defineField({
      name: "bio",
      type: "text",
      rows: 4,
      title: "Short Bio (optional)",
    }),
    defineField({
      name: "stats",
      type: "string",
      title: "Experience line (optional)",
      description: "e.g. “15+ Years UAE Leadership”",
    }),
    defineField({
      name: "accreditation",
      type: "string",
      title: "Badge line (optional)",
      description: "Small line under the name, e.g. “DEWA Certified Engineer”.",
    }),
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn (optional)",
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email (optional)",
      validation: (r) =>
        r
          .regex(/^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email" })
          .error("This doesn't look like an email address"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone (optional)",
      description: "Include the country code, e.g. +971 50 123 4567",
    }),
    defineField({
      name: "visible",
      type: "boolean",
      title: "Show on website",
      initialValue: true,
      description: "Switch off to hide this person without deleting them.",
    }),
    orderRankField({ type: "teamMember" }),
  ],
  preview: {
    select: { title: "name", subtitle: "designation", media: "photo.image", visible: "visible" },
    prepare: ({ title, subtitle, media, visible }) => ({
      title,
      media,
      subtitle: [visible === false ? "🚫 Hidden" : null, subtitle].filter(Boolean).join(" · "),
    }),
  },
});
