import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// CSP definida aparte para que sea más legible
const ContentSecurityPolicy = [
  "default-src 'self';",
  // scripts (GTAG, GA, respond.io, Vercel analytics)
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.respond.io https://va.vercel-scripts.com;",
  // conexiones (fetch/XHR) → añadimos cdn.respond.io y cdn.chatapi.net
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://cdn.respond.io https://va.vercel-scripts.com https://cdn.chatapi.net;",
  // imágenes
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com;",
  // estilos
  "style-src 'self' 'unsafe-inline';",
  // fuentes
  "font-src 'self' data:;",
  // iframes → añadimos cdn.respond.io
  "frame-src 'self' https://www.googletagmanager.com https://cdn.respond.io;",
].join(" ");

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
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
        ],
      },
    ];
  },
  // images: { domains: ["..."] },
};

export default withBundleAnalyzer(nextConfig);
