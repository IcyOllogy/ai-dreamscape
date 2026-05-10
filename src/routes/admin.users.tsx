import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Profile, UserRole } from "@/hooks/useAuth";
import { 
  Search, 
  Shield, 
  Ban, 
  UserCheck, 
  MoreHorizontal, 
  Download, 
  Plus, 
  Minus, 
  X, 
  History, 
  FileText, 
  RefreshCw,
  Globe,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [userHistory, setUserHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Token Adjustment state
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

  async function fetchUserHistory(userId: string) {
    setLoadingHistory(true);
    try {
      const { data, error } = await supabase
        .from("token_transactions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setUserHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoadingHistory(false);
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
    if (!selectedUser) return;
    if (tokenAmount === 0) return toast.error("Amount cannot be zero");
    if (!adjustReason) return toast.error("Reason is required for auditing");

    setIsProcessing(true);
    try {
      const newBalance = (selectedUser.tokens_balance || 0) + tokenAmount;
      
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ tokens_balance: newBalance })
        .eq("id", selectedUser.id);

      if (profileError) throw profileError;

      const { error: txError } = await supabase
        .from("token_transactions")
        .insert({
          user_id: selectedUser.id,
          amount: tokenAmount,
          type: tokenAmount > 0 ? 'replenishment' : 'refund',
          description: `Admin Adjustment: ${adjustReason}`
        });

      if (txError) throw txError;

      toast.success(`Adjusted balance for @${selectedUser.username}`);
      setTokenAmount(0);
      setAdjustReason("");
      fetchUsers();
      fetchUserHistory(selectedUser.id);
    } catch (error) {
      toast.error("Failed to adjust tokens");
    } finally {
      setIsProcessing(false);
    }
  }

  async function forceRefill(userId: string) {
    if (!confirm("Are you sure you want to force a manual refill? This will apply the tier's monthly token allowance.")) return;
    
    setIsProcessing(true);
    try {
      const { error } = await supabase.rpc('fn_process_monthly_refills');
      if (error) throw error;
      toast.success("Platform refill cycle executed.");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to execute refill.");
    } finally {
      setIsProcessing(false);
    }
  }

  async function saveAdminNotes(notes: string) {
    if (!selectedUser) return;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ admin_notes: notes })
        .eq("id", selectedUser.id);

      if (error) throw error;
      toast.success("Notes saved.");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to save notes.");
    }
  }

  function exportCSV() {
    const headers = ["ID", "Username", "Role", "Tokens", "Banned", "Country", "Last Active", "Joined"];
    const rows = users.map(u => [
      u.id,
      u.username || "N/A",
      u.role,
      u.tokens_balance,
      u.is_banned,
      u.country || "Unknown",
      u.last_active_at || "Never",
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
    <div className="space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">User Management</h1>
          <p className="text-sm text-zinc-500">Monitor and manage access across the platform.</p>
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
              id="user-search"
              name="user-search"
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
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Activity</th>
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
                          {u.avatar_url && u.avatar_url.startsWith('http') ? (
                            <img src={u.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Shield className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">
                            @{u.username || 'ghost_user'}
                            {u.is_banned && <span className="ml-2 text-[8px] text-red-500 font-black uppercase tracking-tighter">Banned</span>}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{u.country || 'Global'}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                        u.role === 'admin' ? 'bg-primary/10 border-primary/50 text-primary' :
                        u.role === 'vip_member' ? 'bg-purple-500/10 border-purple-500/50 text-purple-400' :
                        u.role === 'pro_member' ? 'bg-blue-500/10 border-blue-500/50 text-blue-400' :
                        'bg-zinc-500/10 border-zinc-500/50 text-zinc-400'
                      }`}>
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm font-bold text-zinc-300">{u.tokens_balance.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          u.last_active_at && (new Date().getTime() - new Date(u.last_active_at).getTime() < 600000) 
                            ? 'bg-emerald-500 animate-pulse' 
                            : 'bg-zinc-700'
                        }`} />
                        <span className="text-[10px] text-zinc-500 font-medium">
                          {u.last_active_at ? new Date(u.last_active_at).toLocaleTimeString() : 'Offline'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            fetchUserHistory(u.id);
                          }}
                          className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                          title="Manage User"
                        >
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

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedUser(null)} />
          <div className="relative glass-panel rounded-[2.5rem] border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
                  {selectedUser.avatar_url && selectedUser.avatar_url.startsWith('http') ? (
                    <img src={selectedUser.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Shield className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter">@{selectedUser.username}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{selectedUser.id}</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{selectedUser.role}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto grid md:grid-cols-2 gap-8 p-8">
              {/* Left Column: Moderation & Notes */}
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Moderation Controls
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => toggleBan(selectedUser)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-3xl border transition-all ${
                        selectedUser.is_banned 
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20' 
                          : 'bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      {selectedUser.is_banned ? <UserCheck className="w-6 h-6" /> : <Ban className="w-6 h-6" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{selectedUser.is_banned ? 'Unban Entity' : 'Ban Entity'}</span>
                    </button>
                    <button 
                      onClick={() => updateRole(selectedUser.id, selectedUser.role === 'admin' ? 'free_member' : 'admin')}
                      className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-zinc-400 hover:text-primary"
                    >
                      <Shield className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Admin Toggle</span>
                    </button>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <FileText className="w-3 h-3" /> <label htmlFor="admin-notes">Internal Admin Notes</label>
                  </h3>
                  <textarea 
                    id="admin-notes"
                    name="admin-notes"
                    defaultValue={selectedUser.admin_notes || ''}
                    onBlur={(e) => saveAdminNotes(e.target.value)}
                    placeholder="Document user behavior, infractions, or special VIP status details..."
                    className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-sm focus:outline-none focus:border-primary h-40 resize-none transition-all hover:bg-white/[0.07]"
                  />
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <RefreshCw className="w-3 h-3" /> System Actions
                  </h3>
                  <button 
                    onClick={() => forceRefill(selectedUser.id)}
                    disabled={isProcessing}
                    className="w-full p-6 rounded-3xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-left group flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors">Force Token Refill</div>
                      <div className="text-[9px] text-zinc-600 mt-1 font-medium">Manually trigger the monthly allowance cycle.</div>
                    </div>
                    <RefreshCw className={`w-5 h-5 text-zinc-700 group-hover:text-primary transition-all ${isProcessing ? 'animate-spin' : ''}`} />
                  </button>
                </section>
              </div>

              {/* Right Column: Tokens & History */}
              <div className="space-y-8">
                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Token Management</h3>
                  <div className="glass-panel p-8 rounded-3xl border-white/10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-zinc-500">Current Balance</span>
                      <span className="text-2xl font-black text-primary">{selectedUser.tokens_balance.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Label htmlFor="token-amount" className="sr-only">Token Amount</Label>
                      <input 
                        id="token-amount"
                        name="token-amount"
                        type="number"
                        placeholder="Amount..."
                        value={tokenAmount || ''}
                        onChange={(e) => setTokenAmount(Number(e.target.value))}
                        className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adjust-reason" className="sr-only">Audit Reason</Label>
                      <textarea 
                        id="adjust-reason"
                        name="adjust-reason"
                        placeholder="Audit Reason..."
                        value={adjustReason}
                        onChange={(e) => setAdjustReason(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-primary h-20 resize-none"
                      />
                    </div>
                    <button 
                      onClick={adjustTokens}
                      disabled={isProcessing}
                      className="w-full neon-button py-4 text-[10px] uppercase tracking-[0.3em] font-black disabled:opacity-50"
                    >
                      Execute Adjustment
                    </button>
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 flex items-center gap-2">
                    <History className="w-3 h-3" /> Recent Transactions
                  </h3>
                  <div className="space-y-3">
                    {loadingHistory ? (
                      <div className="text-center py-10 animate-pulse text-zinc-600 italic text-[10px]">Scanning ledger...</div>
                    ) : userHistory.length === 0 ? (
                      <div className="text-center py-10 text-zinc-700 italic text-[10px]">No transaction history found.</div>
                    ) : (
                      userHistory.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-wider text-white line-clamp-1">{tx.description}</div>
                            <div className="text-[8px] text-zinc-600 mt-0.5">{new Date(tx.created_at).toLocaleString()}</div>
                          </div>
                          <div className={`text-[10px] font-black ${tx.amount >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {tx.amount >= 0 ? '+' : ''}{tx.amount}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
