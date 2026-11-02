import type { NextConfig } from "next";
import redirectsConfig from "./redirects.config";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { authInterrupts: true },
  // Keep URLs of the previous site working
  redirects: async () => redirectsConfig,
  images: {
    domains: ["play-lh.googleusercontent.com"]
  }
};

export default nextConfig;
