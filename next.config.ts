import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        // Amplify CloudFront CDN — pattern matches any *.cloudfront.net subdomain
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
