import Image from "next/image";

export function JosephineIcon({ className }: { className: string }) {
  return (
    <Image
      src="/favicon.png"
      width={48}
      height={48}
      className={className}
      alt="Icone Josephine"
    />
  );
}
