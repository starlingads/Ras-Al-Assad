import { LinkIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/**
 * A reusable button ("Get a Quote", "Request Consultation", …).
 * Any Button field on any page can pick one of these — editing it here
 * updates it everywhere at once. Reference protection prevents deleting
 * a button that is still in use.
 */
export const ctaButton = defineType({
  name: "ctaButton",
  title: "Button",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Internal name",
      description: "Only shown in this admin panel, e.g. “Get a Quote — main”.",
      validation: (r) => r.required().error("Give this button a name so you can find it"),
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Button text",
      description: "What visitors see on the button.",
      validation: (r) => r.required().error("Every button needs text"),
    }),
    defineField({
      name: "link",
      type: "link",
      title: "Where it goes",
      validation: (r) => r.required().error("Choose where this button leads"),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "name" },
  },
});
