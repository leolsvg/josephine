import Image from "next/image";
import { getCachedMedia, getCachedPlace } from "@/server/routers/places";
import { Section } from "./section";
import { SectionTitle } from "./section-title";

export async function GallerySection() {
  const place = await getCachedPlace();
  return (
    <Section id="menu">
      <SectionTitle>Galerie</SectionTitle>
      <div className="columns-2 lg:columns-3 gap-4 lg:max-w-2/3">
        {place?.photos.map((m) => (
          <GalleryImage
            name={m.name}
            key={m.googleMapsUri}
            url={m.googleMapsUri}
            width={m.widthPx}
            height={m.heightPx}
          />
        ))}
      </div>
    </Section>
  );
}

async function GalleryImage({
  name,
  url,
  width,
  height,
}: {
  name: string;
  url: string;
  width: number;
  height: number;
}) {
  const src = await getCachedMedia(name);
  if (!src) return <div className="bg-muted rounded-md mb-4 w-full h-50" />;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Image
        src={src}
        alt={name}
        width={width}
        height={height}
        className="rounded-md overflow-hidden mb-4 hover:opacity-80 transition-opacity duration-200"
      />
    </a>
  );
}
