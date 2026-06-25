import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AmbientBackground } from "./components/AmbientBackground";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import FrulLab from "./pages/FrulLab";
import Results from "./pages/Results";
import Temoignages from "./pages/Temoignages";
import Process from "./pages/Process";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Realisations from "./pages/Realisations";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Subscription from "./pages/Subscription";
import Dashboard from "./pages/Dashboard";
import EspaceClient from "./pages/EspaceClient";
import EspaceClientNouvelleDemande from "./pages/EspaceClientNouvelleDemande";
import EspaceClientDemande from "./pages/EspaceClientDemande";
import AdminLogin from "./pages/AdminLogin";
import AdminSpace from "./pages/AdminSpace";
import AdminDossier from "./pages/AdminDossier";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AmbientBackground />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/frul-lab" element={<FrulLab />} />
            <Route path="/resultats" element={<Results />} />
            <Route path="/temoignages" element={<Temoignages />} />
            <Route path="/processus" element={<Process />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/realisations" element={<Realisations />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/espace-client" element={<EspaceClient />} />
            <Route path="/espace-client/nouvelle-demande" element={<EspaceClientNouvelleDemande />} />
            <Route path="/espace-client/demande/:id" element={<EspaceClientDemande />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminSpace />} />
            <Route path="/admin/dossier/:id" element={<AdminDossier />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
