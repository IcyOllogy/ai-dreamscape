import * as Sentry from "@sentry/cloudflare";

export function initSentryServer() {
  const dsn = process.env.VITE_SENTRY_DSN || process.env.SENTRY_DSN;
  
  if (!dsn) {
    console.warn("Sentry DSN is not defined. Sentry server initialization skipped.");
    return;
  }

  Sentry.init({
    dsn,
    // Performance Monitoring
    tracesSampleRate: 1.0, 
  });
}
