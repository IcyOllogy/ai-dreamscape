import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, MessageSquare, CreditCard, Menu, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface NavRailProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export function NavRail({ onToggleSidebar, isSidebarOpen }: NavRailProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: Home, to: "/", label: "Home" },
    { icon: Compass, to: "/companions", label: "Discover" },
    { icon: MessageSquare, to: "/chat", label: "Chat" },
    { icon: CreditCard, to: "/pricing", label: "Tokens" },
  ];

  const initials = profile?.display_name
    ? profile.display_name.substring(0, 2).toUpperCase()
    : profile?.username?.substring(0, 2).toUpperCase() || '??';

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[72px] glass-rail z-[100] flex flex-col items-center py-6">
      <div className="rail-edge-glow" />
      {/* Top: Menu Toggle */}
      <button 
        onClick={onToggleSidebar}
        className="p-3 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-all mb-8"
      >
        <Menu className={`w-6 h-6 transition-transform duration-300 ${isSidebarOpen ? 'rotate-90 text-primary' : ''}`} />
      </button>

      {/* Middle: Primary Navigation */}
      <nav className="flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to));
          
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`relative p-3 rounded-xl transition-all group ${
                isActive ? 'text-primary' : 'text-white/40 hover:text-white'
              }`}
            >
              {isActive && <div className="neon-indicator -left-3" />}
              <item.icon className={`w-6 h-6 transition-transform group-hover:scale-110`} />
              
              {/* Tooltip (Custom) */}
              <div className="absolute left-full ml-4 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[110]">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Profile Dropdown */}
      <div className="mt-auto">
        {profile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative group outline-none rounded-full ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                <Avatar className="h-10 w-10 border border-white/20 bg-black cursor-pointer transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,27,107,0.5)]">
                  <AvatarImage src={profile.avatar_url || ''} />
                  <AvatarFallback className="bg-black text-primary font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass-panel border-white/10 bg-[#0A0A0A]/95 backdrop-blur-3xl text-white ml-4" align="end" side="right" sideOffset={12}>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{profile.display_name || profile.username}</p>
                  <p className="text-xs leading-none text-muted-foreground italic">
                    {profile.role.replace('_', ' ')}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem asChild className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                <Link to="/profile" className="flex items-center w-full">
                  <UserIcon className="mr-2 h-4 w-4 text-primary" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="hover:bg-red-500/10 cursor-pointer focus:bg-red-500/20 focus:text-red-400 text-red-400/80"
              >
                <div className="flex items-center w-full">
                  <Home className="mr-2 h-4 w-4 rotate-180" />
                  <span>Log out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link
            to="/login"
            className="p-3 flex items-center justify-center rounded-xl text-white/40 hover:text-primary hover:bg-white/5 transition-all duration-300 hover:scale-110 group relative"
          >
            <UserIcon className="w-6 h-6" />
          </Link>
        )}
      </div>
    </aside>
  );
}
