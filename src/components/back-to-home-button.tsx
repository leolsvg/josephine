import Link from "next/link";
import { Button } from "./ui/button";

export function BackToHomeButton() {
  return (
    <Button asChild>
      <Link href="/">Retour à l'accueil</Link>
    </Button>
  );
}
