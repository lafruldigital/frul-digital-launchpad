import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight, Eye, EyeOff, KeyRound, ShieldCheck, LayoutDashboard } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      navigate("/espace-client");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_24px_hsl(0_85%_50%/0.2)] transition-all duration-300 text-base backdrop-blur-xl";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070b] flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08070b_75%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <KeyRound className="absolute top-[14%] right-[8%] w-10 h-10 text-primary/15 rotate-[18deg]" />
        <LayoutDashboard className="absolute top-[22%] left-[10%] w-14 h-14 text-white/[0.04]" />
        <ShieldCheck className="absolute bottom-[16%] right-[12%] w-12 h-12 text-white/[0.05]" />
        <KeyRound className="absolute bottom-[12%] left-[16%] w-8 h-8 text-primary/15 rotate-[-12deg]" />
        <LayoutDashboard className="absolute top-[58%] right-[5%] w-6 h-6 text-white/[0.06]" />
      </div>

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img src={frulLogo} alt="Frul'digital" className="h-12 w-12 rounded-xl ring-1 ring-white/10" />
        </Link>

        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-primary/20">
          <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/5 p-8 md:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary/90 tracking-wide">Connexion sécurisée</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-white tracking-tight">
                Bon retour
              </h1>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Reconnectez-vous à votre espace client pour suivre vos demandes et reprendre vos conversations.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="email" placeholder="Email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe" required
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    aria-label={showPassword ? "Masquer" : "Afficher"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 mt-2 rounded-xl bg-gradient-to-r from-primary to-[hsl(0_85%_55%)] hover:from-[hsl(0_85%_55%)] hover:to-primary text-white font-semibold tracking-wide shadow-[0_8px_32px_-8px_hsl(0_85%_50%/0.6)] hover:shadow-[0_12px_40px_-8px_hsl(0_85%_50%/0.8)] transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Connexion..." : <>Connexion <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>

              <div className="relative my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">ou</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <Link
                to="/admin-login"
                className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-primary/40 text-white/80 hover:text-white text-sm font-medium transition-all duration-300"
              >
                <KeyRound className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                Accès Espace Administrateur
              </Link>

              <p className="text-center text-white/40 text-sm mt-6">
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
                  S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;