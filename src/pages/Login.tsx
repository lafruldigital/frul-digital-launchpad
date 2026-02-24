import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur de connexion", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  const inputClass =
    "w-full bg-surface-dark border border-primary/10 rounded-xl px-5 py-4 text-surface-dark-foreground placeholder:text-surface-dark-foreground/30 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_16px_hsl(0_85%_50%/0.15)] transition-all duration-300 text-base";

  return (
    <div className="min-h-screen bg-surface-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-10">
          <img src={frulLogo} alt="Frul'digital" className="h-12 w-12 rounded-xl" />
        </Link>

        <div className="bg-surface-dark border border-primary/10 rounded-3xl p-8 md:p-10">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">
            Bon retour <span className="gradient-text">parmi nous</span>
          </h1>
          <p className="text-surface-dark-foreground/50 text-center mb-8">
            Connectez-vous à votre espace client
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-dark-foreground/30" />
              <input
                type="email" placeholder="Email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass + " pl-12"}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-dark-foreground/30" />
              <input
                type="password" placeholder="Mot de passe" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass + " pl-12"}
              />
            </div>
            <Button type="submit" variant="hero" className="w-full py-5 glow-red" disabled={loading}>
              {loading ? "Connexion..." : <>Se connecter <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </form>

          <p className="text-center text-surface-dark-foreground/40 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
