import { Footer } from "./_components/footer";
import { GallerySection } from "./_components/gallery-section";
import { Header } from "./_components/header";
import { HeroSection } from "./_components/hero-section";
import { MenusSection } from "./_components/menus-section";
import { SuppliersSection } from "./_components/suppliers-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <div className="container mx-auto py-40 space-y-40 px-3">
        <MenusSection />
        <SuppliersSection />
        <GallerySection />
      </div>
      <Footer />
    </>
  );
}
