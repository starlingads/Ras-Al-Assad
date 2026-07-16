import { ProjectsIcon } from "@sanity/icons/Projects";
import { defineField, defineType } from "sanity";

/** The Projects page intro. Projects, categories and filters are collections. */
export const projectsPage = defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  icon: ProjectsIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "hero", type: "pageHero", title: "Page top", group: "hero" }),
    defineField({
      name: "emptyStateText",
      type: "string",
      title: "Empty category message",
      group: "hero",
      description: "Shown when a category has no projects yet.",
      initialValue: "No projects in this category yet",
    }),
    defineField({ name: "seo", type: "seo", group: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Projects Page" }) },
});
