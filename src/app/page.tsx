import { Footer } from "@/feat/home/components/footer";
import { GallerySection } from "@/feat/home/components/gallery-section";
import { Header } from "@/feat/home/components/header";
import { HeroSection } from "@/feat/home/components/hero-section";
import { MenusSection } from "@/feat/home/components/menus-section";
import { SuppliersSection } from "@/feat/home/components/suppliers-section";
export const dynamic = "force-dynamic";
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
