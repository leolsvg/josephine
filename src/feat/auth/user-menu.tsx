"use client";

import { LogOut, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "@/lib/auth/use-sign-out";
import { useUser } from "@/lib/auth/use-user";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2);
  }

  return parts
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

export function UserMenu() {
  const user = useUser();
  const { signOut } = useSignOut();
  const { setTheme, theme } = useTheme();
  if (!user) return;
  const username = user?.user_metadata?.name
    ? user.user_metadata.name
    : user.email?.split("@")[0];
  const initials = getInitials(username);
  const avatar = user?.user_metadata?.avatar_url;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar initials={initials} url={avatar} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex gap-3 items-center">
            <UserAvatar initials={initials} url={avatar} />
            <div className="flex flex-col">
              <span className="truncate font-medium">{username}</span>
              <span className="text-xs truncate text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex gap-1">
          <Button
            variant={theme === "light" ? "secondary" : "ghost"}
            onClick={() => setTheme("light")}
            className="text-xs h-auto py-1.5"
          >
            <Sun />
            Clair
          </Button>
          <Button
            variant={theme === "dark" ? "secondary" : "ghost"}
            onClick={() => setTheme("dark")}
            className="text-xs h-auto py-1.5"
          >
            <Moon />
            Sombre
          </Button>
          <Button
            variant={theme === "system" ? "secondary" : "ghost"}
            onClick={() => setTheme("system")}
            className="text-xs h-auto py-1.5"
          >
            <Settings />
            Système
          </Button>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatar({ url, initials }: { url: string; initials: string }) {
  return (
    <Avatar className="size-7">
      <AvatarImage src={url} />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  );
}
