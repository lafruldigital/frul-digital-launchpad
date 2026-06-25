import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChatThread } from "@/components/space/ChatThread";
import {
  SERVICE_BY_KEY,
  STATUS_LABELS,
  STATUS_STYLES,
  type ServiceKey,
} from "@/lib/services-catalog";
import { ArrowLeft, CheckCircle2, Play, Mail, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DossierFull {
  id: string;
  client_id: string;
  service: ServiceKey;
  title: string;
  form_data: Record<string, string>;
  status: "open" | "in_progress" | "closed";
  reopened_for_sav: boolean;
  created_at: string;
  closed_at: string | null;
}

interface ClientInfo {
  email: string | null;
  first_name: string | null;
}

const AdminDossier = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const [dossier, setDossier] = useState<DossierFull | null>(null);
  const [client, setClient] = useState<ClientInfo | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/admin-login");
    else if (!roleLoading && isAdmin === false) navigate("/");
  }, [loading, user, roleLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!user || !isAdmin || !id) return;
    const load = async () => {
      const { data } = await supabase.from("requests").select("*").eq("id", id).single();
      if (data) {
        setDossier(data as DossierFull);
        const { data: prof } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", (data as any).client_id)
          .maybeSingle();
        setClient({ first_name: prof?.first_name ?? null, email: null });
      }
    };
    load();
    const channel = supabase
      .channel(`admin-dossier-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "requests", filter: `id=eq.${id}` }, (payload) => {
        setDossier(payload.new as DossierFull);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isAdmin, id]);

  const setStatus = async (status: "open" | "in_progress" | "closed") => {
    if (!dossier) return;
    const update: any = { status };
    if (status === "closed") {
      update.closed_at = new Date().toISOString();
      update.reopened_for_sav = false;
    } else {
      update.closed_at = null;
    }
    const { error } = await supabase.from("requests").update(update).eq("id", dossier.id);
    if (error) toast.error("Erreur", { description: error.message });
    else {
      toast.success(
        status === "closed" ? "Dossier marqué comme traité"
          : status === "in_progress" ? "Dossier en cours"
          : "Dossier rouvert",
      );
    }
  };

  if (loading || roleLoading || !isAdmin || !dossier) {
    return (
      <div className="min-h-screen bg-surface-darker flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const service = SERVICE_BY_KEY[dossier.service];
  const closed = dossier.status === "closed";

  return (
    <div className="min-h-screen bg-surface-darker pt-28 pb-16">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Link to="/admin" className="inline-flex items-center text-sm text-surface-dark-foreground/60 hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour au back-office
        </Link>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          <div className="space-y-4 h-fit">
            {/* Header card */}
            <div className="rounded-3xl border border-white/10 bg-surface-dark/60 p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-8 h-8 rounded-lg grid place-items-center border border-white/10 bg-gradient-to-br", service.gradient)}>
                      <service.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-surface-dark-foreground/50">{service.label}</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-heading font-bold text-surface-dark-foreground">{dossier.title}</h1>
                </div>
                <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border whitespace-nowrap", STATUS_STYLES[dossier.status])}>
                  {STATUS_LABELS[dossier.status]}
                  {dossier.reopened_for_sav && dossier.status !== "closed" && " · SAV"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-surface-dark-foreground/50 mb-4">
                <UserIcon className="w-3.5 h-3.5" />
                <span>{client?.first_name || "Client"}</span>
                <span className="opacity-40">·</span>
                <span>ID {dossier.client_id.slice(0, 8)}…</span>
              </div>

              <p className="text-[11px] text-surface-dark-foreground/40 mb-4">
                Créée le {new Date(dossier.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                {dossier.closed_at && ` · Clôturée le ${new Date(dossier.closed_at).toLocaleDateString("fr-FR")}`}
              </p>

              {/* Status controls */}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                {!closed && dossier.status !== "in_progress" && (
                  <Button size="sm" variant="outline" onClick={() => setStatus("in_progress")} className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10">
                    <Play className="w-3.5 h-3.5 mr-1.5" /> Marquer "en cours"
                  </Button>
                )}
                {!closed ? (
                  <Button size="sm" variant="hero" onClick={() => setStatus("closed")} className="glow-red">
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Dossier traité / Terminé
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setStatus("open")}>
                    Rouvrir le dossier
                  </Button>
                )}
              </div>

              {closed && (
                <div className="mt-3 text-[11px] text-zinc-400 bg-zinc-500/5 border border-zinc-500/20 rounded-lg px-3 py-2">
                  Conversation en lecture seule. L'historique est conservé comme preuve légale.
                  {dossier.reopened_for_sav && " Le client a demandé un SAV."}
                </div>
              )}
            </div>

            {/* Form data */}
            <div className="rounded-3xl border border-white/10 bg-surface-dark/60 p-6">
              <h2 className="text-sm uppercase tracking-wider text-surface-dark-foreground/60 mb-3">Formulaire soumis</h2>
              <div className="space-y-3 text-sm">
                {dossier.form_data?.description && <Field label="Description">{dossier.form_data.description}</Field>}
                {dossier.form_data?.budget && <Field label="Budget">{dossier.form_data.budget}</Field>}
                {dossier.form_data?.deadline && <Field label="Deadline">{dossier.form_data.deadline}</Field>}
                {dossier.form_data?.details && <Field label="Détails complémentaires">{dossier.form_data.details}</Field>}
              </div>
            </div>
          </div>

          {/* Chat */}
          <ChatThread
            requestId={dossier.id}
            currentUserId={user!.id}
            currentRole="admin"
            closed={closed}
            reopenedForSav={dossier.reopened_for_sav}
          />
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="text-[10px] uppercase tracking-wider text-surface-dark-foreground/40 mb-1">{label}</div>
    <div className="text-surface-dark-foreground/85 whitespace-pre-wrap rounded-lg bg-black/20 border border-white/5 px-3 py-2">{children}</div>
  </div>
);

export default AdminDossier;