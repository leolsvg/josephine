import { parseAsString, useQueryState } from "nuqs";

export function useGlobalFilter() {
  const [globalFilter, setGlobalFilter] = useQueryState(
    "search",
    parseAsString,
  );
  const reset = () => setGlobalFilter("");
  return {
    globalFilter,
    onGlobalFilterChange: setGlobalFilter,
    reset,
  };
}
