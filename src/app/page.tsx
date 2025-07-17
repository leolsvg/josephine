"use client";

import Link from "next/link";
import CarteMenu from "@/components/carte";

export default function Home() {
  return (
    <div>
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10">
          {/* NAVBAR */}
          <nav className="w-full p-4 flex items-center justify-center text-white relative">
            {/* Logo à gauche */}
            <div className="absolute left-4">
              <img className="w-8" src="/favicon.ico" alt="Logo de Joséphine" />
            </div>

            {/* Liens centrés */}
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#menu">Menu</a>
              </li>
              <li>
                <a href="#fournisseurs">Fournisseurs</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>

            {/* Bouton "Réserver" fixé à l'écran */}
            <a
              className="fixed top-4 right-4 bg-[#000150] text-white pt-1.5 pb-1.5 pl-3 pr-3 rounded z-50 shadow-md"
              href="#reservation"
            >
              Réserver
            </a>
          </nav>

          {/* TEXTE ACCUEIL */}
          <section className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <h1 className="text-white text-4xl font-bold text-center">
              Bienvenue chez Joséphine
            </h1>
          </section>
        </div>
      </div>
      <div className="bg-yellow-50">
        <h1 className="text-black uppercase text-center text-[90px] font-bold">
          menu & cartes
        </h1>
        <div
          id="menu"
          className="min-h-screen flex flex-wrap gap-8 justify-center items-center pb-1"
        >
          <CarteMenu
            logoSrc="/favicon.ico"
            titre="MENU DÉJEUNER"
            href="/menu"
          />
          <CarteMenu
            logoSrc="/favicon.ico"
            titre="CARTE DU SOIR ET WEEK-END"
            href="/carte"
          />
          <CarteMenu logoSrc="/favicon.ico" titre="NOS VINS" href="/dimanche" />
          <CarteMenu
            logoSrc="/favicon.ico"
            titre="NOS BOISSONS"
            href="/cocktails"
          />
        </div>
      </div>
      <div id="fournisseurs">
        <h1 className="text-3xl font-bold">Nos fournisseurs</h1>
        <p>
          Chez Joséphine, la qualité commence par le choix des bons partenaires.
          <br />
          Nous travaillons main dans la main avec des producteurs et artisans{" "}
          <br />
          locaux passionnés, qui partagent nos valeurs de fraîcheur, de
          saisonnalité et de respect du produit. <br /> Découvrez ceux qui nous
          permettent chaque jour de vous proposer une cuisine sincère et
          savoureuse.
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Nos avis clients</h1>
      </div>
      <div className="h-px bg-gray-300 my-8 w-full">
        <footer className="bg-gray-900 text-white px-6 py-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p className="mb-1">
                <a
                  href="mailto:contact@josephine.fr"
                  className="hover:underline"
                >
                  contact@josephine.fr
                </a>
              </p>
              <p className="mb-1">
                <a href="tel:+33233873164" className="hover:underline">
                  +33 2 33 87 31 64
                </a>
              </p>
              <p>
                <a
                  href="https://maps.app.goo.gl/nUairufUmvsgi8mT6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  12 Place de la République, 50100 Cherbourg
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Suivez-nous</h2>
              <div className="flex flex-col gap-4 mt-2">
                <a
                  href="https://www.instagram.com/josephine_cherbourg/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <img
                    src="/img/instagram.svg"
                    alt="Instagram"
                    className="w-10 h-10 hover:opacity-75 transition"
                  />
                </a>
                <a
                  href="https://www.facebook.com/josephine.cherbourg"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <img
                    src="/img/facebook.svg"
                    alt="Facebook"
                    className="w-10 h-10 hover:opacity-75 transition"
                  />
                </a>
                <a
                  href="https://g.co/kgs/BFut6H7"
                  target="_blank"
                  aria-label="Google"
                >
                  <img
                    src="/img/google.svg"
                    alt="Google"
                    className="w-10 h-10 hover:opacity-75 transition"
                  />
                </a>
              </div>
            </div>

            <div id="contact">
              <h2 className="text-lg font-semibold mb-2">Informations</h2>
              <ul>
                <li>
                  <a href="/mentions-legales" className="hover:underline">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a
                    href="/politique-confidentialite"
                    className="hover:underline"
                  >
                    Confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
            © 2025 Restaurant Joséphine. Tous droits réservés.
          </div>
        </footer>
      </div>
    </div>
  );
}
