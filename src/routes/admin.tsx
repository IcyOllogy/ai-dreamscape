import { createFileRoute, Outlet, redirect, Navigate, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Users, Image, CreditCard } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-[10px] uppercase tracking-[0.4em] text-primary animate-pulse font-black">
          Authenticating Clearance...
        </div>
      </div>
    );
  }

  if (auth.profile?.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  const navItems = [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Users", to: "/admin/users", icon: Users },
    { label: "Gallery", to: "/admin/gallery", icon: Image },
    { label: "Commerce", to: "/admin/pricing", icon: CreditCard },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <nav className="flex items-center gap-2 mb-12 bg-white/5 p-1.5 rounded-2xl border border-white/5 self-start w-fit">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeProps={{ className: "bg-white/10 text-white shadow-xl border-white/10" }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all border border-transparent"
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
