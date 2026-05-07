import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-wider text-ivory group-hover:text-primary transition-colors">Noctis</span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">·  AI Companions</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/companions" className="text-muted-foreground hover:text-ivory transition-colors uppercase tracking-[0.2em] text-xs">Companions</Link>
          <Link to="/chat" className="text-muted-foreground hover:text-ivory transition-colors uppercase tracking-[0.2em] text-xs">Chat</Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-ivory transition-colors uppercase tracking-[0.2em] text-xs">Pricing</Link>
          <Link to="/login" className="text-muted-foreground hover:text-ivory transition-colors uppercase tracking-[0.2em] text-xs">Sign in</Link>
        </nav>
        <Link to="/signup" className="px-5 py-2.5 text-xs uppercase tracking-[0.25em] gold-border text-ivory hover:bg-primary hover:text-primary-foreground transition-all">
          Enter
        </Link>
      </div>
    </header>
  );
}
