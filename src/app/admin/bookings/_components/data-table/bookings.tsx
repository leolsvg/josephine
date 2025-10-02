"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FullDateFormat } from "@/lib/utils/date";
import { BookingsCards } from "./bookings-cards";
import { columns } from "./bookings-columns";
import { BookingsFooter } from "./bookings-footer";
import { BookingsHeader } from "./bookings-header";
import { BookingsTable } from "./bookings-table";
import { useColumnFilters } from "./hooks/use-column-filters";
import { useColumnVisibility } from "./hooks/use-column-visibility";
import { useDateFilter } from "./hooks/use-date-filter";
import { useGlobalFilter } from "./hooks/use-global-filter";
import { usePagination } from "./hooks/use-pagination";
import { useRealtimeBookings } from "./hooks/use-realtime-bookings";

interface DataTableProps {
  className?: string;
}

export function Bookings({ className }: DataTableProps) {
  const { data } = useRealtimeBookings();
  const [pagination, onPaginationChange] = usePagination();
  const { globalFilter, onGlobalFilterChange } = useGlobalFilter();
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
