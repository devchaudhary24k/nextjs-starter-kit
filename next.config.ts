import type { NextConfig } from "next";

import "@/env";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  experimental: {
    useCache: true
  }
};

export default nextConfig;
