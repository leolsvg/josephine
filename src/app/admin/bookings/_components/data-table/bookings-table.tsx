import type { Table as TanStackTable } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";
import { columns } from "./bookings-columns";
import { useRealtimeBookingIds } from "./hooks/use-realtime-booking-ids";

export function BookingsTable({
  table,
  className,
}: {
  table: TanStackTable<TBooking>;
  className?: string;
}) {
  const rows = table.getRowModel().rows;
  const isEmpty = rows.length === 0;
  const bookingIds = useRealtimeBookingIds();
  return (
    <Card className={cn("py-0 overflow-hidden", className)}>
      <CardContent className="p-0 overflow-y-auto relative">
        <Table>
          <TableHeader className="sticky top-0 z-10 ">
            {table.getHeaderGroups().map((g) => (
              <TableRow key={g.id} className="bg-accent hover:bg-accent">
                {g.headers.map((h) => (
                  <TableHead key={h.id} colSpan={h.colSpan}>
                    {h.isPlaceholder ? null : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="dark:hover:bg-primary/10 hover:bg-primary/10"
                        disabled={!h.column.getCanSort()}
                        onClick={h.column.getToggleSortingHandler()}
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {{
                          asc: <ArrowUp />,
                          desc: <ArrowDown />,
                        }[h.column.getIsSorted() as string] ?? null}
                      </Button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Pas de réservations
                </TableCell>
              </TableRow>
            ) : (
              rows.map((r) => (
                <TableRow
                  key={r.id}
                  className={`transition-colors duration-700 ${
                    bookingIds.has(r.original.id)
                      ? bookingIds.get(r.original.id)
                      : ""
                  }`}
                >
                  {r.getVisibleCells().map((c) => (
                    <TableCell
                      key={c.id}
                      className={c.column.columnDef.meta?.className}
                    >
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
