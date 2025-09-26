import type { ColumnFiltersState } from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import z from "zod";

const SColumnFilters = z.array(
  z.object({
    id: z.string(),
    value: z.string(),
  }),
);

export function useColumnFilters() {
  const [columnFilters, setColumnFilters] = useQueryState(
    "columnFilters",
    parseAsJson<ColumnFiltersState>(SColumnFilters).withDefault([]),
  );

  function reset() {
    setColumnFilters([]);
  }

  return {
    columnFilters,
    setColumnFilters,
    reset,
  };
}
