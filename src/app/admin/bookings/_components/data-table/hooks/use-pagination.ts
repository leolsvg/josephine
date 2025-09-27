import { parseAsIndex, parseAsInteger, useQueryStates } from "nuqs";
import { useEffect } from "react";

export const DEFAULT_PAGE_SIZE = 8;
export const PAGE_SIZES = [DEFAULT_PAGE_SIZE, 14, 20, 50, 100];
const ROW_HEIGHT = 53;
const LAYOUT_HEIGHT = 230; // Header + toolbar + footer

const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "perPage",
};

export function usePagination() {
  const states = useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
  });

  useEffect(() => {
    function calculatePageSize() {
      const availableHeight = window.innerHeight - LAYOUT_HEIGHT;
      const rows = Math.floor(availableHeight / ROW_HEIGHT);
      states[1]((c) => ({
        ...c,
        pageSize: Math.max(rows, DEFAULT_PAGE_SIZE),
      }));
    }
    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, [states[1]]);
  return states;
}
