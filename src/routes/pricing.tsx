import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Membership — Noctis" },
      { name: "description", content: "Three ways into Noctis. Whisper, Intimate, Devotion. Cancel anytime." },
      { property: "og:title", content: "Membership — Noctis" },
      { property: "og:description", content: "Three ways into Noctis." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Whisper", price: "0", period: "free forever",
    blurb: "A taste of the room.",
    features: ["3 companions", "100 messages / month", "Text only", "No memory"],
    cta: "Start free", featured: false,
  },
  {
    name: "Intimate", price: "19", period: "/ month",
    blurb: "The full evening.",
    features: ["All 24 companions", "Unlimited messages", "Voice notes", "Persistent memory", "Image generation (50 / mo)", "Priority response"],
    cta: "Begin Intimate", featured: true,
  },
  {
    name: "Devotion", price: "12", period: "/ month, billed yearly",
    blurb: "For the long affair.",
    features: ["Everything in Intimate", "Unlimited image generation", "Custom companions", "Early access to new releases", "Members-only scenes"],
    cta: "Become Devoted", featured: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen">
      <section className="pt-24 pb-16 max-w-5xl mx-auto px-6 text-center">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Membership</div>
        <h1 className="font-display text-6xl md:text-7xl text-ivory leading-tight">Three ways<br/><em className="italic">in.</em></h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">No contracts. Cancel from your account at any moment, no awkwardness, no hold music.</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map(t => (
            <div key={t.name} className={`relative p-10 ${t.featured ? "gold-border bg-card glow-gold scale-[1.02]" : "border border-border bg-card/30"}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] uppercase tracking-[0.3em] bg-primary text-primary-foreground">Most chosen</div>}
              <div className="text-xs uppercase tracking-[0.3em] gold-text mb-4">{t.name}</div>
              <div className="font-display text-6xl text-ivory">${t.price}</div>
              <div className="text-xs text-muted-foreground mt-1">{t.period}</div>
              <div className="font-display italic text-xl text-ivory mt-6">{t.blurb}</div>
              <ul className="mt-8 space-y-3">
                {t.features.map(f => (
                  <li key={f} className="flex gap-3 text-sm text-muted-foreground"><span className="text-primary mt-0.5">✦</span>{f}</li>
                ))}
              </ul>
              <Link to="/signup" className={`mt-10 block text-center py-3 text-xs uppercase tracking-[0.3em] transition-all ${t.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "gold-border text-ivory hover:bg-ivory hover:text-background"}`}>{t.cta}</Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
          All plans include private, encrypted conversations. Noctis is for adults only — every member must be 18+ in their jurisdiction.
        </div>
      </section>
    </div>
  );
}
