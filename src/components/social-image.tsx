/** biome-ignore-all lint/performance/noImgElement: Only used at build time for og image generation */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "./public/favicon-dark.png"),
  "base64",
);
const logoSrc = `data:image/png;base64,${logoData}`;

const barData = await readFile(
  join(process.cwd(), "./public/restaurant/bar.jpeg"),
  "base64",
);
const barSrc = `data:image/jpeg;base64,${barData}`;

export default function SocialImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
      }}
    >
      <img
        src={barSrc}
        alt="Bar background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          background: "rgba(0, 0, 0, 0.6)",
          width: "100%",
          height: "100%",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          zIndex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={logoSrc}
          width={48}
          height={48}
          alt="Icone Josephine"
          style={{
            width: "96px",
            height: "96px",
          }}
        />

        <h1
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Josephine Cherbourg
        </h1>

        <p
          style={{
            color: "white",
            fontSize: 36,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Découvrez une expérience culinaire unique au cœur de Cherbourg avec
          des saveurs raffinées et un cadre chaleureux.
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
