import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({enabled: process.env.ANALYZE === "true"});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {key: "Content-Security-Policy",
  value: [
    "default-src 'self';",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com;",
    "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com;",
    "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;",
    "style-src 'self' 'unsafe-inline';",
    "font-src 'self' data:;",
    "frame-src https://www.googletagmanager.com;",
  ].join(" "),
}
        ],
          
              },
    ];
  },
  // opcional: si usas imágenes externas, define dominios aquí
  // images: { domains: ["tu-dominio.cdn.com"] },
};

export default withBundleAnalyzer(nextConfig);
