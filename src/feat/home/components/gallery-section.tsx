import Image from "next/image";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

export async function GallerySection() {
  const galleryDir = path.join(process.cwd(), "public", "galerie");
  const files = await readdir(galleryDir);
  const photos = files
    .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Section id="gallery">
      <SectionTitle>Galerie</SectionTitle>
      <div className="columns-2 lg:columns-3 gap-4 lg:max-w-2/3">
        {photos.map((file, index) => (
          <GalleryImage
            key={file}
            src={`/galerie/${encodeURIComponent(file)}`}
            alt={`Photo galerie ${index + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <a href={src} target="_blank" rel="noopener noreferrer">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={900}
        className="rounded-md overflow-hidden mb-4 hover:opacity-80 transition-opacity duration-200"
      />
    </a>
  );
}
