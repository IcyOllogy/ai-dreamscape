import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, Zap } from "lucide-react";

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

const tiers = [
  {
    name: "Whisper",
    price: "0",
    period: "free forever",
    blurb: "A taste of the dream.",
    features: ["3 companions", "100 messages / month", "Text only", "Standard response time"],
    cta: "Start Free",
    featured: false,
  },
  {
    name: "Intimate",
    price: "19",
    period: "/ month",
    blurb: "The full experience.",
    features: [
      "All 24 companions",
      "Unlimited messages",
      "Voice notes & Audio",
      "Persistent memory",
      "Image generation (50 / mo)",
      "Priority response",
    ],
    cta: "Begin Intimacy",
    featured: true,
  },
  {
    name: "Devotion",
    price: "12",
    period: "/ month, billed yearly",
    blurb: "Infinite connection.",
    features: [
      "Everything in Intimate",
      "Unlimited image generation",
      "Custom companions",
      "Early access to new releases",
      "Exclusive members-only scenes",
    ],
    cta: "Become Devoted",
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow w-[800px] h-[800px] -top-[400px] -right-[200px] opacity-10" />
        <div className="ambient-glow w-[600px] h-[600px] bottom-[10% ] -left-[200px] opacity-5" />
      </div>

      <section className="relative z-10 pt-32 pb-20 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 animate-slide-up">
          <Sparkles className="w-3 h-3" />
          <span>Membership Tiers</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 animate-slide-up">
          Choose your <span className="neon-text italic">connection.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
          No hidden fees. No contracts. Just pure, private companionship on your own terms.
        </p>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-500 animate-slide-up ${
                t.featured 
                  ? "glass-panel border-primary/50 shadow-neon scale-[1.05] z-20 bg-white/[0.03]" 
                  : "glass-card border-white/5 z-10"
              }`}
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              {t.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-neon">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className={`text-[10px] uppercase tracking-[0.3em] font-black mb-4 ${t.featured ? 'text-primary' : 'text-zinc-500'}`}>
                  {t.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">${t.price}</span>
                  <span className="text-sm text-muted-foreground font-medium">{t.period}</span>
                </div>
                <p className="mt-4 text-sm text-zinc-300 italic font-medium">"{t.blurb}"</p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mb-2">What's Included</div>
                {t.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                    <div className={`mt-0.5 rounded-full p-0.5 ${t.featured ? 'bg-primary/20 text-primary' : 'bg-white/5 text-zinc-500'}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] text-center transition-all ${
                  t.featured 
                    ? "neon-button shadow-neon" 
                    : "glass-panel hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center space-y-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-40 grayscale contrast-125">
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl">VISA</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl">MASTERCARD</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl">CRYPTO</div>
             <div className="flex items-center gap-2 font-black tracking-tighter text-xl">APPLE PAY</div>
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
