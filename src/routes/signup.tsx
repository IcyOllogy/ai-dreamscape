import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/companions/c2.jpg";
import { ChevronLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Join — Dreamscape" },
      { name: "description", content: "Create your AI fantasy. Join the Dreamscape today. 18+ only." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", pw: "", name: "" });

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img src={hero} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Back Button */}
      <Link to="/" className="fixed top-8 left-8 z-20 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-primary transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to home
      </Link>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="glass-panel p-10 rounded-3xl shadow-glass border-white/10">
          <div className="text-center mb-8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-2">Begin Your Journey</div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Create Account</h1>
            <p className="text-sm text-muted-foreground italic">"Take your time. The evening is long." — Noa</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/companions" });
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 ml-1">What should we call you?</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 ml-1">Password</label>
              <input
                type="password"
                required
                value={form.pw}
                onChange={(e) => setForm({ ...form, pw: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 mt-6">
              <div className="mt-1">
                <input type="checkbox" required className="w-4 h-4 rounded border-white/10 accent-primary" />
              </div>
              <div className="text-[11px] leading-relaxed text-zinc-400">
                I confirm I am 18+ and agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </div>
            </div>

            <button className="w-full neon-button py-5 text-sm uppercase tracking-[0.2em] mt-4">
              Begin Fantasy
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500/60" />
            Your data is 100% private & encrypted.
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already a member?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
