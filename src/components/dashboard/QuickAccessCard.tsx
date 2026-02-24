import { Wrench, FileText, Download } from "lucide-react";

const links = [
  { icon: Wrench, label: "Accéder à mes outils", href: "/dashboard/services" },
  { icon: FileText, label: "Voir mes rapports", href: "/dashboard/services" },
  { icon: Download, label: "Télécharger mes ressources", href: "/dashboard/services" },
];

export const QuickAccessCard = () => (
  <div className="bg-surface-dark border border-primary/10 rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
    <h2 className="font-heading font-bold text-lg mb-5">Accès rapide</h2>
    <div className="space-y-3">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-darker hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-200 group"
        >
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:shadow-[0_0_12px_hsl(0_85%_50%/0.2)] transition-shadow">
            <l.icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-surface-dark-foreground/70 group-hover:text-surface-dark-foreground transition-colors">
            {l.label}
          </span>
        </a>
      ))}
    </div>
  </div>
);
