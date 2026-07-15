/**
 * Sanity Studio configuration.
 *
 * The Studio is embedded in this Next.js app and served from `/studio`
 * (see `src/app/(studio)/studio/[[...tool]]/page.tsx`).
 *
 * Note: imports here use relative paths rather than the `@/*` TypeScript alias.
 * This file is consumed both by Next.js and by the Sanity CLI (`sanity schema
 * extract`, `sanity typegen`), and the CLI's bundler does not read the
 * project's tsconfig path aliases.
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";

import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "ras-al-assad",
  title: "Ras Al Assad — Content Studio",

  // Must match the route the Studio is mounted at.
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [
    // Document navigation. Phase 1 replaces the default list with the
    // client-facing structure defined in Part 5 of the implementation plan.
    structureTool(),

    // Central media library: upload, tag, search and reuse assets.
    media(),

    // GROQ playground. Phase 5 restricts this to administrators so the client
    // never sees it.
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    // Populated in Phase 1 (schema foundation).
    types: [],
  },
});
