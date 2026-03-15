import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "zjateuasbhzewhsbvowz.supabase.co" },
    ],
  },
};

export default nextConfig;
