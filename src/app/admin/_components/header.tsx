import { Menu } from "lucide-react";
import Link from "next/link";
import { JosephineIcon } from "@/components/josephine-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { NavItem } from "@/lib/utils";

export const navigationItems: NavItem[] = [
  {
    href: "/admin/bookings",
    title: "Réservations",
  },
  {
    href: "/admin/menus",
    title: "Menus",
  },
  {
    href: "/admin/settings",
    title: "Paramètres",
  },
];

export function Header() {
  return (
    <header className="flex items-center p-3 border-b gap-3">
      <Link href="/" className="flex gap-3 items-center">
        <JosephineIcon className="dark:brightness-0 dark:invert size-8" />
        <div className="text-xl font-bold hidden md:block">
          Restaurant Josephine
        </div>
      </Link>
      <div className="grow" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="sm:hidden">
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
      <nav className="hidden sm:flex">
        {navigationItems.map((l) => (
          <Button variant="link" asChild key={l.href}>
            <Link href={l.href}>{l.title}</Link>
          </Button>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  );
}
