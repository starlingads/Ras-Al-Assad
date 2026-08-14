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
