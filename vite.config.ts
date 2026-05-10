// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "AI Dreamscape",
          short_name: "Dreamscape",
          description: "Premium AI Companionship Experience",
          theme_color: "#020202",
          background_color: "#020202",
          display: "standalone",
          icons: [
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
      sentryVitePlugin({
        org: process.env.SENTRY_ORG || "ai-dreamscape",
        project: process.env.SENTRY_PROJECT || "ai-dreamscape",
        authToken: process.env.SENTRY_AUTH_TOKEN,
        telemetry: false,
      }),
    ],
    build: {
      sourcemap: true,
    },
  },
});
