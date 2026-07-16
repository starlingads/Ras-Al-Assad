import { defineField, defineType } from "sanity";

/**
 * The smart link editors use instead of raw URLs.
 * Exactly one destination field is shown, driven by `linkType`.
 * The frontend resolves this object to an href (see resolveLink()).
 */

/** Fixed site routes offered in the "Page on this website" dropdown. */
export const PAGE_ROUTES = [
  { title: "Home", value: "/" },
  { title: "About", value: "/about" },
  { title: "Services", value: "/services" },
  { title: "Projects", value: "/projects" },
  { title: "Sustainability", value: "/sustainability" },
  { title: "Appreciation", value: "/appreciation" },
  { title: "Team", value: "/team" },
  { title: "Contact", value: "/contact" },
  { title: "Solar Calculator", value: "/solar-calculator" },
] as const;

type LinkParent = { linkType?: string } | undefined;

/** required-if helper: field must be filled when its linkType is active. */
const requiredFor =
  (type: string, message: string) =>
  (value: unknown, context: { parent?: unknown }) => {
    const parent = context.parent as LinkParent;
    if (parent?.linkType === type && !value) return message;
    return true;
  };

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      type: "string",
      title: "Link to",
      options: {
        layout: "radio",
        direction: "horizontal",
        list: [
          { title: "Page on this website", value: "page" },
          { title: "A service", value: "service" },
          { title: "A project", value: "project" },
          { title: "External website", value: "external" },
          { title: "Email", value: "email" },
          { title: "Phone", value: "phone" },
        ],
      },
      initialValue: "page",
      validation: (r) => r.required().error("Choose what this should link to"),
    }),
    defineField({
      name: "page",
      type: "string",
      title: "Page",
      options: { list: [...PAGE_ROUTES] },
      hidden: ({ parent }) => parent?.linkType !== "page",
      validation: (r) => r.custom(requiredFor("page", "Choose a page")),
    }),
    defineField({
      name: "service",
      type: "reference",
      title: "Service",
      to: [{ type: "service" }],
      hidden: ({ parent }) => parent?.linkType !== "service",
      validation: (r) => r.custom(requiredFor("service", "Pick a service")),
    }),
    defineField({
      name: "project",
      type: "reference",
      title: "Project",
      to: [{ type: "project" }],
      hidden: ({ parent }) => parent?.linkType !== "project",
      validation: (r) => r.custom(requiredFor("project", "Pick a project")),
    }),
    defineField({
      name: "url",
      type: "url",
      title: "Web address",
      description: "Full address including https://",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: (r) => [
        r.uri({ scheme: ["http", "https"] }).error("This doesn't look like a web address"),
        r.custom(requiredFor("external", "Enter the web address")),
      ],
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email address",
      hidden: ({ parent }) => parent?.linkType !== "email",
      validation: (r) => [
        r
          .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email", invert: false })
          .error("This doesn't look like an email address"),
        r.custom(requiredFor("email", "Enter the email address")),
      ],
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone number",
      description: "Include the country code, e.g. +971 4 123 4567",
      hidden: ({ parent }) => parent?.linkType !== "phone",
      validation: (r) => r.custom(requiredFor("phone", "Enter the phone number")),
    }),
    defineField({
      name: "anchor",
      type: "string",
      title: "Jump to section (advanced)",
      description:
        "Optional. Scrolls to a section on the target page, e.g. “solar-epc”. Leave empty normally.",
      hidden: ({ parent }) =>
        parent?.linkType === "email" || parent?.linkType === "phone",
    }),
  ],
});
