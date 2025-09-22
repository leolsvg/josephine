export function HeroSection() {
  return (
    <main>
      <section className="bg-cover bg-center bg-no-repeat h-dvh bg-[url('/restaurant/bar.jpeg')] relative">
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
        <div className="relative  flex flex-col justify-center items-center size-full text-white gap-6 z-10">
          <h1 className="text-6xl font-bold leading-tight text-center">
            Bienvenue chez Joséphine
          </h1>
          <div className="text-xl text-center max-w-2xl">
            Joséphine est un restaurant de bistronomie situé à Cherbourg, nous
            utilisons des produits locaux et de saison pour vous offrir une
            expérience culinaire unique.
          </div>
        </div>
      </section>
    </main>
  );
}
