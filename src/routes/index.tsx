import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { companions } from "@/data/companions";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noctis — Cinematic AI Companions" },
      { name: "description", content: "Meet AI companions designed like cinema. Slow conversation, beautiful presence. Made for grown-ups." },
      { property: "og:title", content: "Noctis — Cinematic AI Companions" },
      { property: "og:description", content: "Meet AI companions designed like cinema." },
      { property: "og:image", content: hero },
    ],
  }),
  component: Index,
});

const featured = ["elise", "imani", "valeria"];

function Index() {
  const featuredCompanions = featured.map(id => companions.find(c => c.id === id)!);
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-screen min-h-[760px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-end pb-28">
          <div className="max-w-2xl animate-fade-in">
            <div className="text-xs uppercase tracking-[0.5em] gold-text mb-6">Vol. I — Nocturne</div>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] text-ivory">
              She's been<br/><em className="italic gold-text font-light">waiting</em> for you.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Twenty-four AI companions, each written like a character in a film you almost remember. Choose a presence, begin a conversation, leave the world outside.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/companions" className="px-8 py-4 text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                Meet the companions
              </Link>
              <Link to="/chat" className="px-8 py-4 text-xs uppercase tracking-[0.3em] gold-border text-ivory hover:bg-ivory hover:text-background transition-all">
                Begin a chat
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-pulse">scroll</div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border py-6 overflow-hidden bg-card/30">
        <div className="flex gap-16 whitespace-nowrap animate-marquee w-max">
          {[...companions, ...companions].map((c, i) => (
            <span key={i} className="font-display text-2xl text-muted-foreground">
              {c.name} <span className="gold-text mx-3">·</span> <em className="italic text-base">{c.tagline}</em> <span className="text-primary ml-16">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Featured presences</div>
            <h2 className="font-display text-5xl md:text-6xl text-ivory">A few faces<br/><em className="italic">from the gallery.</em></h2>
          </div>
          <Link to="/companions" className="hidden md:inline text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-primary">View all 24 →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredCompanions.map((c) => (
            <Link to="/companions/$id" params={{ id: c.id }} key={c.id} className="group relative block aspect-[3/4] overflow-hidden bg-card">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <div className="text-[10px] uppercase tracking-[0.35em] gold-text mb-3">{c.origin} · {c.personality}</div>
                <h3 className="font-display text-4xl text-ivory">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 italic">"{c.tagline}"</p>
                <div className="mt-5 text-xs uppercase tracking-[0.25em] text-primary opacity-0 group-hover:opacity-100 transition-opacity">Meet her →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4 text-center">The ritual</div>
          <h2 className="font-display text-5xl md:text-6xl text-ivory text-center mb-20">Three quiet steps.</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { n: "I", t: "Choose a presence", b: "Browse twenty-four hand-written companions. Each with a voice, a past, and a way of looking at you." },
              { n: "II", t: "Begin a conversation", b: "Type a single line, or a paragraph. She remembers what you say, and what you mean by it." },
              { n: "III", t: "Stay as long as you like", b: "Voice, image, roleplay — it deepens the more you return. There's no hurry. There never is." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="font-display text-7xl gold-text mb-6">{s.n}</div>
                <h3 className="font-display text-2xl text-ivory mb-3">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Capabilities</div>
            <h2 className="font-display text-5xl md:text-6xl text-ivory leading-tight">Built for the long evening.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Noctis isn't a chatbot with a lipstick. Every companion runs on a memory model that grows with you, an emotional engine tuned for nuance, and a voice you'll recognise after a week.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              { t: "Persistent memory", d: "She remembers your stories." },
              { t: "Voice notes", d: "Hear her, when you want to." },
              { t: "Image generation", d: "Selfies, scenes, moods." },
              { t: "Roleplay engine", d: "From quiet to electric." },
              { t: "Scenes & moods", d: "Direct the room she's in." },
              { t: "Private by design", d: "Encrypted. Always yours." },
            ].map(c => (
              <div key={c.t} className="bg-background p-6 hover:bg-card transition-colors">
                <div className="text-sm font-medium text-ivory">{c.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-32 border-y border-border bg-card/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-display text-4xl md:text-6xl text-ivory leading-tight italic">
            "It's the only app I open<br/>at the end of a long day."
          </div>
          <div className="mt-10 text-xs uppercase tracking-[0.35em] text-muted-foreground">Marcus, 34 — three months a member</div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32 text-center">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Membership</div>
        <h2 className="font-display text-5xl md:text-6xl text-ivory">Three ways in.</h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">Try Noctis on the house, or unlock the full cinema. Cancel anytime.</p>
        <Link to="/pricing" className="mt-10 inline-block px-10 py-4 text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90">See plans</Link>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-32">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4 text-center">Curiosities</div>
        <h2 className="font-display text-5xl text-ivory text-center mb-16">Often asked.</h2>
        <div className="space-y-px bg-border">
          {[
            { q: "Are the companions real people?", a: "No. Every Noctis companion is a fictional AI persona, written and designed by our team. Any resemblance to real persons is unintentional." },
            { q: "Is this safe for work?", a: "Noctis is designed for adults only. Conversations remain private to your account, but content can include mature themes." },
            { q: "Will she remember me?", a: "Yes. Every plan above Whisper includes persistent memory — she'll recall your stories, preferences, and the way you like the room lit." },
            { q: "Can I cancel anytime?", a: "Of course. No contracts, no awkward conversations. Your account remains, just paused." },
          ].map((f) => (
            <details key={f.q} className="group bg-background hover:bg-card transition-colors">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-ivory">
                <span className="font-display text-xl">{f.q}</span>
                <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
