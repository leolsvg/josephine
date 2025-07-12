"use client";

import Link from "next/link";

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
          <nav className="w-full p-4 flex justify-between items-center text-white">
            <img
              className="w-8"
              src="/favicon.ico"
              alt="Logo de Joséphine"
            />
            <ul className="flex space-x-6 text-sm">
              <li>
                <Link href="/menu">Menu</Link>
              </li>
              <li>
                <Link href="/fournisseurs">Fournisseurs</Link>
              </li>
              <li>
                <Link href="/reservation">Réserver</Link>
              </li>
            </ul>
          </nav>

          {/* TEXTE ACCUEIL */}
          <section className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <h1 className="text-white text-4xl font-bold text-center">
              Bienvenue chez Joséphine
            </h1>
          </section>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">Nos menus</h1>
        <div className="w-80 flex ml-75 gap-4">
          <img src="/img/lunch.png" alt="Nos menus" />
          <img src="/img/wine-1.png" alt="Nos menus" />
        </div>
        <div className="flex justify-center gap-4">
          <p>--)</p>
          <p>(--</p>
        </div>
      </div>
      <div>
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
    </div>
  );
}
