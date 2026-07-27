/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // Self-host build target. `next build` emits a self-contained server at
  // `.next/standalone/server.js` that runs anywhere with Node (a Hostinger
  // VPS / Cloud / Node app, PM2, Docker) — no `next start`, no full
  // node_modules to upload. Vercel ignores this and uses its own adapter, so
  // it is safe on both. Deploy = copy `.next/standalone`, `.next/static`
  // (into `.next/standalone/.next/static`) and `public`, then `node server.js`.
  output: "standalone",
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
