// components/CarteMenu.tsx
import Image from "next/image";
import Link from "next/link";

interface CarteMenuProps {
  logoSrc: string;
  titre: string;
  href: string;
}

export default function CarteMenu({ logoSrc, titre, href }: CarteMenuProps) {
  return (
    <div className="bg-[#0A0A2A] shadow-lg w-[350px] h-[250px] flex flex-col justify-between p-7 hover:scale-105 transition duration-300 ease-in-out">
      {/* Logo et texte */}
      <div className="bg-white p-4 flex flex-col items-center justify-start h-[100%] gap-4">
        <Image src={logoSrc} alt="Logo" width={80} height={80} />
        <h2 className="text-center text-sm text-[#937800] mt-4 uppercase">
          {titre}
        </h2>
      </div>
    </div>
  );
}
