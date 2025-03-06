import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
