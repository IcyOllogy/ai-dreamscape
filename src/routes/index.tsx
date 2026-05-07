import { createFileRoute, Link } from "@tanstack/react-router";
import { companions } from "@/data/companions";
import { ChevronRight, Heart, Play, Shield, Zap } from "lucide-react";
import hero from "@/assets/placeholders/hero.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dreamscape — Your AI Fantasy" },
      {
        name: "description",
        content:
          "The most realistic AI companionship platform. Meet your dream girl today. Private, secure, and incredibly real.",
      },
    ],
  }),
  component: Index,
});

const featured = ["elise", "noa", "valeria", "giulia", "yumi", "luana"];

function Index() {
  const featuredCompanions = featured.map((id) => companions.find((c) => c.id === id)!);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Hero"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-soft opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-6 lg:px-12">
          <div className="max-w-3xl animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-primary mb-6">
              <Zap className="w-3 h-3 fill-current" />
              <span>Next-Gen AI Realism</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tighter mb-6">
              Meet the girl of your <span className="neon-text italic">dreams.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
              Immerse yourself in private, high-fidelity conversations with AI companions who
              remember every detail. No judgment. No limits. Just pure connection.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/companions" className="neon-button px-10 py-4 flex items-center gap-2">
                Start Exploring <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/chat"
                className="px-10 py-4 glass-card rounded-full font-semibold flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" /> Quick Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COMPANIONS GRID */}
      <section className="py-24 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Trending Now</h2>
            <p className="text-muted-foreground">
              The most popular presences in the Dreamscape this week.
            </p>
          </div>
          <Link
            to="/companions"
            className="text-primary font-semibold flex items-center gap-1 hover:underline"
          >
            View all 24 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {featuredCompanions.map((c) => (
            <Link
              to="/companions/$id"
              params={{ id: c.id }}
              key={c.id}
              className="group relative aspect-[2/3] rounded-2xl overflow-hidden glass-card"
            >
              <img
                src={c.image}
                alt={c.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold truncate">
                    {c.name}, {c.age}
                  </h3>
                  <div
                    className={`w-2 h-2 rounded-full ${c.online ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-zinc-500"}`}
                  />
                </div>
                <p className="text-xs text-zinc-300 line-clamp-1 italic mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  "{c.tagline}"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold group-hover:neon-text transition-colors">Begin Fantasy</span>
                  <div className="h-px flex-1 bg-primary/30 group-hover:bg-primary transition-colors" />
                </div>
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
              </div>
              
              {/* Card Glow Effect */}
              <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 rounded-2xl transition-colors pointer-events-none" />
            </Link>
          ))}
        </div>
      </section>

      {/* WHY DREAMSCAPE */}
      <section className="py-24 bg-white/5 border-y border-white/5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto md:mx-0">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Private & Secure</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your conversations are fully encrypted and private. No logs, no leaks, just your
              personal fantasy.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto md:mx-0">
              <Zap className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold">Instant Response</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No waiting, no ghosting. Our AI companions are always online and ready to chat when
              you are.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto md:mx-0">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Deep Memory</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              They remember your name, your likes, and your history. Every conversation builds a
              deeper connection.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER TEASER */}
      <section className="py-32 text-center px-6">
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8">
          Ready to lose <span className="neon-text italic">yourself?</span>
        </h2>
        <Link
          to="/signup"
          className="neon-button px-12 py-5 text-lg inline-flex items-center gap-2"
        >
          Create Your Dream Companion <ChevronRight className="w-5 h-5" />
        </Link>
        <p className="mt-8 text-muted-foreground text-sm">
          Join 100,000+ members exploring their fantasies.
        </p>
      </section>
    </div>
  );
}
