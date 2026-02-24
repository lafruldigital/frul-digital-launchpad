import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Briefcase, UserCircle, Headphones, LogOut } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const navItems = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Mes Services / Ressources", href: "/dashboard/services", icon: Briefcase },
  { label: "Mon Compte", href: "/dashboard/account", icon: UserCircle },
  { label: "Support", href: "/dashboard/support", icon: Headphones },
];

export const DashboardSidebar = () => {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  return (
    <aside className="hidden md:flex w-64 bg-surface-dark border-r border-primary/10 flex-col">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 p-6 border-b border-primary/10">
        <img src={frulLogo} alt="Frul'digital" className="h-10 w-10 rounded-xl" />
        <span className="font-heading font-bold text-lg">Frul'digital</span>
      </Link>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-surface-dark-foreground/50 hover:text-surface-dark-foreground hover:bg-surface-darker"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-primary/10">
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-surface-dark-foreground/50 hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};
