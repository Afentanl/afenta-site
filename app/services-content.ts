//services-content.ts
/* Contenidos + destinos de cada servicio (EN / NL) */
export type ServiceItem = { title: string; items: string[]; href: string };

export const ServicesContent: Record<"en" | "nl", ServiceItem[]> = {
  en: [
    {
      title: "Marketing & Branding",
      href: "/services/marketing", // o "#marketing"
      items: [
        "Social media campaigns",
        "SEO/SEA optimization",
        "Content creation (photo, video, AI)",
        "Web design & branding",
      ],
    },
    {
      title: "Technology & Web Development",
      href: "/services/technology", // o "#technology"
      items: [
        "Websites & shops",
        "Backend & API integration",
        "Automation (workflows, CRM, email, billing)",
        "Cloud solutions",
      ],
    },
    {
      title: "Data & Analytics",
      href: "/services/data", // o "#data"
      items: [
        "Data analysis & reporting",
        "KPI dashboards",
        "Market & customer behavior analysis",
        "Predictive models (with AI)",
      ],
    },
    {
      title: "Cybersecurity & Protection",
      href: "/services/cybersecurity", // o "#cybersecurity"
      items: [
        "Website & server security",
        "Monitoring & penetration testing",
        "Security consulting for SMBs",
        "Awareness training for teams",
      ],
    },
    {
      title: "AI Solutions",
      href: "/services/ai", // o "#ai"
      items: [
        "AI chatbots & customer support",
        "Automatic content generation",
        "Data optimization with AI",
        "AI tool integration in processes",
      ],
    },
  ],
  nl: [
    {
      title: "Marketing & Branding",
      href: "/services/marketing", // of "#marketing"
      items: [
        "Social media campagnes",
        "SEO/SEA optimalisatie",
        "Contentcreatie (foto, video, AI)",
        "Webdesign & branding",
      ],
    },
    {
      title: "Technologie & Webontwikkeling",
      href: "/services/technology", // of "#technology"
      items: [
        "Websites en webshops",
        "Backend & API-integratie",
        "Automatisering (workflows, CRM, mail, facturatie)",
        "Cloudoplossingen",
      ],
    },
    {
      title: "Data & Analyse",
      href: "/services/data", // of "#data"
      items: [
        "Data-analyse & rapportages",
        "Dashboards voor KPI’s",
        "Markt- en klantgedrag analyses",
        "Voorspellende modellen (met AI)",
      ],
    },
    {
      title: "Cybersecurity & Bescherming",
      href: "/services/cybersecurity", // of "#cybersecurity"
      items: [
        "Website & server beveiliging",
        "Monitoring & penetratietesten",
        "Beveiligingsadvies voor MKB",
        "Awareness-training voor teams",
      ],
    },
    {
      title: "AI-oplossingen",
      href: "/services/ai", // of "#ai"
      items: [
        "AI-chatbots & klantenservice",
        "Automatische contentgeneratie",
        "Data-optimalisatie met AI",
        "Integratie van AI-tools in processen",
      ],
    },
  ],
};
