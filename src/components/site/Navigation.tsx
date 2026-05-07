import { Link } from "@tanstack/react-router";
import { MessageSquare, Users, CreditCard, LogIn, Heart, Home } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Companions", icon: Users, to: "/companions" },
  { label: "Chat", icon: MessageSquare, to: "/chat" },
  { label: "Pricing", icon: CreditCard, to: "/pricing" },
];

export function Navigation() {
  return (
    <>
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 glass-panel border-r hidden md:flex flex-col z-50">
        <div className="p-6 lg:p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden lg:block neon-text">
              Dreamscape
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-white/10 text-primary" }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group text-muted-foreground hover:text-white"
            >
              <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5">
          <Link
            to="/login"
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group text-muted-foreground hover:text-white"
          >
            <LogIn className="w-6 h-6" />
            <span className="font-medium hidden lg:block">Sign in</span>
          </Link>
        </div>
      </aside>

      {/* Bottom Bar - Mobile */}
      <nav className="fixed bottom-0 inset-x-0 h-16 glass-panel border-t md:hidden flex items-center justify-around px-4 z-50">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{ className: "text-primary" }}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-white transition-colors"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
