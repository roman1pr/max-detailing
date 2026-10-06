import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1280, 1920],
    imageSizes: [96, 128, 256, 384, 640],
  },
};

export default nextConfig;
