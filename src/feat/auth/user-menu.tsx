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
import { useSignOut, useUser } from "@/lib/auth/use-user";

export function UserMenu() {
  const user = useUser();
  const { signOut } = useSignOut();
  const { setTheme, theme } = useTheme();

  if (!user) return;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserAvatar
            name={user.user_metadata.name}
            url={user.user_metadata.avatar_url}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex gap-3 items-center">
            <UserAvatar
              name={user.user_metadata.name}
              url={user.user_metadata.avatar_url}
            />
            <div className="flex flex-col">
              <span className="truncate font-medium">
                {user.user_metadata.full_name}
              </span>
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

function UserAvatar({ url, name }: { url: string; name: string }) {
  const initials =
    name
      .match(/\b(\w)/g)
      ?.join("")
      .toUpperCase() ?? "??";
  return (
    <Avatar className="size-7">
      <AvatarImage src={url} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
