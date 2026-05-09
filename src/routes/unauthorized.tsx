import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldAlert, Home, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/unauthorized")({
  head: () => ({
    meta: [
      { title: "Unauthorized — Dreamscape" },
      { name: "description", content: "You do not have permission to access this area." },
    ],
  }),
  component: Unauthorized,
});

function Unauthorized() {
  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="ambient-glow w-[800px] h-[800px] -top-[400px] -right-[200px] opacity-10" />
        <div className="ambient-glow w-[600px] h-[600px] bottom-[10%] -left-[200px] opacity-5 text-red-500" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center animate-slide-up">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-panel border-red-500/30 text-red-500 mb-10 shadow-neon-red">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
          Access <span className="text-red-500 italic">Denied.</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-12">
          This area of the Dreamscape is restricted. You don't have the necessary clearance to proceed further.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Go to Dashboard
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-xs font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back Home
          </Link>
        </div>

        <div className="mt-16 text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
          Error Code: 403_RESTRICTED_ACCESS
        </div>
      </div>
    </div>
  );
}
