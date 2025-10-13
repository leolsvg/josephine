import { MapPinned, Phone } from "lucide-react";
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
import { Josephine } from "@/lib/josephine";
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
      <header className="flex md:grid md:grid-cols-3 p-3 items-center justify-between bg-transparent md:bg-white/80 md:backdrop-blur-md md:shadow-md relative rounded-md">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="p-1 shadow-md">
                <JosephineIcon className="size-6" />
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
          <Link href="/" className="hidden md:block">
            <JosephineIcon className="size-8" />
          </Link>
        </div>
        <nav className="gap-6 hidden md:flex justify-center">
          {navigationItems.map((i) => (
            <Button asChild variant="link" key={i.href}>
              <a href={i.href}>{i.title}</a>
            </Button>
          ))}
        </nav>
        <div className="flex gap-1 justify-end">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="shadow-md md:shadow-none w-8 xl:w-auto"
          >
            <a href={`tel:${Josephine.phone}`}>
              <Phone />
              <span className="hidden xl:block">{Josephine.phone}</span>
            </a>
          </Button>
          <Button
            asChild
            size="icon-sm"
            variant="outline"
            className="shadow-md md:shadow-none"
          >
            <a
              href={Josephine.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPinned />
            </a>
          </Button>
          <Suspense>
            <BookingDialog className="shadow-md md:shadow-none" />
          </Suspense>
        </div>
      </header>
    </div>
  );
}
