import type { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PAGE_SIZE } from "./use-pagination";

const variant = "secondary";

export function BookingsFooter<TData>({ table }: { table: Table<TData> }) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const rows = table.getFilteredRowModel().rows.length;
  const hasReservations = rows !== 0;
  const guests = table
    .getPrePaginationRowModel()
    .rows.reduce((p, c) => p + (c.getValue("guests") as number), 0);
  return (
    <div className="flex items-center justify-between bg-background pt-3 pl-3">
      <div className="text-muted-foreground">
        {hasReservations ? (
          <>
            <strong>{rows}</strong> réservation{rows > 1 && "s"} pour{" "}
            <strong>{guests}</strong> personne{guests > 1 && "s"}
          </>
        ) : (
          "Pas de réservations"
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-muted-foreground">
          Page <strong>{pageIndex + 1}</strong> sur <strong>{pageCount}</strong>
        </div>
        <Pagination className="justify-end w-auto grow">
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                aria-label="First page"
                onClick={() => table.setPageIndex(0)}
                size="icon"
                variant={variant}
              >
                <ChevronsLeft />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                aria-label="Previous page"
                onClick={() => table.previousPage()}
                size="icon"
                variant={variant}
              >
                <ChevronLeft />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanNextPage()}
                aria-label="Next page"
                onClick={() => table.nextPage()}
                size="icon"
                variant={variant}
              >
                <ChevronRight />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                disabled={!table.getCanNextPage()}
                aria-label="Last page"
                onClick={() => table.setPageIndex(pageCount - 1)}
                size="icon"
                variant={variant}
              >
                <ChevronsRight />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[DEFAULT_PAGE_SIZE, 20, 50, 100].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
