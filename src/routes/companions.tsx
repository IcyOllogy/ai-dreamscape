import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/companions")({
  component: () => <Outlet />,
});
