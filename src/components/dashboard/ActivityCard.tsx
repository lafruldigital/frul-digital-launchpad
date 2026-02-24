import { Bell } from "lucide-react";

const activities = [
  { date: "Aujourd'hui", text: "Bienvenue sur votre espace client Frul'digital !" },
  { date: "Récemment", text: "Nouvelles ressources disponibles dans votre espace." },
  { date: "Récemment", text: "Votre abonnement Premium est actif." },
];

export const ActivityCard = () => (
  <div className="bg-surface-dark border border-primary/10 rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Bell className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-heading font-bold text-lg">Activité & Notifications</h2>
    </div>

    <div className="space-y-4">
      {activities.map((a, i) => (
        <div key={i} className="flex items-start gap-4 px-4 py-3 rounded-xl bg-surface-darker">
          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
          <div>
            <p className="text-sm text-surface-dark-foreground/70">{a.text}</p>
            <span className="text-xs text-surface-dark-foreground/30">{a.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
