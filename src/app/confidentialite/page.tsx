"use client";

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Politique de confidentialité
      </h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          1. Collecte des données personnelles
        </h2>
        <p>
          Nous collectons uniquement les données strictement nécessaires à la
          gestion des réservations : nom, email, numéro de téléphone, nombre de
          personnes, date et heure souhaitée.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          2. Utilisation des données
        </h2>
        <p>Les données collectées sont utilisées pour :</p>
        <ul className="list-disc ml-6">
          <li>Confirmer ou annuler une réservation</li>
          <li>Contacter les clients en cas de problème</li>
          <li>Suivre la fréquentation du restaurant</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">3. Partage des données</h2>
        <p>
          Aucune donnée personnelle n’est vendue ou cédée à des tiers. Les
          informations sont stockées de manière sécurisée via notre prestataire
          Supabase.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          4. Conservation des données
        </h2>
        <p>
          Les données sont conservées pendant une durée maximale de 12 mois
          après la date de réservation, sauf demande de suppression anticipée de
          la part du client.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="list-disc ml-6">
          <li>Droit d'accès à vos données</li>
          <li>Droit de rectification ou de suppression</li>
          <li>Droit à la limitation ou à l’opposition du traitement</li>
        </ul>
        <p className="mt-2">
          Pour exercer vos droits, contactez-nous à :{" "}
          <a
            href="mailto:contact@josephine.fr"
            className="text-blue-600 underline"
          >
            contact@josephine.fr
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
        <p>
          Ce site n’utilise pas de cookies publicitaires ou de suivi
          comportemental. Seuls des cookies essentiels au bon fonctionnement
          peuvent être utilisés.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          7. Modification de la politique
        </h2>
        <p>
          Cette politique de confidentialité peut être mise à jour à tout
          moment. La dernière mise à jour date du 1er août 2025.
        </p>
      </section>
    </div>
  );
}
