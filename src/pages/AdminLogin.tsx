import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Validate hardcoded credentials server-side & ensure admin role
      const { data, error } = await supabase.functions.invoke("admin-login", {
        body: { email, password },
      });
      if (error || !(data as any)?.success) {
        toast.error("Accès refusé", { description: (data as any)?.error || error?.message || "Identifiants invalides" });
        return;
      }
      // 2. Sign in with the actual auth user
      const { error: signErr } = await supabase.auth.signInWithPassword({
        email: (data as any).email,
        password,
      });
      if (signErr) {
        toast.error("Connexion impossible", { description: signErr.message });
        return;
      }
      navigate("/admin");
    } finally {
      setLoading(false);
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
        <div className="bg-surface-dark border border-primary/20 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_hsl(0_85%_50%/0.2)]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Espace administrateur</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-center mb-2">
            Accès <span className="gradient-text">back-office</span>
          </h1>
          <p className="text-surface-dark-foreground/50 text-center mb-8 text-sm">
            Réservé à l'équipe Frul'digital
          </p>

          <form onSubmit={submit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-dark-foreground/30" />
              <input type="email" placeholder="Email administrateur" required value={email}
                onChange={(e) => setEmail(e.target.value)} className={inputClass + " pl-12"} />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-dark-foreground/30" />
              <input type="password" placeholder="Mot de passe" required value={password}
                onChange={(e) => setPassword(e.target.value)} className={inputClass + " pl-12"} />
            </div>
            <Button type="submit" variant="hero" className="w-full py-5 glow-red" disabled={loading}>
              {loading ? "Connexion..." : <>Accéder au back-office <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </form>

          <Link to="/login" className="mt-6 flex items-center justify-center text-xs text-surface-dark-foreground/50 hover:text-primary">
            <ArrowLeft className="w-3 h-3 mr-1" /> Retour à la connexion client
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;