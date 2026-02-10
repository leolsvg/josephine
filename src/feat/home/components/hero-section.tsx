import Image from "next/image";
import Link from "next/link";
import Background from "../../../../public/restaurant/bar.jpeg";
import { Reviews } from "./reviews";

export async function HeroSection() {
  const place = await getCachedPlace();
  return (
    <main>
      <section className="relative min-h-svh">
        <Image
          src={Background}
          alt="Bar du restaurant Joséphine"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        {/* Padding top to ensure below header and min-h to let overflow (cant use h-full since parent does not have fixed height) */}
        <div className="min-h-svh flex flex-col text-white gap-6 pt-22 pb-6 px-6">
          <div className="flex justify-center">
            <Link
              href="/menus/stvalentin"
              className="text-xs sm:text-sm px-3 py-1 rounded-full border border-rose-200/70 bg-rose-500/20 text-rose-50 backdrop-blur-sm hover:bg-rose-500/30 transition"
            >
              Nouveau: Menu Saint-Valentin disponible
            </Link>
          </div>
          <div className="grow flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center text-shadow-lg">
              Bienvenue chez{" "}
              <span className="font-alex text-7xl">Joséphine</span>
            </h1>
            <div className="text-base sm:text-lg lg:text-xl text-center max-w-2xl text-shadow-lg">
              Joséphine est un restaurant de bistronomie situé à Cherbourg, nous
              utilisons des produits locaux et de saison pour vous offrir une
              expérience culinaire unique.
            </div>
          </div>
          <Reviews reviews={place?.reviews} />
        </div>
      </section>
    </main>
  );
}
async function getCachedPlace() {
  // TODO: Implement this function to fetch place data from your data source
  return {
    reviews: [],
  };
}

