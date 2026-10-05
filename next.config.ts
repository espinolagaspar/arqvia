import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // "Nosotros" es ahora una sección de la home.
      { source: "/nosotros", destination: "/#nosotros", permanent: false },
    ];
  },
};

export default nextConfig;
