import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findCompanion, companions } from "@/data/companions";
import { ChevronLeft, MessageSquare, Heart, Shield, Sparkles, TrendingUp, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

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
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">She's not here tonight.</h1>
        <Link to="/companions" className="neon-button px-6 py-3">
          Back to gallery
        </Link>
      </div>
    </div>
  ),
  component: CompanionDetail,
});

function CompanionDetail() {
  const { companion: c } = Route.useLoaderData();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = c.gallery && c.gallery.length > 0 ? c.gallery : [c.image];

  const similar = useMemo(() => {
    return companions
      .filter(other => other.id !== c.id && (other.personality === c.personality || other.style === c.style))
      .slice(0, 6);
  }, [c]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <section className="grid lg:grid-cols-2 min-h-screen border-b border-white/5">
        {/* IMAGE SIDE */}
        <div className="relative h-[70vh] lg:h-screen sticky top-0 overflow-hidden group">
          {images.map((img, idx) => (
            <motion.img
              key={idx}
              layoutId={idx === 0 ? `companion-img-${c.id}` : undefined}
              src={img}
              alt={`${c.name} - image ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                idx === activeImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />

          {/* GALLERY NAVIGATION */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full glass-panel opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <div className="absolute bottom-10 inset-x-0 flex justify-center gap-2 z-30">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      idx === activeImageIndex ? "w-8 bg-primary shadow-neon" : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-6 left-6 z-20">
            <Link
              to="/companions"
              className="p-3 rounded-full glass-panel hover:text-primary transition-colors inline-flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
          </div>

          <div className="absolute bottom-10 left-10 hidden lg:block">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-bold ${c.online ? "text-green-400" : "text-zinc-400"}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${c.online ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`}
              />
              <span>{c.online ? "Available Now" : "Resting"}</span>
            </div>
          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="p-6 lg:p-16 flex flex-col justify-center max-w-2xl mx-auto lg:mx-0">
          <div className="space-y-10">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" />
                <span>
                  {c.personality} · {c.origin}
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-4">
                {c.name}, {c.age}
              </h1>
              <p className="text-2xl italic text-muted-foreground font-medium tracking-tight">
                "{c.tagline}"
              </p>
            </div>

            {/* AFFINITY SYSTEM */}
            <div className="p-6 rounded-2xl glass-card space-y-4 border-l-4 border-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <TrendingUp className="w-4 h-4" />
                  <span>Intimacy Level</span>
                </div>
                <span className="text-xs font-bold text-zinc-400">Level 1: Stranger</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[15%] bg-gradient-to-r from-primary to-secondary shadow-neon" />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Chat more to unlock deeper interactions</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                About {c.name}
              </h3>
              <p className="text-lg text-zinc-300 leading-relaxed">{c.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Her Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {c.interests.map((i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium"
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                  Security
                </h3>
                <div className="flex items-center gap-2 text-green-500/80 text-xs font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Private Session Enabled</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">
                Hot Openers
              </h3>
              <div className="space-y-3">
                {c.sample.map((s, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl glass-card text-lg italic text-white/90 border-l-4 border-primary"
                  >
                    "{s}"
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-6">
              <Link
                to="/chat"
                onClick={() => {
                  try {
                    sessionStorage.setItem("dreamscape-chat-id", c.id);
                  } catch {
                    // ignore
                  }
                }}
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

      {/* MORE LIKE HER */}
      <section className="py-24 px-6 lg:px-16 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-2">More Like {c.name}</h2>
              <p className="text-muted-foreground">Discover other companions with similar vibes.</p>
            </div>
            <Link to="/companions" className="text-primary font-bold flex items-center gap-1 hover:underline">
              Browse All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similar.map((s) => (
              <Link 
                key={s.id} 
                to="/companions/$id" 
                params={{ id: s.id }}
                className="group relative aspect-[2/3] rounded-2xl overflow-hidden glass-card"
              >
                <img src={s.image} alt={s.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="font-bold text-white">{s.name}, {s.age}</div>
                  <div className="text-[10px] text-zinc-400 truncate italic">"{s.tagline}"</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
