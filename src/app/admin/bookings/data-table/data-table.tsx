"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import { Card, CardContent } from "@/components/ui/card";
import type { TBooking } from "@/server/db/types";
import { DataTableFooter } from "./data-table-footer";
import { DataTableHeader } from "./data-table-header";
import { InnerTable } from "./inner-table";
import { usePagination } from "./use-pagination";

interface DataTableProps {
  columns: ColumnDef<TBooking, any>[];
  data: TBooking[];
  title: string;
  className?: string;
}

export function DataTable({ columns, data, title, className }: DataTableProps) {
  const [pagination, onPaginationChange] = usePagination();
  const [globalFilter, onGlobalFilterChange] = useQueryState(
    "search",
    parseAsString,
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      columnVisibility: {
        date: false,
      },
    },
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange,
    onGlobalFilterChange,
  });

  return (
    <div className={className}>
      <DataTableHeader
        globalFilter={table.getState().globalFilter}
        title={title}
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
