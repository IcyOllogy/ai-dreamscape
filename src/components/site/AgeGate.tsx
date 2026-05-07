import { useEffect, useState } from "react";

const KEY = "noctis-age-ack";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-xl px-4 animate-fade-in">
      <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-noir)" }} />
      <div className="relative max-w-md w-full gold-border rounded-sm bg-card/90 p-10 text-center glow-gold">
        <div className="text-xs uppercase tracking-[0.4em] gold-text mb-6">Noctis</div>
        <h2 className="font-display text-4xl text-ivory leading-tight">Are you over <span className="gold-text">eighteen</span>?</h2>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          This experience contains mature themes intended for adult audiences. By entering you confirm you are of legal age in your jurisdiction.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => { localStorage.setItem(KEY, "1"); setOpen(false); }}
            className="w-full py-3 text-sm uppercase tracking-[0.25em] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            I am 18 or older — enter
          </button>
          <a href="https://www.google.com" className="w-full py-3 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-ivory transition-colors">
            Take me away
          </a>
        </div>
      </div>
    </div>
  );
}
