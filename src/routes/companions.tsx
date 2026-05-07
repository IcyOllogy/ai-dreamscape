import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { companions, type Personality } from "@/data/companions";

export const Route = createFileRoute("/companions")({
  head: () => ({
    meta: [
      { title: "The Gallery — Noctis" },
      { name: "description", content: "Twenty-four AI companions, each with their own voice, mood, and story. Browse the gallery." },
      { property: "og:title", content: "The Gallery — Noctis" },
      { property: "og:description", content: "Twenty-four AI companions. Browse the gallery." },
    ],
  }),
  component: Gallery,
});

const personalities: ("All" | Personality)[] = ["All", "Flirty", "Caring", "Mysterious", "Playful", "Dominant", "Intellectual"];

function Gallery() {
  const [filter, setFilter] = useState<typeof personalities[number]>("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    return companions.filter(c => {
      if (filter !== "All" && c.personality !== filter) return false;
      if (query && !(`${c.name} ${c.tagline} ${c.origin}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [filter, query]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="pt-36 pb-12 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">The Gallery</div>
        <h1 className="font-display text-6xl md:text-7xl text-ivory leading-tight">Twenty-four<br/><em className="italic">presences.</em></h1>
        <p className="mt-6 text-muted-foreground max-w-xl">Each companion is hand-written, with a voice and history of her own. Choose by mood, by light, by what your evening needs.</p>

        <div className="mt-12 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {personalities.map(p => (
              <button key={p} onClick={() => setFilter(p)} className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] border transition-all ${filter === p ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-ivory hover:border-primary/50"}`}>
                {p}
              </button>
            ))}
          </div>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or city" className="w-full lg:w-72 bg-card border border-border px-4 py-3 text-sm text-ivory placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((c, i) => (
            <Link key={c.id} to="/companions/$id" params={{ id: c.id }} className="group relative aspect-[3/4] block overflow-hidden bg-card animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              {c.online && <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /><span className="text-[9px] uppercase tracking-wider text-ivory">Online</span></div>}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-[9px] uppercase tracking-[0.3em] gold-text mb-1">{c.origin}</div>
                <h3 className="font-display text-2xl text-ivory">{c.name}, {c.age}</h3>
                <p className="text-xs text-muted-foreground italic mt-1 line-clamp-2">{c.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 gold-border text-primary">{c.personality}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center text-muted-foreground py-20">No one matches that mood tonight.</div>}
      </section>

      <SiteFooter />
    </div>
  );
}
