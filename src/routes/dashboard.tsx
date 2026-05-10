import { createFileRoute, Outlet, redirect, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.loading && !context.auth.profile) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardLayout,
  notFoundComponent: () => (
    <div className="p-12 text-center glass-panel rounded-3xl border-white/5">
      <h3 className="text-xl font-bold text-white mb-2">Sector Not Found</h3>
      <p className="text-zinc-500 text-sm mb-6">This part of your dreamscape is currently inaccessible.</p>
      <Link to="/dashboard/" className="px-6 py-2 bg-primary text-black text-xs font-black uppercase tracking-widest rounded-xl">Return to Overview</Link>
    </div>
  )
});

function DashboardLayout() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <header className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-2">Member Portal</div>
          <h1 className="text-4xl font-black tracking-tighter">Your Dreamscape</h1>
        </header>
        
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Dashboard Sub-nav */}
          <aside className="lg:col-span-1 space-y-2">
            <Link 
              to="/dashboard/" 
              activeProps={{ className: "bg-white/10 text-primary border-white/10" }}
              inactiveProps={{ className: "text-zinc-500 hover:text-white hover:bg-white/5 border-transparent" }}
              className="block px-6 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all"
            >
              Overview
            </Link>
            <Link 
              to="/dashboard/transactions" 
              activeProps={{ className: "bg-white/10 text-primary border-white/10" }}
              inactiveProps={{ className: "text-zinc-500 hover:text-white hover:bg-white/5 border-transparent" }}
              className="block px-6 py-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all"
            >
              Transaction Ledger
            </Link>
            <Link 
              to="/pricing" 
              className="block px-6 py-4 rounded-2xl hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all border border-transparent"
            >
              Upgrade Tier
            </Link>
          </aside>

          {/* Sub-route Content */}
          <main className="lg:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
