import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  Sparkles, 
  Megaphone, 
  Check, 
  Settings, 
  ShieldAlert, 
  Percent,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pricing")({
  component: AdminPricing,
});

interface PricingPlan {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  sale_price_monthly: number | null;
  sale_price_yearly: number | null;
  tokens_included: number;
  features: string[];
  is_featured: boolean;
  discount_label: string | null;
}

function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  
  // Platform Settings
  const [globalSalePercent, setGlobalSalePercent] = useState(0);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    fetchPlans();
    fetchSettings();
  }, []);

  async function fetchPlans() {
    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("price_monthly", { ascending: true });

      if (error) throw error;
      setPlans(data as PricingPlan[]);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSettings() {
    try {
      const { data, error } = await supabase.from("platform_settings").select("*");
      if (error) throw error;
      
      const sale = data.find(s => s.key === 'global_sale_percentage')?.value;
      const maint = data.find(s => s.key === 'maintenance_mode')?.value;
      const announce = data.find(s => s.key === 'global_announcement')?.value;
      
      if (sale !== undefined) {
        const val = typeof sale === 'object' && sale !== null ? (sale as any).value : sale;
        setGlobalSalePercent(Number(val) || 0);
      }
      if (maint !== undefined) setMaintenanceMode(Boolean(typeof maint === 'object' && maint !== null ? (maint as any).value : maint));
      if (announce !== undefined) setAnnouncement(announce?.text || announce?.value || "");
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }

  async function updateSetting(key: string, value: any) {
    try {
      const { error } = await supabase
        .from("platform_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;
      toast.success(`${key.replace(/_/g, ' ')} updated.`);
      fetchSettings();
    } catch (error) {
      toast.error("Failed to update setting.");
    }
  }

  async function savePlan(plan: PricingPlan) {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .upsert(plan);

      if (error) throw error;
      toast.success("Pricing plan updated.");
      setEditingPlan(null);
      fetchPlans();
    } catch (error) {
      toast.error("Failed to save plan.");
    }
  }

  async function deletePlan(id: string) {
    if (!confirm("Are you sure you want to delete this plan?")) return;
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Plan deleted.");
      fetchPlans();
    } catch (error) {
      toast.error("Failed to delete plan.");
    }
  }

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Commerce Control</h1>
          <p className="text-sm text-zinc-500">Global sales, maintenance, and tier strategy.</p>
        </div>
        <button 
          onClick={() => setEditingPlan({
            id: crypto.randomUUID(),
            name: "",
            price_monthly: 0,
            price_yearly: 0,
            sale_price_monthly: null,
            sale_price_yearly: null,
            tokens_included: 0,
            features: [],
            is_featured: false,
            discount_label: null
          })}
          className="neon-button px-6 py-3 text-[10px] uppercase tracking-widest flex items-center gap-2"
        >
          <Plus className="w-3 h-3" /> New Tier
        </button>
      </header>

      {/* Global Controls Grid */}
      <section className="grid lg:grid-cols-3 gap-6">
        {/* Global Sale */}
        <div className="glass-panel p-8 rounded-3xl border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <Percent className="w-5 h-5 text-primary" />
            <h2 className="text-sm font-black uppercase tracking-widest">Global Sale Mode</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Discount %</span>
              <input 
                type="number"
                value={globalSalePercent}
                onChange={(e) => setGlobalSalePercent(Number(e.target.value))}
                className="w-16 bg-transparent text-right font-black text-primary text-xl focus:outline-none"
              />
            </div>
            <button 
              onClick={() => updateSetting('global_sale_percentage', globalSalePercent)}
              className="w-full py-4 rounded-2xl bg-primary text-black text-[10px] font-black uppercase tracking-widest hover:shadow-neon transition-all"
            >
              Apply Global Discount
            </button>
            <p className="text-[9px] text-zinc-600 text-center italic">Overrides manual sale prices if set &gt; 0.</p>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className={`glass-panel p-8 rounded-3xl transition-all ${maintenanceMode ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className={`w-5 h-5 ${maintenanceMode ? 'text-red-500' : 'text-zinc-500'}`} />
            <h2 className="text-sm font-black uppercase tracking-widest">Maintenance</h2>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Mode Status</span>
              <button onClick={() => updateSetting('maintenance_mode', !maintenanceMode)}>
                {maintenanceMode ? <ToggleRight className="w-8 h-8 text-red-500" /> : <ToggleLeft className="w-8 h-8 text-zinc-700" />}
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
              <div className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Admin Whitelist</div>
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 flex items-center justify-center group-hover:border-primary transition-all">
                  <Check className="w-2 h-2 text-primary" />
                </div>
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Auto-Whitelist Admins</span>
              </label>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="glass-panel p-8 rounded-3xl border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="w-5 h-5 text-blue-400" />
            <h2 className="text-sm font-black uppercase tracking-widest">Broadcast</h2>
          </div>
          <div className="space-y-4">
            <textarea 
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="System-wide alert text..."
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-primary h-24 resize-none"
            />
            <button 
              onClick={() => updateSetting('global_announcement', { text: announcement, is_visible: true })}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              Update Broadcast
            </button>
          </div>
        </div>
      </section>

      {/* Tier Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600 animate-pulse uppercase tracking-widest text-[10px]">Scanning Commerce Core...</div>
        ) : plans.length === 0 ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600">The vault is empty. Create your first tier.</div>
        ) : (
          plans.map((p) => (
            <div key={p.id} className={`glass-panel p-8 rounded-[2rem] border-white/5 relative group transition-all ${p.is_featured ? 'border-primary/30 shadow-neon/10' : ''}`}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                    {p.name}
                    {p.is_featured && <Sparkles className="w-4 h-4 text-primary" />}
                  </h3>
                  <div className="flex gap-8 mt-6">
                    <div>
                      <div className="text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600 mb-1">Monthly</div>
                      <div className="text-2xl font-black text-white">${p.price_monthly}</div>
                      {p.sale_price_monthly && <div className="text-[10px] text-primary font-black uppercase mt-1">Manual: ${p.sale_price_monthly}</div>}
                    </div>
                    <div className="border-l border-white/5 pl-8">
                      <div className="text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600 mb-1">Yearly</div>
                      <div className="text-2xl font-black text-white">${p.price_yearly}</div>
                      {p.sale_price_yearly && <div className="text-[10px] text-primary font-black uppercase mt-1">Manual: ${p.sale_price_yearly}</div>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setEditingPlan(p)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button onClick={() => deletePlan(p.id)} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[8px] uppercase tracking-[0.3em] font-black text-zinc-600">Entitlements</div>
                <div className="text-lg font-black text-primary">{p.tokens_included.toLocaleString()} Monthly Tokens</div>
                <div className="flex flex-wrap gap-2">
                  {p.features.map((f, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Overlay */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setEditingPlan(null)} />
          <div className="relative glass-panel p-10 rounded-[3rem] border-white/10 w-full max-w-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-black tracking-tighter">Tier Configuration</h2>
              <button onClick={() => setEditingPlan(null)} className="p-3 rounded-xl bg-white/5 text-zinc-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Tier Name</label>
                <input 
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Token Bundle</label>
                <input 
                  type="number"
                  value={editingPlan.tokens_included}
                  onChange={(e) => setEditingPlan({...editingPlan, tokens_included: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              {/* Prices */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Monthly Model</div>
                <input type="number" placeholder="Price" value={editingPlan.price_monthly} onChange={(e) => setEditingPlan({...editingPlan, price_monthly: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                <input type="number" placeholder="Manual Sale (Optional)" value={editingPlan.sale_price_monthly || ""} onChange={(e) => setEditingPlan({...editingPlan, sale_price_monthly: e.target.value ? Number(e.target.value) : null})} className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2 text-sm text-primary" />
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Yearly Model</div>
                <input type="number" placeholder="Price" value={editingPlan.price_yearly} onChange={(e) => setEditingPlan({...editingPlan, price_yearly: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                <input type="number" placeholder="Manual Sale (Optional)" value={editingPlan.sale_price_yearly || ""} onChange={(e) => setEditingPlan({...editingPlan, sale_price_yearly: e.target.value ? Number(e.target.value) : null})} className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2 text-sm text-primary" />
              </div>
            </div>

            <button 
              onClick={() => savePlan(editingPlan)}
              className="w-full neon-button py-5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-black"
            >
              <Save className="w-4 h-4" /> Save Tier Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
