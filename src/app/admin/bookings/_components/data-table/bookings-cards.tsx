import { flexRender, type Table } from "@tanstack/react-table";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TBooking } from "@/server/db/types";
import { useRealtimeBookingIds } from "../realtime/use-realtime-booking-ids";

export function BookingsCards({
  table,
  className,
}: {
  table: Table<TBooking>;
  className?: string;
}) {
  const rows = table.getRowModel().rows;
  const isEmpty = rows.length === 0;
  const bookingIds = useRealtimeBookingIds();
  const headers = useMemo(
    () => table.getHeaderGroups().flatMap((g) => g.headers),
    [table],
  );
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {isEmpty ? (
        <Card>
          <CardContent className="h-24 text-center">
            Pas de réservations
          </CardContent>
        </Card>
      ) : (
        rows.map((r) => (
          <Card
            key={r.original.id}
            className={`transition-colors duration-700 p-2 ${
              bookingIds.has(r.original.id) ? bookingIds.get(r.original.id) : ""
            }`}
          >
            <CardContent className="space-y-2 p-2">
              {r.getVisibleCells().map((c) => {
                const header = headers.find((h) => h.column.id === c.column.id);
                return (
                  <div
                    className="flex justify-between items-center gap-3"
                    key={c.id}
                  >
                    <span className="text-sm text-muted-foreground">
                      {header
                        ? flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )
                        : ""}
                    </span>
                    <span className="text-sm font-medium">
                      {flexRender(c.column.columnDef.cell, c.getContext())}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
