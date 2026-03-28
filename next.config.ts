import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Mniej rywalizacji o pliki `.tmp` w `.next` na Windows (koszt: wolniejszy pierwszy start dev). */
  experimental: {
    turbopackPersistentCaching: false,
  },
  /** Zezwalaj na ładowanie zasobów `/_next/*` z telefonu / innego PC w LAN (np. 192.168.x.x:3000). */
  allowedDevOrigins: ["192.168.88.152", "127.0.0.1", "localhost"],
  /**
   * `npm run dev` używa Turbopack (bez webpackowego cache na dysku — mniej błędów na Windows).
   * Poniższe dotyczy trybu `dev:webpack` oraz buildu produkcyjnego (`next build`).
   */
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
