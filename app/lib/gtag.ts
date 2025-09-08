/* lib/gtag.ts */
export const GA_ID  = process.env.NEXT_PUBLIC_GA_ID  || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";

declare global {
    interface Window {
    // dataLayer puede recibir objetos de cualquier forma → usamos unknown[]
    dataLayer?: unknown[];
    }
}

/** dataLayer.push helper */
export function dl(event: string, params: Record<string, unknown> = {}) {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
  // Empujamos SIEMPRE un objeto (GA/GTM lo acepta perfectamente)
    window.dataLayer.push({ event, ...params });
}

/** Evento de lead genérico */
export function trackLead(source = "form") {
    dl("generate_lead", { source });
}

/** Snippet de GTM (script) */
export const gtmBootstrap = () => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`;
