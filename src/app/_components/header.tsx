import { Menu } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { JosephineIcon } from "@/components/josephine-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavItem } from "@/lib/utils";
import { BookingDialog } from "./booking/dialog/booking-dialog";

export const navigationItems: NavItem<Route>[] = [
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
    <div className="fixed w-full top-0 flex flex-col z-20">
      <header className="w-full flex p-4 items-center justify-between bg-transparent md:bg-white/80 md:backdrop-blur-md md:shadow-md relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button size="icon" variant="ghost">
              <Menu className="size-7" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navigationItems.map((l) => (
              <DropdownMenuItem key={l.href} asChild>
                <Link href={l.href}>{l.title}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <JosephineIcon className="size-8 hidden md:block" />
        <nav className="gap-6 hidden md:flex absolute left-1/2 -translate-x-1/2">
          {navigationItems.map((i) => (
            <Button asChild variant="link" key={i.href}>
              <a href={i.href}>{i.title}</a>
            </Button>
          ))}
        </nav>
        {/* <BookingDialog /> */}
        <Button asChild>
          <Link href="/reservation">Réserver</Link>
        </Button>
      </header>
    </div>
  );
}
