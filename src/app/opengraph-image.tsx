// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // pour pouvoir lire le disque
export const dynamic = "force-dynamic"; // évite le prerender de la route
export const contentType = "image/png";
export const size = { width: 1200, height: 630 } as const;

export default function OGImage() {
  // Lis directement le fichier dans /public/img/index-bg.jpeg
  const filePath = path.join(process.cwd(), "public", "img", "index-bg.jpeg");
  let bgDataUrl: string | null = null;
  try {
    const buf = fs.readFileSync(filePath);
    bgDataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    // fallback si le fichier manque
    bgDataUrl = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {bgDataUrl ? (
          <img
            src={bgDataUrl}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55)",
            }}
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#111" }} />
        )}

        <div
          style={{
            position: "relative",
            color: "white",
            textAlign: "center",
            padding: 40,
            maxWidth: 1000,
          }}
        >
          <div style={{ fontSize: 80, fontWeight: 800, marginBottom: 24 }}>
            Bienvenue chez Joséphine
          </div>
          <div style={{ fontSize: 32, lineHeight: 1.4 }}>
            Joséphine est un restaurant de bistronomie situé à Cherbourg,
            <br />
            nous utilisons des produits locaux et de saison pour vous offrir une
            <br />
            expérience culinaire unique.
          </div>
        </div>
      </div>
    ),
    size
  );
}
