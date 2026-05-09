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
      <div className="min-h-screen bg-background flex items-center justify-center">
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
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 fixed inset-y-0 left-0 glass-panel border-r border-white/5 z-30 hidden lg:flex flex-col p-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-10">Admin Panel</div>
          <nav className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2 ml-2">Main</div>
            <a href="/admin" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors font-medium">Overview</a>
            <a href="/admin/users" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors font-medium">Users</a>
            <a href="/admin/pricing" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors font-medium">Pricing</a>
            <a href="/admin/audit" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors font-medium">Audit Logs</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
