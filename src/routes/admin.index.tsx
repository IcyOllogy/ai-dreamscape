import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, CreditCard, Activity, TrendingUp, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    try {
      const { data, error } = await supabase
        .from("v_admin_metrics")
        .select("*")
        .single();

      if (error) throw error;
      setMetrics(data);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { 
      label: "Total Users", 
      value: metrics?.total_users ?? "0", 
      icon: Users, 
      color: "text-blue-400" 
    },
    { 
      label: "Active Sessions", 
      value: metrics?.active_sessions ?? "0", 
      icon: Activity, 
      color: "text-emerald-400" 
    },
    { 
      label: "Token Revenue", 
      value: `$${metrics?.total_revenue?.toLocaleString() ?? "0"}`, 
      icon: CreditCard, 
      color: "text-primary" 
    },
    { 
      label: "Churn Rate (30d)", 
      value: metrics?.total_users > 0 
        ? `${((metrics?.churned_users / metrics?.total_users) * 100).toFixed(1)}%` 
        : "0%", 
      icon: AlertTriangle, 
      color: "text-red-400" 
    },
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
              <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Live</div>
            </div>
            <div className="text-2xl font-black mb-1">
              {loading ? <div className="h-8 w-16 bg-white/5 animate-pulse rounded" /> : s.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity Chart Mockup */}
      <div className="glass-panel p-8 rounded-3xl border-white/5 h-[400px] flex flex-col items-center justify-center text-center">
        <TrendingUp className="w-12 h-12 text-zinc-800 mb-4 animate-pulse" />
        <div className="text-sm font-bold text-zinc-600 uppercase tracking-[0.3em]">Traffic Neural Map</div>
        <p className="text-xs text-zinc-700 mt-2 italic">Historical snapshot data is being aggregated...</p>
      </div>
    </div>
  );
}
