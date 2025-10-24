import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://afenta.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/#services`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#cases`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/#contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
