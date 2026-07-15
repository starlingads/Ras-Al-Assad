/**
 * Sanity CLI configuration.
 *
 * Used by CLI commands run against this project — chiefly `sanity schema
 * extract` and `sanity typegen generate` (wired up in Phase 1), plus dataset
 * management.
 *
 * The Studio itself is served by Next.js at `/studio`, so `sanity deploy`
 * (which publishes a standalone studio to sanity.studio) is intentionally not
 * part of this project's workflow.
 */
import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
});
