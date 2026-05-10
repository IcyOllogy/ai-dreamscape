import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit3, Trash2, Save, X, Sparkles, Megaphone, Check } from "lucide-react";
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

interface PlatformSettings {
  is_active: boolean;
  percentage: number;
  text?: string;
  is_visible?: boolean;
}

function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [globalSale, setGlobalSale] = useState<PlatformSettings>({ is_active: false, percentage: 0 });
  const [announcement, setAnnouncement] = useState<PlatformSettings>({ is_active: false, text: "", is_visible: false });

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
      
      const sale = data.find(s => s.key === 'global_sale')?.value;
      const announce = data.find(s => s.key === 'global_announcement')?.value;
      
      if (sale) setGlobalSale(sale);
      if (announce) setAnnouncement(announce);
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
      toast.success("Platform settings updated");
      fetchSettings();
    } catch (error) {
      toast.error("Failed to update settings");
    }
  }

  async function savePlan(plan: PricingPlan) {
    try {
      const { error } = await supabase
        .from("pricing_plans")
        .upsert(plan);

      if (error) throw error;
      toast.success("Pricing plan updated successfully.");
      setEditingPlan(null);
      fetchPlans();
    } catch (error) {
      toast.error("Failed to save plan.");
    }
  }

  async function deletePlan(id: string) {
    if (!confirm("Are you sure you want to delete this plan? This will affect live users.")) return;
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
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">Pricing Manager</h1>
          <p className="text-sm text-muted-foreground">Control tiers, intervals, and sale modes.</p>
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

      {/* Sale Control Panel */}
      <section className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-3xl border-primary/20 bg-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Megaphone className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-black uppercase tracking-widest">Global Sale Mode</h2>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1">Status</div>
              <div className={`text-sm font-black ${globalSale.is_active ? 'text-primary' : 'text-zinc-500'}`}>
                {globalSale.is_active ? 'ACTIVE' : 'INACTIVE'}
              </div>
            </div>
            <button 
              onClick={() => updateSetting('global_sale', { ...globalSale, is_active: !globalSale.is_active })}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                globalSale.is_active ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-primary/20 text-primary border border-primary/50'
              }`}
            >
              {globalSale.is_active ? 'Kill Sale' : 'Go Live'}
            </button>
          </div>

          <div className="space-y-4">
            <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Global Announcement Text</div>
            <div className="flex gap-2">
              <input 
                value={announcement.text}
                onChange={(e) => setAnnouncement({...announcement, text: e.target.value})}
                placeholder="e.g. ⚡ FLASH SALE: 20% OFF ALL TIERS!"
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary"
              />
              <button 
                onClick={() => updateSetting('global_announcement', { ...announcement, is_visible: true })}
                className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/30"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-3xl border-white/5 flex flex-col justify-center text-center opacity-50 italic">
          <p className="text-sm text-zinc-500">Commerce Telemetry Active...</p>
          <p className="text-[10px] mt-2 uppercase tracking-widest">Aggregate Revenue: TBD</p>
        </div>
      </section>

      {/* Tier Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600 animate-pulse">Syncing with commerce core...</div>
        ) : plans.length === 0 ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600">The vault is empty. Create your first tier.</div>
        ) : (
          plans.map((p) => (
            <div key={p.id} className={`glass-panel p-8 rounded-3xl border-white/5 relative group transition-all ${p.is_featured ? 'border-primary/30 shadow-neon/10' : ''}`}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
                    {p.name}
                    {p.is_featured && <Sparkles className="w-4 h-4 text-primary" />}
                  </h3>
                  <div className="flex gap-6 mt-4">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest font-black text-zinc-600">Monthly</div>
                      <div className="text-xl font-black text-white">${p.price_monthly}</div>
                      {p.sale_price_monthly && <div className="text-[10px] text-primary font-black uppercase">SALE: ${p.sale_price_monthly}</div>}
                    </div>
                    <div className="border-l border-white/5 pl-6">
                      <div className="text-[9px] uppercase tracking-widest font-black text-zinc-600">Yearly</div>
                      <div className="text-xl font-black text-white">${p.price_yearly}</div>
                      {p.sale_price_yearly && <div className="text-[10px] text-primary font-black uppercase">SALE: ${p.sale_price_yearly}</div>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingPlan(p)} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button onClick={() => deletePlan(p.id)} className="p-3 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[9px] uppercase tracking-widest font-black text-zinc-600">Entitlements</div>
                <div className="text-sm font-bold text-primary mb-4">{p.tokens_included} Tokens Included</div>
                {p.features.map((f, i) => (
                  <div key={i} className="text-sm text-zinc-400 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                    {f}
                  </div>
                ))}
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
            <h2 className="text-3xl font-black tracking-tighter mb-10">Manage Tier Strategy</h2>
            
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

              {/* Price Columns */}
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Monthly Model</div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500">Standard Price</label>
                  <input type="number" value={editingPlan.price_monthly} onChange={(e) => setEditingPlan({...editingPlan, price_monthly: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-primary/50">Sale Price (Optional)</label>
                  <input type="number" value={editingPlan.sale_price_monthly || ""} onChange={(e) => setEditingPlan({...editingPlan, sale_price_monthly: e.target.value ? Number(e.target.value) : null})} className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2 text-sm text-primary" />
                </div>
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Yearly Model</div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500">Standard Price</label>
                  <input type="number" value={editingPlan.price_yearly} onChange={(e) => setEditingPlan({...editingPlan, price_yearly: Number(e.target.value)})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-primary/50">Sale Price (Optional)</label>
                  <input type="number" value={editingPlan.sale_price_yearly || ""} onChange={(e) => setEditingPlan({...editingPlan, sale_price_yearly: e.target.value ? Number(e.target.value) : null})} className="w-full bg-black/40 border border-primary/20 rounded-xl px-4 py-2 text-sm text-primary" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => savePlan(editingPlan)}
                className="flex-1 neon-button py-5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 font-black"
              >
                <Save className="w-4 h-4" /> Finalize Strategy
              </button>
              <button 
                onClick={() => setEditingPlan(null)}
                className="px-8 py-5 rounded-2xl border border-white/10 hover:bg-white/5 text-xs uppercase tracking-widest transition-colors font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
