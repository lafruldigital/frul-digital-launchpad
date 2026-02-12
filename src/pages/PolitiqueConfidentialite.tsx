import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-surface-darker text-surface-dark-foreground">
      <Navbar />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-10">
            Politique de <span className="gradient-text">confidentialité</span>
          </h1>

          <div className="space-y-8 text-surface-dark-foreground/70 leading-relaxed">
            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Collecte des données</h2>
              <p>Les informations personnelles collectées via le formulaire de contact (nom, email, téléphone, entreprise) sont utilisées uniquement dans le cadre de votre demande et ne sont jamais transmises à des tiers.</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Utilisation des données</h2>
              <p>Vos données sont utilisées exclusivement pour répondre à vos demandes, vous recontacter et vous fournir les services demandés.</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Conservation</h2>
              <p>Vos données personnelles sont conservées pendant une durée maximale de 3 ans à compter de votre dernier contact avec nous.</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Vos droits</h2>
              <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : contactfruldigital@gmail.com</p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-surface-dark-foreground mb-3">Cookies</h2>
              <p>Ce site peut utiliser des cookies à des fins de mesure d'audience et d'amélioration de l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
