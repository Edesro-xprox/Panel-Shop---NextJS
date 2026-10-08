import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "s9xc6vbawctjjwbh.public.blob.vercel-storage.com" }],
    dangerouslyAllowLocalIP: true,
  }
};

export default nextConfig;
