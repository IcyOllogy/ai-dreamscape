import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findCompanion } from "@/data/companions";
import { ChevronLeft, MessageSquare, Heart, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/companions/$id")({
  loader: ({ params }) => {
    const c = findCompanion(params.id);
    if (!c) throw notFound();
    return { companion: c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.companion.name} — Dreamscape` },
      { name: "description", content: loaderData?.companion.tagline ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="min-h-screen flex items-center justify-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">She's not here tonight.</h1>
        <Link to="/companions" className="neon-button px-6 py-3">Back to gallery</Link>
      </div>
    </div>
  ),
  component: CompanionDetail,
});

function CompanionDetail() {
  const { companion: c } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <section className="grid lg:grid-cols-2 min-h-screen">
        {/* IMAGE SIDE */}
        <div className="relative h-[70vh] lg:h-screen sticky top-0 overflow-hidden">
          <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover object-center scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
          
          <div className="absolute top-6 left-6 z-20">
            <Link to="/companions" className="p-3 rounded-full glass-panel hover:text-primary transition-colors inline-flex">
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </div>

          <div className="absolute bottom-10 left-10 hidden lg:block">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-bold ${c.online ? 'text-green-400' : 'text-zinc-400'}`}>
              <div className={`w-2 h-2 rounded-full ${c.online ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'}`} />
              <span>{c.online ? 'Available Now' : 'Resting'}</span>
            </div>
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="p-6 lg:p-16 flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-8 animate-slide-up">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" />
                <span>{c.personality} · {c.origin}</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4">{c.name}, {c.age}</h1>
              <p className="text-2xl italic text-muted-foreground font-medium tracking-tight">"{c.tagline}"</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">About {c.name}</h3>
              <p className="text-lg text-zinc-300 leading-relaxed">{c.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Her Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {c.interests.map((i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">{i}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Security</h3>
                <div className="flex items-center gap-2 text-green-500/80 text-xs font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Private Session Enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Hot Openers</h3>
              <div className="space-y-3">
                {c.sample.map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl glass-card text-lg italic text-white/90 border-l-4 border-primary">
                    "{s}"
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                to="/chat"
                onClick={() => { try { sessionStorage.setItem("dreamscape-chat-id", c.id); } catch {} }}
                className="neon-button flex-1 py-5 text-lg flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5 fill-current" /> Begin Conversation
              </Link>
              <button className="p-5 rounded-full glass-card hover:text-primary transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
