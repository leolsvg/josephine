import MenuSectionWithImage from "@/components/menu";

export default function MenuLunchPage() {
  const items = [
    {
      name: "La Gambas",
      description:
        "Gambas pochées, segment de pamplemousse, chou rave, oignon nouveau, crème de petits pois à la citronnelle.",
      price: "18 €",
      star: true,
    },
    {
      name: "Le Poulet Jaune",
      description:
        "Suprême de poulet jaune farci aux champignons de Paris, betterave et jus corsé.",
      price: "18 €",
      star: true,
    },
  ];

  return (
    <MenuSectionWithImage
      title="Menu Déjeuner"
      subtitle="(Uniquement le midi en semaine, hors jours fériés et jours spéciaux)"
      items={items}
      image="/img/bar.jpg"
    />
  );
}
