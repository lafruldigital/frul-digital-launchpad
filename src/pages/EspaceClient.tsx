import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import {
  SERVICES,
  SERVICE_BY_KEY,
  STATUS_LABELS,
  STATUS_STYLES,
  type ServiceKey,
} from "@/lib/services-catalog";
import { Plus, MessageCircle, Clock, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestRow {
  id: string;
  service: ServiceKey;
  title: string;
  status: "open" | "in_progress" | "closed";
  reopened_for_sav: boolean;
  created_at: string;
  updated_at: string;
}

const EspaceClient = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [filter, setFilter] = useState<ServiceKey | "all">("all");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("requests")
        .select("id, service, title, status, reopened_for_sav, created_at, updated_at")
        .eq("client_id", user.id)
        .order("updated_at", { ascending: false });
      if (data) setRequests(data as RequestRow[]);
    };
    load();

    const channel = supabase
      .channel(`requests-client-${user.id}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "requests", filter: `client_id=eq.${user.id}` },
        () => load(),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-surface-darker flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const filtered = filter === "all" ? requests : requests.filter((r) => r.service === filter);
  const grouped = SERVICES.map((s) => ({
    service: s,
    items: filtered.filter((r) => r.service === s.key),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-surface-darker pt-28 pb-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-primary/80 text-xs uppercase tracking-[0.3em] mb-2">Espace client</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground">
              Bonjour {profile?.first_name || "👋"},
            </h1>
            <p className="text-surface-dark-foreground/60 mt-1">
              Suivi de vos demandes & échanges avec l'équipe Frul'digital.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="hero" className="glow-red">
              <Link to="/espace-client/nouvelle-demande">
                <Plus className="w-4 h-4 mr-2" /> Nouvelle demande
              </Link>
            </Button>
            <Button variant="outline" onClick={() => signOut().then(() => navigate("/"))}>
              <LogOut className="w-4 h-4 mr-2" /> Déconnexion
            </Button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 md:mx-0 md:px-0">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors",
              filter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-white/10 text-surface-dark-foreground/70 hover:border-primary/40",
            )}
          >
            Tous ({requests.length})
          </button>
          {SERVICES.map((s) => {
            const count = requests.filter((r) => r.service === s.key).length;
            return (
              <button
                key={s.key}
                onClick={() => setFilter(s.key)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors flex items-center gap-1.5",
                  filter === s.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-white/10 text-surface-dark-foreground/70 hover:border-primary/40",
                )}
              >
                <s.icon className="w-3.5 h-3.5" />
                {s.short} {count > 0 && <span className="opacity-70">({count})</span>}
              </button>
            );
          })}
        </div>

        {requests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-primary/20 bg-surface-dark/40 p-10 text-center">
            <p className="text-surface-dark-foreground/70 mb-4">
              Vous n'avez pas encore de demande active.
            </p>
            <Button asChild variant="hero">
              <Link to="/espace-client/nouvelle-demande">
                <Plus className="w-4 h-4 mr-2" /> Créer ma première demande
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(({ service, items }) => (
              <section key={service.key}>
                <header className="flex items-center gap-3 mb-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-gradient-to-br", service.gradient)}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-surface-dark-foreground font-semibold">{service.label}</h2>
                    <p className="text-xs text-surface-dark-foreground/40">{items.length} demande{items.length > 1 ? "s" : ""}</p>
                  </div>
                </header>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map((r) => (
                    <Link
                      key={r.id}
                      to={`/espace-client/demande/${r.id}`}
                      className="group block rounded-2xl border border-white/10 bg-surface-dark/60 hover:border-primary/40 hover:bg-surface-dark/80 transition-all p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-medium text-surface-dark-foreground line-clamp-1">{r.title}</h3>
                        <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border whitespace-nowrap", STATUS_STYLES[r.status])}>
                          {STATUS_LABELS[r.status]}
                          {r.reopened_for_sav && r.status !== "closed" && " · SAV"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-surface-dark-foreground/40 mt-3">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {new Date(r.updated_at).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="inline-flex items-center gap-1 group-hover:text-primary transition-colors">
                          <MessageCircle className="w-3 h-3" /> Ouvrir
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EspaceClient;