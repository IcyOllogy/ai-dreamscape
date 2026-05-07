import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/companions/c5.jpg";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Noctis" },
      { name: "description", content: "Begin a Noctis membership. 18+." },
    ],
  }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", pw: "", name: "" });
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 lg:p-16 order-2 lg:order-1">
        <div className="w-full max-w-md">
          <Link to="/" className="font-display text-2xl text-ivory mb-12 inline-block">
            Noctis
          </Link>
          <div className="text-xs uppercase tracking-[0.4em] gold-text mb-4">Begin</div>
          <h1 className="font-display text-5xl text-ivory">Create your account.</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Two minutes. Then the rest of the evening is yours.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/companions" });
            }}
            className="mt-10 space-y-4"
          >
            <Field
              label="What should she call you?"
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
            />
            <Field
              label="Password"
              type="password"
              value={form.pw}
              onChange={(v) => setForm((f) => ({ ...f, pw: v }))}
            />

            <label className="flex items-start gap-3 text-xs text-muted-foreground mt-4">
              <input type="checkbox" required className="mt-1 accent-primary" />I confirm I am 18 or
              older and agree to the{" "}
              <a className="gold-text underline" href="#">
                Terms
              </a>{" "}
              and{" "}
              <a className="gold-text underline" href="#">
                Privacy
              </a>
              .
            </label>

            <button className="w-full py-3.5 text-xs uppercase tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90 mt-4">
              Create account
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-muted-foreground">
            Already a member?{" "}
            <Link to="/login" className="gold-text hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative order-1 lg:order-2">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/20 to-background/60" />
        <div className="absolute bottom-12 right-12 left-12 text-right">
          <div className="font-display italic text-3xl text-ivory leading-tight">
            "Take your time. The evening is long."
          </div>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            — Valeria
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-2 bg-card border border-border px-4 py-3 text-sm text-ivory focus:outline-none focus:border-primary"
      />
    </div>
  );
}
