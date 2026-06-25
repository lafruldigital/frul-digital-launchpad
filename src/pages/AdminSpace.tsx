import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  SERVICES,
  SERVICE_BY_KEY,
  STATUS_LABELS,
  STATUS_STYLES,
  type ServiceKey,
} from "@/lib/services-catalog";
import { ChevronRight, Clock, LogOut, RotateCcw, ShieldCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AdminRequest {
  id: string;
  client_id: string;
  service: ServiceKey;
  title: string;
  status: "open" | "in_progress" | "closed";
  reopened_for_sav: boolean;
  created_at: string;
  updated_at: string;
}

type StatusFilter = "all" | "open" | "in_progress" | "closed" | "sav";

const AdminSpace = () => {
  const { user, loading, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [serviceFilter, setServiceFilter] = useState<ServiceKey | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/admin-login");
    else if (!roleLoading && isAdmin === false) {
      toast.error("Accès réservé à l'administrateur");
      navigate("/");
    }
  }, [loading, user, roleLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!user || !isAdmin) return;
    const load = async () => {
      const { data } = await supabase
        .from("requests")
        .select("id, client_id, service, title, status, reopened_for_sav, created_at, updated_at")
        .order("updated_at", { ascending: false });
      if (data) setRequests(data as AdminRequest[]);
    };
    load();

    const channel = supabase
      .channel("admin-requests")
      .on("postgres_changes", { event: "*", schema: "public", table: "requests" }, (payload) => {
        load();
        // SAV notification
        if (
          payload.eventType === "UPDATE" &&
          (payload.new as any).reopened_for_sav &&
          !(payload.old as any).reopened_for_sav
        ) {
          toast.info("Un client a rouvert un dossier pour SAV", {
            description: (payload.new as any).title,
          });
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin]);

  const filtered = useMemo(() => {
    return requests.filter((r) => {
      if (serviceFilter !== "all" && r.service !== serviceFilter) return false;
      if (statusFilter === "sav" && !r.reopened_for_sav) return false;
      if (statusFilter !== "all" && statusFilter !== "sav" && r.status !== statusFilter) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [requests, serviceFilter, statusFilter, search]);

  const counts = {
    total: requests.length,
    open: requests.filter((r) => r.status === "open").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    closed: requests.filter((r) => r.status === "closed").length,
    sav: requests.filter((r) => r.reopened_for_sav && r.status !== "closed").length,
  };

  if (loading || roleLoading || !isAdmin) {
    return (
      <div className="min-h-screen bg-surface-darker flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const columns: { key: "open" | "in_progress" | "closed"; label: string }[] = [
    { key: "open", label: "Ouvert" },
    { key: "in_progress", label: "En cours" },
    { key: "closed", label: "Clôturé" },
  ];

  return (
    <div className="min-h-screen bg-surface-darker pt-28 pb-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-primary/80 text-xs uppercase tracking-[0.3em] mb-2 inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Back-office
            </p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-surface-dark-foreground">
              Gestion des <span className="gradient-text">dossiers</span>
            </h1>
            <p className="text-surface-dark-foreground/60 mt-1">
              {counts.total} dossier{counts.total > 1 ? "s" : ""} · {counts.open} ouvert{counts.open > 1 ? "s" : ""} · {counts.in_progress} en cours · {counts.sav} SAV actif{counts.sav > 1 ? "s" : ""}
            </p>
          </div>
          <Button variant="outline" onClick={() => signOut().then(() => navigate("/"))}>
            <LogOut className="w-4 h-4 mr-2" /> Déconnexion
          </Button>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-white/10 bg-surface-dark/60 p-4 mb-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-dark-foreground/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un dossier par titre…"
              className="w-full bg-surface-darker border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={statusFilter === "all"} onClick={() => setStatusFilter("all")}>Tous ({counts.total})</Chip>
            <Chip active={statusFilter === "open"} onClick={() => setStatusFilter("open")}>Ouvert ({counts.open})</Chip>
            <Chip active={statusFilter === "in_progress"} onClick={() => setStatusFilter("in_progress")}>En cours ({counts.in_progress})</Chip>
            <Chip active={statusFilter === "closed"} onClick={() => setStatusFilter("closed")}>Clôturé ({counts.closed})</Chip>
            <Chip active={statusFilter === "sav"} onClick={() => setStatusFilter("sav")} accent>
              <RotateCcw className="w-3 h-3 mr-1 inline" /> SAV ({counts.sav})
            </Chip>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={serviceFilter === "all"} onClick={() => setServiceFilter("all")}>Tous services</Chip>
            {SERVICES.map((s) => {
              const c = requests.filter((r) => r.service === s.key).length;
              return (
                <Chip key={s.key} active={serviceFilter === s.key} onClick={() => setServiceFilter(s.key)}>
                  <s.icon className="w-3 h-3 mr-1 inline" /> {s.short} ({c})
                </Chip>
              );
            })}
          </div>
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => {
            const items = filtered.filter((r) => r.status === col.key);
            return (
              <div key={col.key} className="rounded-2xl border border-white/10 bg-surface-dark/40 p-3">
                <div className="flex items-center justify-between px-1 mb-3">
                  <h2 className="text-sm font-semibold text-surface-dark-foreground/90">{col.label}</h2>
                  <span className="text-[10px] uppercase tracking-wider text-surface-dark-foreground/40">
                    {items.length}
                  </span>
                </div>
                <div className="space-y-2 min-h-[100px]">
                  {items.length === 0 && (
                    <div className="text-xs text-surface-dark-foreground/30 text-center py-6">Vide</div>
                  )}
                  {items.map((r) => {
                    const s = SERVICE_BY_KEY[r.service];
                    return (
                      <Link
                        key={r.id}
                        to={`/admin/dossier/${r.id}`}
                        className="group block rounded-xl border border-white/10 bg-surface-dark/80 hover:border-primary/40 hover:bg-surface-dark transition-all p-3"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div className={cn("w-7 h-7 rounded-lg grid place-items-center border border-white/10 bg-gradient-to-br shrink-0", s.gradient)}>
                            <s.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] uppercase tracking-wider text-surface-dark-foreground/40">{s.short}</div>
                            <div className="text-sm font-medium text-surface-dark-foreground line-clamp-2">{r.title}</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-surface-dark-foreground/40">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(r.updated_at).toLocaleDateString("fr-FR")}
                          </span>
                          {r.reopened_for_sav && r.status !== "closed" && (
                            <span className="text-primary inline-flex items-center gap-1">
                              <RotateCcw className="w-3 h-3" /> SAV
                            </span>
                          )}
                          <ChevronRight className="w-3 h-3 group-hover:text-primary" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Chip = ({
  active,
  accent,
  onClick,
  children,
}: {
  active?: boolean;
  accent?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary"
        : accent
          ? "border-primary/40 text-primary hover:bg-primary/10"
          : "border-white/10 text-surface-dark-foreground/70 hover:border-primary/40",
    )}
  >
    {children}
  </button>
);

export default AdminSpace;