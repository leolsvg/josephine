"use client";
import Image from "next/image";

const fournisseurs = [
  {
    nom: "Verges de la Passion",
    src: "/img/vergers_de_la_passion.png",
    alt: "Logo Verges de la Passion",
  },
  {
    nom: "Boulangerie chatel",
    src: "/img/chatel.png",
    alt: "Logo Boulangerie chatel",
  },
  {
    nom: "La Cave a Fromage",
    src: "/img/cave_a_fromage.png",
    alt: "Logo La Cave a Fromage",
  },
];

export default function Fournisseurs() {
  return (
    <section className="py-12 px-4 bg-white">
      {/* Ligne décorative centrée */}
      <div className="flex justify-center items-center mb-12">
        <div className="w-24 h-px bg-black" />
        <div className="mx-2 w-2 h-2 border-2 border-black rounded-full" />
        <div className="mx-1 w-3 h-3 border-2 border-black rounded-full" />
        <div className="mx-2 w-2 h-2 border-2 border-black rounded-full" />
        <div className="w-24 h-px bg-black" />
      </div>

      {/* Grille centrée avec 3 logos */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {fournisseurs.map((fournisseur) => (
          <div
            key={fournisseur.nom}
            className="w-60 h-60 border bg-gray-400 flex flex-col items-center justify-center p-6"
          >
            <Image
              src={fournisseur.src}
              alt={fournisseur.alt}
              width={fournisseur.nom === "Verges de la Passion" ? 200 : 160}
              height={fournisseur.nom === "Verges de la Passion" ? 200 : 160}
              className="object-contain max-h-40"
            />

            {/* Affiche le nom uniquement pour "La Cave a Fromage" */}
            {fournisseur.nom === "La Cave a Fromage" && (
              <p className="mt-4 text-sm font-medium text-black text-center">
                {fournisseur.nom}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
