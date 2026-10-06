import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the same Wi‑Fi load the dev JS (otherwise it never hydrates).
  allowedDevOrigins: ["192.168.*.*", "10.0.*.*", "172.16.*.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dur23cis9/**",
      },
    ],
  },
};

export default nextConfig;
