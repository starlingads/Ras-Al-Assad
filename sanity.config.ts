/**
 * Sanity Studio configuration.
 *
 * The Studio is embedded in this Next.js app and served from `/studio`
 * (see `src/app/(studio)/studio/[[...tool]]/`).
 *
 * Note: imports here use relative paths rather than the `@/*` TypeScript alias.
 * This file is consumed both by Next.js and by the Sanity CLI (`sanity schema
 * extract`, `sanity typegen`), and the CLI's bundler does not read the
 * project's tsconfig path aliases.
 */
import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes, SINGLETON_TYPES } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const singletonTypes = new Set<string>(SINGLETON_TYPES);

/**
 * Actions allowed on singleton documents: no delete, no duplicate, no
 * unpublish — a page must always exist exactly once.
 */
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "ras-al-assad",
  title: "Ras Al Assad — Content Studio",

  // Must match the route the Studio is mounted at.
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    // Document navigation — the client-facing tree in src/sanity/structure.
    structureTool({ structure }),

    // Central media library: upload, tag, search and reuse assets.
    media(),

    // Color swatches for Site Settings → Branding.
    colorInput(),

    // GROQ playground — developers only (hidden from the client below).
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schemaTypes,

    // Strip singletons from the global "+ Create" menu: the only way to
    // reach them is the pinned desk items, so they can never be duplicated.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    // Singletons cannot be deleted, duplicated or unpublished.
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : actions,
  },

  tools: (tools, { currentUser }) => {
    // Vision (the GROQ playground) is a developer tool — hide it from
    // everyone except administrators so the client never sees it.
    const isAdmin = currentUser?.roles?.some((role) => role.name === "administrator");
    return isAdmin ? tools : tools.filter((tool) => tool.name !== "vision");
  },
});
