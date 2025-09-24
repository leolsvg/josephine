import type { VisibilityState } from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect } from "react";
import z from "zod";
import { useBookingsDate } from "../realtime/use-booking-date";

export function useColumnVisibility() {
  const { date } = useBookingsDate();
  const [columnVisibility, setColumnVisibility] =
    useQueryState<VisibilityState>(
      "columns",
      parseAsJson(z.record(z.string(), z.boolean())).withDefault({
        delete: false,
        date: !date,
        email: false,
      }),
    );

  useEffect(() => {
    !date
      ? setColumnVisibility((p) => ({ ...p, date: true }))
      : setColumnVisibility((p) => ({ ...p, date: false }));
  }, [date, setColumnVisibility]);
  return {
    columnVisibility,
    onColumnVisibilityChange: setColumnVisibility,
  };
}
