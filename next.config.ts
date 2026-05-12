import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mslbgrrqfbibkgbtvifk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;