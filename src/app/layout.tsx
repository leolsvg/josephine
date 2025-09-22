import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { geistMono, geistSans } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Joséphine",
  description:
    "Découvrez Joséphine, restaurant de bistronomie au cœur de Cherbourg. Cuisine raffinée, produits frais et ambiance conviviale. Réservez en ligne dès maintenant.",
  icons: [
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
      media: "(prefers-color-scheme: light)",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-dark.png",
      media: "(prefers-color-scheme: dark)",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
