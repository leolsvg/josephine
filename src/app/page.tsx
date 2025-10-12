import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { HeroSection } from "./_components/hero-section";
import { MenusSection } from "./_components/menus-section";
import { SuppliersSection } from "./_components/suppliers-section";

// Ensure home page is static
export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <div className="container mx-auto py-40 space-y-40 px-3">
        <MenusSection />
        <SuppliersSection />
      </div>
      <Footer />
    </>
  );
}
