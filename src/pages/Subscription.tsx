import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Check, ArrowRight, Crown, Zap, BarChart3, Headphones, Star, Rocket } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const tiers = [
  {
    id: "free",
    name: "Gratuit",
    price: "0€",
    period: "",
    description: "Accès de base au Dashboard",
    icon: Star,
    features: [
      "Accès au tableau de bord",
      "Aperçu des rapports",
      "Support communautaire",
    ],
    cta: "Commencer gratuitement",
    highlighted: false,
    price_id: null,
  },
  {
    id: "premium",
    name: "Premium",
    price: "49€",
    period: "/mois",
    description: "Accès avancé à tous les outils",
    icon: Crown,
    features: [
      "Accès complet aux outils digitaux",
      "Rapports de performance mensuels",
      "Ressources et templates exclusifs",
      "Support prioritaire par email",
    ],
    cta: "Choisir Premium",
    highlighted: true,
    price_id: "price_1T4NxvDMDOcx2jX0GzWKKNAF",
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "99€",
    period: "/mois",
    description: "Accès complet + support dédié",
    icon: Rocket,
    features: [
      "Tout ce qui est dans Premium",
      "Outils avancés illimités",
      "Support prioritaire par un expert dédié",
      "Accès aux formations exclusives",
      "Rapports personnalisés",
    ],
    cta: "Choisir Ultra",
    highlighted: false,
    price_id: "price_1T4OBPDMDOcx2jX0yRT1p63G",
  },
];

const Subscription = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { user, refreshSubscription } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async (tier: typeof tiers[number]) => {
    if (!user) {
      navigate("/signup");
      return;
    }

    if (tier.id === "free") {
      setLoading("free");
      try {
        const { error } = await supabase
          .from("profiles")
          .update({ plan: "free" } as any)
          .eq("id", user.id);
        if (error) throw error;
        await refreshSubscription();
        navigate("/dashboard");
      } catch (err: any) {
        toast({ title: "Erreur", description: err.message, variant: "destructive" });
      } finally {
        setLoading(null);
      }
      return;
    }

    setLoading(tier.id);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { price_id: tier.price_id },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface-darker flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-5xl">
        <Link to="/" className="flex justify-center mb-6">
          <img src={frulLogo} alt="Frul'digital" className="h-12 w-12 rounded-xl" />
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
            Choisissez votre <span className="gradient-text">plan</span>
          </h1>
          <p className="text-surface-dark-foreground/50 max-w-md mx-auto">
            Débloquez l'accès à votre espace client Frul'digital
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative bg-surface-dark border rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-300 ${
                tier.highlighted
                  ? "border-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.15)] scale-[1.03]"
                  : "border-primary/10 hover:border-primary/20"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider">
                  Populaire
                </div>
              )}

              {/* Glow */}
              {tier.highlighted && (
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
              )}

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <tier.icon className={`w-5 h-5 ${tier.highlighted ? "text-primary" : "text-surface-dark-foreground/50"}`} />
                  <span className={`text-sm font-semibold uppercase tracking-[0.15em] ${tier.highlighted ? "text-primary" : "text-surface-dark-foreground/50"}`}>
                    {tier.name}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="text-4xl font-heading font-bold">{tier.price}</span>
                  {tier.period && <span className="text-surface-dark-foreground/40 text-base">{tier.period}</span>}
                </div>

                <p className="text-surface-dark-foreground/40 text-sm mb-6">{tier.description}</p>

                <div className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlighted ? "text-primary" : "text-surface-dark-foreground/30"}`} />
                      <span className="text-surface-dark-foreground/60 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={tier.highlighted ? "hero" : "outline"}
                  className={`w-full py-4 ${tier.highlighted ? "glow-red" : "border-primary/20 text-surface-dark-foreground/70 hover:border-primary/40 hover:text-primary"}`}
                  onClick={() => handleCheckout(tier)}
                  disabled={loading !== null}
                >
                  {loading === tier.id ? "Redirection..." : (
                    <>
                      {tier.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-surface-dark-foreground/30 text-xs mt-8">
          Annulable à tout moment · Paiement sécurisé via Stripe
        </p>
      </div>
    </div>
  );
};

export default Subscription;
