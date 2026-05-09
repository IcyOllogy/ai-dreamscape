import { Link } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Compass, 
  MessageSquare, 
  Library, 
  ImagePlus, 
  CreditCard, 
  Settings, 
  ShieldCheck, 
  Users, 
  User,
  BarChart3,
  Sparkles,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NavSidebar({ isOpen, onClose }: NavSidebarProps) {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const sections = [
    {
      title: "Main",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
        { label: "Discover", icon: Compass, to: "/companions" },
        { label: "Chat", icon: MessageSquare, to: "/chat" },
      ]
    },
    {
      title: "Creative",
      items: [
        { label: "My Collection", icon: Library, to: "/collection" },
        { label: "Generate Image", icon: ImagePlus, to: "/generate" },
      ]
    },
    {
      title: "Account",
      items: [
        { label: "My Profile", icon: User, to: "/profile" },
        { label: "Membership", icon: Sparkles, to: "/membership" },
        { label: "Settings", icon: Settings, to: "/settings" },
      ]
    }
  ];

  if (isAdmin) {
    sections.push({
      title: "Admin",
      items: [
        { label: "Revenue", icon: BarChart3, to: "/admin" },
        { label: "Users", icon: Users, to: "/admin/users" },
        { label: "Pricing", icon: ShieldCheck, to: "/admin/pricing" },
      ]
    });
  }

  return (
    <aside 
      className={`fixed top-0 bottom-0 left-0 z-[90] transition-all duration-500 ease-in-out transform ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      } 
      w-[280px] md:w-[312px] md:pl-[72px] glass-sidebar`}
    >
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-10">
          <span className="font-display text-xl font-bold neon-text tracking-wider">DREAMSCAPE</span>
          <button onClick={onClose} className="md:hidden text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to as any}
                    activeProps={{ className: "bg-white/10 text-primary border-l-2 border-primary" }}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all group"
                  >
                    {typeof item.icon !== 'string' && <item.icon className="w-4 h-4 transition-transform group-hover:scale-110" />}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
