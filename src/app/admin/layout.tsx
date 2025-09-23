import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { JosephineIcon } from "@/components/josephine-icon";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <div className="flex h-screen flex-col">
          <Header />
          <main className="grow overflow-auto p-5">{children}</main>
        </div>
      </NuqsAdapter>
      <Toaster closeButton richColors />
    </ThemeProvider>
  );
}

export function Header() {
  return (
    <header className="flex items-center p-3 border-b gap-3">
      <Link href="/" className="flex gap-3 items-center">
        <JosephineIcon className="dark:brightness-0 dark:invert size-8" />
        <div className="text-xl font-bold hidden md:block">
          Restautant Josephine
        </div>
      </Link>
      <div className="grow" />
      <div className="flex">
        <Button variant="link" asChild>
          <Link href="/admin/bookings">Réservations</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/admin/menus">Menus</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/admin/settings">Paramètres</Link>
        </Button>
      </div>
      <ThemeToggle />
    </header>
  );
}
