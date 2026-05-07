import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { findCompanion } from "@/data/companions";

export const Route = createFileRoute("/companions/$id")({
  loader: ({ params }) => {
    const c = findCompanion(params.id);
    if (!c) throw notFound();
    return { companion: c };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.companion.name} — Noctis` },
      { name: "description", content: loaderData?.companion.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.companion.name} — Noctis` },
      { property: "og:description", content: loaderData?.companion.tagline ?? "" },
      { property: "og:image", content: loaderData?.companion.image ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="min-h-screen flex items-center justify-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="font-display text-5xl text-ivory">She's not here tonight.</h1><Link to="/companions" className="mt-6 inline-block text-xs uppercase tracking-[0.3em] gold-text">Back to gallery</Link></div></div>
  ),
  component: CompanionDetail,
});

function CompanionDetail() {
  const { companion: c } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="pt-20 grid lg:grid-cols-2 min-h-screen">
        <div className="relative h-[60vh] lg:h-auto overflow-hidden">
          <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-transparent lg:bg-none" />
          <div className="absolute bottom-6 left-6 lg:hidden">
            {c.online && <span className="text-[10px] uppercase tracking-wider gold-text">● Online now</span>}
          </div>
        </div>
        <div className="p-10 lg:p-20 flex flex-col justify-center">
          <Link to="/companions" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary mb-8">← Back to gallery</Link>
          <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">{c.origin} · {c.personality}</div>
          <h1 className="font-display text-6xl md:text-7xl text-ivory leading-none">{c.name}</h1>
          <div className="mt-3 text-muted-foreground italic font-display text-2xl">"{c.tagline}"</div>

          <p className="mt-10 text-base text-muted-foreground leading-relaxed max-w-lg">{c.bio}</p>

          <div className="mt-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-ivory mb-3">Interests</div>
            <div className="flex flex-wrap gap-2">
              {c.interests.map(i => <span key={i} className="text-xs px-3 py-1.5 gold-border text-muted-foreground">{i}</span>)}
            </div>
          </div>

          <div className="mt-10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-ivory mb-4">A few things she might say</div>
            <div className="space-y-3">
              {c.sample.map((s, i) => (
                <div key={i} className="border-l-2 border-primary pl-4 italic font-display text-xl text-ivory">"{s}"</div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/chat" search={{ id: c.id }} className="px-8 py-4 text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90">Begin a conversation</Link>
            <Link to="/companions" className="px-8 py-4 text-xs uppercase tracking-[0.3em] gold-border text-ivory hover:bg-ivory hover:text-background transition-all">More like her</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
