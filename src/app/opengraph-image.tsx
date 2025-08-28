// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "nodejs"; // plus simple en dev local
export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default function OGImage() {
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
        {/* Image de fond (direct depuis /public) */}
        <img
          src="/img/index-bg.jpeg"
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

        {/* Texte centré */}
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
