import Link from "next/link";
import { BackToHomeButton } from "@/components/back-to-home-button";

export default function LegalNoticesPage() {
  return (
    <main className="container mx-auto max-w-3xl px-4 lg:px-8 py-10 space-y-8">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Mentions légales</h1>
        <p className="text-muted-foreground text-sm">
          Dernière mise à jour le 3 septembre 2025
        </p>
      </header>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Éditeur du site</h2>
        <div className="flex flex-col gap-1">
          <p>Restaurant Joséphine</p>
          <p>SARL au capital de 5 000 €</p>
          <p>12 Place de la République, 50100 Cherbourg</p>
          <p>Téléphone : 02 33 87 31 64</p>
          <p>
            Email :{" "}
            <Link
              href="mailto:contact@josephine-cherbourg.fr"
              className="text-primary hover:underline"
            >
              contact@josephine-cherbourg.fr
            </Link>
          </p>
          <p>Numéro SIRET : 941 644 270 00014</p>
          <p>Directrice de la publication : Sarah Scelles</p>
        </div>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Hébergeur</h2>
        <div className="flex flex-col gap-1">
          <p>Vercel Inc.</p>
          <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          <p>
            Site :{" "}
            <Link
              href="https://vercel.com"
              target="_blank"
              className="text-primary hover:underline"
            >
              vercel.com
            </Link>
          </p>
        </div>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          Conception et développement
        </h2>
        <p>Ce site a été conçu et développé par Léo Renouf.</p>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les contenus du site (textes, images, logos, graphismes, vidéos,
          etc.) sont protégés par le droit d'auteur. Sauf mention contraire, ils
          sont la propriété exclusive du Restaurant Joséphine et ne peuvent être
          reproduits sans autorisation écrite préalable.
        </p>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Données personnelles</h2>
        <p>
          Les données collectées via le formulaire de réservation sont utilisées
          uniquement pour la gestion des réservations. Conformément au RGPD,
          vous disposez d'un droit d'accès, de rectification, d'opposition, de
          limitation et de suppression de vos données.
        </p>
        <p>
          Pour exercer vos droits :{" "}
          <Link
            href="mailto:contact@josephine-cherbourg.fr"
            className="text-primary hover:underline"
          >
            contact@josephine-cherbourg.fr
          </Link>
        </p>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Cookies</h2>
        <p>
          Ce site n'utilise pas de cookies à des fins publicitaires ou de suivi.
        </p>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">Responsabilité</h2>
        <p>
          Le Restaurant Joséphine ne saurait être tenu responsable des erreurs
          ou omissions présentes sur le site. Les informations sont données à
          titre indicatif et peuvent être modifiées à tout moment.
        </p>
      </section>

      <section className="text-sm leading-normal">
        <h2 className="text-lg font-semibold mb-2">
          Loi applicable et juridiction
        </h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <div className="text-center pt-8">
        <BackToHomeButton />
      </div>
    </main>
  );
}
