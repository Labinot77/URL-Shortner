import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   eslint: {
    // Warning: true will only show warnings, but not fail the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
