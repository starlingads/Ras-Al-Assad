import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

/** The Team page intro. Members come from the Team Members collection. */
export const teamPage = defineType({
  name: "teamPage",
  title: "Team Page",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "mdQuote",
      type: "object",
      title: "Leadership quote panel",
      group: "hero",
      description: "The quote card shown above the team grid.",
      fields: [
        defineField({ name: "text", type: "text", rows: 4, title: "Quote" }),
        defineField({ name: "authorName", type: "string", title: "Author" }),
        defineField({ name: "authorRole", type: "string", title: "Author's title" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Team Page" }) },
});
