"use client";

import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CarteMenu from "@/components/carte";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      {/* NAVBAR FIXÉE EN HAUT */}
      <nav className="fixed top-0 left-0 w-full p-6 flex items-center justify-center text-black font z-50 bg-white/80 backdrop-blur-md shadow-md">
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
        {/* Bouton "Réserver" à droite */}
        <a
          className="uppercase fixed top-4 right-4 bg-[#000150] text-white pt-1.5 pb-1.5 px-6 rounded z-50 shadow-md"
          href="/reservation"
        >
          Réserver
        </a>
      </nav>

      {/* IMAGE D'ACCUEIL */}
      <div
        className="relative pt-20 min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[60px] font-bold text-center"
          >
            Bienvenue chez Joséphine
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-[20px] text-center pt-10"
          >
            Joséphine est un restaurant de bistronomie situé à Cherbourg, <br />
            nous utilisons des produits locaux et de saison pour vous offrir une
            expérience culinaire unique.
          </motion.h3>
        </div>
      </div>

      {/* MENU & CARTES */}
      <div className="bg-white">
        <h1 className="text-black uppercase text-center text-[90px] font-bold">
          menu & cartes
        </h1>
        <ScrollArea className="w-full overflow-x-auto px-6" id="menu">
          <div className="flex w-max gap-6 py-12">
            <CarteMenu
              logoSrc="/favicon.ico"
              titre="MENU DÉJEUNER"
              href="/les_cartes/menu_dejeuner"
            />
            <CarteMenu
              logoSrc="/favicon.ico"
              titre="CARTE DU SOIR ET WEEK-END"
              href="/les_cartes/soir_weekend"
            />
            <CarteMenu
              logoSrc="/favicon.ico"
              titre="NOS VINS"
              href="/les_cartes/les_vins"
            />
            <CarteMenu
              logoSrc="/favicon.ico"
              titre="NOS BOISSONS"
              href="/les_cartes/les_boissons"
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* FOURNISSEURS */}
      <section id="fournisseurs" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Nos Fournisseurs Locaux
          </h2>
          <p className="flex justify-center text-center">
            Chez Joséphine, la qualité commence par le choix des bons
            partenaires.
            <br />
            Nous travaillons main dans la main avec des producteurs et artisans{" "}
            <br />
            locaux passionnés, qui partagent nos valeurs de fraîcheur, de
            saisonnalité et de respect du produit. <br /> Découvrez ceux qui
            nous permettent chaque jour de vous proposer une cuisine sincère et
            savoureuse.
          </p>

          <div className="grid gap-8 pt-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Fournisseur 1 */}
            <div className="bg-gray-100 rounded-lg shadow p-5 hover:shadow-lg transition duration-300">
              <img
                src="/img/vergers.jpg"
                alt="Vergers de la Passion"
                className="rounded mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">
                Les Vergers de la Passion
              </h3>
              <p className="text-sm text-gray-600 mb-2">Boissons artisanales</p>
              <p className="text-gray-700 italic">
                « Des jus naturels, pressés à la main en Normandie. »
              </p>
            </div>

            {/* Fournisseur 2 */}
            <div className="bg-gray-100 rounded-lg shadow p-5 hover:shadow-lg transition duration-300">
              <img
                src="/img/boulangerie.jpg"
                alt="Boulangerie Châtel"
                className="rounded mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">Boulangerie Châtel</h3>
              <p className="text-sm text-gray-600 mb-2">Pain frais du jour</p>
              <p className="text-gray-700 italic">
                « Un savoir-faire transmis depuis trois générations. »
              </p>
            </div>

            {/* Fournisseur 3 */}
            <div className="bg-gray-100 rounded-lg shadow p-5 hover:shadow-lg transition duration-300">
              <img
                src="/img/fromagerie.jpg"
                alt="La Cave à Fromage"
                className="rounded mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-semibold">La Cave à Fromage</h3>
              <p className="text-sm text-gray-600 mb-2">Sélection affinée</p>
              <p className="text-gray-700 italic">
                « Des produits de terroir sélectionnés avec soin. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
