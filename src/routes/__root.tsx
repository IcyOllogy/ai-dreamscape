import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AgeGate } from "@/components/site/AgeGate";
import { Navigation } from "@/components/site/Navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import * as Sentry from "@sentry/react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-primary mb-6">Dreamscape</div>
        <h1 className="font-display text-7xl text-white">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">This fantasy has slipped away.</p>
        <Link to="/" className="mt-8 inline-block px-10 py-4 neon-button">Back to Reality</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const eventId = Sentry.captureException(error);
  const router = useRouter();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-white">Something shifted in the Dreamscape.</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={() => { router.invalidate(); reset(); }} className="px-10 py-4 neon-button">Try again</button>
          <button onClick={() => Sentry.showReportDialog({ eventId })} className="px-6 py-4 border border-primary/50 text-white rounded-md hover:bg-primary/10 transition-colors">Report Bug</button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dreamscape — Your AI Fantasy" },
      { name: "description", content: "The most realistic AI companionship platform. Private, high-fidelity, and incredibly real. 18+." },
      { name: "theme-color", content: "#020202" },
      { property: "og:title", content: "Dreamscape — Your AI Fantasy" },
      { property: "og:description", content: "Meet the girl of your dreams in high-fidelity AI realism." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap",
      },
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
      <head>
        <HeadContent />
      </head>
      <body>
        <Navigation />
        <main className="md:pl-20 lg:pl-64 pb-16 md:pb-0">
          {children}
          <SiteFooter />
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
