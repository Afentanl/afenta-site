"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GA_ID, GTM_ID, gtmBootstrap, dl } from "../lib/gtag";

type Consent = { analytics: boolean; marketing: boolean };

export default function Analytics({ consent }: { consent: Consent }) {
  useEffect(() => { dl("app_loaded"); }, []);

  // Construimos el JS que ajusta el consentimiento
  const consentJS = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    // Predeterminado: todo denegado
    gtag('consent','default',{
      'analytics_storage':'denied',
      'ad_storage':'denied',
      'ad_user_data':'denied',
      'ad_personalization':'denied'
    });
    // Actualizamos según el usuario
    gtag('consent','update',{
      'analytics_storage': '${consent.analytics ? "granted" : "denied"}',
      'ad_storage': '${consent.marketing ? "granted" : "denied"}',
      'ad_user_data': '${consent.marketing ? "granted" : "denied"}',
      'ad_personalization': '${consent.marketing ? "granted" : "denied"}'
    });
  `;

  return (
    <>
      {/* GTM (carga contenedor) */}
      {GTM_ID && (
        <>
          <Script id="gtm" strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: gtmBootstrap() }}
          />
          <Script id="gtm-consent" strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: consentJS }}
          />
        </>
      )}

      {/* GA4 directo (si lo usas además de GTM) */}
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${consentJS}
              gtag('config', '${GA_ID}', { anonymize_ip: true, transport_type: 'beacon' });
            `
          }} />
        </>
      )}
    </>
  );
}
