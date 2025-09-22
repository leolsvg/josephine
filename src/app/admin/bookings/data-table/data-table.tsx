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
import { Card, CardContent } from "@/components/ui/card";
import { FullDateFormat } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";
import { useBookingsDate } from "../realtime/use-booking-date";
import { DataTableFooter } from "./data-table-footer";
import { DataTableHeader } from "./data-table-header";
import { InnerTable } from "./inner-table";
import { usePagination } from "./use-pagination";

interface DataTableProps {
  columns: ColumnDef<TBooking, any>[];
  data: TBooking[];
  className?: string;
}

export function DataTable({ columns, data, className }: DataTableProps) {
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
      <DataTableHeader
        globalFilter={table.getState().globalFilter ?? ""}
        title={
          date
            ? FullDateFormat.format(Temporal.PlainDate.from(date))
            : "Toutes les réservations"
        }
        onSearch={table.setGlobalFilter}
      />
      <Card className="py-0 overflow-hidden">
        <CardContent className="p-0 overflow-y-auto relative">
          <InnerTable table={table} />
        </CardContent>
      </Card>
      <DataTableFooter table={table} />
    </div>
  );
}
