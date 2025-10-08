import type { ColumnFiltersState } from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import z from "zod";
import { TIMEZONE } from "@/lib/utils/date";

const SColumnFilters = z.array(
  z.object({
    id: z.string(),
    value: z.string(),
  }),
);

export function useColumnFilters() {
  const [columnFilters, setColumnFilters] = useQueryState(
    "columnFilters",
    parseAsJson<ColumnFiltersState>(SColumnFilters).withDefault([
      {
        id: "date",
        value: Temporal.Now.zonedDateTimeISO(TIMEZONE).toPlainDate().toString(),
      },
    ]),
  );

  function reset() {
    setColumnFilters(null);
  }

  return {
    columnFilters,
    setColumnFilters,
    reset,
  };
}
