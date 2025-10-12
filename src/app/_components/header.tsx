import Link from "next/link";
import { Suspense } from "react";
import { JosephineIcon } from "@/components/josephine-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavItem } from "@/lib/utils";
import { BookingDialog } from "./booking/booking-dialog";

export const navigationItems: NavItem[] = [
  {
    href: "#menu",
    title: "Menu",
  },
  {
    href: "#suppliers",
    title: "Fournisseurs",
  },
  {
    href: "#contact",
    title: "Contact",
  },
];

export function Header() {
  return (
    <div className="fixed top-0 z-20 w-full p-2">
      <header className="flex p-3 items-center justify-between bg-transparent md:bg-white/80 md:backdrop-blur-md md:shadow-md relative rounded-md">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <div className="rounded-md bg-white/80 p-1 backdrop-blur-md shadow-md">
              <JosephineIcon className="size-7 cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navigationItems.map((l) => (
              <DropdownMenuItem key={l.href} asChild>
                <Link href={l.href}>{l.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/">
          <JosephineIcon className="size-8 hidden md:block" />
        </Link>
        <nav className="gap-6 hidden md:flex absolute left-1/2 -translate-x-1/2">
          {navigationItems.map((i) => (
            <Button asChild variant="link" key={i.href}>
              <a href={i.href}>{i.title}</a>
            </Button>
          ))}
        </nav>
        <Suspense>
          <BookingDialog className="backdrop-blur-md shadow-md" />
        </Suspense>
      </header>
    </div>
  );
}
