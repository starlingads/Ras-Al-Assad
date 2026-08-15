/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Self-host build target. `next build` emits a self-contained server at
  // `.next/standalone/server.js` that runs anywhere with Node (a Hostinger
  // VPS / Cloud / Node app, PM2, Docker) — no `next start`, no full
  // node_modules to upload. Deploy = copy `.next/standalone`, `.next/static`
  // (into `.next/standalone/.next/static`) and `public`, then `node server.js`.
  //
  // Disabled on Vercel: it runs its own build adapter, and combining the two
  // breaks the build outright — `ENOENT .next/next-server.js.nft.json` — since
  // both try to own the server output and its trace files. Vercel does not need
  // standalone anyway. `VERCEL=1` is set automatically in their build image, so
  // Hostinger (and any other Node host) still gets the portable server.
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    // Images are served from the Sanity CDN and optimized by next/image
    // (AVIF/WebP + responsive sizes). The old `unoptimized: true` shipped
    // ~13 MB of raw JPEGs; the unsplash/virya hotlink patterns are gone with
    // the hardcoded content that used them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
    // AVIF first, WebP fallback. AVIF runs roughly 20-30% smaller than WebP at
    // the same visual quality, which comes straight off LCP on mobile data.
    // Browsers that don't accept AVIF are served WebP via content negotiation,
    // so this is transparent.
    formats: ["image/avif", "image/webp"],
    // Sanity asset URLs are content-addressed — the SHA is in the filename, so
    // a given URL can never point at different bytes. Without this, the
    // optimizer re-downloads the multi-MB original from Sanity and re-encodes
    // it with sharp far more often than it needs to. On Hostinger that work
    // happens in the single Node process that is also serving pages, so every
    // avoidable re-encode is contention on the critical path. One year is safe
    // precisely because the URL changes whenever the image does.
    minimumCacheTTL: 31536000,
  },
  // `X-Powered-By: Next.js` tells an attacker exactly what to target and buys
  // nothing in return.
  poweredByHeader: false,
  // Production was serving none of these. Each is scoped so it cannot break
  // the embedded Studio or the site's own behaviour.
  //
  // Deliberately NOT setting Content-Security-Policy here. A real CSP for this
  // app has to allow Next's inline bootstrap scripts, styled-components and
  // Framer Motion's injected inline styles, the Sanity Studio bundle, and
  // blob:/data: workers — shipping one blind would very likely white-screen
  // /studio. It wants its own pass with report-only first. Hostinger's CDN
  // already sends `upgrade-insecure-requests`.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // 2 years, matching the preload-list requirement. Safe: HTTPS is
          // already enforced by a 301 at the edge and there is no http-only
          // subdomain in play.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Stops the browser second-guessing declared MIME types, which is
          // the vector that turns an uploaded file into executable script.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // SAMEORIGIN rather than DENY: Sanity's Presentation tool renders the
          // live site inside an iframe within /studio, and that is same-origin.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Send the full URL to ourselves, only the origin cross-site — keeps
          // query strings out of third-party referer logs.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing in this site uses these APIs, so deny them outright.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The /en tree duplicated every page. Collapse it onto the canonical
      // paths with permanent redirects so Google indexes one URL per page.
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
