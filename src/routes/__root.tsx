import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import appCss from "../styles.css?url";
import { AgeGate } from "@/components/site/AgeGate";
import { Navigation } from "@/components/site/Navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PlatformBanner } from "@/components/site/PlatformBanner";
import { MaintenanceOverlay } from "@/components/site/MaintenanceOverlay";
import * as Sentry from "@sentry/react";
import { useAuth, Profile } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";

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


interface MyRouterContext {
  queryClient: QueryClient;
  auth: {
    profile: Profile | null;
    loading: boolean;
  };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { title: "Dreamscape — Your AI Fantasy" },
      { name: "description", content: "The most realistic AI companionship platform. Private, high-fidelity, and incredibly real. 18+." },
      { name: "theme-color", content: "#020202" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:title", content: "Dreamscape — Your AI Fantasy" },
      { property: "og:description", content: "Meet the girl of your dreams in high-fidelity AI realism." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://ai-dreamscape.com/og-proxy?name=Dreamscape" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ai-dreamscape.com/og-proxy?name=Dreamscape" },
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const auth = useAuth();
  const router = useRouter();
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    // Check maintenance mode on mount and listen for changes
    const checkMaintenance = async () => {
      const { data } = await supabase
        .from('platform_settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .single();
      
      if (data) setMaintenance(Boolean(data.value));
    };

    checkMaintenance();

    const channel = supabase
      .channel(`platform_settings_changes_${Date.now()}`)
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'platform_settings' }, (payload) => {
        if (payload.new.key === 'maintenance_mode') {
          setMaintenance(Boolean(payload.new.value));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync auth state to router context so beforeLoad guards can use it
  useEffect(() => {
    router.update({
      context: {
        ...router.options.context,
        auth: {
          profile: auth.profile,
          loading: auth.loading,
        },
      },
    } as any);
  }, [auth.profile, auth.loading, router]);

  // Block non-admins if maintenance is active
  const isMaintenanceBlocked = maintenance && auth.profile?.role !== 'admin';
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="ambient-glow top-[-10%] left-[-10%] w-[40%] h-[40%]" />
      <div className="ambient-glow bottom-[-10%] right-[-10%] w-[50%] h-[50%] opacity-10" />
      {isMaintenanceBlocked && <MaintenanceOverlay />}
      <PlatformBanner />
      <AgeGate />
      <Toaster position="top-left" expand={true} richColors closeButton />
      <AppLayout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={useLocation().key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 25, 
              mass: 1.2 
            }}
            className="h-full w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </AppLayout>
    </QueryClientProvider>
  );
}
