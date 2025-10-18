import type { NextConfig } from "next";
import { env } from "@/lib/env";

// Validate env at build time
env;

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
