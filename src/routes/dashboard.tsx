import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.auth.loading && !context.auth.profile) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardLayout,
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
            <a href="/dashboard" className="block px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-primary">Overview</a>
            <a href="/dashboard/transactions" className="block px-6 py-4 rounded-2xl hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Transaction Ledger</a>
            <a href="/pricing" className="block px-6 py-4 rounded-2xl hover:bg-white/5 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all">Upgrade Tier</a>
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
