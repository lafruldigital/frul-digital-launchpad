import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Crown, ExternalLink } from "lucide-react";

export const SubscriptionCard = () => {
  const { subscriptionEnd } = useAuth();
  const [loading, setLoading] = useState(false);

  const formattedEnd = subscriptionEnd
    ? new Date(subscriptionEnd).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const handleManage = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-dark border border-primary/10 rounded-2xl p-6 md:p-8 hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Crown className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-heading font-bold text-lg">Statut de l'abonnement</h2>
      </div>

      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-primary font-medium text-sm">Abonnement Premium Actif</span>
      </div>
      <p className="text-surface-dark-foreground/40 text-sm mb-6">
        Prochain prélèvement : {formattedEnd}
      </p>

      <Button
        variant="hero-outline"
        className="w-full"
        onClick={handleManage}
        disabled={loading}
      >
        {loading ? "Chargement..." : <>Gérer mon abonnement <ExternalLink className="w-4 h-4 ml-2" /></>}
      </Button>
    </div>
  );
};
