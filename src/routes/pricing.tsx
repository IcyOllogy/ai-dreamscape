import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Zap, Megaphone } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Membership — Dreamscape" },
      {
        name: "description",
        content: "Choose your path into the Dreamscape. Whisper, Intimate, or Devotion. Private, secure, and immersive.",
      },
      { property: "og:title", content: "Membership — Dreamscape" },
    ],
  }),
  component: Pricing,
});

interface Tier {
  id: string;
  name: string;
  price_monthly: number;
  price_yearly: number;
  sale_price_monthly: number | null;
  sale_price_yearly: number | null;
  tokens_included: number;
  features: string[];
  is_featured: boolean;
}

function Pricing() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [globalSalePercent, setGlobalSalePercent] = useState(0);
  const [announcement, setAnnouncement] = useState<any>(null);

  useEffect(() => {
    fetchTiers();
    fetchSettings();
  }, []);

  async function fetchTiers() {
    const { data, error } = await supabase
      .from("pricing_plans")
      .select("*")
      .order("price_monthly", { ascending: true });
    if (!error && data) setTiers(data as Tier[]);
    setLoading(false);
  }

  async function fetchSettings() {
    try {
      const { data } = await supabase.from("platform_settings").select("*");
      if (data) {
        const sale = data.find(s => s.key === 'global_sale_percentage')?.value;
        const announce = data.find(s => s.key === 'global_announcement')?.value;
        if (sale !== undefined) setGlobalSalePercent(Number(sale));
        if (announce?.is_visible) setAnnouncement(announce);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow w-[800px] h-[800px] -top-[400px] -right-[200px] opacity-10" />
        <div className="ambient-glow w-[600px] h-[600px] bottom-[10%] -left-[200px] opacity-5" />
      </div>

      {announcement && (
        <div className="fixed top-0 left-0 right-0 z-[100] animate-slide-down">
          <div className="bg-primary/90 backdrop-blur-md px-6 py-3 flex items-center justify-center gap-3">
            <Megaphone className="w-4 h-4 text-black animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
              {announcement.text}
            </span>
          </div>
        </div>
      )}

      <section className="relative z-10 pt-32 pb-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 animate-slide-up">
          <Sparkles className="w-3 h-3" />
          <span>Membership Tiers</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-slide-up">
          Choose your <span className="neon-text italic">connection.</span>
        </h1>
        
        {/* Interval Toggle */}
        <div className="flex items-center justify-center gap-4 mt-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <span className={`text-[10px] uppercase tracking-widest font-black transition-colors ${interval === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
          <button 
            onClick={() => setInterval(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-7 rounded-full bg-white/5 border border-white/10 relative p-1"
          >
            <div className={`w-5 h-5 rounded-full bg-primary shadow-neon transition-transform duration-300 ${interval === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase tracking-widest font-black transition-colors ${interval === 'yearly' ? 'text-white' : 'text-zinc-500'}`}>Yearly</span>
            <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[8px] font-black uppercase">Save up to 20%</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
          {loading ? (
            <div className="col-span-full py-20 text-center text-zinc-500 animate-pulse uppercase tracking-[0.4em] font-black">Decrypting Tiers...</div>
          ) : (
            tiers.map((t, i) => {
              const standardPrice = interval === 'monthly' ? t.price_monthly : t.price_yearly;
              const manualSalePrice = interval === 'monthly' ? t.sale_price_monthly : t.sale_price_yearly;
              
              // Apply global sale logic: ignore manual sale if global percentage is set
              let finalPrice = standardPrice;
              let isOnSale = false;

              if (globalSalePercent > 0) {
                finalPrice = Math.round(standardPrice * (1 - globalSalePercent / 100));
                isOnSale = true;
              } else if (manualSalePrice !== null) {
                finalPrice = manualSalePrice;
                isOnSale = true;
              }

              return (
                <div
                  key={t.id}
                  className={`relative flex flex-col p-8 rounded-[2rem] transition-all duration-500 animate-slide-up ${
                    t.is_featured 
                      ? "glass-panel border-primary/40 shadow-neon/10 scale-[1.05] z-20 bg-white/[0.03]" 
                      : "glass-card border-white/5 z-10"
                  }`}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  {t.is_featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-neon">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <div className={`text-[10px] uppercase tracking-[0.3em] font-black mb-4 ${t.is_featured ? 'text-primary' : 'text-zinc-500'}`}>
                      {t.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black tracking-tighter">${finalPrice}</span>
                      <span className="text-sm text-muted-foreground font-medium">/{interval === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    {isOnSale && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 line-through">${standardPrice}</span>
                        <span className="text-[10px] text-primary font-black uppercase tracking-widest">
                          {globalSalePercent > 0 ? `${globalSalePercent}% OFF` : 'Special Sale'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-4 mb-10">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mb-2">Entitlements</div>
                    <div className="text-xs font-bold text-primary">{t.tokens_included.toLocaleString()} Monthly Tokens</div>
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className={`mt-0.5 rounded-full p-0.5 ${t.is_featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-zinc-500'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link
                      to="/signup"
                      className={`w-full block py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-center transition-all shimmer-sweep ${
                        t.is_featured 
                          ? "neon-button shadow-neon" 
                          : "glass-panel hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {finalPrice === 0 ? "Start Free" : "Get Access"}
                    </Link>
                  </motion.div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-24 text-center space-y-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-40 grayscale contrast-125">
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-white">VISA</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-white">MASTERCARD</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-white">CRYPTO</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl text-white">APPLE PAY</div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 max-w-2xl mx-auto leading-loose">
            Private & Encrypted billing. Discreet statement entry. <br />
            Dreamscape is for adults only (18+). Every member must verify age.
          </p>
        </div>
      </section>
    </div>
  );
}
