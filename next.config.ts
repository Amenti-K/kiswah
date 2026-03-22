import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  eslint: {
    // ✅ Vercel won’t fail build because of ESLint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
