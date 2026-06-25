import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { SERVICES, type ServiceKey } from "@/lib/services-catalog";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EspaceClientNouvelleDemande = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [service, setService] = useState<ServiceKey | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  const submit = async () => {
    if (!user || !service) return;
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Titre et description requis");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase
      .from("requests")
      .insert({
        client_id: user.id,
        service,
        title: form.title.trim().slice(0, 120),
        form_data: {
          description: form.description.trim().slice(0, 4000),
          budget: form.budget.trim().slice(0, 80),
          deadline: form.deadline.trim().slice(0, 80),
          details: form.details.trim().slice(0, 4000),
        },
      } as any)
      .select("id")
      .single();
    setSubmitting(false);
    if (error) {
      toast.error("Erreur", { description: error.message });
      return;
    }
    toast.success("Demande créée !");
    navigate(`/espace-client/demande/${(data as any).id}`);
  };

  const inputClass =
    "w-full bg-surface-darker border border-white/10 rounded-xl px-4 py-3 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 text-sm";

  return (
    <div className="min-h-screen bg-surface-darker pt-28 pb-16">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/espace-client" className="inline-flex items-center text-sm text-surface-dark-foreground/60 hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Retour à l'espace client
        </Link>

        <div className="flex items-center gap-2 mb-8 text-xs">
          <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border", step >= 1 ? "border-primary text-primary" : "border-white/10 text-surface-dark-foreground/40")}>
            <span className="w-5 h-5 rounded-full bg-primary/20 grid place-items-center text-[10px] font-bold">1</span>
            Service
          </span>
          <span className="h-px w-6 bg-white/10" />
          <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border", step >= 2 ? "border-primary text-primary" : "border-white/10 text-surface-dark-foreground/40")}>
            <span className="w-5 h-5 rounded-full bg-primary/20 grid place-items-center text-[10px] font-bold">2</span>
            Détails
          </span>
        </div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              De quel <span className="gradient-text">service</span> avez-vous besoin ?
            </h1>
            <p className="text-surface-dark-foreground/60 mb-6">Sélectionnez la catégorie qui correspond à votre projet.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setService(s.key)}
                  className={cn(
                    "group text-left rounded-2xl border p-4 transition-all flex items-start gap-3",
                    service === s.key
                      ? "border-primary bg-primary/10 shadow-[0_0_22px_hsl(0_85%_50%/0.25)]"
                      : "border-white/10 bg-surface-dark/50 hover:border-primary/40",
                  )}
                >
                  <div className={cn("w-10 h-10 rounded-xl grid place-items-center border border-white/10 bg-gradient-to-br shrink-0", s.gradient)}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-surface-dark-foreground">{s.label}</div>
                  </div>
                  {service === s.key && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="hero" disabled={!service} onClick={() => setStep(2)}>
                Continuer <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && service && (
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Parlez-nous de votre <span className="gradient-text">projet</span>
            </h1>
            <p className="text-surface-dark-foreground/60 mb-6">Plus c'est précis, plus on peut vous aider efficacement.</p>
            <div className="space-y-4 rounded-3xl border border-white/10 bg-surface-dark/60 p-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-surface-dark-foreground/50 mb-1.5 block">Titre du projet *</label>
                <input className={inputClass} value={form.title} maxLength={120} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Ex. Refonte du site e-commerce" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-surface-dark-foreground/50 mb-1.5 block">Description *</label>
                <textarea className={inputClass} rows={5} value={form.description} maxLength={4000} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Décrivez votre besoin, vos objectifs, votre cible…" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-surface-dark-foreground/50 mb-1.5 block">Budget estimé</label>
                  <input className={inputClass} value={form.budget} maxLength={80} onChange={(e) => setForm({ ...form, budget: e.target.value })} placeholder="Ex. 3 000 – 5 000 €" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-surface-dark-foreground/50 mb-1.5 block">Deadline souhaitée</label>
                  <input className={inputClass} value={form.deadline} maxLength={80} onChange={(e) => setForm({ ...form, deadline: e.target.value })} placeholder="Ex. Avant fin du mois" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-surface-dark-foreground/50 mb-1.5 block">Détails complémentaires</label>
                <textarea className={inputClass} rows={3} value={form.details} maxLength={4000} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Liens, références, contraintes techniques…" />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Retour
              </Button>
              <Button variant="hero" disabled={submitting} onClick={submit} className="glow-red">
                {submitting ? "Envoi…" : "Envoyer ma demande"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EspaceClientNouvelleDemande;