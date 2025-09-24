import type { ColumnFiltersState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useBookingsDate } from "../realtime/use-booking-date";

export function useColumnFilters() {
  const { date } = useBookingsDate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    date
      ? setColumnFilters([{ id: "date", value: date }])
      : setColumnFilters((p) => [...p.filter((f) => f.id !== "date")]);
  }, [date]);

  return { columnFilters, onColumnFiltersChange: setColumnFilters };
}
