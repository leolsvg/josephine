import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Devtools } from "@/components/devtools";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { alexBrush, geistMono, geistSans } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "Restaurant Joséphine - Cherbourg",
  description:
    "Découvrez Joséphine, restaurant de bistronomie au cœur de Cherbourg. Cuisine raffinée, produits frais et ambiance conviviale. Réservez en ligne dès maintenant.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        type: "image/x-icon",
      },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicon-dark/favicon.ico",
        type: "image/x-icon",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon-dark/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/favicon-dark/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: [
      {
        url: "/favicon/favicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/favicon-dark/favicon.ico",
        type: "image/x-icon",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className="scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${alexBrush.variable} antialiased`}
      >
        <TRPCReactProvider>
          {children}
          <Devtools />
        </TRPCReactProvider>
        <Toaster closeButton richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
