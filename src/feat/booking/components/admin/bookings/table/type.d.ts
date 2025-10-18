/** biome-ignore-all lint/correctness/noUnusedVariables: Required for module declaration */
import "@tanstack/react-table";
import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    cardClassName?: string;
  }
}
