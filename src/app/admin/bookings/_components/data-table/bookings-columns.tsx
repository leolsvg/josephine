"use client";

import {
  createColumnHelper,
  type FilterFn,
  type SortingFn,
} from "@tanstack/react-table";
import { EmailLink } from "@/components/email-link";
import type { TBooking } from "@/server/db/types";
import { PatchBookingDialog } from "../mutate/patch-booking-dialog";
import { DateBadge } from "./columns/date-badge";
import { DeleteBookingButton } from "./columns/delete-booking-button";
import { GuestsBadge } from "./columns/guests-badge";
import { NotesPopover } from "./columns/notes-popover";
import { PhoneLink } from "./columns/phone-link";
import { StatusBadge } from "./columns/status-badge";
import { TableBadge } from "./columns/table-badge";
import { TimeBadge } from "./columns/time-badge";

const plainDateSortingFn: SortingFn<TBooking> = (rowA, rowB) => {
  const a = rowA.original.date;
  const b = rowB.original.date;
  return Temporal.PlainDate.compare(a, b);
};

const plainTimeSortingFn: SortingFn<TBooking> = (rowA, rowB) => {
  const a = rowA.original.time;
  const b = rowB.original.time;
  return Temporal.PlainTime.compare(a, b);
};

const plainTimeFilterFn: FilterFn<TBooking> = (row, _columnId, filterValue) => {
  const separator = Temporal.PlainTime.from("15:00");
  const time = row.original.time;
  if (filterValue === "lunch") {
    return time.until(separator).hours >= 0;
  }
  if (filterValue === "dinner") {
    return time.until(separator).hours < 0;
  }
  return true;
};

const columnHelper = createColumnHelper<TBooking>();

export const columns = [
  columnHelper.accessor("date", {
    header: "Date",
    filterFn: "equalsString",
    sortingFn: plainDateSortingFn,
    cell: ({ getValue }) => <DateBadge date={getValue()} />,
  }),
  columnHelper.accessor("time", {
    sortingFn: plainTimeSortingFn,
    filterFn: plainTimeFilterFn,
    header: "Heure",
    cell: ({ getValue }) => <TimeBadge time={getValue()} />,
  }),
  columnHelper.accessor("name", {
    header: "Nom",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: ({ getValue }) => <EmailLink email={getValue() ?? ""} />,
  }),
  columnHelper.accessor("phone", {
    header: "Téléphone",
    cell: ({ getValue }) => <PhoneLink phone={getValue() ?? ""} />,
  }),
  columnHelper.accessor("guests", {
    header: "Couverts",
    cell: ({ getValue }) => (
      <div className="flex justify-center h-full items-center">
        <GuestsBadge guests={getValue()} />
      </div>
    ),
  }),
  columnHelper.accessor("notes", {
    header: "Note",
    meta: {
      className: "w-full max-w-[1px]",
      cardClassName: "overflow-hidden text-right",
    },
    cell: ({ getValue }) => <NotesPopover notes={getValue()} />,
  }),
  columnHelper.accessor("table", {
    header: "Table",
    cell: ({ getValue, row }) => (
      <div className="flex justify-center items-center">
        <TableBadge table={getValue()} id={row.original.id} />
      </div>
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
