import type { VisibilityState } from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect } from "react";
import z from "zod";
import { useDateFilter } from "./use-date-filter";

export function useColumnVisibility() {
  const { date } = useDateFilter();
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
