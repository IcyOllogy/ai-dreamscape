import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { initSentryClient } from "./lib/sentry-client";

initSentryClient();

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { 
      queryClient,
      auth: {
        profile: null,
        loading: true,
      }
    },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
