import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";

const TABLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 60, 80];

export function TableBadge({
  id,
  table,
}: {
  id: TBooking["id"];
  table: TBooking["table"];
}) {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.patch.mutationOptions(),
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isPending}>
        <Badge
          className={cn(
            "cursor-pointer",
            isPending ? "opacity-50" : "hover:opacity-50",
          )}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {table ?? "En attente"}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={table?.toString() ?? ""}
          onValueChange={(v) => mutate({ id, value: { table: Number(v) } })}
        >
          {TABLES.map((t) => (
            <DropdownMenuRadioItem value={t.toString()} key={t}>
              {t}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
