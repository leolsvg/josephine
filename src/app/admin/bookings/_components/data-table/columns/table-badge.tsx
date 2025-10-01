import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";

type TTable = { id: number; capacity: number };

const TABLES: TTable[] = [
  { id: 1, capacity: 2 },
  { id: 2, capacity: 2 },
  { id: 3, capacity: 2 },
  { id: 4, capacity: 4 },
  { id: 5, capacity: 2 },
  { id: 6, capacity: 2 },
  { id: 7, capacity: 2 },
  { id: 8, capacity: 2 },
  { id: 9, capacity: 2 },
  { id: 10, capacity: 2 },
  { id: 11, capacity: 4 },
  { id: 12, capacity: 4 },
  { id: 14, capacity: 4 },
  { id: 15, capacity: 4 },
  { id: 16, capacity: 2 },
  { id: 60, capacity: 6 },
  { id: 80, capacity: 8 },
];

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
    <Popover>
      <PopoverTrigger asChild disabled={isPending}>
        <Badge
          variant={table ? "default" : "outline"}
          className={cn(
            "cursor-pointer",
            isPending ? "opacity-50" : "hover:opacity-50",
          )}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {table ? <>Table {table}</> : "À placer"}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-48">
        <Command>
          <CommandInput placeholder="Rechercher une table..." />
          <CommandList>
            <CommandEmpty>Pas de table.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                value={"À placer"}
                onSelect={() => {
                  mutate({ id, value: { table: null } });
                }}
              >
                À placer
              </CommandItem>
              {TABLES.map((t) => (
                <CommandItem
                  value={t.id.toString()}
                  key={t.id}
                  onSelect={(value) => {
                    mutate({ id, value: { table: Number(value) } });
                  }}
                  className="justify-between"
                >
                  <span>Table {t.id}</span>
                  <Badge variant="outline">{t.capacity} places</Badge>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
