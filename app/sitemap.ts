
import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://afenta.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,               lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/#services`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#cases`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/#contact`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }
  ];
}
