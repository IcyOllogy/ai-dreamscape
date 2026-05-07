import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AgeGate } from "@/components/site/AgeGate";
import { Navigation } from "@/components/site/Navigation";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-6">Noctis</div>
        <h1 className="font-display text-7xl text-ivory">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">This page slipped away in the dark.</p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 text-xs uppercase tracking-[0.25em] bg-primary text-primary-foreground hover:bg-primary/90">Back to the entrance</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-ivory">Something stirred in the shadows.</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-8 px-6 py-3 text-xs uppercase tracking-[0.25em] bg-primary text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noctis — Cinematic AI Companions" },
      { name: "description", content: "A luxe AI companionship platform. Slow conversation, beautiful presence, mature themes. 18+." },
      { name: "theme-color", content: "#020202" },
      { property: "og:title", content: "Noctis — Cinematic AI Companions" },
      { property: "og:description", content: "A luxe AI companionship platform crafted for grown-ups." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>
        <Navigation />
        <main className="md:pl-20 lg:pl-64 pb-16 md:pb-0">
          {children}
        </main>
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AgeGate />
      <Outlet />
    </QueryClientProvider>
  );
}
