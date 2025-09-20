"use client";

import { useMutation } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Clock, Loader2, Trash, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/lib/trpc/react";
import type { TBooking } from "@/server/db/types";

const columnHelper = createColumnHelper<TBooking>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    cell: ({ getValue }) => format(getValue(), "PPP"),
  }),
  columnHelper.accessor("time", {
    header: "Heure",
    cell: ({ getValue }) => (
      <Badge className="flex gap-2 items-center text-base [&>svg]:size-4">
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
  columnHelper.accessor("notes", { header: "Note" }),
  columnHelper.accessor("status", {
    header: "Statut",
    cell: ({ getValue }) => <StatusBadge status={getValue()} />,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <DeleteBookingButton id={row.original.id} />,
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

export function StatusBadge({ status }: { status: TBooking["status"] }) {
  let label: string;
  let className: string;
  switch (status) {
    case "pending":
      label = "En attente";
      className = "bg-amber-100 text-amber-800";
      break;
    case "present":
      label = "Présent";
      className = "bg-green-100 text-green-800";
      break;
    case "absent":
      label = "Absent";
      className = "bg-red-100 text-red-800";
      break;
    case "canceled":
      label = "Annulée";
      className = "bg-gray-100 text-gray-800";
      break;
    default:
      label = status;
      className = "";
  }
  return <Badge className={className}>{label}</Badge>;
}

export function EmailLink({ email }: { email: TBooking["email"] }) {
  return (
    <Button variant="link" size="sm" asChild>
      <a href={`mailto:${email}`}>{email}</a>
    </Button>
  );
}
