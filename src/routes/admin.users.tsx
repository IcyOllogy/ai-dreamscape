import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Profile, UserRole } from "@/hooks/useAuth";
import { Search, Shield, Ban, UserCheck, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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
      fetchUsers();
    } catch (error) {
      console.error("Error updating role:", error);
    }
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
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by @username or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-primary w-full md:w-80"
          />
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
                  <tr key={u.id} className="hover:bg-white/[0.01] transition-colors group">
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
                          <div className="text-sm font-bold text-white">@{u.username || 'ghost_user'}</div>
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
                      <div className="text-sm font-bold text-zinc-300">{u.tokens_balance}</div>
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
                        <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-red-500 transition-colors" title="Ban User">
                          <Ban className="w-4 h-4" />
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
    </div>
  );
}
