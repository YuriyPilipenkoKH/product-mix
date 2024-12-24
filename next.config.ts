import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose environment variables to the client
  env: {
    NAMES_TO_AVOID: process.env.NAMES_TO_AVOID || "",
  },

};

export default nextConfig;
