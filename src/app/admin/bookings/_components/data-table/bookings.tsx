"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { FullDateFormat } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";
import { useBookingsDate } from "../realtime/use-booking-date";
import { useRealtimeBookings } from "../realtime/use-realtime-bookings";
import { BookingsCards } from "./bookings-cards";
import { BookingsFooter } from "./bookings-footer";
import { BookingsHeader } from "./bookings-header";
import { BookingsTable } from "./bookings-table";
import { usePagination } from "./use-pagination";

interface DataTableProps {
  columns: ColumnDef<TBooking, any>[];
  className?: string;
}

export function Bookings({ columns, className }: DataTableProps) {
  const { data } = useRealtimeBookings();
  const { date } = useBookingsDate();
  const [pagination, onPaginationChange] = usePagination();
  const [globalFilter, onGlobalFilterChange] = useQueryState(
    "search",
    parseAsString,
  );

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    date
      ? setColumnFilters([{ id: "date", value: date }])
      : setColumnFilters((p) => [...p.filter((f) => f.id !== "date")]);
  }, [date]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    state: {
      pagination,
      globalFilter,
      columnVisibility: {
        date: !date,
      },
      columnFilters: columnFilters,
    },
    initialState: {
      sorting: [
        {
          id: "date",
          desc: true,
        },
        {
          id: "time",
          desc: true,
        },
      ],
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange,
    onGlobalFilterChange,
  });

  return (
    <div className={className}>
      <BookingsHeader
        globalFilter={table.getState().globalFilter ?? ""}
        title={
          date
            ? FullDateFormat.format(Temporal.PlainDate.from(date))
            : "Toutes les réservations"
        }
        onSearch={table.setGlobalFilter}
      />

      <BookingsTable table={table} className="hidden md:block" />
      <BookingsCards table={table} className="md:hidden" />
      <BookingsFooter table={table} />
    </div>
  );
}
