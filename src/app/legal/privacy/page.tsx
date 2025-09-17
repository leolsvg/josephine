import { BackToHomeButton } from "@/components/back-to-home-button";
import { Josephine } from "@/lib/josephine";

export default function PrivacyPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 lg:px-8 py-10 space-y-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
        <p className="text-muted-foreground text-sm">
          Dernière mise à jour le 3 septembre 2025
        </p>
      </header>

      <section id="collecte" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          1. Collecte des données personnelles
        </h2>
        <p>
          Nous collectons uniquement les données strictement nécessaires à la
          gestion des réservations : nom, email, numéro de téléphone, nombre de
          personnes, date et heure souhaitée.
        </p>
      </section>

      <section id="utilisation" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          2. Utilisation des données
        </h2>
        <p>Les données collectées sont utilisées pour :</p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Confirmer ou annuler une réservation</li>
          <li>Contacter les clients en cas de problème</li>
          <li>Suivre la fréquentation du restaurant</li>
        </ul>
      </section>

      <section id="partage" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">3. Partage des données</h2>
        <p>
          Aucune donnée personnelle n'est vendue ou cédée à des tiers. Les
          informations sont stockées de manière sécurisée via notre prestataire
          Supabase.
        </p>
      </section>

      <section id="conservation" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          4. Conservation des données
        </h2>
        <p>
          Les données sont conservées pendant une durée maximale de 12 mois
          après la date de réservation, sauf demande de suppression anticipée de
          la part du client.
        </p>
      </section>

      <section id="droits" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">5. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification ou de suppression</li>
          <li>Droit à la limitation ou à l'opposition du traitement</li>
        </ul>
        <p>
          Pour exercer vos droits, contactez-nous à :{" "}
          <a
            href={`mailto:${Josephine.email}`}
            className="text-primary hover:underline"
          >
            {Josephine.email}
          </a>
        </p>
      </section>

      <section id="cookies" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">6. Cookies</h2>
        <p>
          Ce site n'utilise pas de cookies publicitaires ou de suivi
          comportemental. Seuls des cookies essentiels au bon fonctionnement
          peuvent être utilisés.
        </p>
      </section>

      <section id="modification" className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          7. Modification de la politique
        </h2>
        <p>
          Cette politique de confidentialité peut être mise à jour à tout
          moment. La dernière mise à jour date du 1er août 2025.
        </p>
      </section>

      <div className="text-center pt-8">
        <BackToHomeButton />
      </div>
    </main>
  );
}
