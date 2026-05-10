import { Hammer, ShieldAlert, Cpu } from "lucide-react";

export function MaintenanceOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center p-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      
      <div className="relative max-w-2xl w-full text-center space-y-12">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-ping" />
            <div className="relative w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl">
              <Cpu className="w-12 h-12 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic">
            Neural Core <span className="text-primary">Optimizing</span>
          </h1>
          <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-lg mx-auto">
            The Dreamscape is undergoing a scheduled reality shift. Our architects are currently stabilizing the neural pathways to ensure peak fidelity.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Secure</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
            <Hammer className="w-4 h-4 text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Refining</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Syncing</span>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center gap-4">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/50 animate-pulse">
            System Restoration in Progress
          </div>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="w-2/3 h-full bg-primary shadow-neon animate-[shimmer_2s_infinite]" />
          </div>
        </div>

        <div className="text-[9px] text-zinc-700 uppercase font-bold tracking-widest pt-12">
          Dreamscape v4.0.2 // Administrator Oversight Required
        </div>
      </div>
    </div>
  );
}
