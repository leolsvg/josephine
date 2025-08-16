// src/components/ui/menu.tsx

import Image from "next/image";

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  star?: boolean;
}

interface MenuSectionProps {
  title: string;
  subtitle?: string; // ✅ tu l'avais pas ! maintenant il est là
  items: MenuItem[];
  image: string;
}

export default function MenuSectionWithImage({
  title,
  subtitle,
  items,
  image,
}: MenuSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-white">
      {/* Partie menu à gauche */}
      <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-gray-500 italic mb-6">{subtitle}</p>}

        <ul className="space-y-6">
          {items.map((item, idx) => (
            <li key={idx}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {item.star && <span className="text-[#937800]">*</span>}{" "}
                  {item.name}
                </h2>
                <span className="text-md text-[#937800] font-medium">
                  {item.price}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Image à droite */}
      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto">
        <Image
          src={image}
          alt="illustration menu"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
