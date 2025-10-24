//components analytics.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, GTM_ID, gtmBootstrap, dl } from "../lib/gtag";

export default function Analytics() {
    useEffect(() => { dl("app_loaded"); }, []);

    return (
    <>
      {/* GTM */}
        {GTM_ID && (
        <Script id="gtm" strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gtmBootstrap() }}
        />
    )}

      {/* GA4 directo (opcional si ya usas GTM) */}
        {GA_ID && (
        <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true, transport_type: 'beacon' });
            `
            }} />
        </>
        )}
    </>
    );
}

/** Colócalo al inicio del <body> en layout */
export function GTMNoScript() {
    if (!GTM_ID) return null;
    return (
    <noscript>
        <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0" width="0" style={{ display: "none", visibility: "hidden" }}
        />
    </noscript>
    );
}
