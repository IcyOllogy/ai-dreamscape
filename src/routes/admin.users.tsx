import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Profile, UserRole } from "@/hooks/useAuth";
import { Search, Shield, Ban, UserCheck, MoreHorizontal, Download, Plus, Minus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [adjustingTokens, setAdjustingTokens] = useState<Profile | null>(null);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [adjustReason, setAdjustReason] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data as Profile[]);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateRole(userId: string, newRole: UserRole) {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  }

  async function toggleBan(user: Profile) {
    const action = user.is_banned ? "Unban" : "Ban";
    if (!confirm(`Are you sure you want to ${action} @${user.username}?`)) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_banned: !user.is_banned })
        .eq("id", user.id);

      if (error) throw error;
      toast.success(`User ${user.is_banned ? 'unbanned' : 'banned'}`);
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${action} user`);
    }
  }

  async function adjustTokens() {
    if (!adjustingTokens) return;
    if (tokenAmount === 0) return toast.error("Amount cannot be zero");
    if (!adjustReason) return toast.error("Reason is required for auditing");

    try {
      const newBalance = (adjustingTokens.tokens_balance || 0) + tokenAmount;
      
      // 1. Update Profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ tokens_balance: newBalance })
        .eq("id", adjustingTokens.id);

      if (profileError) throw profileError;

      // 2. Log Transaction
      const { error: txError } = await supabase
        .from("token_transactions")
        .insert({
          user_id: adjustingTokens.id,
          amount: tokenAmount,
          type: tokenAmount > 0 ? 'replenishment' : 'refund',
          description: `Admin Adjustment: ${adjustReason}`
        });

      if (txError) throw txError;

      toast.success(`Adjusted balance for @${adjustingTokens.username}`);
      setAdjustingTokens(null);
      setTokenAmount(0);
      setAdjustReason("");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to adjust tokens");
      console.error(error);
    }
  }

  function exportCSV() {
    const headers = ["ID", "Username", "Email", "Role", "Tokens", "Banned", "Joined"];
    const rows = users.map(u => [
      u.id,
      u.username || "N/A",
      "HIDDEN", // For privacy in this export demo
      u.role,
      u.tokens_balance,
      u.is_banned,
      u.created_at
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `dreamscape_users_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const filteredUsers = users.filter((u) => 
    u.username?.toLowerCase().includes(search.toLowerCase()) || 
    u.id.includes(search)
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">User Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage access across the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportCSV}
            className="p-3 rounded-2xl border border-white/10 hover:bg-white/5 text-zinc-400 transition-colors"
            title="Export CSV"
          >
            <Download className="w-5 h-5" />
          </button>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by @username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-64"
            />
          </div>
        </div>
      </header>

      <div className="glass-panel rounded-3xl border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">User</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Role</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Tokens</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Joined</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-600 animate-pulse italic">Neural scan in progress...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-20 text-center text-zinc-600 italic">No entities found in this sector.</td></tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className={`hover:bg-white/[0.01] transition-colors group ${u.is_banned ? 'opacity-40 grayscale' : ''}`}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/10 overflow-hidden">
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Shield className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            @{u.username || 'ghost_user'}
                            {u.is_banned && <span className="ml-2 text-[8px] text-red-500 font-black uppercase">Banned</span>}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate w-32">{u.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        u.role === 'admin' ? 'bg-primary/10 border-primary/50 text-primary' :
                        u.role === 'vip_member' ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' :
                        'bg-zinc-500/10 border-zinc-500/50 text-zinc-400'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold text-zinc-300">{u.tokens_balance}</div>
                        <button 
                          onClick={() => setAdjustingTokens(u)}
                          className="p-1 rounded bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Plus className="w-3 h-3 text-primary" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[10px] text-zinc-500 font-medium">
                        {new Date(u.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => updateRole(u.id, u.role === 'admin' ? 'free_member' : 'admin')}
                          className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-primary transition-colors"
                          title="Toggle Admin"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleBan(u)}
                          className={`p-2 rounded-lg hover:bg-white/5 transition-colors ${u.is_banned ? 'text-emerald-500' : 'text-zinc-500 hover:text-red-500'}`}
                          title={u.is_banned ? "Unban" : "Ban"}
                        >
                          {u.is_banned ? <UserCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Adjustment Modal */}
      {adjustingTokens && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setAdjustingTokens(null)} />
          <div className="relative glass-panel p-8 rounded-3xl border-white/10 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black tracking-tight">Adjust Tokens</h2>
              <button onClick={() => setAdjustingTokens(null)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-8 py-4 bg-white/5 rounded-2xl border border-white/5">
                <button onClick={() => setTokenAmount(prev => prev - 100)} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-500 transition-colors">
                  <Minus className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <div className="text-3xl font-black">{tokenAmount > 0 ? `+${tokenAmount}` : tokenAmount}</div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Adjustment</div>
                </div>
                <button onClick={() => setTokenAmount(prev => prev + 100)} className="p-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 text-emerald-500 transition-colors">
                  <Plus className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Audit Reason</label>
                <textarea 
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="e.g. Compensation for failed generation"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary h-24 resize-none"
                />
              </div>

              <button 
                onClick={adjustTokens}
                className="w-full neon-button py-4 text-xs uppercase tracking-widest font-black"
              >
                Apply Correction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
