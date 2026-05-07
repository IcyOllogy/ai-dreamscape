import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, MessageCircle, Search, SlidersHorizontal } from "lucide-react";
import { companions, type Personality } from "@/data/companions";

export const Route = createFileRoute("/companions")({
  head: () => ({
    meta: [
      { title: "The Gallery — Noctis" },
      {
        name: "description",
        content:
          "Twenty-four AI companions, each with their own voice, mood, and story. Browse the gallery.",
      },
      { property: "og:title", content: "The Gallery — Noctis" },
      { property: "og:description", content: "Twenty-four AI companions. Browse the gallery." },
    ],
  }),
  component: Gallery,
});

const personalities: ("All" | Personality)[] = [
  "All",
  "Flirty",
  "Caring",
  "Mysterious",
  "Playful",
  "Dominant",
  "Intellectual",
];

function Gallery() {
  const [filter, setFilter] = useState<(typeof personalities)[number]>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companions.filter((c) => {
      if (filter !== "All" && c.personality !== filter) return false;
      if (!q) return true;
      return `${c.name} ${c.tagline} ${c.origin}`.toLowerCase().includes(q);
    });
  }, [filter, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER & FILTERS */}
      <div className="sticky top-0 z-30 glass-panel border-b px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Browse Companions</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {companions.length} presences available now
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 focus:border-primary transition-colors text-sm outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="p-2 rounded-full glass-card hover:text-primary transition-colors">
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {personalities.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  filter === cat
                    ? "neon-button shadow-neon"
                    : "glass-card hover:bg-white/10 text-muted-foreground hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="px-6 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filtered.map((c) => (
            <Link
              to="/companions/$id"
              params={{ id: c.id }}
              key={c.id}
              className="group relative aspect-[2/3] rounded-3xl overflow-hidden glass-card animate-slide-up"
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-all duration-300" />

              {/* Online Indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-2 py-1 rounded-full glass-panel text-[10px] font-bold">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${c.online ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`}
                />
                <span className="uppercase tracking-wider">{c.online ? "Online" : "Away"}</span>
              </div>

              {/* Like Button */}
              <button
                type="button"
                className="absolute top-4 right-4 p-2.5 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                onClick={(e) => e.preventDefault()}
                aria-label="Like"
              >
                <Heart className="w-4 h-4 text-white hover:text-primary transition-colors" />
              </button>

              {/* Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1">
                  {c.name}, {c.age}
                </h3>
                <p className="text-xs text-zinc-400 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 italic">
                  "{c.tagline}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Chat Now
                  </span>
                  <MessageCircle className="w-4 h-4 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No companions found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
            <button
              onClick={() => {
                setFilter("All");
                setSearch("");
              }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
