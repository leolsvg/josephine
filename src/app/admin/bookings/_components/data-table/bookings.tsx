"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import { FullDateFormat } from "@/lib/utils";
import { useRealtimeBookings } from "../realtime/use-realtime-bookings";
import { BookingsCards } from "./bookings-cards";
import type { TBookingColumns } from "./bookings-columns";
import { BookingsFooter } from "./bookings-footer";
import { BookingsHeader } from "./bookings-header";
import { BookingsTable } from "./bookings-table";
import { useColumnFilters } from "./hooks/use-column-filters";
import { useColumnVisibility } from "./hooks/use-column-visibility";
import { useDateFilter } from "./hooks/use-date-filter";
import { usePagination } from "./hooks/use-pagination";

interface DataTableProps {
  columns: TBookingColumns;
  className?: string;
}

export function Bookings({ columns, className }: DataTableProps) {
  const { data } = useRealtimeBookings();
  const [pagination, onPaginationChange] = usePagination();
  const [globalFilter, onGlobalFilterChange] = useQueryState(
    "search",
    parseAsString,
  );

  const { columnVisibility, onColumnVisibilityChange } = useColumnVisibility();
  const { columnFilters, setColumnFilters } = useColumnFilters();
  const { date } = useDateFilter();
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
      columnVisibility,
      columnFilters,
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
    onColumnVisibilityChange,
    onGlobalFilterChange,
  });

  return (
    <div className={className}>
      <BookingsHeader
        table={table}
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
