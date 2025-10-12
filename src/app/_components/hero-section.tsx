import Image from "next/image";
import { caller } from "@/lib/trpc/server";
import Background from "../../../public/restaurant/bar.jpeg";
import { Reviews } from "./reviews";

export async function HeroSection() {
  const data = await caller.places.get();
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
          <div className="grow flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center">
              Bienvenue chez Joséphine
            </h1>
            <div className="text-base sm:text-lg lg:text-xl text-center max-w-2xl">
              Joséphine est un restaurant de bistronomie situé à Cherbourg, nous
              utilisons des produits locaux et de saison pour vous offrir une
              expérience culinaire unique.
            </div>
          </div>
          <Reviews reviews={data?.reviews} />
        </div>
      </section>
    </main>
  );
}
