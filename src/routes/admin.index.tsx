import { createFileRoute } from "@tanstack/react-router";
import { Users, CreditCard, Activity, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-400" },
    { label: "Active Sessions", value: "42", icon: Activity, color: "text-emerald-400" },
    { label: "Token Revenue", value: "$4,920", icon: CreditCard, color: "text-primary" },
    { label: "Conversion Rate", value: "12.4%", icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <header>
        <h1 className="text-3xl font-black tracking-tighter">System Overview</h1>
        <p className="text-sm text-muted-foreground">Real-time metrics from the Dreamscape engine.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel p-6 rounded-2xl border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">+4.2%</div>
            </div>
            <div className="text-2xl font-black mb-1">{s.value}</div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity Chart Mockup */}
      <div className="glass-panel p-8 rounded-3xl border-white/5 h-[400px] flex flex-col items-center justify-center text-center">
        <Activity className="w-12 h-12 text-zinc-800 mb-4 animate-pulse" />
        <div className="text-sm font-bold text-zinc-600 uppercase tracking-[0.3em]">Traffic Neural Map</div>
        <p className="text-xs text-zinc-700 mt-2 italic">Waiting for real-time telemetry stream...</p>
      </div>
    </div>
  );
}
