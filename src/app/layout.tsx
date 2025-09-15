import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { geistMono, geistSans } from "@/styles/fonts";

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
		<html lang="fr" suppressHydrationWarning className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
