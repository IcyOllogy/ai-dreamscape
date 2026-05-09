import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit3, Trash2, Save, X, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pricing")({
  component: AdminPricing,
});

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  tokens_included: number;
  features: string[];
  is_featured: boolean;
  discount_label: string | null;
}

function AdminPricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    try {
      const { data, error } = await supabase
        .from("pricing_plans")
        .select("*")
        .order("price", { ascending: true });

      if (error) throw error;
      setPlans(data as PricingPlan[]);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
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
      console.error(error);
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
    <div className="space-y-8 animate-fade-in">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Pricing Manager</h1>
          <p className="text-sm text-muted-foreground">Control tiers, sales, and token allocation.</p>
        </div>
        <button 
          onClick={() => setEditingPlan({
            id: crypto.randomUUID(),
            name: "",
            price: 0,
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

      <div className="grid lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600 animate-pulse">Syncing with commerce core...</div>
        ) : plans.length === 0 ? (
          <div className="lg:col-span-2 py-20 text-center italic text-zinc-600">The vault is empty. Create your first tier.</div>
        ) : (
          plans.map((p) => (
            <div key={p.id} className={`glass-panel p-8 rounded-3xl border-white/5 relative group transition-all ${p.is_featured ? 'border-primary/30 shadow-neon/10' : ''}`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                    {p.name}
                    {p.is_featured && <Sparkles className="w-4 h-4 text-primary" />}
                  </h3>
                  <div className="text-2xl font-black text-white mt-1">${p.price}</div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                    {p.tokens_included} tokens included
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingPlan(p)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-white transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deletePlan(p.id)} className="p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {p.discount_label && (
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[9px] font-black uppercase tracking-widest mb-6">
                  {p.discount_label}
                </div>
              )}

              <div className="space-y-2 mb-4">
                <div className="text-[9px] uppercase tracking-widest font-black text-zinc-600">Features</div>
                {p.features.map((f, i) => (
                  <div key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary/50" />
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
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setEditingPlan(null)} />
          <div className="relative glass-panel p-10 rounded-3xl border-white/10 w-full max-w-xl animate-scale-in">
            <h2 className="text-2xl font-black tracking-tighter mb-8">Edit Tier</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Tier Name</label>
                <input 
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Price ($)</label>
                <input 
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({...editingPlan, price: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Tokens Included</label>
                <input 
                  type="number"
                  value={editingPlan.tokens_included}
                  onChange={(e) => setEditingPlan({...editingPlan, tokens_included: Number(e.target.value)})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Discount Label</label>
                <input 
                  value={editingPlan.discount_label || ""}
                  onChange={(e) => setEditingPlan({...editingPlan, discount_label: e.target.value || null})}
                  placeholder="e.g. 20% OFF"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mt-10">
              <button 
                onClick={() => savePlan(editingPlan)}
                className="flex-1 neon-button py-4 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" /> Commit Changes
              </button>
              <button 
                onClick={() => setEditingPlan(null)}
                className="px-6 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-xs uppercase tracking-widest transition-colors"
              >
                Abort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
