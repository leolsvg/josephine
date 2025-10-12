import Image from "next/image";
import { caller } from "@/lib/trpc/server";
import Background from "../../../public/restaurant/bar.jpeg";
import { Reviews } from "./reviews";

export async function HeroSection() {
  const data = await caller.places.get();

  return (
    <main>
      <section className="relative h-svh">
        <Image
          src={Background}
          alt="Bar du restaurant Joséphine"
          fill
          priority
          placeholder="blur"
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 bg-black/50 -z-10" />
        <div className="absolute w-full top-[35%] flex flex-col justify-center items-center text-white gap-6">
          <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-center px-6">
            Bienvenue chez Joséphine
          </h1>
          <div className="text-lg sm:text-xl text-center max-w-2xl px-6">
            Joséphine est un restaurant de bistronomie situé à Cherbourg, nous
            utilisons des produits locaux et de saison pour vous offrir une
            expérience culinaire unique.
          </div>
        </div>
        <Reviews reviews={data.reviews} />
      </section>
    </main>
  );
}
