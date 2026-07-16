/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
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
