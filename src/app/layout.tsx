import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Joséphine",
  description:
    "Découvrez Joséphine, restaurant de bistronomie au cœur de Cherbourg. Cuisine raffinée, produits frais et ambiance conviviale. Réservez en ligne dès maintenant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />

        <Script src="/js/some-client.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
