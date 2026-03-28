import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Na Windows (OneDrive/antywirus) dyskowy cache Webpacka potrafi się rozjechać — pamięć zamiast .pack.gz. */
  webpack: (config, { dev }) => {
    if (dev) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- webpack types nie są zależnością projektu
      (config as any).cache = { type: "memory" };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
};

export default nextConfig;
