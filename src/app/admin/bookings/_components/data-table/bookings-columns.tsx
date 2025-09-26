"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Calendar, Clock, ForkKnife } from "lucide-react";
import { EmailLink } from "@/components/email-link";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import type { TBooking } from "@/server/db/types";
import { PatchBookingDialog } from "../mutate/patch-booking-dialog";
import { DeleteBookingButton } from "./delete-booking-button";
import { StatusBadge } from "./status-badge";

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
    filterFn: (row, columnId, filterValue) => {
      const separator = Temporal.PlainTime.from("15:00");
      const time = Temporal.PlainTime.from(row.getValue(columnId));
      if (filterValue === "lunch") {
        return time.until(separator).hours >= 0;
      }
      if (filterValue === "dinner") {
        return time.until(separator).hours < 0;
      }
      return true;
    },
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
    header: "Couverts",
    cell: ({ getValue }) => (
      <div className="flex justify-center h-full items-center">
        <Badge
          className="flex gap-2 items-center text-base [&>svg]:size-4"
          variant="outline"
        >
          <ForkKnife />
          <span>{getValue()}</span>
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("notes", {
    header: "Note",
    meta: {
      className: "w-full max-w-[1px]",
      cardClassName: "grow overflow-hidden",
    },
    cell: ({ getValue }) => (
      <Popover>
        <PopoverTrigger asChild>
          <div className="p-2 text-middle max-w-full truncate overflow-ellipsis bg-accent rounded-md cursor-pointer">
            {getValue() ?? ""}
          </div>
        </PopoverTrigger>
        <PopoverContent className="max-w-xs sm:max-w-xl whitespace-pre-wrap break-words text-sm">
          {getValue()}
        </PopoverContent>
      </Popover>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Statut",
    cell: ({ getValue, row }) => (
      <StatusBadge status={getValue()} id={row.original.id} />
    ),
  }),
  columnHelper.display({
    id: "edit",
    cell: ({ row }) => (
      <PatchBookingDialog id={row.original.id} booking={row.original} />
    ),
    meta: {
      className: "w-0 whitespace-nowrap text-right",
    },
  }),
  columnHelper.display({
    id: "delete",
    cell: ({ row }) => <DeleteBookingButton id={row.original.id} />,
    meta: {
      className: "w-0 whitespace-nowrap text-right",
    },
  }),
];

export type TBookingColumns = typeof columns;
