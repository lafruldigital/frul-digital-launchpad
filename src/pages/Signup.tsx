import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, MessageCircle, MessagesSquare, Sparkles } from "lucide-react";
import frulLogo from "@/assets/frul-digital-logo.jpg";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Compte créé !",
        description: "Vérifiez votre email pour confirmer votre inscription.",
      });
      navigate("/login");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_24px_hsl(0_85%_50%/0.2)] transition-all duration-300 text-base backdrop-blur-xl";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070b] flex items-center justify-center px-4 py-12">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[160px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08070b_75%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <MessageCircle className="absolute top-[12%] left-[8%] w-10 h-10 text-primary/10 rotate-[-12deg]" />
        <MessagesSquare className="absolute top-[20%] right-[10%] w-14 h-14 text-white/[0.04]" />
        <MessageCircle className="absolute bottom-[18%] left-[14%] w-12 h-12 text-white/[0.05] rotate-[8deg]" />
        <MessagesSquare className="absolute bottom-[10%] right-[18%] w-9 h-9 text-primary/15" />
        <MessageCircle className="absolute top-[55%] left-[4%] w-6 h-6 text-white/[0.06]" />
      </div>

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <img src={frulLogo} alt="Frul'digital" className="h-12 w-12 rounded-xl ring-1 ring-white/10" />
        </Link>

        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/15 via-white/5 to-primary/20">
          <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/5 p-8 md:p-10 overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary/90 tracking-wide">Espace client</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-white tracking-tight">
                S'inscrire
              </h1>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Accédez à votre espace sécurisé pour suivre vos demandes et discuter directement avec l'équipe Frul'digital de votre projet <span className="text-white/80">(suivi de tchat inclus)</span>.
              </p>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                  <input
                    type="text" placeholder="Prénom" required value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                </div>
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
                    placeholder="min. 6 caractères" required minLength={6}
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
                  {loading ? "Création..." : <>Créer mon compte <ArrowRight className="w-4 h-4 ml-2" /></>}
                </Button>
              </form>

              <p className="text-center text-white/40 text-sm mt-6">
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;