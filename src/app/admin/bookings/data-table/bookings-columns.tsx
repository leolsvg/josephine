"use client";

import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { Calendar, Clock, Loader2, Trash, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useTRPC } from "@/lib/trpc/react";
import { cn } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";
import { PatchBookingDialog } from "../mutate/patch-booking-dialog";

const columnHelper = createColumnHelper<TBooking>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    filterFn: "equalsString",
    cell: ({ getValue }) => (
      <Badge
        className="flex gap-2 items-center text-base [&>svg]:size-4"
        variant="secondary"
      >
        <Calendar />
        <span>{getValue()}</span>
      </Badge>
    ),
  }),
  columnHelper.accessor("time", {
    header: "Heure",
    cell: ({ getValue }) => (
      <Badge
        className="flex gap-2 items-center text-base [&>svg]:size-4"
        variant="default"
      >
        <Clock />
        <span>{getValue().slice(0, 5)}</span>
      </Badge>
    ),
  }),
  columnHelper.accessor("name", { header: "Nom" }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => <EmailLink email={getValue()} />,
  }),
  columnHelper.accessor("phone", { header: "Téléphone" }),
  columnHelper.accessor("guests", {
    header: "Invités",
    cell: ({ getValue }) => (
      <div className="flex gap-3 items-center">
        <Users className="size-4" />
        <span className="font-semi-bold">{getValue()} personnes</span>
      </div>
    ),
  }),
  columnHelper.accessor("notes", {
    header: "Note",

    cell: ({ getValue }) => (
      <Textarea
        className="min-h-10 h-10"
        disabled
        defaultValue={getValue() ?? ""}
      />
    ),
  }),
  columnHelper.accessor("status", {
    header: "Statut",
    cell: ({ getValue, row }) => (
      <StatusBadge status={getValue()} id={row.original.id} />
    ),
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <PatchBookingDialog id={row.original.id} booking={row.original} />
    ),
    meta: {
      className: "w-0 whitespace-nowrap text-right",
    },
  }),
];

export function DeleteBookingButton({ id }: { id: number }) {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.bookings.delete.mutationOptions(),
  );
  return (
    <Button
      className=""
      variant="ghost"
      size="icon"
      disabled={isPending}
      onClick={() => {
        mutate({ id });
      }}
    >
      {isPending && <Loader2 className="animate-spin" />}
      <Trash className="stroke-destructive" />
    </Button>
  );
}

export function StatusBadge({
  id,
  status,
}: {
  id: TBooking["id"];
  status: TBooking["status"];
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
            EStatusConfig[status].className,
            "cursor-default",
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

export function EmailLink({ email }: { email: TBooking["email"] }) {
  return (
    <Button variant="link" size="sm" asChild>
      <a href={`mailto:${email}`}>{email}</a>
    </Button>
  );
}

export const EStatusConfig = {
  pending: {
    label: "En attente",
    className: "bg-amber-100 text-amber-800",
  },
  present: {
    label: "Présent",
    className: "bg-green-100 text-green-800",
  },
  absent: {
    label: "Absent",
    className: "bg-red-100 text-red-800",
  },
  canceled: {
    label: "Annulée",
    className: "bg-gray-100 text-gray-800",
  },
} as const satisfies Record<TBooking["status"], object>;
