import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ChatThread } from "@/components/space/ChatThread";
import {
  SERVICE_BY_KEY,
  STATUS_LABELS,
  STATUS_STYLES,
  type ServiceKey,
} from "@/lib/services-catalog";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface RequestFull {
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

const EspaceClientDemande = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState<RequestFull | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user || !id) return;
    const load = async () => {
      const { data } = await supabase.from("requests").select("*").eq("id", id).single();
      if (data) setRequest(data as RequestFull);
    };
    load();
    const channel = supabase
      .channel(`request-${id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "requests", filter: `id=eq.${id}` }, (payload) => {
        setRequest(payload.new as RequestFull);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, id]);

  const reopen = async () => {
    if (!request) return;
    const { error } = await supabase
      .from("requests")
      .update({ reopened_for_sav: true, status: "open" } as any)
      .eq("id", request.id);
    if (error) toast.error("Impossible de rouvrir", { description: error.message });
    else toast.success("Dossier rouvert pour SAV. L'équipe sera notifiée.");
  };

  if (loading || !user || !request) {
    return (
      <div className="min-h-screen bg-surface-darker flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const service = SERVICE_BY_KEY[request.service];

  return (
    <div className="min-h-screen bg-surface-darker pt-28 pb-16">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link to="/espace-client" className="inline-flex items-center text-sm text-surface-dark-foreground/60 hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à mes demandes
        </Link>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          {/* Récap */}
          <div className="rounded-3xl border border-white/10 bg-surface-dark/60 p-6 h-fit">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn("w-8 h-8 rounded-lg grid place-items-center border border-white/10 bg-gradient-to-br", service.gradient)}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-surface-dark-foreground/50">{service.label}</span>
                </div>
                <h1 className="text-xl md:text-2xl font-heading font-bold text-surface-dark-foreground">{request.title}</h1>
              </div>
              <span className={cn("text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border whitespace-nowrap", STATUS_STYLES[request.status])}>
                {STATUS_LABELS[request.status]}
                {request.reopened_for_sav && request.status !== "closed" && " · SAV"}
              </span>
            </div>

            <p className="text-[11px] text-surface-dark-foreground/40 mb-4">
              Créée le {new Date(request.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              {request.closed_at && ` · Clôturée le ${new Date(request.closed_at).toLocaleDateString("fr-FR")}`}
            </p>

            <div className="space-y-3 text-sm">
              {request.form_data?.description && (
                <Field label="Description">{request.form_data.description}</Field>
              )}
              {request.form_data?.budget && (
                <Field label="Budget">{request.form_data.budget}</Field>
              )}
              {request.form_data?.deadline && (
                <Field label="Deadline">{request.form_data.deadline}</Field>
              )}
              {request.form_data?.details && (
                <Field label="Détails complémentaires">{request.form_data.details}</Field>
              )}
            </div>
          </div>

          {/* Tchat */}
          <ChatThread
            requestId={request.id}
            currentUserId={user.id}
            currentRole="client"
            closed={request.status === "closed"}
            reopenedForSav={request.reopened_for_sav}
            onReopenForSav={reopen}
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

export default EspaceClientDemande;