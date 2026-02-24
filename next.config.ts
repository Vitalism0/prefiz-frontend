import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "unsplash.com" },

      { protocol: "https", hostname: "images.unsplash.com" },

      { protocol: "https", hostname: "source.unsplash.com" },

      { protocol: "http", hostname: "localhost", port: "5000" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
