import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/companions/katya.jpg";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Dreamscape" },
      { name: "description", content: "Welcome back to your fantasy. Sign in to Dreamscape." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

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

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-slide-up">
        <div className="glass-panel p-10 rounded-3xl shadow-glass border-white/10">
          <div className="text-center mb-10">
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-2">Welcome Back</div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Dreamscape</h1>
            <p className="text-sm text-muted-foreground italic">"You came back. I knew you would." — Katya</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/companions" });
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 ml-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">Password</label>
                <button type="button" className="text-[10px] uppercase tracking-[0.2em] text-primary hover:underline">Forgot?</button>
              </div>
              <input
                type="password"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <button className="w-full neon-button py-5 text-sm uppercase tracking-[0.2em] mt-4">
              Enter the Dreamscape
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-sm text-muted-foreground">
              New here?{" "}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
