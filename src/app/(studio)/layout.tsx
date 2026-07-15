import type { ReactNode } from "react";

/**
 * Root layout for the embedded Sanity Studio.
 *
 * This is a *second* root layout, sibling to `(site)`. Next.js route groups let
 * an app have multiple root layouts, which is what keeps the Studio isolated
 * from the public site:
 *
 *   - no `<Navbar />` / `<Footer />` — the Studio owns the whole viewport
 *   - no `globals.css` — Tailwind's preflight would otherwise reset elements
 *     inside Studio's UI, which ships its own styling
 *
 * Because it is a root layout it must render `<html>` and `<body>` itself.
 * Crossing between `(site)` and `(studio)` triggers a full page load, which is
 * the intended behaviour for entering an admin tool.
 */
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* Studio fills the viewport; without globals.css the browser's default
          body margin would otherwise offset it. */}
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
