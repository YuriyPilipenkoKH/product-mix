import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();


const nextConfig: NextConfig = {
  // Expose environment variables to the client
  env: {
    NAMES_TO_AVOID: process.env.NAMES_TO_AVOID || "",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google OAuth avatars
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // GitHub avatars
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary images
      },
    ],
  },
}



export default withNextIntl(nextConfig);

// domains: [
//   'lh3.googleusercontent.com', // For Google OAuth avatars
//   'githubusercontent.com',     // For GitHub avatars
//   'res.cloudinary.com',        // For Cloudinary images
// ],