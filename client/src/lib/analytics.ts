// Google Analytics 4, switched on only when VITE_GA_MEASUREMENT_ID is set
// (a GA measurement ID is public, not a secret). With no ID, nothing loads.
// Events carry no personal or health details: only which button or tab was used.

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? "").trim();
let started = false;

export function initAnalytics() {
  if (!GA_ID || started || typeof window === "undefined") return;
  started = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself on the data layer
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID);
}

export function track(event: string, params: Record<string, string> = {}) {
  if (!GA_ID || !window.gtag) return;
  window.gtag("event", event, params);
}
