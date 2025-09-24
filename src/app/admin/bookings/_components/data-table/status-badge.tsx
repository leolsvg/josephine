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
import type { TBooking, TStatus } from "@/server/db/types";

export const EStatusConfig = {
  pending: {
    label: "En attente",
    className: "bg-warning/20 text-warning",
    color: "var(--warning)",
  },
  present: {
    label: "Présent",
    className: "bg-success/20 text-success",
    color: "var(--success)",
  },
  absent: {
    label: "Absent",
    className: "bg-destructive/10 text-destructive",
    color: "var(--destructive)",
  },
  canceled: {
    label: "Annulée",
    className: "bg-primary/10 text-primary",
    color: "var(--primary)",
  },
} as const satisfies Record<
  TStatus,
  { label: string; className: string; color: string }
>;

export function StatusBadge({
  id,
  status,
}: {
  id: TBooking["id"];
  status: TStatus;
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
            "cursor-default",
            EStatusConfig[status].className,
            isPending ? "opacity-50" : "hover:opacity-50",
          )}
        >
          {isPending && <Loader2 className="animate-spin" />}
          {EStatusConfig[status].label}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(v) =>
            mutate({ id, value: { status: v as TBooking["status"] } })
          }
        >
          {Object.entries(EStatusConfig).map(([k, v]) => (
            <DropdownMenuRadioItem value={k} key={k}>
              {v.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
