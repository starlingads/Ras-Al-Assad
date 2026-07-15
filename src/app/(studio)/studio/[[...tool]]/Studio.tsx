"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../../sanity.config";

/**
 * Client boundary for the Studio.
 *
 * This wrapper exists so that `sanity.config` is imported from *inside* the
 * client module graph. Studio plugins pull in browser-only dependencies — e.g.
 * sanity-plugin-media imports `useForm` from react-hook-form, whose
 * `react-server` export condition deliberately omits hooks — so resolving the
 * config in a Server Component fails to build.
 *
 * The config is imported here rather than passed in as a prop: it contains
 * plugin functions, which are not serializable across the server/client
 * boundary.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
