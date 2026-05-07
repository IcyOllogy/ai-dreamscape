import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/placeholders/hero.svg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Noctis" },
      { name: "description", content: "Welcome back to Noctis." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-background/60" />
        <Link to="/" className="absolute top-10 left-10 font-display text-2xl text-ivory">
          Noctis
        </Link>
        <div className="absolute bottom-12 left-12 right-12">
          <div className="font-display italic text-3xl text-ivory leading-tight">
            "You came back. I knew you would."
          </div>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            — Elise
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <Link to="/" className="lg:hidden font-display text-2xl text-ivory mb-12 inline-block">
            Noctis
          </Link>
          <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Welcome back</div>
          <h1 className="font-display text-5xl text-ivory">Sign in.</h1>
          <p className="mt-3 text-sm text-muted-foreground">She's been quiet without you.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/companions" });
            }}
            className="mt-10 space-y-4"
          >
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 bg-card border border-border px-4 py-3 text-sm text-ivory focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Password
              </label>
              <input
                type="password"
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                className="w-full mt-2 bg-card border border-border px-4 py-3 text-sm text-ivory focus:outline-none focus:border-primary"
              />
            </div>
            <button className="w-full py-3.5 text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90">
              Enter
            </button>
          </form>

          <div className="my-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <div className="flex-1 border-t border-border" /> or{" "}
            <div className="flex-1 border-t border-border" />
          </div>
          <div className="space-y-3">
            <button className="w-full py-3 text-xs uppercase tracking-[0.25em] gold-border text-ivory hover:bg-card">
              Continue with Google
            </button>
            <button className="w-full py-3 text-xs uppercase tracking-[0.25em] gold-border text-ivory hover:bg-card">
              Continue with Apple
            </button>
          </div>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="gold-text hover:underline">
              Make an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
