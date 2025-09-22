import type { NextConfig } from "next";
import { env } from "@/lib/env";

// Validate env at build time
env;

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default nextConfig;
