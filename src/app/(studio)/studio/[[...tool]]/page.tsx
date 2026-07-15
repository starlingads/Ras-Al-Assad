import Studio from "./Studio";

/**
 * The Sanity Studio, mounted at `/studio`.
 *
 * The optional catch-all segment (`[[...tool]]`) lets the Studio own every path
 * beneath `/studio` — `/studio/structure`, `/studio/vision`, `/studio/media`
 * and so on — so its client-side router can drive navigation.
 *
 * This page stays a Server Component purely so it can export route metadata;
 * the Studio itself renders behind the client boundary in `./Studio`.
 */

// The Studio is a client-side application: there is nothing to render per
// request, so the route is served as a static shell.
export const dynamic = "force-static";

// Studio-appropriate document metadata (title, robots: noindex) and viewport
// settings, provided by next-sanity.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
