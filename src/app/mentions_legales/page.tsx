"use client";

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Mentions légales</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          <strong>Restaurant Joséphine</strong>
          <br />
          SAS au capital de [à compléter si connu]
          <br />
          12 Place de la République, 50100 Cherbourg
          <br />
          Téléphone : 02 33 87 31 64
          <br />
          Email : contact@josephine.fr
          <br />
          Numéro SIRET : [à compléter]
          <br />
          Directeur de la publication : [Nom du responsable légal]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
        <p>
          Vercel Inc.
          <br />
          340 S Lemon Ave #4133
          <br />
          Walnut, CA 91789, États-Unis
          <br />
          Site :{" "}
          <a
            href="https://vercel.com"
            className="text-blue-600 underline"
            target="_blank"
          >
            https://vercel.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">
          Conception et développement
        </h2>
        <p>
          Ce site a été conçu et développé par Léo Renouf et Joshua Jourdan.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les contenus (textes, images, logos, etc.) présents sur ce site
          sont la propriété exclusive du restaurant Joséphine, sauf mentions
          contraires, et ne peuvent être reproduits sans autorisation préalable.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
        <p>
          Les données personnelles collectées via le formulaire de réservation
          sont utilisées uniquement dans le cadre de la gestion des réservations
          du restaurant. Aucune donnée n’est cédée ou vendue à des tiers.
          <br />
          Conformément au RGPD, vous disposez d’un droit d’accès, de
          rectification et de suppression de vos données. Pour exercer ces
          droits, contactez : contact@josephine.fr
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>
          Ce site n’utilise pas de cookies à des fins publicitaires ou de suivi
          marketing.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
        <p>
          Le restaurant Joséphine ne saurait être tenu responsable des erreurs
          typographiques, inexactitudes ou omissions présentes sur le site. Les
          informations fournies sont non contractuelles et peuvent être
          modifiées à tout moment.
        </p>
      </section>
    </div>
  );
}
