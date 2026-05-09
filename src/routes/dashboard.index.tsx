import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Coins, Shield, Calendar, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

function DashboardOverview() {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Token Balance Card */}
        <div className="glass-panel p-8 rounded-3xl border-primary/20 bg-primary/5 shadow-neon/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Coins className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-4">Neural Tokens</div>
            <div className="text-5xl font-black tracking-tighter mb-2">{profile.tokens_balance}</div>
            <p className="text-xs text-muted-foreground italic">Available for generation and interaction.</p>
            <button className="mt-8 px-6 py-3 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest hover:shadow-neon transition-all">
              Top Up
            </button>
          </div>
        </div>

        {/* Membership Card */}
        <div className="glass-panel p-8 rounded-3xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
            <Sparkles className="w-24 h-24 text-zinc-500" />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-500 mb-4">Current Status</div>
            <div className="text-3xl font-black tracking-tighter mb-2 uppercase italic">{profile.role.replace('_', ' ')}</div>
            <p className="text-xs text-muted-foreground italic">Member since {new Date(profile.created_at).toLocaleDateString()}.</p>
            <button className="mt-10 text-[10px] uppercase tracking-[0.2em] font-black text-primary hover:underline">
              View Tier Benefits
            </button>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="glass-panel p-8 rounded-3xl border-white/5">
        <h3 className="text-lg font-black tracking-tighter mb-6 flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" /> Profile Integrity
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Username</span>
              <span className="text-sm font-bold text-white">@{profile.username || 'unassigned'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Display Name</span>
              <span className="text-sm font-bold text-white">{profile.display_name || 'Guest User'}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Age Verification</span>
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Verified
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Next Replenishment</span>
              <span className="text-sm font-bold text-white">May 24, 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
