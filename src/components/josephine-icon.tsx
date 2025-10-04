import Image from "next/image";

export function JosephineIcon({ className }: { className: string }) {
  return (
    <Image
      src="/favicon/favicon.ico"
      width={48}
      height={48}
      className={className}
      alt="Icône Josephine"
    />
  );
}
