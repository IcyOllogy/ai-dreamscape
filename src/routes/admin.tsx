import { createFileRoute, Outlet, redirect, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    if (!context.auth.loading && context.auth.profile?.role !== 'admin') {
      throw redirect({ to: "/unauthorized" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-[10px] uppercase tracking-[0.4em] text-primary animate-pulse font-black">
          Authenticating Clearance...
        </div>
      </div>
    );
  }

  if (auth.profile?.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="p-8">
      <Outlet />
    </div>
  );
}
