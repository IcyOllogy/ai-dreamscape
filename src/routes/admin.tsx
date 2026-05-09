import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ context }) => {
    // If auth is still loading, we might need to wait or handle it.
    // However, in a real app, you'd want to check this on the server or via a persistent session.
    if (!context.auth.loading && context.auth.profile?.role !== 'admin') {
      // Throwing 404 behavior: In TanStack Router, we can't easily "spoof" a 404 for a defined route
      // without some tricks. A common way is to redirect to a special 404-renderer or just
      // throw an error that the errorComponent handles.
      // But the USER explicitly wants a 404.
      throw new Error("NOT_FOUND");
    }
  },
  errorComponent: ({ error }) => {
    if (error.message === "NOT_FOUND") {
      // Render the same 404 content as the root's notFoundComponent
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-primary mb-6">Dreamscape</div>
            <h1 className="font-display text-7xl text-white">404</h1>
            <p className="mt-4 text-sm text-muted-foreground">This fantasy has slipped away.</p>
            <a href="/" className="mt-8 inline-block px-10 py-4 neon-button">Back to Reality</a>
          </div>
        </div>
      );
    }
    return <div>Admin Error: {error.message}</div>;
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 fixed inset-y-0 left-0 glass-panel border-r border-white/5 z-30 hidden lg:flex flex-col p-6">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-10">Admin Panel</div>
          <nav className="space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2 ml-2">Main</div>
            <a href="/admin" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors">Overview</a>
            <a href="/admin/users" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors">Users</a>
            <a href="/admin/pricing" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors">Pricing</a>
            <a href="/admin/audit" className="block px-4 py-3 rounded-xl hover:bg-white/5 text-sm transition-colors">Audit Logs</a>
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
