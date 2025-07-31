"use client";

import { useState } from "react";
import Link from "next/link";
import CarteMenu from "@/components/carte";
import { motion } from "framer-motion";
import Fournisseurs from "@/components/fournisseur";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full overflow-x-hidden relative">
      {/* NAVBAR pour desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full p-4 md:p-6 items-center justify-center text-black font z-50 bg-white/80 backdrop-blur-md shadow-md">
        <div className="absolute left-4">
          <img className="w-8" src="/favicon.ico" alt="Logo de Joséphine" />
        </div>
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
      </nav>

      {/* MENU BURGER mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X size={28} className="text-black" />
          ) : (
            <Menu size={28} className="text-black" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed top-16 left-4 bg-white p-4 rounded shadow z-50 space-y-2">
          <a
            href="#menu"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-black"
          >
            Menu
          </a>
          <a
            href="#fournisseurs"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-black"
          >
            Fournisseurs
          </a>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="block text-sm text-black"
          >
            Contact
          </a>
        </div>
      )}

      {/* BOUTON RÉSERVER (toujours visible) */}
      <a
        className="uppercase fixed top-4 right-4 bg-[#000150] text-white pt-1.5 pb-1.5 px-4 md:px-6 rounded z-50 text-sm shadow-md"
        href="/reservation"
      >
        Réserver
      </a>

      {/* IMAGE D'ACCUEIL */}
      <div
        className="relative pt-20 min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/bar.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-80px)] px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-[36px] sm:text-[50px] md:text-[60px] font-bold text-center leading-tight"
          >
            Bienvenue chez Joséphine
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-base sm:text-lg md:text-xl text-center pt-6 max-w-2xl"
          >
            Joséphine est un restaurant de bistronomie situé à Cherbourg, <br />
            nous utilisons des produits locaux et de saison pour vous offrir une
            expérience culinaire unique.
          </motion.h3>
        </div>
      </div>

      {/* MENU & CARTES */}
      <div className="bg-white px-4 py-12" id="menu">
        <h1 className="text-black uppercase text-center text-3xl sm:text-5xl font-bold mb-10">
          Menu & Cartes
        </h1>

        {/* Affichage mobile (cartes en colonne) */}
        <div className="flex flex-col items-center gap-6 md:hidden">
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

        {/* Affichage desktop (carrousel horizontal) */}
        <div className="hidden md:block">
          <div className="w-full overflow-x-auto px-2">
            <div className="flex w-max gap-6 py-4">
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
          </div>
        </div>
      </div>

      {/* FOURNISSEURS */}
      <section id="fournisseurs" className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
            Nos Fournisseurs Locaux
          </h2>
          <p className="text-center text-sm sm:text-base leading-relaxed">
            Chez Joséphine, la qualité commence par le choix des bons
            partenaires.
            <br className="hidden sm:inline" />
            Nous travaillons main dans la main avec des producteurs et artisans
            locaux passionnés, qui partagent nos valeurs de fraîcheur, de
            saisonnalité et de respect du produit.
            <br className="hidden sm:inline" />
            Découvrez ceux qui nous permettent chaque jour de vous proposer une
            cuisine sincère et savoureuse.
          </p>
        </div>
        <div className="mt-12">
          <Fournisseurs />
        </div>
      </section>

      {/* FOOTER */}
      <div className="h-px bg-gray-300 my-8 w-full"></div>
      <footer className="bg-gray-900 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <p className="mb-1">
              <a href="mailto:contact@josephine.fr" className="hover:underline">
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
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.instagram.com/josephine_cherbourg/"
                target="_blank"
                aria-label="Instagram"
              >
                <img
                  src="/img/instagram.svg"
                  alt="Instagram"
                  className="w-8 h-8 hover:opacity-75 transition"
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
                  className="w-8 h-8 hover:opacity-75 transition"
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
                  className="w-8 h-8 hover:opacity-75 transition"
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

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-400">
          © 2025 Restaurant Joséphine. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
