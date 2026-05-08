import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-3xl text-ivory">Noctis</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            A cinematic AI companionship platform. Crafted for grown-ups who appreciate good
            lighting, slow conversation, and a story worth returning to.
          </p>
          <div className="mt-6 inline-flex gold-border rounded-sm px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-primary">
            18+ Only
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-ivory mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/companions" className="hover:text-ivory">
                Companions
              </Link>
            </li>
            <li>
              <Link to="/chat" className="hover:text-ivory">
                Chat
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-ivory">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-ivory mb-4">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-ivory">
                Manifesto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ivory">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ivory">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-ivory">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} Noctis Studios. All companions are fictional AI personas.
          </div>
          <div className="uppercase tracking-[0.25em]">Crafted in the dark</div>
        </div>
      </div>
    </footer>
  );
}
