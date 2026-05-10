import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  CreditCard, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Globe, 
  Clock, 
  RefreshCw,
  Zap,
  History
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminOverview,
});

function AdminOverview() {
  const [metrics, setMetrics] = useState<any>(null);
  const [growth, setGrowth] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
    
    // Polling interval (30s)
    const interval = setInterval(() => {
      fetchAllData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function fetchAllData(silent = false) {
    if (!silent) setLoading(true);
    setIsRefreshing(true);
    
    try {
      const [
        { data: metricsData },
        { data: growthData },
        { data: activityData },
        { data: countryData },
        { data: logsData }
      ] = await Promise.all([
        supabase.from("v_admin_metrics").select("*").single(),
        supabase.from("v_admin_growth").select("*").order('date', { ascending: true }),
        supabase.from("v_admin_activity").select("*").order('hour', { ascending: true }),
        supabase.from("v_admin_countries").select("*").limit(5),
        supabase.from("admin_audit_logs").select("*").order('created_at', { ascending: false }).limit(5)
      ]);

      setMetrics(metricsData);
      setGrowth(growthData || []);
      setActivity(activityData || []);
      setCountries(countryData || []);
      setAuditLogs(logsData || []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
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
      label: "Active Now", 
      value: metrics?.active_sessions ?? "0", 
      icon: Activity, 
      color: "text-emerald-400" 
    },
    { 
      label: "24h Velocity", 
      value: metrics?.token_velocity_24h ? `⚡ ${metrics.token_velocity_24h.toLocaleString()}` : "0", 
      icon: Zap, 
      color: "text-primary" 
    },
    { 
      label: "Churn Rate", 
      value: metrics?.total_users > 0 
        ? `${((metrics?.churned_users / metrics?.total_users) * 100).toFixed(1)}%` 
        : "0%", 
      icon: AlertTriangle, 
      color: "text-red-400" 
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">System Overview</h1>
          <p className="text-sm text-zinc-500">Real-time platform telemetry.</p>
        </div>
        <button 
          onClick={() => fetchAllData()}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/10 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Syncing...' : 'Force Refresh'}
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`p-2 rounded-lg bg-white/5 ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div className="text-[8px] font-black text-emerald-400/50 uppercase tracking-[0.2em]">Active Telemetry</div>
            </div>
            <div className="text-2xl font-black mb-1 relative z-10">
              {loading ? <div className="h-8 w-16 bg-white/5 animate-pulse rounded" /> : s.value}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 relative z-10">{s.label}</div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest">30d Growth Trends</h3>
            </div>
          </div>
          <div className="h-[250px] flex items-end gap-1 sm:gap-2">
            {growth.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-sm transition-all relative"
                  style={{ height: `${(day.count / Math.max(...growth.map(g => g.count), 1)) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {day.count}
                  </div>
                </div>
                <div className="text-[8px] text-zinc-600 rotate-45 sm:rotate-0">
                  {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Country Breakdown */}
        <div className="glass-panel p-8 rounded-3xl border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Global Reach</h3>
          </div>
          <div className="space-y-6">
            {countries.map((c, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span>{c.country}</span>
                  <span className="text-zinc-500">{c.count} users</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500/50 rounded-full"
                    style={{ width: `${(c.count / (metrics?.total_users || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {countries.length === 0 && <p className="text-xs text-zinc-600 italic">No geographic data available.</p>}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Peak Activity */}
        <div className="glass-panel p-8 rounded-3xl border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Peak Activity (Hourly)</h3>
          </div>
          <div className="grid grid-cols-12 gap-1 h-[100px] items-end">
            {Array.from({ length: 24 }).map((_, h) => {
              const hourData = activity.find(a => Number(a.hour) === h);
              const maxCount = Math.max(...activity.map(a => a.count), 1);
              return (
                <div 
                  key={h} 
                  className="h-full bg-emerald-500/10 hover:bg-emerald-500/30 transition-all rounded-sm relative group"
                  style={{ height: `${((hourData?.count || 0) / maxCount) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}:00 - {hourData?.count || 0}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-[8px] text-zinc-600 uppercase tracking-widest font-bold">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>

        {/* Live Audit Feed */}
        <div className="glass-panel p-8 rounded-3xl border-white/5">
          <div className="flex items-center gap-3 mb-8">
            <History className="w-5 h-5 text-zinc-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Live Audit Feed</h3>
          </div>
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 animate-pulse" />
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-white uppercase tracking-wider">{log.action}</div>
                  <div className="text-[9px] text-zinc-500 mt-0.5 line-clamp-1">
                    {typeof log.metadata === 'string' ? log.metadata : JSON.stringify(log.metadata)}
                  </div>
                </div>
                <div className="text-[8px] text-zinc-600 whitespace-nowrap">
                  {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {auditLogs.length === 0 && <p className="text-xs text-zinc-600 italic">No recent activity detected.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
