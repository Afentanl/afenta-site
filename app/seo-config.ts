// app/seo-config.ts
import type { Metadata } from "next";

/**
 * Ajusta TU dominio de producción aquí.
 * Si aún no tienes dominio, deja el vercel.app temporal o localhost.
 */
export const siteUrl = "https://afenta.nl"; // <- cámbialo

export const brand = {
    name: "Afenta",
    tagline: "Brand · Websites · Performance",
    description:
    "We blend brand, websites and always-on performance to turn vision into measurable growth.",
    locale: "en_US",
};

/**
 * Imágenes esperadas en /public (puedes cambiar nombres/rutas si quieres):
 * - /favicon.ico
 * - /icon-192.png
 * - /icon-512.png
 * - /apple-touch-icon.png
 * - /og.png                (1200×630 recomendado)
 *
 * Si todavía no existen, la web compilará igual; solo no se verán esos assets.
 */
export const baseMetadata: Metadata = {
    metadataBase: new URL(siteUrl),

  // Title con plantilla (sobrescribible por página)
    title: {
    default: `${brand.name} — ${brand.tagline}`,
    template: `%s · ${brand.name}`,
    },

    description: brand.description,
    applicationName: brand.name,
    keywords: [
    "branding",
    "identity",
    "design system",
    "website",
    "Next.js",
    "performance",
    "CRO",
    "SEO",
    "analytics",
    "paid media",
    ],
    authors: [{ name: brand.name }],

  // Canonical y alternates básicos
    alternates: {
    canonical: "/",
    languages: {
        "en": "/",
        "nl": "/?lang=nl",
    },
    },

  // Iconos
    icons: {
    icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
    },

  // Open Graph (para Facebook, LinkedIn, etc.)
    openGraph: {
    type: "website",
    url: siteUrl,
    siteName: brand.name,
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    locale: brand.locale,
    images: [
        {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${brand.name} — ${brand.tagline}`,
        },
    ],
    },

  // Twitter cards
    twitter: {
    card: "summary_large_image",
    site: "@", // tu @ si tienes
    creator: "@", // tu @ si tienes
    title: `${brand.name} — ${brand.tagline}`,
    description: brand.description,
    images: ["/og.png"],
    },

  // Robots/Googlebot (OJO: claves en kebab-case)
    robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
    },
    },

  // Manifest opcional (si luego lo creas)
    manifest: "/site.webmanifest",

    category: "technology",
};
