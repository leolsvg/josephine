import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Joséphine",
  description: "Restaurant bistronomique",
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
        {/* Exemple: remplace tout <script src="..."></script> par: */}
        <Script src="/js/some-client.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
