import { createFileRoute } from '@tanstack/react-router';
import { ImagePlus, Sparkles, Wand2, ShieldCheck, Zap } from 'lucide-react';

export const Route = createFileRoute('/generate')({
  component: GeneratePage,
});

function GeneratePage() {
  return (
    <div className="container max-w-6xl py-20 px-4">
      <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative p-6 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl">
            <ImagePlus className="w-16 h-16 text-primary shadow-neon" />
          </div>
        </div>

        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl font-black tracking-tighter text-white">The Forge of Dreams</h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Our high-fidelity neural image generation engine is currently undergoing a structural optimization to provide even more realistic companion interactions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full mt-12">
          {[
            { icon: Wand2, title: "Stable Diffusion XL", desc: "Powered by the latest generative architectures." },
            { icon: ShieldCheck, title: "Private & Secure", desc: "Generations are encrypted and private by default." },
            { icon: Zap, title: "Hyper-Realism", desc: "Fine-tuned models for human-like fidelity." }
          ].map((feature, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border-white/5 bg-white/[0.02] text-left hover:border-primary/30 transition-all group">
              <feature.icon className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest animate-bounce">
            <Sparkles className="w-4 h-4" />
            Coming Online Soon
          </div>
        </div>
      </div>
    </div>
  );
}
