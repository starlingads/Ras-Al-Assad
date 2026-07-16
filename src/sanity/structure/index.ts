// @sanity/icons v5 removed the root-entry exports; each icon ships as its
// own subpath (the root now only exports the generic <Icon> component).
import { CaseIcon } from "@sanity/icons/Case";
import { CogIcon } from "@sanity/icons/Cog";
import { EnvelopeIcon } from "@sanity/icons/Envelope";
import { FilterIcon } from "@sanity/icons/Filter";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { LeaveIcon } from "@sanity/icons/Leave";
import { LinkIcon } from "@sanity/icons/Link";
import { ProjectsIcon } from "@sanity/icons/Projects";
import { SparklesIcon } from "@sanity/icons/Sparkles";
import { StarFilledIcon } from "@sanity/icons/StarFilled";
import { StarIcon } from "@sanity/icons/Star";
import { TagIcon } from "@sanity/icons/Tag";
import { UsersIcon } from "@sanity/icons/Users";
import { WrenchIcon } from "@sanity/icons/Wrench";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { ComponentType } from "react";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

/**
 * The client-facing desk structure: Site Settings on top, then page
 * singletons, then content collections. Singletons open the document
 * directly (fixed documentId === type name); collections use drag-to-order
 * lists wherever the site renders them in order.
 */

const singleton = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: ComponentType,
) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Ras Al Assad — Content")
    .items([
      singleton(S, "siteSettings", "Site Settings", CogIcon),
      S.divider().title("Pages"),
      singleton(S, "homePage", "Homepage", HomeIcon),
      singleton(S, "aboutPage", "About Page", CaseIcon),
      singleton(S, "sustainabilityPage", "Sustainability Page", LeaveIcon),
      singleton(S, "appreciationPage", "Appreciation Page", StarFilledIcon),
      singleton(S, "contactPage", "Contact Page", EnvelopeIcon),
      singleton(S, "solarCalculatorPage", "Solar Calculator", SparklesIcon),
      S.divider().title("Content"),
      S.listItem()
        .title("Services")
        .icon(WrenchIcon)
        .child(
          S.list()
            .title("Services")
            .items([
              singleton(S, "servicesPage", "Services Page (intro)", WrenchIcon),
              orderableDocumentListDeskItem({
                type: "service",
                title: "All Services",
                icon: WrenchIcon,
                S,
                context,
              }),
            ]),
        ),
      S.listItem()
        .title("Projects")
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title("Projects")
            .items([
              singleton(S, "projectsPage", "Projects Page (intro)", ProjectsIcon),
              orderableDocumentListDeskItem({
                type: "project",
                title: "All Projects",
                icon: ProjectsIcon,
                S,
                context,
              }),
              S.listItem()
                .title("⭐ Featured Projects")
                .icon(ProjectsIcon)
                .child(
                  S.documentList()
                    .title("Featured Projects")
                    .filter('_type == "project" && featured == true'),
                ),
              S.listItem()
                .title("🚫 Hidden Projects")
                .icon(ProjectsIcon)
                .child(
                  S.documentList()
                    .title("Hidden Projects")
                    .filter('_type == "project" && hidden == true'),
                ),
              S.listItem()
                .title("By Category")
                .icon(TagIcon)
                .child(
                  S.documentTypeList("category")
                    .title("Pick a category")
                    .child((catId) =>
                      S.documentList()
                        .title("Projects")
                        .filter('_type == "project" && category._ref == $catId')
                        .params({ catId })
                        .apiVersion("2026-07-01"),
                    ),
                ),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        icon: TagIcon,
        S,
        context,
      }),
      S.listItem()
        .title("Project Filters")
        .icon(FilterIcon)
        .child(
          S.list()
            .title("Project Filters")
            .items([
              orderableDocumentListDeskItem({
                type: "filterGroup",
                title: "Filter Groups",
                icon: FilterIcon,
                S,
                context,
              }),
              orderableDocumentListDeskItem({
                type: "projectFilter",
                title: "All Filter Chips",
                icon: FilterIcon,
                S,
                context,
              }),
              S.listItem()
                .title("By Group")
                .icon(FilterIcon)
                .child(
                  S.documentTypeList("filterGroup")
                    .title("Pick a group")
                    .child((groupId) =>
                      S.documentList()
                        .title("Filters")
                        .filter('_type == "projectFilter" && group._ref == $groupId')
                        .params({ groupId })
                        .apiVersion("2026-07-01"),
                    ),
                ),
            ]),
        ),
      S.listItem()
        .title("Team")
        .icon(UsersIcon)
        .child(
          S.list()
            .title("Team")
            .items([
              singleton(S, "teamPage", "Team Page (intro)", UsersIcon),
              orderableDocumentListDeskItem({
                type: "teamMember",
                title: "Team Members",
                icon: UsersIcon,
                S,
                context,
              }),
            ]),
        ),
      orderableDocumentListDeskItem({
        type: "clientLogo",
        title: "Client Logos",
        icon: ImagesIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "partner",
        title: "Partners",
        icon: UsersIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "accreditation",
        title: "Accreditations",
        icon: StarIcon,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "certificate",
        title: "Certificates & Awards",
        icon: StarFilledIcon,
        S,
        context,
      }),
      S.listItem()
        .title("Buttons (CTAs)")
        .icon(LinkIcon)
        .child(S.documentTypeList("ctaButton").title("Reusable Buttons")),
    ]);
