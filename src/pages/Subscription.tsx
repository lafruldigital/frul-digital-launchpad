import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Check, ArrowRight, Crown, Zap, BarChart3, Headphones } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const features = [
  { icon: Zap, text: "Accès complet aux outils digitaux" },
  { icon: BarChart3, text: "Rapports de performance mensuels" },
  { icon: Crown, text: "Ressources et templates exclusifs" },
  { icon: Headphones, text: "Support prioritaire par un expert dédié" },
];

const Subscription = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout");
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-darker flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Link to="/" className="flex justify-center mb-10">
          <img src={frulLogo} alt="Frul'digital" className="h-12 w-12 rounded-xl" />
        </Link>

        <div className="bg-surface-dark border border-primary/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
          {/* Glow background */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">Premium</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">
              Passez à l'offre <span className="gradient-text">Premium</span>
            </h1>
            <p className="text-surface-dark-foreground/50 text-center mb-8">
              Débloquez l'accès complet à votre espace client Frul'digital
            </p>

            {/* Price */}
            <div className="text-center mb-8">
              <span className="text-5xl font-heading font-bold">49€</span>
              <span className="text-surface-dark-foreground/40 text-lg">/mois</span>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-10">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-surface-dark-foreground/70">{f.text}</span>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              className="w-full py-5 glow-red text-lg"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Redirection..." : <>Commencer maintenant <ArrowRight className="w-5 h-5 ml-2" /></>}
            </Button>

            <p className="text-center text-surface-dark-foreground/30 text-xs mt-4">
              Annulable à tout moment · Paiement sécurisé via Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
