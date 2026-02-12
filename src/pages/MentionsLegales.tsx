import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-surface-darker text-surface-dark-foreground">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10">
            Mentions <span className="gradient-text">légales</span>
          </h1>

          <div className="space-y-8 text-surface-dark-foreground/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Éditeur du site</h2>
              <p>FRUL'DIGITAL</p>
              <p>60 avenue François 1er, 75008 Paris</p>
              <p>Email : contactfruldigital@gmail.com</p>
              <p>Téléphone : 06 52 23 77 36 / 06 30 56 30 19</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Hébergement</h2>
              <p>Ce site est hébergé par Lovable (lovable.dev).</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Propriété intellectuelle</h2>
              <p>L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Responsabilité</h2>
              <p>FRUL'DIGITAL s'efforce d'assurer l'exactitude des informations diffusées sur ce site, mais ne saurait être tenue responsable des erreurs, omissions ou résultats obtenus suite à l'utilisation de ces informations.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
