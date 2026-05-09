import { Link } from "@tanstack/react-router";
import { MessageSquare, Users, CreditCard, LogIn, Heart, Home, ShieldAlert, LayoutDashboard, Shield, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Companions", icon: Users, to: "/companions" },
  { label: "Chat", icon: MessageSquare, to: "/chat" },
  { label: "Pricing", icon: CreditCard, to: "/pricing" },
];

export function Navigation() {
  const { profile, signOut } = useAuth();
  
  const handleQuickExit = () => {
    window.location.href = "https://www.google.com";
  };

  const dynamicItems = [
    ...navItems,
    ...(profile?.role === 'admin' ? [{ label: "Admin", icon: Shield, to: "/admin" }] : []),
  ];

  const initials = profile?.display_name
    ? profile.display_name.substring(0, 2).toUpperCase()
    : profile?.username?.substring(0, 2).toUpperCase() || '??';

  return (
    <>
      {/* Top Header - Mobile & Desktop (for Profile Dropdown) */}
      <header className="fixed top-0 right-0 p-4 md:p-6 z-[60] flex items-center gap-4">
        {profile && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative group outline-none">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <Avatar className="h-10 w-10 border border-white/20 relative cursor-pointer hover:scale-105 transition-transform">
                  <AvatarImage src={profile.avatar_url || ''} />
                  <AvatarFallback className="bg-background text-primary font-bold text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass-panel border-white/10 bg-[#0A0A0A]/90 backdrop-blur-xl text-white" align="end" sideOffset={8}>
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
              <DropdownMenuItem asChild className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                <Link to="/dashboard" className="flex items-center w-full">
                  <LayoutDashboard className="mr-2 h-4 w-4 text-secondary" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem 
                onClick={() => signOut()}
                className="hover:bg-red-500/10 cursor-pointer focus:bg-red-500/20 focus:text-red-400 text-red-400/80"
              >
                <LogIn className="mr-2 h-4 w-4 rotate-180" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </header>

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
          {dynamicItems.map((item) => (
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

        <div className="p-4 mt-auto space-y-2 border-t border-white/5">
          <button
            onClick={handleQuickExit}
            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-red-500/10 transition-colors group text-zinc-500 hover:text-red-400"
            title="Quick Exit (Boss Key)"
          >
            <ShieldAlert className="w-6 h-6" />
            <span className="font-bold text-[10px] uppercase tracking-widest hidden lg:block">Quick Exit</span>
          </button>
          
          {!profile && (
            <Link
              to="/login"
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group text-muted-foreground hover:text-white"
            >
              <LogIn className="w-6 h-6" />
              <span className="font-medium hidden lg:block">Sign in</span>
            </Link>
          )}
        </div>
      </aside>

      {/* Bottom Bar - Mobile */}
      <nav className="fixed bottom-0 inset-x-0 h-16 glass-panel border-t md:hidden flex items-center justify-around px-4 z-50">
        {dynamicItems.map((item) => (
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
        <button
          onClick={handleQuickExit}
          className="flex flex-col items-center gap-1 text-zinc-500"
        >
          <ShieldAlert className="w-5 h-5" />
          <span className="text-[10px] font-medium italic">Exit</span>
        </button>
      </nav>
    </>
  );
}
