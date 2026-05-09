import { useState, useEffect } from "react";
import { NavRail } from "./NavRail";
import { NavSidebar } from "./NavSidebar";
import { useLocation, Link } from "@tanstack/react-router";
import { Home, Compass, MessageSquare, CreditCard, MoreHorizontal, ShieldAlert } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile mostly)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleQuickExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Glows */}
      <div className="ambient-glow w-[600px] h-[600px] -top-48 -left-48" />
      <div className="ambient-glow w-[500px] h-[500px] bottom-0 -right-24" style={{ animationDelay: '-4s' }} />

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <NavRail 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <NavSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
      </div>

      {/* Main Content Area */}
      <main 
        className={`transition-all duration-500 ease-in-out pb-20 md:pb-0 ${
          isSidebarOpen ? 'md:pl-[312px]' : 'md:pl-[72px]'
        }`}
      >
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 h-16 glass-rail border-t border-white/5 md:hidden flex items-center justify-around px-2 z-[100] pb-safe">
        <Link to="/" activeProps={{ className: "text-primary" }} className="flex flex-col items-center gap-1 text-white/40">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link to="/companions" activeProps={{ className: "text-primary" }} className="flex flex-col items-center gap-1 text-white/40">
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-medium">Discover</span>
        </Link>
        <Link to="/chat" activeProps={{ className: "text-primary" }} className="flex flex-col items-center gap-1 text-white/40">
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium">Chat</span>
        </Link>
        <Link to="/pricing" activeProps={{ className: "text-primary" }} className="flex flex-col items-center gap-1 text-white/40">
          <CreditCard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Tokens</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] font-medium">More</span>
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar (Drawer style) */}
      <div className={`md:hidden`}>
          <NavSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
      </div>

      {/* Quick Exit (Boss Key) - Hidden but accessible via keyboard or specific UI if needed */}
      <button 
        onClick={handleQuickExit}
        className="fixed top-4 right-4 z-[120] p-2 rounded-full glass-panel opacity-20 hover:opacity-100 transition-opacity md:flex hidden items-center gap-2"
        title="Boss Key"
      >
        <ShieldAlert className="w-4 h-4 text-red-500/50" />
      </button>
    </div>
  );
}
